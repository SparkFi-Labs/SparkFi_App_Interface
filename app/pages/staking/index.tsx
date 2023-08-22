import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { floor, multiply, subtract } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Countdown from "react-countdown";
import { FiCheck, FiUser } from "react-icons/fi";
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

export default function Staking() {
  const { push } = useRouter();
  return (
    <>
      <Head>
        <title>Staking | Allocation</title>
      </Head>
      <div className="flex flex-col w-screen gap-20 justify-start items-start relative">
        <div className="absolute lg:w-[6.20875rem] lg:h-[6.20875rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[176.89deg] right-10 top-10"></div>
        <div className="absolute lg:w-[8.03931rem] lg:h-[8.03931rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[105.332deg] left-10 top-20"></div>
        <div className="absolute lg:w-[3.15369rem] lg:h-[3.15369rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[140.595deg] left-10 top-80"></div>
        <div className="absolute lg:w-[4.791rem] lg:h-[4.791rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[176.89deg] right-10 top-80"></div>
        <section className="py-12 px-3 w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6 relative lg:py-[6rem]">
            {/* <div className="absolute lg:-top-[8rem] rounded-[1000px]">
            <Image src="/images/ellipse_top.svg" width={1400} height={1000} alt="ellipse" />
            </div> */}

            <span className="text-[#fff] text-[1.4rem] lg:text-[3.125rem] capitalize font-[400] text-center">
              stake your $SPAK tokens today
            </span>
            <span className="text-[#aaa] text-[16px] lg:text-[18px] font-[500] leading-5 text-center font-inter">
              Together, we can unlock limitless potential and create lasting value for all stakeholders involved.
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Enter App" width="50%" height={50} onPress={() => push("/launchpad")} />
              <CTAPurpleOutline
                label="Read Docs"
                width="50%"
                height={50}
                onPress={() => window.open("https://docs.sparkfi.xyz", "_blank")}
              />
            </div>
          </div>
        </section>
        <section className="flex w-full flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-20 lg:gap-10 px-4 lg:px-10 py-5">
          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px] rotate-[13.195deg]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] capitalize">number of stakers</span>
                <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">2,646</span>
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] capitalize">total $SPAK staked</span>
                <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">50,723,388</span>
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 h-[78px] lg:h-[106px] rounded-[8px] -rotate-[20.557deg]">
            <Card width="100%" height="100%">
              <div className="card-body justify-center items-center w-full">
                <span className="text-sm lg:text-lg text-[#fff] font-[400] uppercase">apr</span>
                <span className="text-xs lg:text-sm text-[#0029ff] font-[500] capitalize font-inter">150.34%</span>
              </div>
            </Card>
          </div>
        </section>

        <section className="flex w-full flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start lg:gap-20 gap-10 px-4 lg:px-10 py-5">
          <div className="w-full lg:w-1/3 rounded-[8px] lg:min-h-[408px]">
            <Card width="100%" style={{ minHeight: "inherit" }}>
              <div className="card-body">
                <div className="flex flex-col gap-6 justify-start items-start px-3 py-5">
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
                      <Countdown
                        date={100999888999378}
                        renderer={({ days, hours, minutes, seconds }) => (
                          <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                            Tokens unlocked in {days}D:{hours}H:{minutes}M:{seconds}S
                          </span>
                        )}
                      />
                    }
                    width="100%"
                    height={55}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 rounded-[8px] lg:min-h-[408px]">
            <Card width="100%" style={{ minHeight: "inherit" }}>
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
                        { x: "", y: 130 },
                        { x: "", y: 400 }
                      ]}
                      colorScale={["#ff004d", "#0ccbf4"]}
                      innerRadius={136}
                      padding={50}
                    />
                  </svg>
                  <div className="absolute flex flex-col justify-center items-center gap-1 top-[50%]">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-xl ring ring-success">
                        <img src="/images/sparkfi_logo.svg" alt="project" />
                      </div>
                    </div>
                    <span className="font-inter text-xs lg:text-sm text-[#fff] font-[500] capitalize">
                      your rewards
                    </span>
                    <span className="text-lg lg:text-xl text-[#0029ff] font-[400]">0.00</span>
                  </div>
                </div>
                <div className="bg-[#141a45] w-full rounded-[8px] justify-center items-start min-h-[176px] card-actions px-3 py-3">
                  <div className="w-full flex flex-col gap-4 justify-start items-center">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center gap-2">
                        <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#4cc9ff]"></span>
                        <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                          total staked
                        </span>
                      </div>

                      <div className="flex justify-center items-center gap-2">
                        <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#ff004d]"></span>
                        <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                          your staked tokens
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col justify-start items-start gap-2">
                        <span className="text-[#4cc9ff] font-[700] font-inter uppercase text-xs lg:text-sm">
                          {(4000).toLocaleString("en-US", { useGrouping: true })} $SPAK
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
                          {(4000).toLocaleString("en-US", { useGrouping: true })} $SPAK
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
                            luna
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
        </section>
      </div>
    </>
  );
}
