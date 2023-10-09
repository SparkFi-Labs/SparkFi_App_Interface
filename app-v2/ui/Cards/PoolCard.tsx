"use client";

/* eslint-disable @next/next/no-img-element */
import Card, { ICardProps } from "@/components/Card";
import Progress from "@/components/Progress";
import { inter, monda } from "@/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";

interface IPoolCardProps extends ICardProps {
  data: any;
  label?: "upcoming" | "open" | "closed";
}

export default function PoolCard({ data, label = "upcoming", ...props }: IPoolCardProps) {
  const { push } = useRouter();
  const [prg, setProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
      if (prg < 100) setProgress(prg + 1);
    }, 20000);
  }, [prg]);

  return (
    <Card {...props} style={{ backgroundColor: "#e7f0fe", borderRadius: 10 }}>
      <div className="card-body justify-start items-center">
        <div className="flex w-full flex-col justify-start items-center gap-5">
          <div className="w-full flex justify-start items-start gap-5">
            <div className="avatar">
              <div className="md:w-32 md:h-32 w-20 h-20 rounded-lg ring ring-info">
                <img src="/images/link-logo.png" alt="logo" />
              </div>
            </div>
            <div className="flex flex-col justify-start self-stretch items-start min-h-[5rem] md:min-h-[8rem] gap-4">
              <div className="flex justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-2 bg-[linear-gradient(90deg,_#0019FF_5.79%,_#6678FF_100%)] -skew-x-[0.312rad] md:px-2 md:py-2 px-1 py-1 md:min-w-[129px]">
                  <span
                    className={`md:w-2 md:h-2 h-1 w-1 rounded-full ${
                      label === "upcoming" ? "bg-white" : label === "open" ? "bg-[#00ffd1]" : "bg-[#f00]"
                    } skew-x-[0.312rad]`}
                  ></span>
                  <span
                    className={`${inter.className} font-[500] text-xs md:text-sm text-white capitalize skew-x-[0.312rad]`}
                  >
                    {label}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-2 bg-[#151938] -skew-x-[0.312rad] md:px-2 md:py-2 px-1 py-1">
                  <span
                    className={`${inter.className} font-[500] text-xs md:text-sm text-white skew-x-[0.312rad] uppercase`}
                  >
                    usdc
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className={`${monda.className} text-2xl md:text-3xl font-[700]`}>SparkFi</span>
                <div className="flex justify-start items-start gap-2">
                  <FiMapPin className="text-[#828282]" size={12} />
                  <span className={`text-[#828282] text-xs uppercase ${inter.className} font-[500]`}>base</span>
                </div>
              </div>
            </div>
          </div>
          <p className={`text-[#312d2d] ${inter.className} text-xs md:text-sm font-[400]`}>
            The very first IDO launchpad on Base Chain. We&apos;re more than just a launchpad; we&apos;re the launching
            point for exceptional ideas, and the catalyst for transformative projects.
          </p>
        </div>

        <div className="flex flex-col border-t border-t-[#fff] w-full py-3">
          <div className="flex justify-between items-start gap-2 w-full">
            <div className="flex flex-col justify-start items-start gap-3 w-1/3">
              <h5 className={`text-[#5e5e5e] ${inter.className} text-xs md:text-sm capitalize font-[400]`}>
                swap rate
              </h5>
              <span className={`text-[#000] ${inter.className} text-xs md:text-sm font-[700] uppercase`}>
                1 usdc = 200.000 spak
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-3 w-1/3">
              <h5 className={`text-[#5e5e5e] ${inter.className} text-xs md:text-sm capitalize font-[400]`}>hard cap</h5>
              <span className={`text-[#000] ${inter.className} text-xs md:text-sm font-[700] uppercase`}>
                300000 usdc
              </span>
            </div>
            <div className="flex flex-col justify-start items-start gap-3">
              <h5 className={`text-[#5e5e5e] ${inter.className} text-xs md:text-sm capitalize font-[400]`}>access</h5>
              <span className={`text-[#000] ${inter.className} text-xs md:text-sm font-[700] capitalize`}>private</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-t border-t-[#fff] w-full py-3 gap-3 justify-start items-center">
          <div className="flex justify-between items-start gap-2 w-full">
            <h5 className={`text-[#5e5e5e] ${inter.className} text-xs md:text-sm capitalize font-[400]`}>
              swap progress
            </h5>
            <div className="flex justify-start items-start gap-1">
              <h5 className={`text-[#5e5e5e] ${inter.className} text-xs md:text-sm capitalize font-[400]`}>
                participants:
              </h5>
              <span className={`text-[#000] ${inter.className} text-xs md:text-sm font-[700]`}>0</span>
            </div>
          </div>

          <Progress progress={prg} />
        </div>
      </div>
    </Card>
  );
}
