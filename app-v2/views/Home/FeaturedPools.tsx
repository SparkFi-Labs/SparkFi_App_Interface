import { monda } from "@/fonts";
import PoolCard from "@/ui/Cards/PoolCard";

export default function FeaturedPools() {
  return (
    <section className="flex flex-col justify-start items-center gap-12 w-full">
      <h3 className={`capitalize text-2xl md:text-4xl ${monda.className} font-[700]`}>featured pools</h3>
      <div className="flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start gap-6 w-full px-3">
        <div className="w-full md:w-1/4">
          <PoolCard width="100%" label="upcoming" data={{}} />
        </div>

        <div className="w-full md:w-1/4">
          <PoolCard width="100%" label="open" data={{}} />
        </div>
      </div>
    </section>
  );
}
