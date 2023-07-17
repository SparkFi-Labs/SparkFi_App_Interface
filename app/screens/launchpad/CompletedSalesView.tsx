import { useCompletedSales } from "@/hooks/app/launchpad";
import SaleItemCard from "@/ui/Cards/SaleItemCard";
import NoDataOrError from "@/ui/NoDataOrError";
import { map } from "lodash";
import { useRouter } from "next/router";

export default function CompletedSalesView() {
  const { push } = useRouter();

  const { data, isLoading, error } = useCompletedSales();
  return (
    <div className="flex flex-col gap-12 w-full justify-start items-start lg:px-10 px-4 py-8">
      <span className="capitalize text-[1.24rem] text-[#fff] font-[600]">completed sales</span>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
        </div>
      ) : (
        <>
          {error || (data && data.length === 0) ? (
            <NoDataOrError
              message={
                error
                  ? (error as any).errors
                    ? JSON.stringify((error as any).errors.map((e: any) => e.message))
                    : error.message
                  : "No completed launch available at the moment"
              }
            />
          ) : (
            <div
              className={`flex flex-col lg:flex-row justify-start ${
                (data?.length || 0) % 3 === 0 ? "lg:justify-between" : "lg:justify-start"
              } items-center w-full gap-8`}
            >
              {data &&
                map(data, (item, index) => (
                  <div key={index} className="w-full lg:w-1/4">
                    <SaleItemCard
                      hoverEffect
                      onPress={() => push(`/launchpad/sales/${item.id}`)}
                      data={item}
                      width="100%"
                    />
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
