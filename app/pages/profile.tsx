import { useWeb3React } from "@web3-react/core";
import { FaWallet } from "react-icons/fa";
import { CTAPurple } from "@/components/Button";
import { useETHBalance, useERC20Balance } from "@/hooks/wallet";
import { sparkFiTokenContracts } from "@/assets/contracts";
import { useAllocatorInfo, useAccountAllocationInfo } from "@/hooks/app/staking";
import Card from "@/components/Card";
import { divide, isNil, map, multiply, trim } from "lodash";
import { FiAlertCircle, FiSearch, FiUser } from "react-icons/fi";
import { VictoryPie, VictoryTheme } from "victory";
import { useAccountTier, useAccountReward } from "@/hooks/app/web3/staking";
import {
  useMyAccountOverview,
  useMyContributions,
  useMyContributionsMatchingSearchParams,
  usePresaleFactoryOverview
} from "@/hooks/app/launchpad";
import { ThreeCircles } from "react-loader-spinner";
import ContributionListItem from "@/ui/ListItems/ContributionsListItem";
import Head from "next/head";
import { useState } from "react";

export default function Profile() {
  const { isActive, account } = useWeb3React();
  const tokenBalance = useERC20Balance(sparkFiTokenContracts);
  const etherBalance = useETHBalance();
  const { data: allocatorInfoData } = useAllocatorInfo();
  const { isLoading: accountAllocationInfoLoading, data: accountAllocationData } = useAccountAllocationInfo();
  const [searchValue, setSearchValue] = useState("");
  const myTier = useAccountTier();
  const myReward = useAccountReward();
  const { isLoading: accountOverviewLoading, data: accountOverviewData } = useMyAccountOverview();
  const { isLoading: presaleOverviewLoading, data: presaleOverviewData } = usePresaleFactoryOverview();
  const { isLoading: contributionsLoading, data: contributionsData } = useMyContributions();
  const { isLoading: contributionsFromSearchLoading, data: contributionsFromSearchData } =
    useMyContributionsMatchingSearchParams(searchValue);
  return (
    <>
      <Head>
        <title>Profile Overview</title>
      </Head>
      <div className="flex flex-col justify-start items-center w-screen bg-[#101221] min-h-screen">
        <div className=" w-full bg-[url('/images/profile_overview.png')] bg-no-repeat bg-cover bg-center flex justify-between items-start px-14 lg:min-h-[20rem]">
          <div className="flex justify-center items-end h-[6rem] lg:min-h-[inherit]">
            <span className="text-[#fff] capitalize font-[400] text-sm lg:text-lg">account overview</span>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center h-[12rem]">
            <div className="bg-[#151938] rounded-[0.3125rem] flex justify-start items-center px-2 py-2 gap-2 h-10">
              <div className="bg-[#14172e] rounded-[0.3125rem] px-1 py-1 h-full">
                <FaWallet className="text-[1.2em]" />
              </div>
              <span className="text-[#c1c9ff] font-[500] text-lg font-inter">
                {isActive ? account : "Not Connected"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-4 py-2 lg:hidden">
          <div className="bg-[#151938] rounded-[0.3125rem] flex justify-start items-center px-2 py-2 gap-2 h-10">
            <div className="bg-[#14172e] rounded-[0.3125rem] px-1 py-1 h-full">
              <FaWallet className="text-[1.2em]" />
            </div>
            <span className="text-[#c1c9ff] font-[500] text-xs font-inter">{isActive ? account : "Not Connected"}</span>
          </div>
        </div>

        <section className="bg-[#0c0e1e] w-full flex flex-col justify-start items-center py-5">
          <div className="flex w-full flex-col lg:flex-row justify-start lg:justify-evenly items-center lg:items-start lg:gap-10 gap-8 px-4 lg:px-2 py-5 container mx-auto">
            <div className="w-full lg:w-[40%] rounded-[8px] lg:h-[490px] lg:min-h-[490px]">
              <Card width="100%" height="100%" style={{ minHeight: "inherit" }}>
                <div className="card-body w-full justify-center items-center">
                  <div className="w-full flex flex-col justify-start items-center relative">
                    <svg viewBox="0 10 400 220" width="100%" height={250}>
                      <VictoryPie
                        theme={VictoryTheme.material}
                        standalone={false}
                        width={400}
                        padAngle={2}
                        startAngle={99}
                        endAngle={-99}
                        labels={() => null}
                        data={[
                          {
                            x: "",
                            y:
                              parseFloat(allocatorInfoData?.totalTokensStaked || "0") -
                              parseFloat(accountAllocationData?.amountStaked || "0")
                          },
                          { x: "", y: parseFloat(accountAllocationData?.amountStaked || "0") }
                        ]}
                        colorScale={["#ff004d", "#0ccbf4"]}
                        innerRadius={136}
                        padding={50}
                      />
                    </svg>
                    <div className="absolute flex flex-col justify-center items-center gap-1 top-[50%]">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl ring ring-success">
                          <img src="/images/sparkfi.svg" alt="project" />
                        </div>
                      </div>
                      <span className="font-inter text-xs lg:text-sm text-[#fff] font-[500] capitalize">
                        your rewards
                      </span>
                      <span className="text-lg lg:text-xl text-[#0029ff] font-[400]">
                        {(
                          multiply(parseFloat(accountAllocationData?.amountStaked || "0"), myReward) -
                          parseFloat(accountAllocationData?.amountStaked || "0")
                        ).toLocaleString("en-US", {
                          useGrouping: true,
                          minimumSignificantDigits: 3,
                          maximumSignificantDigits: 3
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#141a45] w-full rounded-[8px] justify-center items-start min-h-[176px] card-actions px-3 py-3">
                    <div className="w-full flex flex-col gap-4 justify-start items-center">
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center gap-2">
                          <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#4cc9ff]"></span>
                          <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                            stake allocation
                          </span>
                        </div>

                        <div className="flex justify-center items-center gap-2">
                          <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#ff004d]"></span>
                          <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                            remaining
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col justify-start items-start gap-2">
                          <span className="text-[#4cc9ff] font-[700] font-inter uppercase text-xs lg:text-sm">
                            {!accountAllocationInfoLoading &&
                              parseFloat(accountAllocationData?.amountStaked || "0").toLocaleString("en-US", {
                                useGrouping: true
                              })}{" "}
                            $SPAK
                          </span>
                          <span className="text-[#878aa1] font-[700] font-inter uppercase text-[10px] lg:text-[12px]">
                            $
                            {(6000).toLocaleString("en-US", {
                              useGrouping: true
                            })}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col justify-start items-end gap-2">
                          <span className="text-[#ff004d] font-[700] font-inter uppercase text-xs lg:text-sm">
                            {(
                              parseFloat(allocatorInfoData?.totalTokensStaked || "0") -
                              parseFloat(accountAllocationData?.amountStaked || "0")
                            ).toLocaleString("en-US", {
                              useGrouping: true
                            })}{" "}
                            $SPAK
                          </span>
                          <span className="text-[#878aa1] font-[700] font-inter uppercase text-[10px] lg:text-[12px]">
                            ${(6000).toLocaleString("en-US", { useGrouping: true })}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end w-full">
                        <div className="flex justify-start items-start gap-2 min-h-12">
                          <div className="avatar placeholder">
                            <div className="w-12 h-12 rounded-xl bg-[#0b5cfa] text-xl">
                              <FiUser />
                            </div>
                          </div>
                          <div className="flex justify-start items-start gap-2 h-full flex-col">
                            <span className="text-[#878aa1] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                              your tier
                            </span>
                            <span className="bg-[linear-gradient(90deg,_#00FFF0_0%,_#0029FF_100%)] font-[500] font-inter capitalize text-[10px] lg:text-[12px] bg-clip-text text-[transparent]">
                              {myTier}
                            </span>
                          </div>
                        </div>
                        <a href="#" className="font-inter underline capitalize text-[#878aa1]">
                          learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-full lg:w-[60%] flex flex-col lg:self-stretch justify-between items-start gap-3 lg:gap-28">
              <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-4">
                <div className="w-full lg:w-1/2 rounded-md lg:min-h-[170px]">
                  <Card width="100%" style={{ minHeight: "inherit" }}>
                    <div className="card-body justify-start items-center w-full">
                      <div className="flex justify-between gap-2 items-center w-full">
                        <span className="text-xs lg:text-sm text-[#c1c9ff] capitalize font-inter">
                          initial offerings participated
                        </span>
                        <FiAlertCircle className="text-[#c1c9ff]" size={15} />
                      </div>
                    </div>
                    <div className="card-actions justify-between items-center border-t border-[#878aa1] w-full px-4 py-6">
                      {accountOverviewLoading ||
                      presaleOverviewLoading ||
                      isNil(accountOverviewData) ||
                      isNil(presaleOverviewData) ? (
                        <ThreeCircles color="#fff" width={20} height={20} />
                      ) : (
                        <>
                          <span className="text-sm lg:text-lg text-[#fff]">
                            {(
                              divide(accountOverviewData.contributionsCount, presaleOverviewData.salesCount) * 100
                            ).toFixed(2)}
                            %
                          </span>
                          <span className="text-sm lg:text-lg text-[#fff]">
                            {accountOverviewData.contributionsCount}/{presaleOverviewData.salesCount}
                          </span>
                        </>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="w-full lg:w-1/3 rounded-md lg:min-h-[170px]">
                  <Card width="100%" style={{ minHeight: "inherit" }}>
                    <div className="card-body justify-start items-center w-full">
                      <div className="flex justify-between gap-2 items-center w-full">
                        <span className="text-xs lg:text-sm text-[#c1c9ff] capitalize font-inter">
                          sparkFi token balance
                        </span>
                        <FiAlertCircle className="text-[#c1c9ff]" size={15} />
                      </div>
                    </div>
                    <div className="card-actions justify-start items-center border-t border-[#878aa1] w-full px-4 py-6">
                      <span className="text-sm lg:text-lg text-[#fff]">
                        {parseFloat(tokenBalance.toFixed(3)).toLocaleString("en-US", { useGrouping: true })}
                      </span>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="w-full rounded-md self-end">
                <Card width="100%">
                  <div className="card-body">
                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center w-full px-2 py-3 gap-3">
                      <div className="flex flex-col justify-start items-start w-full lg:w-1/3 gap-12">
                        <span className="text-[#c1c9ff] capitalize font-inter font-[400] text-xs lg:text-sm">
                          eTH balance
                        </span>
                        <span className="text-[#fff] text-sm lg:text-lg font-[400] uppercase">
                          {parseFloat(etherBalance.toFixed(5)).toLocaleString("en-US", { useGrouping: true })}
                        </span>
                      </div>
                      <div className="w-full lg:w-1/3">
                        <CTAPurple
                          onPress={() =>
                            window.open(
                              "https://www.dackieswap.xyz/swap?chain=base&outputCurrency=ETH&inputCurrency=0x4200000000000000000000000000000000000006",
                              "_blank"
                            )
                          }
                          label={<span className="text-sm lg:text-lg uppercase font-[400] font-inter">buy eth!</span>}
                          width="100%"
                          height={60}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center py-5">
          <div className="container mx-auto flex flex-col justify-start items-center lg:gap-10 gap-8 px-4 lg:px-2 py-5 w-full">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center w-full gap-3">
              <span className="text-sm lg:text-lg font-[400] text-[#fff] capitalize">claim your IDO tokens</span>
              <div className="w-full lg:w-[30%] rounded-[8px] bg-[#151938] flex justify-start items-center px-3 py-3 gap-1">
                <FiSearch size={20} color="#878aa1" />
                <input
                  type="text"
                  className="self-stretch outline-none px-1 py-1 text-[#878aa1] font-inter text-xs lg:text-sm w-full bg-transparent"
                  placeholder="Search By Token Name"
                  onChange={ev => setSearchValue(ev.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full flex-col justify-start items-center gap-3">
              {contributionsLoading || contributionsFromSearchLoading ? (
                <ThreeCircles width={20} height={20} color="#fff" />
              ) : (
                <>
                  {map(
                    trim(searchValue).length > 0 ? contributionsFromSearchData : contributionsData,
                    (contribution, index) => (
                      <ContributionListItem key={index} data={contribution} />
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
