/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple } from "@/components/Button";
import { TextArea } from "@/components/Input";
import { usePresaleWhitelist } from "@/hooks/app/web3/launchpad";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const SetWhitelistModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const [whitelist, setWhiteList] = useState("");
  const { isLoading, setWhitelist } = usePresaleWhitelist(sale.id, whitelist);

  const { reload } = useRouter();

  const callSetWhitelist = useCallback(async () => {
    try {
      const toastId = toast("Now setting whitelist", { type: "info", autoClose: 10000 });
      await setWhitelist();

      toast.update(toastId, { render: "Successfully set whitelist", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast(error.message, { type: "error", autoClose: 5000 });
    }
  }, [reload, setWhitelist]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`set-whitelist-${sale.id}`} ref={ref} />
      <div className="modal px-2">
        <div className="bg-[#151938] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-sm lg:text-lg leading-6 text-[#f5f5f5] font-[500]">set whitelist</span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <div className="w-full px-2 py-2 flex flex-col justify-start items-center gap-8 overflow-auto z-30">
            <div className="w-full flex flex-col justify-start items-start gap-6 rounded-[5px] px-2 py-2">
              <span className="font-[inter] font-[500] capitalize text-xs lg:text-sm">whitelist</span>
              <TextArea
                value={whitelist}
                onTextChange={ev => setWhiteList(ev.target.value)}
                width="100%"
                height={250}
                placeholder="Addresses separated by a comma"
              />
            </div>
          </div>
          <div className="modal-action w-full py-7">
            <CTAPurple
              disabled={isLoading}
              onPress={callSetWhitelist}
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

export default SetWhitelistModal;
