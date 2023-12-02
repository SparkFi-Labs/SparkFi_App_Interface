/* eslint-disable react-hooks/rules-of-hooks */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import Card from "@/components/Card";
import { useAtomicDate } from "@/hooks/app/shared";
import { useAccountAllocation, usePresaleContributor } from "@/hooks/app/web3/launchpad";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { useERC20Balance } from "@/hooks/wallet";
import { divide, floor, multiply, subtract, toLower } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { VictoryPie, VictoryTheme } from "victory";

const tokenImages = {
  link: "/images/link-logo.png",
  weth: "/images/ethereum-logo.png",
  usdc: "/images/usdc-logo.png",
  testusdc: "/images/usdc-logo.png",
  usdbc: "/images/usdc-logo.png"
};

interface ParticipationViewProps {
  sale: TokenSale;
}

export default function ParticipationView({ sale }: ParticipationViewProps) {
  const { metadata, isLoading: metadataIsLoading } = useIPFSGetMetadata(sale.metadataURI);
  const paymentTokenImage = useMemo(
    () => tokenImages[toLower(sale.paymentToken.symbol) as keyof typeof tokenImages],
    [sale.paymentToken.symbol]
  );
  const totalTokensSold = useMemo(
    () => divide(parseFloat(sale.totalPaymentMade), parseFloat(sale.salePrice)),
    [sale.salePrice, sale.totalPaymentMade]
  );
  const myAllocation = useAccountAllocation(sale.id);

  const [contributionAmount, setContributionAmount] = useState<number>(0);

  const tokenBalance = useERC20Balance(sale.paymentToken.id);
  const { isLoading, contribute } = usePresaleContributor(sale.id);
  const atomicDate = useAtomicDate();

  const saleIsDisabled = useMemo(
    () =>
      floor(atomicDate.getTime() / 1000) < parseInt(sale.startTime) ||
      floor(atomicDate.getTime() / 1000) >= parseInt(sale.endTime),
    [atomicDate, sale.endTime, sale.startTime]
  );

  const callContribute = useCallback(async () => {
    try {
      const toastId = toast("Now contributing", { type: "info", autoClose: 10000 });
      await contribute(contributionAmount);

      toast.update(toastId, { render: "Successfully contributed", type: "success", autoClose: 5000 });
    } catch (error: any) {
      toast(error.reason || error.message, { type: "error", autoClose: 5000 });
    }
  }, [contribute, contributionAmount]);

  return (
    <>
      {metadataIsLoading ? (
        <div className="flex w-full justify-center items-center">
          <ThreeCircles color="#fff" width={60} />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full justify-start gap-4 lg:justify-between items-center lg:items-start container mx-auto">
          <div className="w-full lg:w-1/2 rounded-[8px]">
            <Card width="100%">
              <div className="card-body w-full justify-center items-center">
                <div className="w-full flex flex-col justify-start items-center relative">
                  <svg viewBox="0 10 400 220" width="100%" height={300}>
                    <VictoryPie
                      theme={VictoryTheme.material}
                      standalone={false}
                      width={400}
                      padAngle={2}
                      startAngle={99}
                      endAngle={-99}
                      labels={() => null}
                      data={[
                        { x: "", y: subtract(parseFloat(sale.totalAvailableSaleTokens), totalTokensSold) || 1 },
                        { x: "", y: totalTokensSold }
                      ]}
                      colorScale={["#ff004d", "#0ccbf4"]}
                      innerRadius={136}
                      padding={50}
                    />
                  </svg>
                  <div className="absolute flex flex-col justify-center items-center gap-1 top-[50%]">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-xl ring ring-success">
                        <img src={metadata?.projectLogoURI} alt="project" />
                      </div>
                    </div>
                    <span className="font-inter text-xs lg:text-sm text-[#fff] font-[500] capitalize">progress</span>
                    <span className="text-lg lg:text-xl text-[#0029ff] font-[400]">
                      {parseFloat(sale.totalAvailableSaleTokens) > 0
                        ? floor(multiply(totalTokensSold / parseFloat(sale.totalAvailableSaleTokens), 100))
                        : "0"}
                      %
                    </span>
                  </div>
                </div>
                <div className="bg-[#141a45] w-full rounded-[8px] justify-center items-start min-h-[176px] card-actions px-3 py-3">
                  <div className="w-full flex flex-col gap-4 justify-start items-center">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center gap-2">
                        <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#4cc9ff]"></span>
                        <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                          tokens sold
                        </span>
                      </div>

                      <div className="flex justify-center items-center gap-2">
                        <span className="w-3 h-3 lg:w-4 lg:h-4 bg-[#ff004d]"></span>
                        <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[500]">
                          unsold tokens
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col justify-start items-start gap-2">
                        <span className="text-[#4cc9ff] font-[700] font-inter uppercase text-xs lg:text-sm">
                          {totalTokensSold.toLocaleString("en-US", { useGrouping: true })} {sale.saleToken.symbol}
                        </span>
                        <span className="text-[#878aa1] font-[700] font-inter uppercase text-[10px] lg:text-[12px]">
                          {multiply(totalTokensSold, parseFloat(sale.salePrice)).toLocaleString("en-US", {
                            useGrouping: true
                          })}{" "}
                          {sale.paymentToken.symbol}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start items-end gap-2">
                        <span className="text-[#ff004d] font-[700] font-inter uppercase text-xs lg:text-sm">
                          {subtract(parseFloat(sale.totalAvailableSaleTokens), totalTokensSold).toLocaleString(
                            "en-US",
                            { useGrouping: true }
                          )}{" "}
                          {sale.saleToken.symbol}
                        </span>
                        <span className="text-[#878aa1] font-[700] font-inter uppercase text-[10px] lg:text-[12px]">
                          {(
                            subtract(parseFloat(sale.totalAvailableSaleTokens), totalTokensSold) *
                            parseFloat(sale.salePrice)
                          ).toLocaleString("en-US", { useGrouping: true })}{" "}
                          {sale.paymentToken.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end w-full">
                      <div className="flex justify-start items-start gap-2 min-h-12">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl bg-[#0b5cfa]">
                            <img src={paymentTokenImage} alt="token" />
                          </div>
                        </div>
                        <div className="flex justify-start items-start gap-2 h-full flex-col">
                          <span className="text-[#878aa1] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                            your allocation
                          </span>
                          <span className="bg-[linear-gradient(90deg,_#00FFF0_0%,_#0029FF_100%)] font-[500] font-inter uppercase text-[10px] lg:text-[12px] bg-clip-text text-[transparent]">
                            {sale.saleType === "ALLOCATION"
                              ? `${myAllocation.toLocaleString("en-US", { useGrouping: true })} ${
                                  sale.paymentToken.symbol
                                }`
                              : "not an allocation sale"}
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
          <div className="w-full lg:w-1/3 flex flex-col gap-4 justify-start items-center rounded-[8px]">
            <div className="w-full flex justify-between items-center rounded-[inherit] bg-[#151938] px-3 py-3">
              <div className="flex justify-start items-center gap-2">
                <FiUsers size={20} />
                <span className="text-[#878aa1] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                  participants
                </span>
              </div>
              <span className="capitalize text-[#fff] text-xs lg:text-sm font-inter font-[700]">
                {sale.participants.toLocaleString("en-US", { useGrouping: true })}
              </span>
            </div>
            <Card disabled={saleIsDisabled} width="100%" style={{ minHeight: "455px" }}>
              <div className="card-body w-full h-full justify-start items-center gap-10">
                <div className="flex justify-start items-start w-full">
                  <span className="capitalize text-[#4cc9ff] text-sm lg:text-lg font-inter">
                    {!saleIsDisabled
                      ? "pool open"
                      : floor(atomicDate.getTime() / 1000) < parseInt(sale.startTime)
                      ? "pool not started"
                      : "pool closed"}
                  </span>
                </div>
                <div className="rounded-[8px] bg-[#141a45] w-full flex flex-col px-2 py-2 justify-start items-start min-h-[88px] gap-4">
                  <span className="text-[#d9d9d9] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                    allocation
                  </span>
                  <div className="flex justify-between items-start w-full">
                    <button
                      disabled={sale.saleType !== "ALLOCATION" || saleIsDisabled}
                      onClick={() => setContributionAmount(myAllocation)}
                      className="btn bg-[#151938] rounded-md uppercase btn-sm flex justify-center items-center px-3 py-1 gap-2"
                    >
                      <span className="font-inter text-[#707070]">max</span>
                    </button>
                    <span className="text-[#d9d9d9] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                      allocation:{" "}
                      {sale.saleType === "ALLOCATION"
                        ? `${myAllocation.toFixed(3)} ${sale.paymentToken.symbol}`
                        : "not an allocation sale"}
                    </span>
                  </div>
                </div>

                <div className="rounded-[8px] bg-[#141a45] w-full flex flex-col px-2 py-2 justify-start items-start min-h-[88px] gap-4">
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[#d9d9d9] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                      deposit
                    </span>
                    <span className="text-[#d9d9d9] font-[700] font-inter capitalize text-[10px] lg:text-[12px]">
                      balance: {tokenBalance.toFixed(3)} {sale.paymentToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-start items-center gap-2">
                      <div className="avatar">
                        <div className="w-6 h-6 rounded-full">
                          <img src={paymentTokenImage} alt="token" />
                        </div>
                      </div>
                      <span className="text-[#d9d9d9] font-[700] font-inter capitalize text-[10px] lg:text-[13px]">
                        {sale.paymentToken.symbol}
                      </span>
                    </div>
                    <input
                      className="outline-0 bg-transparent border-none text-[#fff] font-inter w-24 px-1 py-1 text-right"
                      type="number"
                      value={contributionAmount}
                      disabled={saleIsDisabled}
                      onChange={ev => setContributionAmount(ev.target.valueAsNumber || 0)}
                    />
                  </div>
                </div>
                <div className="card-actions justify-center items-center w-full">
                  <CTAPurple
                    onPress={callContribute}
                    disabled={contributionAmount <= 0 || isLoading || saleIsDisabled}
                    width="100%"
                    height={55}
                    label={
                      <div className="flex w-full justify-center items-center gap-2">
                        <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">
                          {!saleIsDisabled
                            ? `deposit ${sale.paymentToken.symbol}`
                            : floor(atomicDate.getTime() / 1000) < parseInt(sale.startTime)
                            ? "pool not started"
                            : "pool closed"}
                        </span>
                        {isLoading && <span className="loading loading-infinity loading-md text-accent"></span>}
                      </div>
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </>
  );
}
