import { CTAPurple } from "@/components/Button";
import Image from "next/image";
import { FaDiscord, FaGithub, FaMediumM, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";

export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-60 lg:gap-80 mt-60 lg:mt-80">
      <div className="w-[32.18794rem] lg:w-[72.875rem] min-h-[22rem] lg:min-h-[40.125rem] bg-[#0c0e1e] rounded-full shadow-[0px_4px_70px_40px_rgba(0,_41,_255,_0.20)_inset,_0px_4px_100px_100px_rgba(0,_41,_255,_0.20)] relative flex flex-col justify-center items-center py-24">
        <div className="absolute h-[2.45975rem] w-[2.45975rem] lg:w-[6.20875rem] lg:h-[6.20875rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#0029FF_94.37%)] -rotate-[105.332deg] right-12 top-6 lg:right-10 lg:top-[5.2rem]"></div>
        <div className="absolute h-[3.44688rem] w-[3.44688rem] lg:w-[8.03931rem] lg:h-[8.03931rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#0029FF_94.37%)] -rotate-[146.653deg] left-12 top-2"></div>
        <div className="absolute h-[1.79669rem] w-[1.79669rem] lg:w-[3.15369rem] lg:h-[3.15369rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[140.595deg] left-40 bottom-3"></div>
        <div className="flex flex-col gap-10 justify-start items-center w-1/2">
          <span className="text-[#fff] font-[600] text-[1.4em] lg:text-[35px] leading-9 text-center">
            Is your project ready to take off on SparkFi?
          </span>
          <span className="text-[#aaa] font-[400] text-[0.89em] lg:text-[18px] text-center leading-5">
            Apply to launch your project on SparkFi, or submit an early expression of interest to join our innovative
            platform and get set for an incredible launch experience!
          </span>
          <CTAPurple
            onPress={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0",
                "_blank"
              )
            }
            label="Apply for launch"
            height={55}
            width={200}
          />
        </div>
      </div>
      <footer className="bg-[#040511] w-full flex justify-center items-center py-14">
        <div className="flex flex-col gap-5 justify-start items-center w-full lg:w-1/3 px-4">
          <Image src="/images/sparkfi_logo.svg" width={70} height={70} alt="logo" />
          <div className="flex flex-row gap-5 justify-center items-center w-full text-[#fff] text-[1.4em]">
            <a href="https://twitter.com/sparkfi_xyz" rel="noreferrer" target="_blank">
              <FaTwitter />
            </a>
            <a href="https://t.me/sparkfi_xyz" rel="noreferrer" target="_blank">
              <FaTelegramPlane />
            </a>
            <a href="https://discord.com/invite/WtBvqvuaTu" rel="noreferrer" target="_blank">
              <FaDiscord />
            </a>
            <a href="https://github.com/SparkFi-Labs" rel="noreferrer" target="_blank">
              <FaGithub />
            </a>
            <a href="https://docs.sparkfi.xyz/" rel="noreferrer" target="_blank">
              <SiGitbook />
            </a>
            <a href="https://sparkfi-xyz.medium.com/" rel="noreferrer" target="_blank">
              <FaMediumM />
            </a>
          </div>
          <span className="text-[1em] text-[#fff] font-[400] capitalize">
            copyright &copy; 2023. all rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
