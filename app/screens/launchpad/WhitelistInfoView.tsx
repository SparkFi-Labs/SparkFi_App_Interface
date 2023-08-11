import type { TokenSale } from "@/.graphclient";
import { useContractOwner } from "@/hooks/contracts";
import presaleAbi from "@/assets/abis/Presale.json";
import { isEqual, isNil, toLower } from "lodash";
import { useWeb3React } from "@web3-react/core";
import { CTAPurple } from "@/components/Button";

interface WhitelistInfoViewProps {
  data: TokenSale;
}

export default function WhitelistInfoView({ data }: WhitelistInfoViewProps) {
  const contractOwner = useContractOwner(data.id, presaleAbi);
  const { account } = useWeb3React();

  return (
    <div className="w-full flex justify-center items-center px-2 py-2 h-full">
      {isNil(data.whitelistStartTime) ? (
        <div className="flex flex-col gap-4 w-full lg:w-1/3 justify-center items-center">
          <span className="text-[#fff] font-[500] text-sm lg:text-lg capitalize">no whitelist</span>
          {isEqual(toLower(account), toLower(contractOwner)) && (
            <CTAPurple
              label={<span className="font-inter capitalize text-sm">start whitelist countdown</span>}
              width="100%"
              height={55}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
