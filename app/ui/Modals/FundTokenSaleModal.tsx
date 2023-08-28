/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import { usePresaleFunder } from "@/hooks/app/web3/launchpad";
import { useMyTokenBalance } from "@/hooks/wallet";
import { multiply } from "lodash";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const FundTokenSaleModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const [amount, setAmount] = useState<number | undefined>(0);

  const tokenBalance = useMyTokenBalance(sale.saleToken.id);
  const { isLoading, fund } = usePresaleFunder(sale.id);

  const { reload } = useRouter();

  const callFund = useCallback(async () => {
    try {
      const toastId = toast("Now funding token sale", { type: "info", autoClose: 10000 });
      await fund(amount as number);

      toast.update(toastId, { render: "Successfully funded token sale", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast(error.reason || error.message, { type: "error", autoClose: 5000 });
    }
  }, [amount, fund, reload]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`fund-token-sale-modal-${sale.id}`} ref={ref} />
      <div className="modal px-2">
        <div className="bg-[#151938] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-[1em] leading-6 text-[#f5f5f5] font-[500]">enter amount</span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <div className="w-full px-2 py-2 flex flex-col justify-start items-center gap-3">
            <div className="w-full bg-[#141a45] flex flex-col justify-start items-center gap-4 rounded-[5px] px-2 py-2">
              <div className="flex justify-between items-center w-full">
                <input
                  type="number"
                  value={amount}
                  onChange={ev => setAmount(ev.target.valueAsNumber || undefined)}
                  className="bg-transparent text-[#fff] outline-0 border-0 font-inter"
                  placeholder="0.00"
                />
                <button
                  onClick={() => setAmount(tokenBalance ?? 0)}
                  className="btn bg-[#151938] btn-sm rounded-[5px] btn-ghost uppercase text-[#fefce9] font-inter"
                >
                  max
                </button>
              </div>
              <div className="flex justify-end items-center w-full">
                <span className="capitalize text-[#d9d9d9] text-[1em] font-inter">available: {tokenBalance}</span>
              </div>
            </div>
            <input
              type="range"
              className="range range-success range-xs"
              min={0}
              max={100}
              value={multiply(amount || 0, 100) / tokenBalance || 1}
              onChange={ev => setAmount((ev.target.valueAsNumber * tokenBalance) / 100)}
            />
            <div className="flex justify-between items-center w-full text-[#0.89em] text-[#878aa1]">
              <button
                onClick={() => setAmount(multiply(25, tokenBalance) / 100)}
                className="bg-[#040511] btn btn-sm rounded-[5px] btn-ghost font-inter"
              >
                25%
              </button>
              <button
                onClick={() => setAmount(multiply(50, tokenBalance) / 100)}
                className="bg-[#040511] btn btn-sm rounded-[5px] btn-ghost font-inter"
              >
                50%
              </button>
              <button
                onClick={() => setAmount(multiply(75, tokenBalance) / 100)}
                className="bg-[#040511] btn btn-sm rounded-[5px] btn-ghost font-inter"
              >
                75%
              </button>
              <button
                onClick={() => setAmount(multiply(100, tokenBalance) / 100)}
                className="bg-[#040511] btn btn-sm rounded-[5px] btn-ghost font-inter"
              >
                100%
              </button>
            </div>
          </div>
          <div className="modal-action w-full py-2">
            <CTAPurple
              disabled={isLoading}
              onPress={callFund}
              label={
                <div className="w-full flex justify-center items-center gap-2">
                  <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">fund</span>
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

export default FundTokenSaleModal;
