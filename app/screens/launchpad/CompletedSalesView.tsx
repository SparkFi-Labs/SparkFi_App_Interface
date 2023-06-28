import { useCompletedSales } from "@/hooks/app/launchpad";
import SaleItemCard from "@/ui/Cards/SaleItemCard";
import { map } from "lodash";
import { BsEmojiNeutral } from "react-icons/bs";

export default function CompletedSalesView() {
  const { data, isLoading, error } = useCompletedSales();
  return (
    <div className="flex flex-col gap-7 w-full justify-start items-start lg:px-10 px-4 py-8">
      <span className="capitalize text-[1.24rem] text-[#fff] font-[600]">completed sales</span>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
        </div>
      ) : (
        <>
          {error || (data && data.length === 0) ? (
            <div className="bg-[#0c0e1e] rounded-[10px] w-full flex justify-center items-center flex-col gap-7 py-32">
              <div className="w-[4rem] h-[4rem] px-3 py-3 rounded-full flex justify-center items-center bg-[#131735]">
                <BsEmojiNeutral className="text-[#c1c9ff] text-[4rem]" />
              </div>
              <span className="text-[#fff] text-[0.9rem] lg:text-[0.9875rem] font-[600] text-center">
                {error
                  ? (error as any).errors
                    ? JSON.stringify((error as any).errors.map((e: any) => e.message))
                    : error.message
                  : "No completed launch available at the moment"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full gap-8">
              {data &&
                map(data, (item, index) => (
                  <div key={index} className="w-full lg:w-1/3">
                    <SaleItemCard data={item} width="100%" />
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
