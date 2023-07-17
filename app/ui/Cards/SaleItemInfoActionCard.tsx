import { AiFillDollarCircle } from "react-icons/ai";
import Countdown from "react-countdown";
import { divide, floor, multiply, reduce } from "lodash";
import type { TokenSale } from "@/.graphclient";
import { useMyContributions } from "@/hooks/app/launchpad";
import {
  useAccountIsPresaleFunder,
  useMyClaimableInSale,
  useMyTotalPurchasedInSale,
  usePresaleCasher,
  usePresaleEmergencyWithdrawal,
  usePresaleWithdrawal
} from "@/hooks/app/web3/launchpad";
import { useRef } from "react";
import ContributeTokenModal from "../Modals/ContributeTokenModal";
import { useAtomicDate } from "@/hooks/app/shared";
import FundTokenSaleModal from "../Modals/FundTokenSaleModal";
import { useContractOwner } from "@/hooks/contracts";
import presaleAbi from "@/assets/abis/Presale.json";
import { useWeb3React } from "@web3-react/core";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

interface SaleItemInfoActionCardProps {
  saleData: TokenSale;
}

export default function SaleItemInfoActionCard({ saleData }: SaleItemInfoActionCardProps) {
  const { account } = useWeb3React();
  const { isLoading: myContributionsLoading, data: myContributionsData } = useMyContributions(saleData.id);
  const claimable = useMyClaimableInSale(saleData.id);
  const purchased = useMyTotalPurchasedInSale(saleData.id);
  const contributeModalRef = useRef<HTMLInputElement>(null);
  const fundModalRef = useRef<HTMLInputElement>(null);
  const atomicDate = useAtomicDate();
  const isFunder = useAccountIsPresaleFunder(saleData.id);
  const owner = useContractOwner(saleData.id, presaleAbi);

  const { isLoading: presaleCasherLoading, cash } = usePresaleCasher(saleData.id);
  const { isLoading: presaleWithdrawalLoading, withdrawal } = usePresaleWithdrawal(saleData.id);
  const { isLoading: presaleEmergencyWithdrawalLoading, emergencyWithdrawal } = usePresaleEmergencyWithdrawal(
    saleData.id
  );

  const { reload } = useRouter();

  return (
    <div className="bg-[linear-gradient(136deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] rounded-[7px] flex flex-col justify-start items-center h-full w-full">
      {parseInt(saleData.startTime) > floor(atomicDate.getTime() / 1000) ? (
        <Countdown
          className="px-2"
          date={multiply(parseInt(saleData.startTime), 1000)}
          renderer={({ days, hours, minutes, seconds, completed }) => (
            <div className="w-full flex flex-col justify-start items-center gap-4 py-4">
              <span className="text-[#0029ff] text-[0.875rem] font-[600] uppercase">
                {completed ? "sale has started" : "sale starts in"}
              </span>
              <div className="stats shadow gap-3">
                <div className="stat place-items-center">
                  <span className="stat-value">{days}</span>
                  <span className="stat-desc capitalize">days</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{hours}</span>
                  <span className="stat-desc capitalize">hours</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{minutes}</span>
                  <span className="stat-desc capitalize">minutes</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{seconds}</span>
                  <span className="stat-desc capitalize">seconds</span>
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <Countdown
          className="px-2"
          date={multiply(parseInt(saleData.endTime), 1000)}
          renderer={({ days, hours, minutes, seconds, completed }) => (
            <div className="w-full flex flex-col justify-start items-center gap-4 py-4">
              <span className="text-[#0029ff] text-[0.875rem] font-[600] uppercase">
                {completed ? "sale has ended" : "sale ends in"}
              </span>
              <div className="stats shadow">
                <div className="stat place-items-center">
                  <span className="stat-value">{days}</span>
                  <span className="stat-desc capitalize">days</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{hours}</span>
                  <span className="stat-desc capitalize">hours</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{minutes}</span>
                  <span className="stat-desc capitalize">minutes</span>
                </div>
                <div className="stat place-items-center">
                  <span className="stat-value">{seconds}</span>
                  <span className="stat-desc capitalize">seconds</span>
                </div>
              </div>
            </div>
          )}
        />
      )}
      <div className="flex flex-col justify-start items-center w-full border-t border-t-[#393c54] rounded-[0px_0px_7px_7px] bg-[linear-gradient(134deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] px-3 py-4 gap-7">
        <div className="w-full justify-between flex items-start">
          <span className="font-[400] text-[#878aa1] capitalize text-[0.65rem] lg:text-[0.87rem]">total sold</span>
          <div className="flex justify-center items-start gap-1">
            <span className="text-[0.65rem] lg:text-[0.92rem] font-[400] text-[#0029ff]">
              {divide(parseFloat(saleData.totalPaymentMade), parseFloat(saleData.salePrice))}
            </span>
            <span className="text-[0.65rem] lg:text-[0.92rem]">/</span>
            <span className="text-[0.65rem] lg:text-[0.92rem] font-[400] text-[#fff]">
              {saleData.totalAvailableSaleTokens}
            </span>
            <span className="text-[0.65rem] lg:text-[0.92rem] font-[400] text-[#fff]">{saleData.saleToken.symbol}</span>
          </div>
        </div>
        <div className="w-full justify-between flex items-start">
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
            max. buy per wallet
          </span>
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#fff]">
            {saleData.maxTotalPayment} {saleData.paymentToken.symbol}
          </span>
        </div>
        <div className="w-full justify-between flex items-start">
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
            min. buy per wallet
          </span>
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#fff]">
            {saleData.minTotalPayment} {saleData.paymentToken.symbol}
          </span>
        </div>
        <div className="w-full justify-between flex items-start">
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">price</span>
          <span className="text-[0.65rem] lg:text-[0.84rem] font-[400] text-[#fff]">
            {saleData.salePrice} {saleData.paymentToken.symbol}
          </span>
        </div>
      </div>
      <div className="bg-[#000] border-t border-t-[#393c54] rounded-[0px_0px_7px_7px] px-3 py-4 w-full flex justify-start items-start gap-7 flex-col">
        <span className="capitalize text-[#878aa1] text-[0.875rem]">your pool info</span>
        <div className="flex flex-col gap-7 w-full justify-start items-center">
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center gap-1">
              <AiFillDollarCircle />
              <span className="text-[#878aa1] text-[0.65rem] lg:text-[0.875rem] capitalize">your contributon</span>
            </div>
            {myContributionsLoading ? (
              <span className="loading loading-infinity loading-md text-[#0029ff]"></span>
            ) : (
              <span className="text-[#fff] text-[0.65rem] lg:text-[0.875rem]">
                {reduce(myContributionsData, (accumulator, contribB) => accumulator + parseFloat(contribB.amount), 0)}{" "}
                {saleData.paymentToken.symbol}
              </span>
            )}
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center gap-1">
              <AiFillDollarCircle />
              <span className="text-[#878aa1] text-[0.65rem] lg:text-[0.875rem] capitalize">purchased</span>
            </div>
            <span className="text-[#fff] text-[0.65rem] lg:text-[0.875rem]">
              {purchased} {saleData.saleToken.symbol}
            </span>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center gap-1">
              <AiFillDollarCircle />
              <span className="text-[#878aa1] text-[0.65rem] lg:text-[0.875rem] capitalize">available to claim</span>
            </div>
            <span className="text-[#fff] text-[0.65rem] lg:text-[0.875rem]">
              {claimable} {saleData.saleToken.symbol}
            </span>
          </div>
        </div>
        {parseInt(saleData.startTime) > floor(atomicDate.getTime() / 1000) && (
          <div className="flex flex-col w-full gap-3 justify-start items-center">
            <button className="btn capitalize btn-disabled bg-[#101121] w-full py-2">pool not open yet</button>
            {isFunder && (
              <button
                onClick={() => {
                  if (fundModalRef.current) fundModalRef.current.checked = true;
                }}
                className="btn capitalize bg-[#101121] w-full py-2"
              >
                fund sale
              </button>
            )}
          </div>
        )}
        {parseInt(saleData.endTime) < floor(atomicDate.getTime() / 1000) && account === owner && (
          <button
            onClick={async () => {
              try {
                const toastId = toast("Preparing to end sale and transfer proceeds", {
                  type: "info",
                  autoClose: 17000
                });
                await cash();
                toast.update(toastId, { type: "success", autoClose: 5000, render: "Sale was successfully ended" });
              } catch (error: any) {
                toast(error.message, { type: "error", autoClose: 5000 });
              }
            }}
            className="btn capitalize bg-[#101121] w-full py-2 flex justify-center items-center gap-2"
          >
            <span>end sale</span>
            {presaleCasherLoading && <span className="loading loading-infinity loading-md text-accent"></span>}
          </button>
        )}
        {floor(atomicDate.getTime() / 1000) > parseInt(saleData.startTime) && (
          <div className="w-full gap-3 flex justify-center items-center">
            {floor(atomicDate.getTime() / 1000) < parseInt(saleData.endTime) ? (
              <button
                onClick={() => {
                  if (contributeModalRef.current) contributeModalRef.current.checked = true;
                }}
                className="btn capitalize bg-[#101121] w-1/2 py-2"
              >
                contribute {saleData.paymentToken.symbol}
              </button>
            ) : (
              <button
                onClick={async () => {
                  try {
                    const toastId = toast("Preparing for withdrawal", {
                      type: "info",
                      autoClose: 17000
                    });
                    await withdrawal();
                    toast.update(toastId, {
                      type: "success",
                      autoClose: 5000,
                      render: "Withdrawal successful"
                    });

                    reload();
                  } catch (error: any) {
                    toast(error.message, { type: "error", autoClose: 5000 });
                  }
                }}
                className="btn capitalize bg-[#101121] w-1/2 py-2 flex justify-center items-center gap-2"
              >
                <span>claim {saleData.saleToken.symbol}</span>
                {presaleWithdrawalLoading && <span className="loading loading-infinity loading-md text-accent"></span>}
              </button>
            )}
            <button
              onClick={async () => {
                try {
                  const toastId = toast("Preparing for emergency withdrawal", {
                    type: "info",
                    autoClose: 17000
                  });
                  await emergencyWithdrawal();
                  toast.update(toastId, {
                    type: "success",
                    autoClose: 5000,
                    render: "Emergency withdrawal successful"
                  });

                  reload();
                } catch (error: any) {
                  toast(error.message, { type: "error", autoClose: 5000 });
                }
              }}
              className="btn capitalize bg-[#101121] w-1/2 py-2 flex justify-center items-center gap-2"
            >
              <span>emergency withdraw</span>
              {presaleEmergencyWithdrawalLoading && (
                <span className="loading loading-infinity loading-md text-accent"></span>
              )}
            </button>
          </div>
        )}
      </div>
      <ContributeTokenModal
        ref={contributeModalRef}
        sale={saleData}
        close={() => {
          if (contributeModalRef.current) contributeModalRef.current.checked = false;
        }}
      />
      <FundTokenSaleModal
        ref={fundModalRef}
        sale={saleData}
        close={() => {
          if (fundModalRef.current) fundModalRef.current.checked = false;
        }}
      />
      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </div>
  );
}
