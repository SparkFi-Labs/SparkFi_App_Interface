import { SkewedButtonPrimary } from "@/components/Button";
import { inter, monda } from "@/fonts";
import FeaturedPools from "@/views/Home/FeaturedPools";

export default function Home() {
  return (
    <main className="flex flex-col w-screen items-center justify-between py-12 md:py-24 min-h-full gap-12 overflow-x-hidden">
      <div className="flex flex-col w-full md:w-1/3 justify-center items-center gap-12 px-3">
        <div className="flex flex-col w-full justify-center items-center gap-3">
          <span className={`${monda.className} text-[#828282] capitalize font-[700] text-lg md:text-xl`}>sparkFi</span>
          <span className={`${monda.className} text-[#000] capitalize font-[700] text-xl md:text-4xl text-center`}>
            the first launchpad on base
          </span>
          <span className={`${inter.className} text-[#828282] font-[500] text-sm md:text-lg text-center`}>
            Welcome to SparkFi, the launching point for exceptional ideas and the bridge between vision and reality.
            Powered by Base network
          </span>
        </div>

        <div className="w-[80%] md:w-1/3">
          <SkewedButtonPrimary label="View Pools" width="100%" height={50} />
        </div>
      </div>

      <div className="w-full bg-[#f2f7ff] md:min-h-[212px] px-3 md:px-7 py-3 md:py-7">
        <div className="hidden md:flex justify-evenly items-center w-full">
          <div className="flex-col flex justify-start items-start border-r border-r-[#828282] w-1/5 min-h-[126px] gap-4">
            <span className={`text-5xl font-[700] ${monda.className} text-[#000]`}>$300K+</span>
            <span className={`text-lg ${inter.className} font-[700] text-[#828282] capitalize`}>funds raised</span>
          </div>

          <div className="flex-col flex justify-start items-start border-r border-r-[#828282] w-1/5 min-h-[126px] gap-4">
            <span className={`text-5xl font-[700] ${monda.className} text-[#000]`}>2K+</span>
            <span className={`text-lg ${inter.className} font-[700] text-[#828282] capitalize`}>
              unique participants
            </span>
          </div>

          <div className="flex-col flex justify-start items-start border-r border-r-[#828282] w-1/5 min-h-[126px] gap-4">
            <span className={`text-5xl font-[700] ${monda.className} text-[#000]`}>700M</span>
            <span className={`text-lg ${inter.className} font-[700] text-[#828282] capitalize`}>sPAK staked</span>
          </div>

          <div className="flex-col flex justify-start items-start w-1/5 min-h-[126px] gap-4">
            <span className={`text-5xl font-[700] ${monda.className} text-[#000]`}>2350</span>
            <span className={`text-lg ${inter.className} font-[700] text-[#828282] capitalize`}>unique stakers</span>
          </div>
        </div>

        <div className="md:hidden w-full flex flex-col justify-center items-center">
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex-col flex justify-start items-start border-r border-r-[#828282] w-1/2 gap-1">
              <span className={`text-xl font-[700] ${monda.className} text-[#000]`}>$300K+</span>
              <span className={`text-xs ${inter.className} font-[700] text-[#828282] capitalize`}>funds raised</span>
            </div>
            <div className="flex-col flex justify-start items-end w-1/2 gap-1 self-end">
              <span className={`text-xl font-[700] ${monda.className} text-[#000]`}>700M</span>
              <span className={`text-xs ${inter.className} font-[700] text-[#828282] capitalize`}>sPAK staked</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex w-full justify-between items-center gap-2">
            <div className="flex-col flex justify-start items-start border-r border-r-[#828282] w-1/2 gap-1">
              <span className={`text-xl font-[700] ${monda.className} text-[#000]`}>2K+</span>
              <span className={`text-xs ${inter.className} font-[700] text-[#828282] capitalize`}>
                unique participants
              </span>
            </div>
            <div className="flex-col flex justify-start items-end w-1/2 gap-1 self-end">
              <span className={`text-xl font-[700] ${monda.className} text-[#000]`}>2350</span>
              <span className={`text-xs ${inter.className} font-[700] text-[#828282] capitalize`}>unique stakers</span>
            </div>
          </div>
        </div>
      </div>

      <FeaturedPools />
    </main>
  );
}
