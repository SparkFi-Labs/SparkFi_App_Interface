/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import { usePresaleCasher } from "@/hooks/app/web3/launchpad";
import { useRouter } from "next/router";
import { forwardRef, useCallback } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const CashModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const { isLoading, cash } = usePresaleCasher(sale.id);

  const { reload } = useRouter();

  const callCash = useCallback(async () => {
    const toastId = toast("Now cashing sale", { type: "info", autoClose: 40000 });
    try {
      await cash();

      toast.update(toastId, { render: "Successfully cashed sale", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast.update(toastId, { type: "error", autoClose: 5000, render: error.reason || error.message });
    }
  }, [cash, reload]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`set-whitelist-${sale.id}`} ref={ref} />
      <div className="modal px-2" role="dialog">
        <div className="bg-[#151938] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-sm lg:text-lg leading-6 text-[#f5f5f5] font-[500]">cash sale</span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <p className="py-6 font-inter text-[#fff] text-sm lg:text-lg">
            Cashing a sale would make it impossible for emergency withdrawals and further contributions to be effected
            and would relinquish all funds held by the governing smart contracts to due parties. Please proceed with
            caution.
          </p>
          <div className="modal-action py-7 w-full">
            <CTAPurple
              disabled={isLoading}
              onPress={callCash}
              label={
                <div className="w-full flex justify-center items-center gap-2">
                  <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">cash</span>
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

export default CashModal;
