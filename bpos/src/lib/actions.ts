import dayjs from "dayjs";

import {
  NodeType,
  NodeState,
  ELA_RPC_IMAGES_URL,
  ELA_RPC_URL
} from "@/constants";

import {
  getPercentage,
  isEmptyObject,
  formatDate,
  getRemainingTimeString
} from "@/utils";

export async function getCurrentHeight(): Promise<number | null> {
  try {
    const response = await fetch(ELA_RPC_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getcurrentheight"
      })
    });

    const rs = await response.json();
    if (rs && rs.result) {
      console.log("rs.result...", rs.result);
      return rs.result;
    }
  } catch (e) {
    console.warn("fetchBposNodes exception", e);
  }
  return null;
}

// identity:
// v1: identity == DPoSV1V2 or identity == DPoSV1
// v2: identity == DPoSV1V2 or identity == DPoSV2
// all: return all nodes.
export async function fetchBPoSNodes(
  state: NodeState,
  identity: NodeType
): Promise<ProducersSearchResponse | null> {
  console.log("Fetching Dpos Nodes ", identity);

  try {
    const response = await fetch(ELA_RPC_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "listproducers",
        params: { state, identity }
      })
    });

    const rs = await response.json();
    if (rs && rs.result) {
      return rs.result;
    }
  } catch (e) {
    console.warn("fetchBposNodes exception", e);
  }
  return null;
}

// TODO: backup data to db
export async function fetchNodes(): Promise<BPoS2Node[] | null> {
  let currentBlockTimestamp = dayjs().unix();
  console.log("currentBlockTimestamp...", currentBlockTimestamp);

  try {
    let currentHeight = await getCurrentHeight();
    console.log("currentHeight...", currentHeight);
    const result = await fetchBPoSNodes(NodeState.ALL, NodeType.BPoS);
    const nodeIcons = await fetchNodeAvatars();

    if (result && !isEmptyObject(result.producers)) {
      const totalVotes = parseFloat(result.totaldposv2votes);
      const nodes = result.producers as BPoS2Node[];

      let bposList = [];
      for (const node of nodes) {
        if (!node.identity || (node.identity && node.identity == "DPoSV1")) {
          continue;
        }

        // current rank
        node.index += 1;

        if (node.state === "Active" || node.state === "Inactive") {
          // Check stake Until
          if (currentHeight) {
            const until = node.stakeuntil - currentHeight;
            // mining average 720 blocks every day
            // max pledge duration
            node.stakeDays = Math.ceil(until / 720);
            if (until > 720 * 7) {
              // more than 7 days
              // mining a block in 120 seconds
              const stakeTimestamp = until * 120 + currentBlockTimestamp;
              node.stakeuntilDate = formatDate(stakeTimestamp);
            } else if (until <= 15) {
              node.stakeuntilAboutExpire = "About to expire";
            } else {
              node.stakeuntilExpiredIn = getRemainingTimeString(until);
            }

            let minStakeDays = 10;
            // prettier-ignore
            node.checkDisabled = node.state === "Inactive" || until < minStakeDays * 720;
          }
          // vote rights
          node.dposv2votesNumber = parseFloat(node.dposv2votes);

          // vote rights percentage
          node.votesPercentage = getPercentage(
            node.dposv2votesNumber,
            totalVotes
          );

          if (
            nodeIcons &&
            nodeIcons[node.ownerpublickey] &&
            nodeIcons[node.ownerpublickey].logo
          ) {
            node.imageUrl = `${ELA_RPC_IMAGES_URL}/${
              nodeIcons[node.ownerpublickey].logo
            }`;
          }

          bposList.push(node);
        }
      }
      return bposList;
    }
    // console.log("the number of BPoS nodes...", bposList.length);
  } catch (err) {
    console.error("fetchNodes error:", err);
  }
  return null;
}

// images
export async function fetchNodeAvatars(): Promise<ImageInfo | null> {
  try {
    const response = await fetch(`${ELA_RPC_IMAGES_URL}/logo.json`);
    const rs = await response.json();
    if (rs && Object.keys(rs).length > 0) {
      return rs;
    }
  } catch (e) {
    console.error("fetchNodeAvatars exception:", e);
  }
  return null;
}
