import Image from "next/image";
import { FaDiscord, FaGithub, FaMediumM, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";

export default function Footer() {
  return (
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
  );
}
