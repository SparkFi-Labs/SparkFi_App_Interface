/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import { DateField, InputField } from "@/components/Input";
import { usePresaleWhitelistSetCountdown } from "@/hooks/app/web3/launchpad";
import { floor } from "lodash";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const StartWhitelistCountdownModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [durationInDays, setDurationIndays] = useState<number>(7);

  const { isLoading, startWhitelistCountdown } = usePresaleWhitelistSetCountdown(
    sale.id,
    floor(startTime / 1000),
    durationInDays
  );

  const { reload } = useRouter();

  const callStartCountdown = useCallback(async () => {
    try {
      const toastId = toast("Now setting whitelist countdown", { type: "info", autoClose: 10000 });
      await startWhitelistCountdown();

      toast.update(toastId, { render: "Successfully started whitelist countdown", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast(error.message, { type: "error", autoClose: 5000 });
    }
  }, [reload, startWhitelistCountdown]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`set-whitelist-countdown-${sale.id}`} ref={ref} />
      <div className="modal px-2">
        <div className="bg-[#151938] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-sm lg:text-lg leading-6 text-[#f5f5f5] font-[500]">
              set whitelist countdown
            </span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <div className="w-full px-2 py-2 flex flex-col justify-start items-center gap-8 overflow-auto z-30">
            <div className="w-full flex flex-col justify-start items-start gap-6 rounded-[5px] px-2 py-2">
              <span className="font-[inter] font-[500] capitalize text-xs lg:text-sm">start date</span>
              <DateField date={startTime} width="100%" height={55} onDateChanged={d => setStartTime(d.getTime())} />
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-6 rounded-[5px] px-2 py-2">
              <span className="font-[inter] font-[500] capitalize text-xs lg:text-sm">duration (in days)</span>
              <InputField
                value={durationInDays}
                type="number"
                onTextChange={ev => setDurationIndays(ev.target.valueAsNumber || 0)}
                width="100%"
                height={55}
              />
            </div>
          </div>
          <div className="modal-action w-full py-7">
            <CTAPurple
              disabled={isLoading}
              onPress={callStartCountdown}
              label={
                <div className="w-full flex justify-center items-center gap-2">
                  <span className="text-[#fff] capitalize text-[1.2em] font-inter">submit</span>
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

export default StartWhitelistCountdownModal;
