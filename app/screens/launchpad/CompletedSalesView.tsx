import { CTAPurple } from "@/components/Button";
import Card from "@/components/Card";
import { useCompletedSales } from "@/hooks/app/launchpad";
import SaleItemCard from "@/ui/Cards/SaleItemCard";
import { map } from "lodash";

export default function CompletedSalesView() {
  const { data, isLoading, error } = useCompletedSales();
  return (
    <div className="flex flex-col gap-12 w-full justify-start items-start container mx-auto">
      <span className="capitalize text-[1.24rem] text-[#fff] font-[600]">completed sales</span>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
        </div>
      ) : (
        <>
          {error || (data && data.length === 0) ? (
            <div className="border border-dashed border-[#0029ff] w-full lg:w-1/2 rounded-[8px]">
              <Card width="100%" height={350}>
                <div className="card-body w-full justify-start items-center">
                  <div className="flex flex-col w-full justify-center items-center gap-10 py-6 px-3 lg:px-7">
                    <span className="font-[400] capitalize text-[1.2em] text-center">
                      no completed projects at the moment
                    </span>
                    <span className="font-[500] capitalize text-[1em] font-inter">apply for launch</span>
                    <CTAPurple
                      width="90%"
                      height={50}
                      label={<span className="font-inter font-[500] text-[1.1em] capitalize">submit your project</span>}
                    />
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className={`flex flex-col lg:flex-row justify-start lg:justify-center items-center w-full gap-8`}>
              {data &&
                data.length &&
                map(data, (item, index) => (
                  <div key={index} className="w-full lg:w-1/2 rounded-[8px]">
                    <SaleItemCard data={item} width="100%" />
                  </div>
                ))}
              {data && data.length === 1 && (
                <div className="border border-dashed border-[#0029ff] w-full lg:w-1/2 rounded-[8px]">
                  <Card width="100%" height={350}>
                    <div className="card-body w-full justify-start items-center">
                      <div className="flex flex-col w-full justify-center items-center gap-10 py-6 px-3 lg:px-7">
                        <span className="font-[500] capitalize text-[1em] font-inter">apply for launch</span>
                        <CTAPurple
                          width="90%"
                          height={50}
                          label={
                            <span className="font-inter font-[500] text-[1.1em] capitalize">submit your project</span>
                          }
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
