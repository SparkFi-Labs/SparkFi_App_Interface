import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { useUpcomingSales } from "@/hooks/app/launchpad";
import SaleItemCard from "@/ui/Cards/SaleItemCard";
import { map } from "lodash";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

export default function UpcomingSalesView() {
  const { push } = useRouter();

  const { data, isLoading, error } = useUpcomingSales();
  return (
    <div className="flex flex-col gap-7 w-full justify-start items-start container mx-auto">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-start gap-4">
        <div className="flex justify-start flex-col items-start gap-3 w-full lg:w-1/2">
          <span className="capitalize text-[2rem] text-[#fff] font-[400]">upcoming projects</span>
          <span className="text-[#aaa] text-[1rem] font-[500] font-inter">
            Explore our meticulously curated collection of live and forthcoming projects, rigorously vetted for
            excellence and engage in the exhilarating realm of groundbreaking unveilings.
          </span>
        </div>
        <div className="w-full lg:w-[15%]">
          <CTAPurpleOutline
            onPress={() => push("/launchpad")}
            width="100%"
            height={50}
            label={
              <div className="flex justify-between items-center gap-4 text-[#fff] w-full text-[1em] px-2 group">
                <span className="capitalize font-[500] font-inter">see all projects</span>
                <BsArrowRight size={20} className="group-hover:translate-x-3 duration-150 ease-in-out" />
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
            <div className="border border-dashed border-[#0029ff] w-full lg:w-1/2 rounded-[8px]">
              <Card width="100%" height={350}>
                <div className="card-body w-full justify-start items-center">
                  <div className="flex flex-col w-full justify-center items-center gap-10 py-6 px-3 lg:px-7">
                    <span className="font-[400] capitalize text-[1.2em] text-center">
                      no upcoming projects at the moment
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
