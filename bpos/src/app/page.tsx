import { fetchNodes } from "@/lib/actions";
import BPoSNodeList from "@/components/BPoSNodeList";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  const nodeList = await fetchNodes();
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-4 z-10 w-full max-w-5xl items-center justify-between font-mono text-xl lg:flex'>
        <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
          BPoS Elastos Nodes (total: {nodeList && nodeList.length})
        </p>
      </div>
      {nodeList && <BPoSNodeList nodeList={nodeList} />}
    </main>
  );
}
