import type { Tier } from "@/.graphclient";
import { sparkFiTokenContracts } from "@/assets/contracts";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { InputField } from "@/components/Input";
import { useAtomicDate } from "@/hooks/app/shared";
import { useAccountAllocationInfo, useAllTiers, useAllocatorInfo } from "@/hooks/app/staking";
import { useAccountReward, useAccountTier, useAllocatorStaking, useAllocatorUnstaking } from "@/hooks/app/web3/staking";
import { useERC20Balance } from "@/hooks/wallet";
import { add, floor, isNil, map, multiply, sortBy, subtract, toLower } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, MouseEventHandler, useState, type ReactNode, HTMLAttributes, useCallback } from "react";
import Countdown from "react-countdown";
import { BsMedium } from "react-icons/bs";
import { FaTelegramPlane, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { FiCheck, FiChevronDown, FiChevronUp, FiUser } from "react-icons/fi";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { VictoryPie, VictoryTheme } from "victory";

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

const TabButton = ({
  isActive,
  onPress,
  label,
  ...props
}: {
  isActive?: boolean;
  onPress?: MouseEventHandler<HTMLButtonElement>;
  label: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`btn btn-sm lg:btn-md flex justify-center items-center text-sm lg:text-lg capitalize ${
      isActive ? "bg-[#0029ff] text-[#d9d9d9]" : "text-[#fff] bg-[#14172e]"
    }`}
    onClick={onPress}
    {...props}
  >
    {label}
  </button>
);

const TierCard = ({ data, index, ...props }: { data: Tier; index: number } & HTMLAttributes<HTMLDivElement>) => (
  <div className="card card-compact bg-[#0029ff] rounded-[8px] py-5" {...props}>
    <div className="card-body justify-start items-start overflow-clip">
      <span className="text-[#d9d9d9] text-xs lg:text-sm font-inter font-[500] capitalize tier">tier {index}</span>
      <span className="text-[#fff] text-sm lg:text-lg font-inter font-[500]">
        {parseInt(data.num).toLocaleString("en-US", { useGrouping: true })}+ SPAK
      </span>
      <div className="w-full flex justify-end items-center">
        <div
          className={`w-48 h-48 lg:w-60 lg:h-60 rounded-full ${
            toLower(data.name) === "luna"
              ? "bg-[linear-gradient(156deg,_#00FFF0_0%,_#00A3FF_100%)]"
              : toLower(data.name) === "selene"
              ? "bg-[linear-gradient(156deg,_#0075FF_0%,_#00FF38_100%)]"
              : toLower(data.name) === "artemis"
              ? "bg-[linear-gradient(156deg,_#FF8A00_0%,_#FF004D_100%)]"
              : "bg-[linear-gradient(156deg,_#F00_0%,_#00A3FF_100%)]"
          } relative -right-24 lg:-right-[40%]`}
        ></div>
      </div>
      <div className="flex flex-col w-full h-11 gap-2 justify-start items-start">
        <span className="text-sm lg:text-lg text-[#151938] font-inter font-[500] capitalize">{data.name}</span>
        <span className="text-xs lg:text-sm text-[#151938] font-inter font-[500] capitalize">
          {toLower(data.name) === "luna"
            ? "1 lottery ticket"
            : toLower(data.name) === "selene"
            ? "100 lottery tickets"
            : "guaranteed allocation"}
        </span>
      </div>
    </div>
  </div>
);

export default function Staking() {
  const { reload } = useRouter();

  const [tab, setTab] = useState(1);
  const { isLoading: allTiersLoading, data: allTiersData } = useAllTiers();
  const { isLoading: allocatorInfoLoading, data: allocatorInfoData } = useAllocatorInfo();
  const { isLoading: accountAllocationInfoLoading, data: accountAllocationData } = useAccountAllocationInfo();

  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);

  const { isLoading: stakingLoading, stake } = useAllocatorStaking(amount, duration);
  const { isLoading: unstakingLoading, unstake } = useAllocatorUnstaking();
  const myTier = useAccountTier();
  const myReward = useAccountReward();
  const tokenBalance = useERC20Balance(sparkFiTokenContracts);

  const atomicDate = useAtomicDate();

  const { push } = useRouter();

  const initStake = useCallback(async () => {
    try {
      toast("Preparing to stake", { type: "info" });

      await stake();

      toast("Successfully staked $SPAK", { type: "success" });

      reload();
    } catch (error: any) {
      toast(error.reason || error.message, {
        type: "error"
      });
    }
  }, [reload, stake]);

  const initUnstake = useCallback(async () => {
    try {
      toast("Preparing to unstake", { type: "info" });

      await unstake();

      toast("Successfully unstaked $SPAK", { type: "success" });

      reload();
    } catch (error: any) {
      toast(error.reason || error.message, {
        type: "error"
      });
    }
  }, [reload, unstake]);
  return (
    <>
      <Head>
        <title>Staking | Allocation</title>
      </Head>
      <div className="flex flex-col w-screen gap-20 lg:gap-28 justify-start items-start relative">
        <div className="absolute -left-64 lg:-left-44 -top-10">
          <img
            src="/images/vr_wearer_1.png"
            className="lg:w-[906px] lg:h-[789px] w-[421px] h-[367px]"
            alt="vr_wearer"
          />
        </div>

        <div className="absolute -right-64 lg:-right-44 -top-24">
          <img
            src="/images/vr_wearer_2.png"
            className="lg:w-[906px] lg:h-[789px] w-[421px] h-[367px]"
            alt="vr_wearer"
          />
        </div>
        <section className="py-12 px-3 w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6 relative lg:py-[6rem]">
            {/* <div className="absolute lg:-top-[8rem] rounded-[1000px]">
            <Image src="/images/ellipse_top.svg" width={1400} height={1000} alt="ellipse" />
            </div> */}

            <span className="text-[#fff] text-2xl lg:text-4xl capitalize font-[400] text-center">
              stake your $SPAK tokens to be eligible for upcoming IDOs
            </span>
            <span className="text-[#aaa] lg:text-lg text-sm font-[500] leading-5 text-center font-inter">
              Together, we can unlock limitless potential and create lasting value for all stakeholders involved.
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Launchpad" width="50%" height={50} onPress={() => push("/launchpad")} />
              <CTAPurpleOutline
                label="Read Docs"
                width="50%"
                height={50}
                onPress={() => window.open("https://docs.sparkfi.xyz", "_blank")}
              />
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-20 lg:gap-10 px-4 py-5 container mx-auto">
          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px] rotate-[13.195deg]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] capitalize">number of stakers</span>
                {allocatorInfoLoading ? (
                  <div className="flex justify-center items-center py-1">
                    <ThreeCircles color="#fff" width={10} height={10} />
                  </div>
                ) : (
                  <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">
                    {allocatorInfoData?.totalStakers.toLocaleString("en-US", { useGrouping: true })}
                  </span>
                )}
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] capitalize">total $SPAK staked</span>
                {allocatorInfoLoading ? (
                  <div className="flex justify-center items-center py-1">
                    <ThreeCircles color="#fff" width={10} height={10} />
                  </div>
                ) : (
                  <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">
                    {parseFloat(allocatorInfoData?.totalTokensStaked).toLocaleString("en-US", { useGrouping: true })}
                  </span>
                )}
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px] -rotate-[20.557deg]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] uppercase">apr</span>
                <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">
                  {allocatorInfoData?.apr}%
                </span>
              </div>
            </Card>
          </div>
        </section>

        <section className="flex w-full flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start lg:gap-20 gap-10 px-4 py-5 container mx-auto">
          <div className="w-full lg:w-1/3 rounded-[8px] lg:h-[490px] lg:min-h-[490px]">
            <Card width="100%" height="100%" style={{ minHeight: "inherit" }}>
              <div className="card-body h-full">
                <div className="flex flex-col gap-12 justify-start items-start px-3 py-5">
                  <span className="font-inter text-[15px] lg:text-[18px] font-[500] capitalize">staking process:</span>
                  <div className="flex flex-col gap-2">
                    <Checker
                      isChecked
                      hasConnector
                      label={
                        <div className="flex flex-col justify-start items-start gap-2">
                          <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                            prerequisites
                          </span>
                          <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[400] text-[#d9d9d9]">
                            Connect your wallet to begin staking your $SPAK tokens!
                          </p>
                        </div>
                      }
                    />
                    <Checker
                      isChecked
                      hasConnector
                      label={
                        <div className="flex flex-col justify-start items-start gap-2">
                          <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                            amount to stake
                          </span>
                          <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[400] text-[#d9d9d9]">
                            Enter $SPAK token amount you want to stake.
                          </p>
                        </div>
                      }
                    />
                    <Checker
                      isChecked
                      hasConnector
                      label={
                        <div className="flex flex-col justify-start items-start gap-2">
                          <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                            confirm transaction
                          </span>
                          <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[400] text-[#d9d9d9]">
                            Confirm transaction in your wallet.
                          </p>
                        </div>
                      }
                    />
                    <Checker
                      isChecked
                      label={
                        <div className="flex flex-col justify-start items-start gap-2">
                          <span className="font-inter text-[0.8rem] lg:text-[0.9rem] font-[500] capitalize">
                            complete transaction
                          </span>
                          <p className="font-inter text-[0.79rem] lg:text-[0.88rem] font-[400] text-[#d9d9d9]">
                            You now staked your tokens!
                          </p>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="card-actions w-full">
                  <CTAPurpleOutline
                    label={
                      <>
                        {!isNil(accountAllocationData) ? (
                          <Countdown
                            date={multiply(
                              parseInt(accountAllocationData.firstStakeTimestamp) +
                                parseInt(accountAllocationData.firstStakeLockPeriod),
                              1000
                            )}
                            renderer={({ days, hours, minutes, seconds }) => (
                              <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                                Tokens unlocked in {days}D:{hours}H:{minutes}M:{seconds}S
                              </span>
                            )}
                          />
                        ) : (
                          <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                            You have no allocation
                          </span>
                        )}
                      </>
                    }
                    width="100%"
                    height={55}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 rounded-[8px] lg:h-[490px] lg:min-h-[490px]">
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

          <div className="w-full lg:w-1/3 rounded-[8px] lg:h-[490px] lg:min-h-[490px] flex flex-col justify-start items-center gap-3">
            <div className="w-full h-[5%] lg:h-[15%] rounded-[8px]">
              <Card width="100%" height="100%">
                <div className="card-body justify-center w-full items-center">
                  <div className="w-full flex justify-center items-center gap-3">
                    <TabButton
                      label={<span>stake</span>}
                      isActive={tab === 1}
                      style={{ width: "50%" }}
                      onPress={() => setTab(1)}
                    />
                    <TabButton
                      label={<span>unstake</span>}
                      isActive={tab === 2}
                      style={{ width: "50%" }}
                      onPress={() => setTab(2)}
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="w-full lg:h-[85%] rounded-[8px]">
              <Card width="100%" height="100%">
                <div className="card-body justify-start items-start gap-8">
                  <span className="text-sm lg:text-lg capitalize text-[#fff] font-inter font-[500]">
                    manage your $SPAK token stakes
                  </span>
                  {tab === 1 ? (
                    <>
                      <div className="w-full flex rounded-[8px] bg-[#171d4c] justify-between items-center px-3 py-3 gap-1">
                        <div className="flex flex-col justify-start items-start w-[90%] gap-3">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">
                            token unlock days
                          </span>
                          <input
                            value={duration}
                            type="number"
                            onChange={e => setDuration(e.target.valueAsNumber)}
                            className="w-full text-left text-sm lg:text-lg text-[#fff] font-inter px-1 py-1 bg-transparent outline-none"
                          />
                        </div>
                        <div className="w-[10%] justify-start items-start gap-[0.1rem] flex flex-col h-full">
                          <button onClick={() => setDuration(d => add(d, 1))} className="btn btn-ghost btn-xs">
                            <FiChevronUp size={24} />
                          </button>
                          <button
                            onClick={() => setDuration(d => (!isNil(d) && d > 0 ? subtract(d, 1) : 0))}
                            className="btn btn-ghost btn-xs"
                          >
                            <FiChevronDown size={24} />
                          </button>
                        </div>
                      </div>

                      <div className="w-full flex rounded-[8px] bg-[#171d4c] justify-between items-center px-3 py-3 gap-1">
                        <div className="flex flex-col justify-start items-start gap-3">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">deposit</span>
                          <input
                            value={amount}
                            type="number"
                            onChange={e => setAmount(e.target.valueAsNumber)}
                            className="w-full text-left text-sm lg:text-lg text-[#fff] font-inter px-1 py-1 bg-transparent outline-none"
                          />
                        </div>
                        <div className="justify-start items-end gap-3 flex flex-col h-full">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">
                            balance: {tokenBalance.toFixed(3)} $SPAK
                          </span>
                          <button
                            onClick={() => setAmount(tokenBalance)}
                            className="btn btn-ghost btn-sm uppercase bg-[#0f1122] rounded-[8px]"
                          >
                            <span className="text-[#fff] font-inter">max</span>
                          </button>
                        </div>
                      </div>

                      <div className="card-actions w-full justify-center items-center">
                        <CTAPurple
                          width="100%"
                          height={50}
                          onPress={initStake}
                          disabled={amount <= 0 || duration <= 0 || stakingLoading}
                          label={
                            <div className="flex justify-center items-center gap-2 w-full">
                              <span className="font-inter font-[500] text-sm capitalize">stake $SPAK</span>
                              {stakingLoading && (
                                <span className="loading loading-infinity loading-md text-accent"></span>
                              )}
                            </div>
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex rounded-[8px] bg-[#171d4c] justify-start items-center px-3 py-3 gap-1">
                        <div className="flex flex-col justify-start items-start w-[90%] gap-3">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">
                            token unlock in:
                          </span>
                          {!isNil(accountAllocationData) ? (
                            <Countdown
                              date={multiply(
                                parseInt(accountAllocationData.firstStakeTimestamp) +
                                  parseInt(accountAllocationData.firstStakeLockPeriod),
                                1000
                              )}
                              renderer={({ days, hours, minutes, seconds }) => (
                                <span className="font-inter font-[500] text-sm lg:text-lg text-[#d9d9d9]">
                                  {days}D:{hours}H:{minutes}M:{seconds}S
                                </span>
                              )}
                            />
                          ) : (
                            <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                              You have no allocation
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex rounded-[8px] bg-[#171d4c] justify-between items-center px-3 py-3 gap-1">
                        <div className="flex flex-col justify-start items-start gap-3">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">withdraw</span>
                          <input
                            value={multiply(parseFloat(accountAllocationData?.amountStaked || "0"), myReward)}
                            type="number"
                            disabled
                            className="w-full text-left text-sm lg:text-lg text-[#fff] font-inter px-1 py-1 bg-transparent outline-none"
                          />
                        </div>
                        <div className="justify-start items-end gap-3 flex flex-col h-full">
                          <span className="capitalize text-[#878aa1] font-inter text-xs lg:text-sm">reward</span>
                          <input
                            value={`${myReward}x`}
                            type="text"
                            disabled
                            className="w-full text-right text-sm lg:text-lg text-[#fff] font-inter px-1 py-1 bg-transparent outline-none"
                          />
                        </div>
                      </div>

                      <div className="card-actions w-full justify-center items-center">
                        <CTAPurple
                          width="100%"
                          height={50}
                          onPress={initUnstake}
                          disabled={
                            floor(atomicDate.getTime() / 1000) <
                              parseInt(accountAllocationData?.firstStakeTimestamp) +
                                parseInt(accountAllocationData?.firstStakeLockPeriod) || unstakingLoading
                          }
                          label={
                            <div className="flex justify-center items-center gap-2 w-full">
                              <span className="font-inter font-[500] text-sm capitalize">unstake $SPAK</span>
                              {unstakingLoading && (
                                <span className="loading loading-infinity loading-md text-accent"></span>
                              )}
                            </div>
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
        {allTiersLoading ? (
          <div className="container mx-auto flex justify-center items-center">
            <ThreeCircles color="#fff" width={90} />
          </div>
        ) : (
          <section className="flex w-full flex-col justify-start items-start gap-10 py-5 px-4 container mx-auto">
            <span className="text-xl lg:text-3xl text-[#fff] font-[500] capitalize">tiers</span>
            <div className="flex w-full flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start lg:gap-20 gap-10 py-5">
              {map(
                sortBy(allTiersData, tier => parseInt(tier.num)),
                (tier, index) => (
                  <div className="w-full lg:w-1/3" key={index}>
                    <TierCard data={tier} index={index + 1} style={{ width: "100%" }} />
                  </div>
                )
              )}
            </div>
          </section>
        )}
        <section className="w-full flex flex-col justify-start items-center gap-7 lg:gap-16 py-5 px-4 bg-transparent container mx-auto">
          <div className="flex justify-start items-center w-full">
            <span className="capitalize text-lg lg:text-2xl text-[#fff] font-[400]">stay updated</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start w-full gap-12 lg:h-96">
            <div className="w-full lg:w-1/2 rounded-[8px] h-full">
              <Card width="100%" height="100%">
                <div className="card-body w-full justify-start items-start">
                  <div className="flex flex-col justify-start items-start px-2 lg:px-7 py-5 gap-3 lg:gap-7 w-full lg:w-[80%]">
                    <span className="text-[#0029ff] capitalize text-sm lg:text-lg">join the sparkFi community</span>
                    <p className="text-[#fff] text-xs lg:text-sm font-[400] leading-5 text-justify font-inter">
                      Are you interested in receiving updates about new projects on SparkFi? Register with your e-mail
                      address to never miss any updates again.
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[70%] gap-2 justify-start items-start px-2 lg:px-7">
                    <InputField placeholder="Your Email" width="100%" height={50} />
                    <div className="form-control w-full">
                      <label onClick={() => setNewsletterChecked(c => !c)} className="label cursor-pointer gap-4">
                        <div className="bg-[#0f1122] rounded-[8px] w-[2.5rem] h-[1.5rem] flex justify-center items-center">
                          {newsletterChecked && <FiCheck />}
                        </div>
                        <span className="text-[#fff] font-[400] leading-5 text-justify font-inter text-xs lg:text-sm">
                          I agree to receive newsletters and promotional emails from SparkFi (you can unsubscribe at any
                          time).
                        </span>
                      </label>
                    </div>
                    <div className="w-full lg:w-1/3">
                      <CTAPurple
                        label={<span className="uppercase text-xs lg:text-sm text-[#fff]">sign up now!</span>}
                        width="100%"
                        height={52}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col text-[#0029ff]">
              <div className="flex justify-center gap-7 lg:gap-24 items-center w-full -mb-5">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://t.me/Official_SparkFi", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaTelegramPlane className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://twitter.com/sparkfi_xyz", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaTwitter className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://discord.com/invite/WtBvqvuaTu", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaDiscord className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center gap-7 lg:gap-24 items-center w-full -mt-5">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://github.com/SparkFi-Labs", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaGithub className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://sparkfi-xyz.medium.com/", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <BsMedium className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
      </div>
    </>
  );
}
