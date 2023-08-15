import type { TokenSale } from "@/.graphclient";
import { isNil, multiply } from "lodash";

interface SingleSalePoolInfoProps {
  data: TokenSale;
}

export default function SingleSalePoolInfo({ data }: SingleSalePoolInfoProps) {
  return (
    <div className="flex justify-start items-center w-full py-5 px-3 flex-col gap-12">
      <div className="flex justify-between items-center w-full">
        <span className="font-inter text-[#fff] text-[15px] lg:text-[18px]">Whitelist open</span>
        <span className="font-inter text-[#dcdcdc] text-[13px] lg:text-[16px] font-[400] text-right">
          {!isNil(data.whitelistStartTime)
            ? new Date(multiply(parseInt(data.whitelistStartTime as string), 1000)).toLocaleString()
            : "No whitelisting"}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="font-inter text-[#fff] text-[15px] lg:text-[18px]">Whitelist close</span>
        <span className="font-inter text-[#dcdcdc] text-[13px] lg:text-[16px] text-right">
          {!isNil(data.whitelistEndTime)
            ? new Date(multiply(parseInt(data.whitelistEndTime as string), 1000)).toLocaleString()
            : "No whitelisting"}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="font-inter text-[#fff] text-[15px] lg:text-[18px]">Sale opens</span>
        <span className="font-inter text-[#dcdcdc] text-[13px] lg:text-[16px] text-right">
          {new Date(multiply(parseInt(data.startTime as string), 1000)).toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="font-inter text-[#fff] text-[15px] lg:text-[18px] font-[400]">Sale closes</span>
        <span className="font-inter text-[#dcdcdc] text-[13px] lg:text-[16px] text-right">
          {new Date(multiply(parseInt(data.endTime as string), 1000)).toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="font-inter text-[#fff] text-[15px] lg:text-[18px]">Distribution starts</span>
        <span className="font-inter text-[#dcdcdc] text-[13px] lg:text-[16px] text-right">
          {new Date(
            multiply(parseInt(data.endTime as string), 1000) + multiply(data.withdrawDelay, 1000)
          ).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
