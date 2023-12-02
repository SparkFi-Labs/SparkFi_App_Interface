/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import { usePresaleContributor } from "@/hooks/app/web3/launchpad";
import { useERC20Balance } from "@/hooks/wallet";
import { multiply } from "lodash";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const ContributeTokenModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const [amount, setAmount] = useState<number | undefined>(0);

  const tokenBalance = useERC20Balance(sale.paymentToken.id);
  const { isLoading, contribute } = usePresaleContributor(sale.id);

  const { reload } = useRouter();

  const callContribute = useCallback(async () => {
    try {
      const toastId = toast("Now contributing", { type: "info", autoClose: 10000 });
      await contribute(amount as number);

      toast.update(toastId, { render: "Successfully contributed", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast(error.message, { type: "error", autoClose: 5000 });
    }
  }, [amount, contribute, reload]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`contribute-token-modal-${sale.id}`} ref={ref} />
      <div className="modal" role="dialog">
        <div className="bg-[#101221] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-[1em] leading-6 text-[#f5f5f5] font-[500]">enter amount</span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <div className="w-full px-2 py-2 flex flex-col justify-start items-center gap-3">
            <div className="w-full bg-[#0c0e1e] flex flex-col justify-start items-center gap-4 rounded-[5px] px-2 py-2">
              <div className="flex justify-between items-center w-full">
                <input
                  type="number"
                  value={amount}
                  onChange={ev => setAmount(ev.target.valueAsNumber || undefined)}
                  className="bg-transparent text-[#fff] outline-0 border-0"
                  placeholder="0.00"
                />
                <button
                  onClick={() => setAmount(tokenBalance ?? 0)}
                  className="btn bg-[#131735] rounded-[5px] btn-ghost uppercase text-[#fefce9]"
                >
                  max
                </button>
              </div>
              <div className="flex justify-end items-center w-full">
                <span className="capitalize text-[#d9d9d9] text-[1em]">available: {tokenBalance}</span>
              </div>
            </div>
            <input
              type="range"
              className="range range-success h-1"
              min={0}
              max={100}
              value={multiply(amount || 0, 100) / tokenBalance || 1}
              onChange={ev => setAmount((ev.target.valueAsNumber * tokenBalance) / 100)}
            />
            <div className="flex justify-between items-center w-full text-[#0.89em] text-[#878aa1]">
              <button
                onClick={() => setAmount(multiply(25, tokenBalance) / 100)}
                className="bg-[#040511] btn rounded-[5px] btn-ghost"
              >
                25%
              </button>
              <button
                onClick={() => setAmount(multiply(50, tokenBalance) / 100)}
                className="bg-[#040511] btn rounded-[5px] btn-ghost"
              >
                50%
              </button>
              <button
                onClick={() => setAmount(multiply(75, tokenBalance) / 100)}
                className="bg-[#040511] btn rounded-[5px] btn-ghost"
              >
                75%
              </button>
              <button
                onClick={() => setAmount(multiply(100, tokenBalance) / 100)}
                className="bg-[#040511] btn rounded-[5px] btn-ghost"
              >
                100%
              </button>
            </div>
          </div>
          <div className="modal-action w-full border-t border-[#878aa1] py-7">
            <CTAPurple
              disabled={isLoading}
              onPress={callContribute}
              label={
                <div className="w-full flex justify-center items-center gap-2">
                  <span className="text-[#fff] capitalize text-[1.2em]">contribute</span>
                  {isLoading && <span className="loading loading-infinity loading-md text-accent"></span>}
                </div>
              }
              width="100%"
              height={55}
            />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </>
  );
});

export default ContributeTokenModal;
