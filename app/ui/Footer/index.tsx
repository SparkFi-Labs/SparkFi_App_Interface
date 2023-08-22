import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0029ff] w-full flex flex-col justify-start lg:justify-center items-start lg:items-center gap-7 py-4">
      <div className="flex flex-col justify-start lg:justify-center items-start lg:items-center py-14 px-2 lg:px-28 gap-8 lg:gap-12">
        <div className="flex justify-start w-full items-center">
          <Link href="/" className="flex justify-center gap-1 items-center">
            <Image src="/images/logo.svg" height={30} width={30} alt="logo" />
            <span className="text-[#fff] font-[500] text-[0.87em] lg:text-[1.5em] font-manuale">SparkFi</span>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row justify-evenly items-start w-full gap-7 lg:gap-16">
          <span className="text-[#fff] text-xs lg:text-sm font-[400] leading-5 font-inter w-full lg:w-1/4">
            SparkFi is an ultimate platform that fuels innovation and propels startups to new heights! At SparkF our
            mission is to provide a launchpad for crypto startups, equipping them with the necessary resources,
            mentorship, and networking opportunities to thrive in today&apos;s fast-paced business landscape.
          </span>
          <div className="flex flex-col justify-start lg:justify-center items-start w-full lg:w-1/4 gap-7">
            <span className="uppercase text-lg lg:text-xl font-[400]">information</span>
            <div className="flex flex-col justify-start items-start w-full font-inter font-[400] gap-5 text-sm lg:text-lg capitalize">
              <Link className="font-inter font-[400]" href="/#faq">
                FAQ
              </Link>
              <a className="font-inter" href="#faq">
                litepaper
              </a>
              <a className="font-inter" href="https://github.com/SparkFi-Labs" target="_blank">
                github
              </a>
              <a className="font-inter" href="#faq">
                contact
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-start lg:justify-center items-start w-full lg:w-1/4 gap-7">
            <span className="uppercase text-lg lg:text-xl font-[400]">explore</span>
            <div className="flex flex-col justify-start items-start w-full font-inter font-[400] gap-5 text-sm lg:text-lg capitalize">
              <Link className="font-inter" href="/launchpad">
                pools
              </Link>
              <Link className="font-inter" href="/staking">
                staking
              </Link>
              <a className="font-inter" href="#" target="_blank">
                SPAK token
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-start lg:justify-center items-start w-full lg:w-1/4 gap-7">
            <span className="uppercase text-lg lg:text-xl font-[400]">connect</span>
            <div className="flex flex-col justify-start items-start w-full font-inter font-[400] gap-5 text-sm lg:text-lg capitalize">
              <a className="font-inter" href="https://t.me/Official_SparkFi" target="_blank">
                telegram
              </a>
              <a className="font-inter" href="https://twitter.com/sparkfi_xyz" target="_blank">
                twitter
              </a>
              <a className="font-inter" href="https://sparkfi-xyz.medium.com/" target="_blank">
                medium
              </a>
              <a className="font-inter" href="https://discord.com/invite/WtBvqvuaTu" target="_blank">
                discord
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#fff]"></div>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start  gap-2 lg:gap-10 px-2 lg:px-28 w-full">
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col justify-start lg:justify-center items-start w-full gap-2 lg:gap-7">
            <span className="uppercase text-lg lg:text-xl">private investments</span>
            <span className="font-inter font-[400] text-sm lg:text-lg">partners@sparkfi.xyz</span>
          </div>
        </div>
        <div className="flex flex-col gap-7 w-full lg:w-[90%]">
          <span className="hidden lg:block capitalize font-inter font-[400] text-sm lg:text-lg">
            copyright &copy; 2023, sparkFi. all trademarks and copyright belong to their respective owners.
          </span>
          <div className="flex flex-col lg:flex-row justify-start gap-3 lg:gap-14 items-start lg:items-center capitalize text-sm lg:text-lg">
            <a className="font-inter" href="#" target="_blank">
              terms & conditions
            </a>
            <a className="font-inter" href="#" target="_blank">
              privacy policy
            </a>
            <a className="font-inter" href="#" target="_blank">
              brand kits
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-7 w-full justify-start items-start lg:w-1/4">
          <div className="flex justify-center items-center w-full">
            <Image src="/images/logo_white_bg.svg" width={62} height={62} alt="logo" />
          </div>
          <span className="block lg:hidden capitalize font-inter font-[400] text-[12px] lg:text-[16px]">
            copyright &copy; 2023, sparkFi. all trademarks and copyright belong to their respective owners.
          </span>
        </div>
      </div>
    </footer>
  );
}
