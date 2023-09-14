import { SkewedButtonPrimary } from "@/components/Button";
import { inter, monda } from "@/fonts";

export default function Home() {
  return (
    <main className="flex flex-col w-screen items-center justify-between py-12 md:py-24 flex-1 min-h-full gap-12">
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
    </main>
  );
}
