declare type ImageInfo = {
  // ownerpublickkey (BPoS node) or did (CRC)
  [key: string]: {
    nickname: string;
    logo: string;
  };
};

// Node
type ELANode = {
  active: boolean;
  cancelheight: number;
  dposv2votes: string;
  identity: string;
  illegalheight: number;
  inactiveheight: number;
  index: number;
  location: number;
  nickname: string;
  nodepublickey: string;
  onduty: string; //'Valid', 'Candidate'
  ownerpublickey: string;
  registerheight: number;
  stakeuntil: number;
  state: string;
  url: string;
  votes: string;
};

declare type BPoS2Node = ELANode & {
  checkDisabled: boolean;
  isChecked: boolean;
  Location: string;
  imageUrl: string;
  stakeDays: number;
  stakeuntil: number;
  stakeuntilDate: string;
  stakeuntilExpiredIn: string;
  stakeuntilAboutExpire: string;
  userVotes: number;
  userStakeDays: number;
  dposv2votesNumber: number;
  votesPercentage: number;
};

declare type ProducersSearchResponse = {
  producers: ELANode[];
  totaldposv2votes: string;
  totalvotes: string;
  totalcounts: number;
};
