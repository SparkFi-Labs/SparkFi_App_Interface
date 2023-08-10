import Video from "@/components/Video";
import { useSingleSale } from "@/hooks/app/launchpad";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import NoDataOrError from "@/ui/NoDataOrError";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useState } from "react";
import { FaDiscord, FaGithub, FaLinkedinIn, FaMediumM, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { FiCheck, FiGlobe, FiShare2 } from "react-icons/fi";
import { SiGitbook } from "react-icons/si";
import SaleItemInfoActionCard from "@/ui/Cards/SaleItemInfoActionCard";
import { Tab, Tabs } from "@/ui/Tabs";
import SingleSaleDescription from "@/screens/launchpad/SingleSaleDescription";
import SingleSalePoolInfo from "@/screens/launchpad/SingleSalePoolInfo";
import Head from "next/head";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { RWebShare } from "react-web-share";

const Checker = ({
  isChecked = false,
  label,
  hasConnector = false
}: {
  isChecked?: boolean;
  label: ReactNode;
  hasConnector?: boolean;
}) => {
  return (
    <div className="flex justify-start items-start gap-3 w-full">
      <div className="flex flex-col justify-start items-center gap-1">
        <div className="w-4 h-4 rounded-full flex justify-center items-center px-1 py-1 outline outline-2 outline-[#fff] border border-[#0029ff] bg-[#0029ff]">
          {isChecked && <FiCheck />}
        </div>
        {hasConnector && <div className="w-[0.9px] h-[12px] bg-[#0029ff]"></div>}
      </div>
      {label}
    </div>
  );
};

export default function SingleSale() {
  const { query, asPath } = useRouter();
  const {
    data: singleSaleData,
    isLoading: singleSaleLoading,
    error: singleSaleError
  } = useSingleSale(query.saleId as string);
  const {
    metadata,
    isLoading: metadataIsLoading,
    error: metadataError
  } = useIPFSGetMetadata(singleSaleData?.metadataURI as string);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-screen flex flex-col justify-start items-center gap-8 my-11 px-3 lg:px-14">
      {singleSaleLoading || metadataIsLoading ? (
        <div className="flex justify-center items-center w-full m-auto h-screen">
          <ThreeCircles color="#fff" width={90} />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-start">
            <div className="text-xs lg:text-lg breadcrumbs">
              <ul>
                <li>
                  <Link href="/" className="text-[#fff] capitalize">
                    home
                  </Link>
                </li>
                <li>
                  <Link href="/launchpad" className="text-[#fff] capitalize">
                    pools
                  </Link>
                </li>
                <li>
                  <Link href={asPath} className="text-[#fff] capitalize">
                    {metadata?.name}
                  </Link>
                </li>
              </ul>
            </div>
            <RWebShare
              data={{
                text: `Participate in ${metadata?.name}'s token sale on Sparkfi incubation pad`,
                url: typeof window !== "undefined" ? window.location.href : asPath,
                title: `${metadata?.name}`
              }}
            >
              <button className="btn btn-ghost btn-sm flex justify-center items-center gap-2 text-xs lg:text-lg">
                <span className="font-inter text-[#fff] capitalize">share</span>
                <FiShare2 />
              </button>
            </RWebShare>
          </div>
          <div className="flex justify-start items-center w-full">
            <Checker label={<span className="font-inter text-xs lg:text-sm capitalize font-[500]">preparation</span>} />
          </div>
          <div className=""></div>
        </>
      )}
    </div>
  );
}
