import { useWeb3React } from "@web3-react/core";
import { FaWallet } from "react-icons/fa";
import { formatEthAddress } from "eth-address";
import { CTAPurple } from "@/components/Button";
import { useMyTokenBalance } from "@/hooks/wallet";
import { sparkFiTokenContracts } from "@/assets/contracts";
import { useTokenDetails } from "@/hooks/contracts";

export default function Profile() {
  const { isActive, account } = useWeb3React();
  const tokenBalance = useMyTokenBalance(sparkFiTokenContracts);
  const tokenDetails = useTokenDetails(sparkFiTokenContracts);
  return (
    <div className="flex flex-col gap-7 justify-start items-center w-screen bg-[#101221]">
      <div className=" w-full bg-[url('/images/profile_overview.png')] bg-no-repeat bg-cover flex justify-between items-start px-14 lg:min-h-[20rem]">
        <div className="flex justify-center items-end h-[6rem] lg:h-[12rem]">
          <span className="text-[#fff] capitalize font-[700]">account overview</span>
        </div>
        <div className="hidden lg:flex flex-col justify-center items-center h-[12rem]">
          <div className="bg-[#151938] rounded-[0.3125rem] flex justify-start items-center px-1 py-1 gap-2 h-10">
            <div className="bg-[#14172e] rounded-[0.3125rem] px-1 py-1">
              <FaWallet className="text-[1.2em]" />
            </div>
            <span className="text-[#c1c9ff] font-[500] text-[1em]">{isActive ? account : "Not Connected"}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-2">
        <div className="bg-[#000] rounded-[0.3125rem] flex justify-start items-center px-1 py-1 gap-2 lg:hidden w-full">
          <div className="bg-[#14172e] rounded-[0.3125rem] px-1 py-1">
            <FaWallet className="text-[1.5em]" />
          </div>
          <span className="text-[#c1c9ff] font-[500] text-[1em]">
            {isActive && account ? formatEthAddress(account as string, 12) : "Not Connected"}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full px-3 py-4 lg:px-14 gap-5">
        <div className="bg-[#000] rounded-[0.3125rem] flex flex-col justify-start items-start px-7 py-7 w-full lg:w-1/3 gap-12">
          <span className="text-[#c1c9ff] uppercase text-[0.9375rem] font-[400]">{tokenDetails?.symbol} staked</span>
          <span className="text-[#fff] text-[1.875rem] font-[700]">0.00</span>
        </div>
        <div className="bg-[#000] rounded-[0.3125rem] flex flex-col justify-start items-start px-7 py-7 w-full lg:w-1/3 gap-12">
          <span className="text-[#c1c9ff] uppercase text-[0.9375rem] font-[400]">{tokenDetails?.symbol} balance</span>
          <span className="text-[#fff] text-[1.875rem] font-[700]">{tokenBalance}</span>
        </div>
      </div>
      <div className="w-full px-3 py-4 lg:px-14">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center w-full bg-[#000] px-7 py-7 gap-5">
          <div className="flex flex-col justify-start items-start w-full lg:w-1/3 gap-12">
            <span className="text-[#c1c9ff] uppercase text-[0.9375rem] font-[400]">kyc</span>
            <span className="text-[#fff] text-[1.875rem] font-[400] uppercase">not yet approved</span>
          </div>
          <CTAPurple
            label={<span className="text-[1.5625rem] uppercase font-[400]">kyc now!</span>}
            width={300}
            height={60}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full px-3 py-4 lg:px-14 gap-5">
        <div className="bg-[#000] rounded-[0.3125rem] flex flex-col justify-start items-start px-7 py-7 w-full lg:w-1/3 gap-12">
          <span className="text-[#c1c9ff] uppercase text-[0.9375rem] font-[400]">stake tier</span>
          <span className="text-[#fff] text-[1.875rem] font-[700] capitalize">gold</span>
        </div>
        <div className="bg-[#000] rounded-[0.3125rem] flex flex-col justify-start items-start px-7 py-7 w-full lg:w-1/3 gap-12">
          <span className="text-[#c1c9ff] uppercase text-[0.9375rem] font-[400]">reward in</span>
          <span className="text-[#fff] text-[1.875rem] font-[700] uppercase">0 days</span>
        </div>
      </div>
    </div>
  );
}
