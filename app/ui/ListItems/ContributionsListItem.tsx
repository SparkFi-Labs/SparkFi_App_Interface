import type { Contribution } from "@/.graphclient";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { usePresaleWithdrawal } from "@/hooks/app/web3/launchpad";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { isNil, map, multiply, toLower } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Countdown from "react-countdown";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const tokenImages = {
  link: "/images/link-logo.png",
  weth: "/images/ethereum-logo.png",
  usdc: "/images/usdc-logo.png",
  testusdc: "/images/usdc-logo.png"
};

interface ContributionListItemProps {
  data: Contribution;
}

export default function ContributionListItem({ data }: ContributionListItemProps) {
  const { isLoading, metadata } = useIPFSGetMetadata(data.tokenSale.metadataURI);
  const [showVesting, setShowVesting] = useState(false);

  const { isLoading: presaleWithdrawalLoading, withdrawal } = usePresaleWithdrawal(data.tokenSale.id);
  const { reload } = useRouter();

  const initWithdrawal = useCallback(async () => {
    const toastId = toast("Now attempting withdrawal", { type: "info", autoClose: 15000 });
    try {
      await withdrawal();

      toast.update(toastId, { type: "success", autoClose: 5000, render: "Successfully withdrawn " });

      reload();
    } catch (error: any) {
      toast.update(toastId, { type: "error", autoClose: 5000, render: error.reason || error.message });
    }
  }, [reload, withdrawal]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-2 min-h-[91px] bg-[#151938] rounded-[8px]">
        <div className="lg:min-h-[inherit] flex justify-center lg:justify-start items-center gap-8 px-3 py-4 w-full lg:w-1/2">
          {isLoading || isNil(metadata) ? (
            <ThreeCircles color="#fff" width={20} height={20} />
          ) : (
            <>
              <div className="flex justify-start gap-3 items-center">
                <div className="avatar">
                  <div className="lg:w-14 lg:h-14 w-12 h-12 rounded-[8px] ring ring-success">
                    <img src={metadata.projectLogoURI} alt={metadata.name} />
                  </div>
                </div>
                <span className="font-inter font-[500] capitalize text-sm lg:text-lg">{metadata.name}</span>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">your contribution</span>
                <div className="flex self-end justify-start items-center gap-2 w-full">
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full">
                      <img
                        src={tokenImages[toLower(data.tokenSale.paymentToken.symbol) as keyof typeof tokenImages]}
                        alt={data.tokenSale.paymentToken.name}
                      />
                    </div>
                  </div>
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
                    {parseFloat(data.amount).toLocaleString("en-US", { useGrouping: true, maximumFractionDigits: 3 })}
                  </span>
                  <span className="text-[#878aa1] font-[500] text-xs lg:text-sm font-inter uppercase">
                    {data.tokenSale.paymentToken.symbol}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="lg:min-h-[inherit] w-full lg:w-1/2 bg-[#1e244b] px-3 flex justify-between items-center rounded-b-[inherit] lg:rounded-b-none lg:rounded-r-[inherit] border-t lg:border-t-0 lg:border-l border-[#878aa1] py-4">
          <div className="flex flex-col justify-start items-start gap-2 w-1/2">
            <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">claim start date</span>
            <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
              {new Date((parseInt(data.tokenSale.endTime) + data.tokenSale.withdrawDelay) * 1000).toUTCString()}
            </span>
          </div>
          <div className="flex flex-col justify-start items-center gap-2 w-1/2 lg:w-1/3">
            <CTAPurple
              onPress={() => setShowVesting(t => !t)}
              label={
                <div className="flex w-full justify-center items-center gap-4">
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter capitalize">
                    vesting details
                  </span>
                  {showVesting ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </div>
              }
              width="100%"
              height={45}
            />
            <CTAPurpleOutline
              onPress={initWithdrawal}
              disabled={presaleWithdrawalLoading}
              label={
                <div className="flex justify-center items-center gap-2 w-full">
                  <span className="font-inter font-[500] text-sm capitalize">claim available</span>
                  {presaleWithdrawalLoading && (
                    <span className="loading loading-infinity loading-md text-accent"></span>
                  )}
                </div>
              }
              width="100%"
              height={45}
            />
          </div>
        </div>
      </div>
      {showVesting && !isNil(data.tokenSale.vestingType) && (
        <div className="w-full flex flex-col justify-start items-center bg-[#151938] rounded-[8px]">
          {data.tokenSale.vestingType === "LINEAR" ? (
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full gap-4 lg:gap-28 px-3 py-3">
              <div className="flex justify-between w-full lg:w-1/3 items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                  <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">no</span>
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">1</span>
                </div>
                <div className="flex flex-col gap-2 justify-start items-end lg:items-start">
                  <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">percentage</span>
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">100%</span>
                </div>
              </div>

              <div className="flex justify-between w-full lg:w-1/3 items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                  <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">claim date</span>
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
                    {new Date(parseInt(data.tokenSale.linearVesting?.endTime) * 1000).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-2 justify-start items-end lg:items-start">
                  <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">amount</span>
                  <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
                    {multiply(parseFloat(data.amount), parseFloat(data.tokenSale.salePrice)).toLocaleString("en-US", {
                      maximumFractionDigits: 3,
                      useGrouping: true
                    })}{" "}
                    {data.tokenSale.saleToken.symbol}
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/6 flex justify-center lg:justify-end">
                <CTAPurpleOutline
                  label={
                    <Countdown
                      date={multiply(parseInt(data.tokenSale.linearVesting?.endTime), 1000)}
                      renderer={({ days, hours, minutes, seconds }) => (
                        <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                          {days}D:{hours}H:{minutes}M:{seconds}S
                        </span>
                      )}
                    />
                  }
                  width="100%"
                  height={45}
                />
              </div>
            </div>
          ) : (
            <>
              {map(data.tokenSale.cliffPeriod, (cliff, index) => (
                <div
                  key={cliff.id}
                  className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full gap-4 lg:gap-28 px-3 py-3"
                >
                  <div className="flex justify-between w-full lg:w-1/3 items-center">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">no</span>
                      <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">{index + 1}</span>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-end lg:items-start">
                      <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">percentage</span>
                      <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">{cliff.percentage}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between w-full lg:w-1/3 items-center">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">claim date</span>
                      <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
                        {new Date(parseInt(cliff.claimTime) * 1000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-end lg:items-start">
                      <span className="text-xs lg:text-sm font-inter capitalize text-[#878aa1]">amount</span>
                      <span className="text-[#fff] font-[500] text-xs lg:text-sm font-inter">
                        {(
                          (cliff.percentage / 100) *
                          multiply(parseFloat(data.amount), parseFloat(data.tokenSale.salePrice))
                        ).toLocaleString("en-US", {
                          maximumFractionDigits: 3,
                          useGrouping: true
                        })}{" "}
                        {data.tokenSale.saleToken.symbol}
                      </span>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/6 flex justify-center lg:justify-end">
                    <CTAPurpleOutline
                      label={
                        <Countdown
                          date={multiply(parseInt(cliff.claimTime), 1000)}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <span className="font-inter font-[500] text-[1em] lg:text-[1.3em] text-[#d9d9d9]">
                              {days}D:{hours}H:{minutes}M:{seconds}S
                            </span>
                          )}
                        />
                      }
                      width="100%"
                      height={45}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </div>
  );
}
