import { CTAPurpleOutline } from "@/components/Button";
import { useUpcomingSales } from "@/hooks/app/launchpad";
import SaleItemCard from "@/ui/Cards/SaleItemCard";
import NoDataOrError from "@/ui/NoDataOrError";
import { map } from "lodash";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

export default function UpcomingSalesView() {
  const { push } = useRouter();

  const { data, isLoading, error } = useUpcomingSales();
  return (
    <div className="flex flex-col gap-7 w-full justify-start items-start lg:px-10 px-4 py-4">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-start gap-4">
        <div className="flex justify-start flex-col items-start gap-3 w-full lg:w-1/2">
          <span className="capitalize text-[2rem] text-[#fff] font-[600]">upcoming projects</span>
          <span className="text-[#aaa] text-[1rem] font-[500]">
            Explore our meticulously curated collection of live and forthcoming projects, rigorously vetted for
            excellence and engage in the exhilarating realm of groundbreaking unveilings.
          </span>
        </div>
        <div className="w-full lg:w-[10%]">
          <CTAPurpleOutline
            onPress={() => push("/launchpad")}
            width="100%"
            height={50}
            label={
              <div className="flex justify-center items-center gap-4 text-[#fff] w-full text-[1em]">
                <span className="capitalize font-[500]">see all projects</span>
                <BsArrowRight />
              </div>
            }
          />
        </div>
      </div>
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
                  : "No upcoming launch available at the moment"
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
                    <SaleItemCard onPress={() => push(`/launchpad/sales/${item.id}`)} data={item} width="100%" />
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
