/* eslint-disable react/display-name */
import type { TokenSale } from "@/.graphclient";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import { usePresaleCasher, usePresaleSetCliffVesting, usePresaleSetLinearVesting } from "@/hooks/app/web3/launchpad";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { Tab, Tabs } from "../Tabs";
import { DateField, InputField } from "@/components/Input";
import { add, floor, keys, map, values } from "lodash";

interface ModalProps {
  close: () => any;
  sale: TokenSale;
}

const SetVestingModal = forwardRef<HTMLInputElement, ModalProps>(({ sale, close }, ref) => {
  const { isLoading: linearVestingLoading, setLinearVesting } = usePresaleSetLinearVesting(sale.id);
  const { isLoading: cliffVestingLoading, setCliffs } = usePresaleSetCliffVesting(sale.id);
  const [activeTab, setActiveTab] = useState(0);

  const [linearVestingEndTime, setLinearVestingEndTime] = useState(
    add(parseInt(sale.endTime), sale.withdrawDelay) * 1000
  );

  const [cliffVesting, setCliffVesting] = useState({
    [Date.now()]: {
      percentage: 100,
      time: add(parseInt(sale.endTime), sale.withdrawDelay) * 1000
    }
  });

  const { reload } = useRouter();

  const callSetLinearVesting = useCallback(async () => {
    const toastId = toast("Now setting linear vesting", { type: "info", autoClose: 40000 });
    try {
      await setLinearVesting(floor(linearVestingEndTime / 1000));

      toast.update(toastId, { render: "Successfully set linear vesting", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast.update(toastId, { type: "error", autoClose: 5000, render: error.reason || error.message });
    }
  }, [linearVestingEndTime, reload, setLinearVesting]);

  const callSetCliffVesting = useCallback(async () => {
    const toastId = toast("Now setting cliff vesting", { type: "info", autoClose: 40000 });
    try {
      const ct = map(values(cliffVesting), ({ time }) => floor(time / 1000));
      const pct = map(values(cliffVesting), ({ percentage }) => percentage);
      await setCliffs(ct, pct);

      toast.update(toastId, { render: "Successfully set cliff vesting", type: "success", autoClose: 5000 });

      reload();
    } catch (error: any) {
      toast.update(toastId, { type: "error", autoClose: 5000, render: error.reason || error.message });
    }
  }, [cliffVesting, reload, setCliffs]);

  return (
    <>
      <input type="checkbox" className="modal-toggle" id={`set-whitelist-${sale.id}`} ref={ref} />
      <div className="modal px-2">
        <div className="bg-[#151938] rounded-[5px] modal-box flex flex-col justify-start items-center gap-7 w-full container mx-auto">
          <div className="flex justify-between items-center px-3 py-1 w-full">
            <span className="capitalize text-sm lg:text-lg leading-6 text-[#f5f5f5] font-[500]">set vesting</span>
            <button onClick={close} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
              <FiX />
            </button>
          </div>
          <Tabs activeTab={activeTab}>
            <Tab label="Linear" onTabSelected={() => setActiveTab(0)} />
            <Tab label="Cliff" onTabSelected={() => setActiveTab(1)} />
          </Tabs>
          {activeTab === 0 ? (
            <>
              <div className="flex flex-col justify-start items-start gap-2 w-full">
                <span className="text-[#fff] capitalize text-xs lg:text-sm font-inter font-[500]">
                  vesting end time
                </span>
                <DateField
                  date={linearVestingEndTime}
                  width="100%"
                  height={40}
                  onDateChanged={d => setLinearVestingEndTime(d.getTime())}
                />
              </div>
              <div className="modal-action py-7 w-full">
                <CTAPurple
                  disabled={linearVestingLoading || cliffVestingLoading}
                  onPress={callSetLinearVesting}
                  label={
                    <div className="w-full flex justify-center items-center gap-2">
                      <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">
                        set linear vesting
                      </span>
                      {linearVestingLoading && (
                        <span className="loading loading-infinity loading-md text-accent"></span>
                      )}
                    </div>
                  }
                  width="100%"
                  height={55}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-start items-start gap-2 w-full">
                {map(Object.keys(cliffVesting), (key, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-3 w-full"
                  >
                    <div className="flex flex-col justify-start items-start gap-2 w-full lg:w-1/2">
                      <span className="text-[#fff] capitalize text-xs lg:text-sm font-inter font-[500]">time</span>
                      <DateField
                        date={cliffVesting[parseInt(key)].time}
                        width="100%"
                        height={40}
                        onDateChanged={d =>
                          setCliffVesting(v => {
                            v[parseInt(key)].time = d.getTime();
                            return v;
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2 w-full lg:w-1/2">
                      <span className="text-[#fff] capitalize text-xs lg:text-sm font-inter font-[500]">
                        percentage
                      </span>
                      <InputField
                        value={cliffVesting[parseInt(key)].percentage}
                        type="number"
                        width="100%"
                        height={40}
                        onTextChange={ev =>
                          setCliffVesting(v => {
                            v[parseInt(key)].percentage = ev.target.valueAsNumber || 100;
                            return v;
                          })
                        }
                      />
                    </div>
                    <button
                      disabled={keys(cliffVesting).length === 1}
                      onClick={() =>
                        setCliffVesting(v => {
                          delete v[parseInt(key)];
                          return v;
                        })
                      }
                      className="btn btn-ghost btn-sm btn-square h-full self-center"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <div className="modal-action py-7 w-full gap-3">
                  <CTAPurpleOutline
                    onClick={() =>
                      setCliffVesting(v => ({ ...v, [Date.now()]: { percentage: 100, time: Date.now() } }))
                    }
                    label={
                      <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">add fields</span>
                    }
                    width="100%"
                    height={55}
                  />
                  <CTAPurple
                    disabled={cliffVestingLoading || linearVestingLoading}
                    onPress={callSetCliffVesting}
                    label={
                      <div className="w-full flex justify-center items-center gap-2">
                        <span className="text-[#fff] capitalize text-[1.2em] font-inter font-[500]">
                          set cliff vesting
                        </span>
                        {cliffVestingLoading && (
                          <span className="loading loading-infinity loading-md text-accent"></span>
                        )}
                      </div>
                    }
                    width="100%"
                    height={55}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </>
  );
});

export default SetVestingModal;
