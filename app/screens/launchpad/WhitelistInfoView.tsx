import type { TokenSale } from "@/.graphclient";
import { useContractOwner } from "@/hooks/contracts";
import presaleAbi from "@/assets/abis/Presale.json";
import { floor, isEqual, isNil, multiply, toLower } from "lodash";
import { useWeb3React } from "@web3-react/core";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import { useRef } from "react";
import StartWhitelistCountdownModal from "@/ui/Modals/StartWhitelistCountdownModal";
import { useAtomicDate } from "@/hooks/app/shared";
import Countdown from "react-countdown";
import SetWhitelistModal from "@/ui/Modals/SetWhitelistModal";

interface WhitelistInfoViewProps {
  data: TokenSale;
}

export default function WhitelistInfoView({ data }: WhitelistInfoViewProps) {
  const contractOwner = useContractOwner(data.id, presaleAbi);
  const { account } = useWeb3React();
  const setWhitelistCountdownModalRef = useRef<HTMLInputElement>(null);
  const setWhitelistModalRef = useRef<HTMLInputElement>(null);
  const atomicDate = useAtomicDate();

  return (
    <div className="w-full flex justify-center items-center px-2 py-2 h-full">
      {isNil(data.whitelistStartTime) ? (
        <div className="flex flex-col gap-4 w-full lg:w-1/3 justify-center items-center">
          <span className="text-[#fff] font-[500] text-sm lg:text-lg capitalize">no whitelist</span>
          {!isNil(account) && isEqual(toLower(account), toLower(contractOwner)) && (
            <CTAPurple
              onPress={() => {
                if (!isNil(setWhitelistCountdownModalRef.current)) setWhitelistCountdownModalRef.current.checked = true;
              }}
              label={<span className="font-inter capitalize text-sm">start whitelist countdown</span>}
              width="100%"
              height={55}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full lg:w-1/3 justify-center items-center">
          {parseInt(data.whitelistStartTime) > floor(atomicDate.getTime() / 1000) ? (
            <Countdown
              date={multiply(parseInt(data.startTime), 1000)}
              renderer={({ days, hours, minutes, seconds }) => (
                <CTAPurpleOutline
                  label={
                    <span className="font-inter capitalize text-[1em] lg:text-[1.3em]">
                      whitelist starts in {days}D:{hours}H:{minutes}M:{seconds}S
                    </span>
                  }
                  width="100%"
                  height={55}
                />
              )}
            />
          ) : (
            <>
              <Countdown
                date={multiply(parseInt(data.whitelistEndTime), 1000)}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <span className="font-inter font-[400] capitalize text-[1em] lg:text-[1.3em]">
                    {!completed
                      ? `whitelist ends in ${days}D:${hours}H:${minutes}M:${seconds}S`
                      : `whitelist ended on ${new Date(multiply(parseInt(data.endTime), 1000)).toISOString()}`}
                  </span>
                )}
              />
              {!isNil(account) && isEqual(toLower(account), toLower(contractOwner)) && (
                <CTAPurpleOutline
                  disabled={parseInt(data.whitelistEndTime) <= floor(atomicDate.getTime() / 1000)}
                  onPress={() => {
                    if (!isNil(setWhitelistModalRef.current)) setWhitelistModalRef.current.checked = true;
                  }}
                  width="100%"
                  height={55}
                  label={<span className="font-inter capitalize text-sm">whitelist</span>}
                />
              )}
            </>
          )}
        </div>
      )}
      <StartWhitelistCountdownModal
        ref={setWhitelistCountdownModalRef}
        close={() => {
          if (!isNil(setWhitelistCountdownModalRef.current)) setWhitelistCountdownModalRef.current.checked = false;
        }}
        sale={data}
      />
      <SetWhitelistModal
        ref={setWhitelistModalRef}
        close={() => {
          if (!isNil(setWhitelistModalRef.current)) setWhitelistModalRef.current.checked = false;
        }}
        sale={data}
      />
    </div>
  );
}
