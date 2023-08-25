import { useSingleSale } from "@/hooks/app/launchpad";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { useRouter } from "next/router";
import { MouseEventHandler, type ReactNode, useRef, useState } from "react";
import { FaDiscord, FaGithub, FaTelegramPlane, FaTwitter, FaBitcoin } from "react-icons/fa";
import { FiCheck, FiDollarSign, FiGlobe, FiShare2 } from "react-icons/fi";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import { RWebShare } from "react-web-share";
import Image from "next/image";
import { BsMedium } from "react-icons/bs";
import Card from "@/components/Card";
import { Tab, Tabs } from "@/ui/Tabs";
import SingleSalePoolInfo from "@/screens/launchpad/SingleSalePoolInfo";
import type { TokenSale } from "@/.graphclient";
import { floor, isEqual, isNil, multiply, toLower } from "lodash";
import { useAtomicDate } from "@/hooks/app/shared";
import { CTAPurpleOutline } from "@/components/Button";
import Countdown from "react-countdown";
import WhitelistInfoView from "@/screens/launchpad/WhitelistInfoView";
import ParticipationView from "@/screens/launchpad/ParticipationView";
import { useAccountIsPresaleFunder } from "@/hooks/app/web3/launchpad";
import { useContractOwner } from "@/hooks/contracts";
import presaleAbi from "@/assets/abis/Presale.json";
import { useWeb3React } from "@web3-react/core";
import FundTokenSaleModal from "@/ui/Modals/FundTokenSaleModal";
import SingleSaleDescription from "@/screens/launchpad/SingleSaleDescription";
import SingleSaleTeamInfo from "@/screens/launchpad/SingleSaleTeamInfo";
import SingleSaleTokenomicsInfo from "@/screens/launchpad/SingleSaleTokenomics";
import Head from "next/head";
import SingleSaleRoadmap from "@/screens/launchpad/SingleSaleRoadmap";

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
    <div className="flex justify-start items-start gap-3 w-full py-1">
      <div className="flex flex-col justify-start items-center gap-1 min-h-[30px]">
        <div className="w-5 h-5 rounded-full flex justify-center items-center px-1 py-1 outline outline-2 outline-[#fff] border border-[#0029ff] bg-[#0029ff]">
          {isChecked && <FiCheck size={10} />}
        </div>
        {hasConnector && <div className="w-[0.9px] min-h-[inherit] bg-[#0029ff]"></div>}
      </div>
      {label}
    </div>
  );
};

const SmallLinkCard = ({ children }: any) => (
  <div className="bg-[#151938] rounded-[2.808px] lg:rounded-[8px] w-6 h-5 lg:w-10 lg:h-9 flex justify-center items-center px-1 py-1 text-[#0029ff] text-[8px] lg:text-[20px]">
    {children}
  </div>
);

const SegmentLink = ({
  label,
  isActive,
  onPress
}: {
  label: ReactNode;
  isActive?: boolean;
  onPress?: MouseEventHandler<HTMLAnchorElement>;
}) => (
  <a
    className={`font-[400] text-sm lg:text-xl ${isActive ? "text-[#fff]" : "text-[#878aa1]"} cursor-pointer`}
    onClick={onPress}
  >
    {label}
  </a>
);

export default function SingleSale() {
  const { query, asPath } = useRouter();
  const { data: singleSaleData, isLoading: singleSaleLoading } = useSingleSale(query.saleId as string);
  const { metadata, isLoading: metadataIsLoading } = useIPFSGetMetadata(singleSaleData?.metadataURI as string);

  const [activeTab, setActiveTab] = useState(0);
  const atomicDate = useAtomicDate();
  const isFunder = useAccountIsPresaleFunder(query.saleId as string);
  const presaleOwner = useContractOwner(query.saleId as string, presaleAbi);
  const { account } = useWeb3React();

  const fundSaleModalRef = useRef<HTMLInputElement>(null);

  const [activeSegment, setActiveSegment] = useState(1);

  return (
    <div className="w-screen flex flex-col justify-start items-center gap-5 lg:gap-8 my-11 px-3 lg:px-14">
      {singleSaleLoading || metadataIsLoading || isNil(singleSaleData) || isNil(metadata) ? (
        <div className="flex justify-center items-center w-full m-auto h-screen">
          <ThreeCircles color="#fff" width={90} />
        </div>
      ) : (
        <>
          <Head>
            <title>{metadata.name} on SparkFi</title>
          </Head>
          <div className="w-full flex justify-between items-center overflow-auto hidden-scrollbar gap-2">
            <div className="text-xs lg:text-lg breadcrumbs hidden-scrollbar">
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
            <div className="flex justify-start items-start gap-1 lg:gap-2">
              <RWebShare
                data={{
                  text: `Participate in ${metadata?.name}'s token sale on Sparkfi incubation pad`,
                  url: typeof window !== "undefined" ? window.location.href : asPath,
                  title: `${metadata?.name}`
                }}
              >
                <button className="btn btn-ghost btn-xs lg:btn-sm flex justify-center items-center gap-1 lg:gap-2 text-xs lg:text-lg">
                  <span className="font-inter text-[#fff] capitalize">share</span>
                  <FiShare2 size={18} />
                </button>
              </RWebShare>
              {isFunder && (
                <button
                  onClick={() => {
                    if (!isNil(fundSaleModalRef.current)) fundSaleModalRef.current.checked = true;
                  }}
                  className="btn btn-ghost btn-xs lg:btn-sm flex justify-center items-center gap-1 lg:gap-2 text-xs lg:text-lg"
                >
                  <span className="font-inter text-[#fff] capitalize">fund</span>
                  <FiDollarSign size={18} />
                </button>
              )}
              {!isNil(account) && isEqual(toLower(account), toLower(presaleOwner)) && (
                <button className="btn btn-ghost btn-xs lg:btn-sm flex justify-center items-center gap-1 lg:gap-2 text-xs lg:text-lg">
                  <span className="font-inter text-[#fff] capitalize">cash</span>
                  <FaBitcoin size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-start items-center w-full">
            <Checker
              label={
                <span className="font-inter text-xs lg:text-sm capitalize font-[500]">
                  {!isNil(singleSaleData) && (
                    <>
                      {(!isNil(singleSaleData.whitelistStartTime)
                        ? atomicDate.getTime() / 1000 < parseInt(singleSaleData.whitelistStartTime)
                        : atomicDate.getTime() / 1000 < parseInt(singleSaleData.startTime)) && "preparation"}
                      {!isNil(singleSaleData.whitelistStartTime) &&
                        !isNil(singleSaleData.whitelistEndTime) &&
                        atomicDate.getTime() / 1000 >= parseInt(singleSaleData.whitelistStartTime) &&
                        atomicDate.getTime() / 1000 < parseInt(singleSaleData.whitelistEndTime) &&
                        atomicDate.getTime() / 1000 < parseInt(singleSaleData.startTime) &&
                        "whitelist"}
                      {atomicDate.getTime() / 1000 >= parseInt(singleSaleData.startTime) &&
                        atomicDate.getTime() / 1000 < parseInt(singleSaleData.endTime) &&
                        "live"}
                      {atomicDate.getTime() / 1000 >= parseInt(singleSaleData.endTime) && "ended"}
                    </>
                  )}
                </span>
              }
            />
          </div>
          <div className="flex justify-between items-start h-20 lg:h-24 w-full">
            <div className="flex justify-start items-start gap-7 h-full">
              <div className="avatar h-full">
                <div className="lg:w-24 w-20 h-full rounded-xl ring ring-success">
                  <img src={metadata?.projectLogoURI} alt={metadata?.name} />
                </div>
              </div>
              <div className="flex flex-col justify-end lg:justify-start items-start h-full gap-3">
                <span className="text-xs lg:text-lg font-inter text-[#fff] font-[600]">{metadata?.name}</span>
                <label className="flex justify-center items-center gap-1 border rounded-[8px] border-[#0029ff] px-1 py-[0.5px] bg-[#1e2353]">
                  <Image
                    src="/images/base.svg"
                    width={10}
                    height={10}
                    className="rounded-full border-2 border-[#0029ff]"
                    alt="base"
                  />
                  <span className="font-inter capitalize lg:text-[15px] text-[12px]">base</span>
                </label>
              </div>
            </div>
            <div className="h-full flex flex-col justify-end items-end">
              <div className="flex justify-center items-center gap-1 lg:gap-3">
                {metadata?.links.website && (
                  <a href={metadata.links.website} target="_blank">
                    <SmallLinkCard>
                      <FiGlobe />
                    </SmallLinkCard>
                  </a>
                )}
                {metadata?.links.telegram && (
                  <a href={metadata.links.telegram} target="_blank">
                    <SmallLinkCard>
                      <FaTelegramPlane />
                    </SmallLinkCard>
                  </a>
                )}
                {metadata?.links.twitter && (
                  <a href={metadata.links.twitter} target="_blank">
                    <SmallLinkCard>
                      <FaTwitter />
                    </SmallLinkCard>
                  </a>
                )}
                {metadata?.links.discord && (
                  <a href={metadata.links.discord} target="_blank">
                    <SmallLinkCard>
                      <FaDiscord />
                    </SmallLinkCard>
                  </a>
                )}
                {metadata?.links.github && (
                  <a href={metadata.links.github} target="_blank">
                    <SmallLinkCard>
                      <FaGithub />
                    </SmallLinkCard>
                  </a>
                )}
                {metadata?.links.medium && (
                  <a href={metadata.links.medium} target="_blank">
                    <SmallLinkCard>
                      <BsMedium />
                    </SmallLinkCard>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="w-full bg-[#151938] min-h-[152px] flex justify-between lg:justify-evenly items-center flex-wrap rounded-[8px] px-3 lg:px-6 py-2">
            <div className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-3 py-1">
              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.3em]">price</span>
              <span className="font-inter uppercase text-[0.92em] lg:text-[1.2em] text-[#d9d9d9]">
                {singleSaleData?.salePrice} {singleSaleData?.paymentToken.symbol}
              </span>
            </div>
            <div className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-3 py-1">
              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.3em]">min. allocation</span>
              <span className="font-inter uppercase text-[0.92em] lg:text-[1.2em] text-[#d9d9d9]">
                {singleSaleData?.minTotalPayment} {singleSaleData?.paymentToken.symbol}
              </span>
            </div>
            <div className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-3 py-1">
              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.3em]">max. allocation</span>
              <span className="font-inter uppercase text-[0.92em] lg:text-[1.2em] text-[#d9d9d9]">
                {singleSaleData?.maxTotalPayment} {singleSaleData?.paymentToken.symbol}
              </span>
            </div>
            <div className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-3 py-1">
              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.3em]">tokens for sale</span>
              <span className="font-inter uppercase text-[0.92em] lg:text-[1.2em] text-[#d9d9d9]">
                {parseFloat(singleSaleData?.totalAvailableSaleTokens).toLocaleString("en-US", { useGrouping: true })}{" "}
                {singleSaleData?.saleToken.symbol}
              </span>
            </div>
            <div className="flex flex-col w-1/2 lg:w-1/5 justify-start items-start gap-3 py-1">
              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.3em]">hardcap</span>
              <span className="font-inter uppercase text-[0.92em] lg:text-[1.2em] text-[#d9d9d9]">
                {(
                  parseFloat(singleSaleData?.totalAvailableSaleTokens) * parseFloat(singleSaleData?.salePrice)
                ).toLocaleString("en-US", { useGrouping: true })}{" "}
                {singleSaleData?.paymentToken.symbol}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-6 justify-start items-center lg:items-start">
            <div className="w-full lg:w-1/3 rounded-[8px] lg:min-h-[407px]">
              <Card width="100%" style={{ minHeight: "inherit" }}>
                <div className="card-body">
                  <div className="flex flex-col gap-6 justify-start items-start px-3 py-5">
                    <span className="font-inter text-[15px] lg:text-[18px] font-[500] capitalize">IDO process:</span>
                    <div className="flex flex-col gap-2">
                      <Checker
                        isChecked={
                          (!isNil(singleSaleData?.whitelistStartTime) &&
                            atomicDate.getTime() / 1000 <= parseInt(singleSaleData?.whitelistStartTime)) ||
                          atomicDate.getTime() / 1000 >= parseInt(singleSaleData?.startTime) ||
                          atomicDate.getTime() / 1000 <= parseInt(singleSaleData?.endTime)
                        }
                        hasConnector
                        label={
                          <div className="flex flex-col justify-start items-start gap-2">
                            <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                              preparation
                            </span>
                            <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[500] text-[#d9d9d9]">
                              Project is preparing for whitelist.
                            </p>
                          </div>
                        }
                      />
                      <Checker
                        isChecked={
                          !isNil(singleSaleData?.whitelistStartTime) &&
                          atomicDate.getTime() / 1000 >= parseInt(singleSaleData?.whitelistStartTime)
                        }
                        hasConnector
                        label={
                          <div className="flex flex-col justify-start items-start gap-2">
                            <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                              whitelist
                            </span>
                            <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[500] text-[#d9d9d9]">
                              You can whitelist for this project.
                            </p>
                          </div>
                        }
                      />
                      <Checker
                        isChecked={atomicDate.getTime() / 1000 >= parseInt(singleSaleData?.startTime)}
                        hasConnector
                        label={
                          <div className="flex flex-col justify-start items-start gap-2">
                            <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                              sale
                            </span>
                            <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[500] text-[#d9d9d9]">
                              You can fill your allocation.
                            </p>
                          </div>
                        }
                      />
                      <Checker
                        isChecked={
                          atomicDate.getTime() / 1000 >=
                          parseInt(singleSaleData?.endTime) + (singleSaleData?.withdrawDelay || 0)
                        }
                        label={
                          <div className="flex flex-col justify-start items-start gap-2">
                            <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                              distribution
                            </span>
                            <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[500] text-[#d9d9d9]">
                              You can claim your tokens.
                            </p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <div className="card-actions w-full">
                    <CTAPurpleOutline
                      label={
                        parseInt(singleSaleData?.startTime) > floor(atomicDate.getTime() / 1000) ? (
                          <Countdown
                            date={multiply(parseInt(singleSaleData?.startTime), 1000)}
                            renderer={({ days, hours, minutes, seconds }) => (
                              <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                                Sale will start in {days}D:{hours}H:{minutes}M:{seconds}S
                              </span>
                            )}
                          />
                        ) : (
                          <Countdown
                            date={multiply(parseInt(singleSaleData?.endTime), 1000)}
                            renderer={({ days, hours, minutes, seconds, completed }) => (
                              <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                                {!completed
                                  ? `Sale closes in ${days}D:${hours}H:${minutes}M:${seconds}S`
                                  : `Sale closed on ${new Date(
                                      multiply(parseInt(singleSaleData?.endTime), 1000)
                                    ).toDateString()}`}
                              </span>
                            )}
                          />
                        )
                      }
                      width="100%"
                      height={55}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="container mx-auto w-full flex flex-col justify-start items-start gap-4">
              <Tabs activeTab={activeTab}>
                <Tab onTabSelected={() => setActiveTab(0)} label="project info" />
                <Tab onTabSelected={() => setActiveTab(1)} label="whitelist" />
                <Tab onTabSelected={() => setActiveTab(2)} label="participate" />
              </Tabs>
              <div className="w-full rounded-[8px] min-h-[250px] lg:min-h-[364px]">
                {(activeTab === 0 || activeTab === 1) && (
                  <Card width="100%" style={{ minHeight: "inherit" }}>
                    <div className="card-body w-full justify-center items-center">
                      {isEqual(activeTab, 0) && !isNil(singleSaleData) && (
                        <SingleSalePoolInfo data={singleSaleData as TokenSale} />
                      )}
                      {isEqual(activeTab, 1) && !isNil(singleSaleData) && (
                        <WhitelistInfoView data={singleSaleData as TokenSale} />
                      )}
                    </div>
                  </Card>
                )}
                {activeTab === 2 && <ParticipationView sale={singleSaleData as TokenSale} />}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-3">
            <div className="w-full lg:w-1/3 py-2 px-2 flex flex-col justify-start items-start gap-3">
              <SegmentLink
                isActive={activeSegment === 1}
                label={<span className="capitalize">what&apos;s {metadata.name}?</span>}
                onPress={() => setActiveSegment(1)}
              />
              <SegmentLink
                isActive={activeSegment === 2}
                label={<span className="capitalize">team</span>}
                onPress={() => setActiveSegment(2)}
              />
              <SegmentLink
                isActive={activeSegment === 3}
                label={<span className="capitalize">tokenomics</span>}
                onPress={() => setActiveSegment(3)}
              />
              <SegmentLink
                isActive={activeSegment === 4}
                label={<span className="capitalize">vesting</span>}
                onPress={() => setActiveSegment(4)}
              />
              <SegmentLink
                isActive={activeSegment === 5}
                label={<span className="capitalize">roadmap</span>}
                onPress={() => setActiveSegment(5)}
              />
            </div>
            <div className="container mx-auto px-2 rounded-[8px]">
              <Card width="100%">
                <div className="card-body w-full justify-start items-start">
                  {activeSegment === 1 && <SingleSaleDescription data={singleSaleData as TokenSale} />}
                  {activeSegment === 2 && <SingleSaleTeamInfo data={singleSaleData as TokenSale} />}
                  {activeSegment === 3 && <SingleSaleTokenomicsInfo data={singleSaleData as TokenSale} />}
                  {activeSegment == 5 && <SingleSaleRoadmap data={singleSaleData as TokenSale} />}
                </div>
              </Card>
            </div>
          </div>
          <FundTokenSaleModal
            sale={singleSaleData as TokenSale}
            ref={fundSaleModalRef}
            close={() => {
              if (!isNil(fundSaleModalRef.current)) fundSaleModalRef.current.checked = false;
            }}
          />
        </>
      )}
    </div>
  );
}
