import Image from "next/image";
import { UserRound } from "lucide-react";

export default async function BPoSNodeList({
  nodeList
}: {
  nodeList: BPoS2Node[];
}) {
  if (nodeList.length === 0) {
    return <div>No Data</div>;
  }
  return (
    <div className='mb-32 grid gap-3 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left'>
      {nodeList.map((node) => {
        return (
          <a
            key={node.index}
            href={node.url}
            className='group rounded-lg border px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='text-xl text-right pb-4'>#{node.index}</p>
            <div className='mb-3'>
              {node.imageUrl ? (
                <Image
                  src={node.imageUrl}
                  alt='node avatar'
                  width={60}
                  height={60}
                  className='pr-3 inline-block'
                />
              ) : (
                <UserRound
                  width={60}
                  height={60}
                  className='inline-block pr-3'
                />
              )}
              <span className='mb-3 text-[16px] font-semibold opacity-90'>
                {node.nickname}
              </span>
            </div>

            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>State</div>
              <code className='text-sm opacity-50'>{node.state}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>On duty</div>
              <code className='text-sm opacity-50'>{node.onduty}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Current vote rights</div>
              <code className='text-sm opacity-50'>{node.dposv2votes}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>
                Percentage of casted votes
              </div>
              <code className='text-sm opacity-50'>
                {node.votesPercentage}%
              </code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Stake util</div>
              <code className='text-sm opacity-50'>
                Height {node.stakeuntil}(about {node.stakeuntilDate})
              </code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Max pledge duration</div>
              <code className='text-sm opacity-50'>{node.stakeDays} days</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Location</div>
              <code className='text-sm opacity-60'>{node.location}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Website</div>
              <code className='text-sm opacity-60'>{node.url}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Register height</div>
              <code className='text-sm opacity-50'>{node.registerheight}</code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Owner public key</div>
              <code className='text-sm opacity-50 break-all'>
                {node.ownerpublickey}
              </code>
            </div>
            <div className='mb-2'>
              <div className='text-[14px] opacity-80'>Node public key</div>
              <code className='text-sm opacity-50 break-all'>
                {node.nodepublickey}
              </code>
            </div>
          </a>
        );
      })}
    </div>
  );
}
