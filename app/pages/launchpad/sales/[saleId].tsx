import Video from "@/components/Video";
import { useSingleSale } from "@/hooks/app/launchpad";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import NoDataOrError from "@/ui/NoDataOrError";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { FaDiscord, FaGithub, FaLinkedinIn, FaMediumM, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { SiGitbook } from "react-icons/si";
import SaleItemInfoActionCard from "@/ui/Cards/SaleItemInfoActionCard";
import { Tab, Tabs } from "@/ui/Tabs";
import SingleSaleDescription from "@/screens/launchpad/SingleSaleDescription";

export default function SingleSale() {
  const { query } = useRouter();
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
    <div className="w-screen flex flex-col justify-start py-2 items-center h-full">
      {metadataIsLoading || singleSaleLoading ? (
        <div className="w-full relative h-screen backdrop-blur-xl">
          <span className="loading loading-infinity w-[5rem] absolute top-[50%] left-[50%] text-[#0029ff]"></span>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-full">
          {singleSaleError || metadataError ? (
            <NoDataOrError
              message={
                singleSaleError
                  ? (singleSaleError as any).errors
                    ? JSON.stringify((singleSaleError as any).errors.map((e: any) => e.message))
                    : singleSaleError.message
                  : metadataError
                  ? metadataError.message
                  : "An error occured"
              }
            />
          ) : (
            <Fragment>
              {metadata && singleSaleData && (
                <div className="flex flex-col justify-start items-center w-full gap-7">
                  <div
                    className="flex flex-col lg:flex-row justify-center items-center lg:items-start px-5 lg:px-12 w-full py-24 lg:gap-8 h-auto"
                    style={{
                      backgroundImage: `url(${metadata.bannerURI})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%",
                      objectFit: "cover"
                    }}
                  >
                    <div className="flex relative flex-col w-full lg:w-[55%] rounded-[7px_7px_0px_0px] justify-start items-center h-full -mb-44 lg:mb-[auto]">
                      <Video controls={false} width="100%" height="60%" className="rounded-[inherit] hidden-scrollbar">
                        <source src={metadata.media?.uri} />
                      </Video>
                      <div
                        className={`bg-[#000] rounded-b-[7px] w-full flex ${
                          metadata.links?.website ? "justify-between" : "justify-end"
                        } items-center px-7 py-7`}
                      >
                        {metadata.links?.website && (
                          <a
                            className="flex justify-center items-center gap-2"
                            href={metadata.links.website}
                            target="_blank"
                          >
                            <FiGlobe className="text-[#c1c9ff]" />
                            <span className="capitalize text-[#ffe603] text-[0.9375rem]">website</span>
                          </a>
                        )}
                        <div className="flex justify-center items-center gap-4 text-[#c1c9ff]">
                          {metadata.links?.twitter && (
                            <a href={metadata.links.twitter} target="_blank">
                              <FaTwitter />
                            </a>
                          )}
                          {metadata.links?.telegram && (
                            <a href={metadata.links.telegram} target="_blank">
                              <FaTelegramPlane />
                            </a>
                          )}
                          {metadata.links?.discord && (
                            <a href={metadata.links.discord} target="_blank">
                              <FaDiscord />
                            </a>
                          )}
                          {metadata.links?.github && (
                            <a href={metadata.links.github} target="_blank">
                              <FaGithub />
                            </a>
                          )}
                          {metadata.links?.gitbook && (
                            <a href={metadata.links.gitbook} target="_blank">
                              <SiGitbook />
                            </a>
                          )}
                          {metadata.links?.medium && (
                            <a href={metadata.links.medium} target="_blank">
                              <FaMediumM />
                            </a>
                          )}
                          {metadata.links?.linkedin && (
                            <a href={metadata.links.linkedin} target="_blank">
                              <FaLinkedinIn />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block w-[35%] h-full">
                      <SaleItemInfoActionCard saleData={singleSaleData} />
                    </div>
                  </div>
                  <div className="block w-full lg:hidden py-12 px-1 mt-4">
                    <SaleItemInfoActionCard saleData={singleSaleData} />
                  </div>
                  <div className="w-full items-start justify-center flex flex-col px-2 lg:px-14 py-2 lg:py-5 gap-3">
                    <Tabs activeTab={activeTab}>
                      <Tab onTabSelected={() => setActiveTab(0)} label="project info" />
                      <Tab onTabSelected={() => setActiveTab(1)} label="pool info" />
                      <Tab onTabSelected={() => setActiveTab(2)} label="how to join" />
                    </Tabs>
                    {activeTab === 0 && <SingleSaleDescription data={singleSaleData} />}
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
}
