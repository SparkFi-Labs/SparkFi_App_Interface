import type { TokenSale } from "@/.graphclient";
import { isNil, map, multiply } from "lodash";

interface SingleSaleVestingInfoProps {
  data: TokenSale;
}

export default function SingleSaleVestingInfo({ data }: SingleSaleVestingInfoProps) {
  return (
    <div className="flex flex-col justify-start items-start px-1 py-1 lg:py-3 lg:px-3 w-full overflow-auto gap-7">
      <span className="font-[400] text-sm lg:text-xl capitalize">vesting</span>
      {!isNil(data.vestingType) && (
        <div className="w-full overflow-x-auto">
          <table className="table table-sm lg:table-lg">
            <thead>
              <tr className="border-[#878aa1]">
                <th className="capitalize">no</th>
                <th className="capitalize">percentage</th>
                <th className="capitalize">release date</th>
              </tr>
            </thead>
            <tbody>
              {data.vestingType === "LINEAR" ? (
                <tr className="bg-transparent border-[#878aa1]">
                  <th className="font-inter">1</th>
                  <td className="font-inter">100%</td>
                  <td className="font-inter">
                    {new Date(multiply(parseInt(data.linearVesting?.endTime), 1000)).toUTCString()}
                  </td>
                </tr>
              ) : (
                <>
                  {map(data.cliffPeriod, (cliff, index) => (
                    <tr className="bg-transparent border-[#878aa1]" key={index}>
                      <th className="font-inter">{index + 1}</th>
                      <td className="font-inter">{cliff.percentage}%</td>
                      <td className="font-inter">
                        {new Date(multiply(parseInt(cliff.claimTime), 1000)).toUTCString()}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
