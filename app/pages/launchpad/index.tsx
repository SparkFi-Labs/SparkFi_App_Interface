import ActiveSalesView from "@/screens/launchpad/ActiveSalesView";
import CompletedSalesView from "@/screens/launchpad/CompletedSalesView";
import UpcomingSalesView from "@/screens/launchpad/UpcomingSalesView";
import Head from "next/head";

export default function Launchpad() {
  return (
    <div className="flex flex-col justify-start items-center py-7 gap-7 w-screen">
      <Head>
        <title>Launchpad | Pools</title>
      </Head>
      <div className="px-3 w-full">
        <ActiveSalesView />
      </div>
      <div className="bg-[#101221] w-full py-7 px-3">
        <UpcomingSalesView />
      </div>
      <div className="px-3 w-full">
        <CompletedSalesView />
      </div>
    </div>
  );
}
