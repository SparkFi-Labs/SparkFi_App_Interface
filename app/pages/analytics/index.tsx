import AssetsInfoView from "@/screens/analytics/AssetsInfoView";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlineSwapCalls } from "react-icons/md";

export default function Analytics() {
  const { query, asPath } = useRouter();
  const vw = useMemo(() => query.view, [query.view]);
  const parsedUrl = useMemo(() => {
    const composedUrl = new URL(window.location.origin + "/" + asPath);
    composedUrl.hash = "";
    composedUrl.search = "";
    return composedUrl.toString();
  }, [asPath]);
  return (
    <div className="w-screen flex flex-col lg:flex-row justify-start gap-3 lg:gap-7 items-center lg:items-start py-7 lg:py-12 px-2 lg:px-4">
      <ul className="menu menu-horizontal lg:menu-vertical w-full lg:w-1/4">
        <li>
          <Link
            href={`${parsedUrl}?view=assets`}
            className="text-[#fff] text-sm lg:text-2xl flex justify-start items-center gap-3"
          >
            <AiOutlineDollarCircle />
            <span className="capitalize font-inter font-[500] text-sm lg:text-2xl">assets</span>
          </Link>
        </li>
        <li>
          <Link
            href={`${parsedUrl}?view=trades`}
            className="text-[#fff] text-sm lg:text-2xl flex justify-start items-center gap-3"
          >
            <FiTrendingUp />
            <span className="capitalize font-inter font-[500] text-sm lg:text-2xl">trades</span>
          </Link>
        </li>
        <li>
          <Link
            href={`${parsedUrl}?view=exchanges`}
            className="text-[#fff] text-sm lg:text-2xl flex justify-start items-center gap-3"
          >
            <MdOutlineSwapCalls />
            <span className="capitalize font-inter font-[500] text-sm lg:text-2xl">exchanges</span>
          </Link>
        </li>
      </ul>
      <div className="w-full lg:w-[74%]">{vw === "assets" ? <AssetsInfoView /> : <AssetsInfoView />}</div>
    </div>
  );
}
