import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { InputField } from "@/components/Input";
import ActiveSalesView from "@/screens/launchpad/ActiveSalesView";
import CompletedSalesView from "@/screens/launchpad/CompletedSalesView";
import UpcomingSalesView from "@/screens/launchpad/UpcomingSalesView";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { FaTelegramPlane, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

export default function Launchpad() {
  const { push } = useRouter();
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  return (
    <>
      <Head>
        <title>Launchpad | Pools</title>
      </Head>
      <div className="flex flex-col w-screen gap-12 justify-start items-start relative">
        <div className="absolute lg:w-[6.20875rem] lg:h-[6.20875rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[176.89deg] right-10 top-10"></div>
        <div className="absolute lg:w-[8.03931rem] lg:h-[8.03931rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[105.332deg] left-10 top-20"></div>
        <div className="absolute lg:w-[3.15369rem] lg:h-[3.15369rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[140.595deg] left-10 top-80"></div>
        <div className="absolute lg:w-[4.791rem] lg:h-[4.791rem] rounded-[50%] bg-[radial-gradient(115.01%_115.01%_at_24.60%_19.00%,_#0F1122_0%,_#0F1122_65.18%,_#FFF_94.37%)] -rotate-[176.89deg] right-10 top-80"></div>
        <section className="py-12 px-3 w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6 relative lg:py-[6rem]">
            {/* <div className="absolute lg:-top-[8rem] rounded-[1000px]">
            <Image src="/images/ellipse_top.svg" width={1400} height={1000} alt="ellipse" />
            </div> */}

            <span className="text-[#fff] text-[1.4rem] lg:text-[3.125rem] capitalize font-[400] text-center">
              ignite your startup&apos;s success
            </span>
            <span className="text-[#aaa] lg:text-[18px] text-[16px] font-[500] leading-5 text-center font-inter">
              SparkFi is your gateway to early access and exciting projects opportunities on Base Network
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Enter App" width="50%" height={50} onPress={() => push("/launchpad")} />
              <CTAPurpleOutline
                label="Read Docs"
                width="50%"
                height={50}
                onPress={() => window.open("https://docs.sparkfi.xyz", "_blank")}
              />
            </div>
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-7 pt-6 lg:pt-12 pb-6 lg:pb-12 px-3 lg:px-8">
          <ActiveSalesView />
        </section>
        <section className="bg-transparent w-full flex flex-col justify-start items-center gap-7 pt-6 lg:pt-12 pb-6 lg:pb-12 px-3 lg:px-8">
          <UpcomingSalesView />
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-7 pt-6 lg:pt-12 pb-6 lg:pb-12 px-3 lg:px-8">
          <CompletedSalesView />
        </section>
        <section className="w-full flex flex-col justify-start items-center gap-7 lg:gap-16 py-3 lg:py-12 bg-transparent container mx-auto">
          <div className="flex justify-start items-center w-full px-3 lg:px-5">
            <span className="capitalize text-[1.4em] lg:text-[30px] text-[#fff] font-[400]">stay updated</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start w-full gap-12 px-3 lg:px-5 lg:h-96">
            <div className="w-full lg:w-1/2 rounded-[8px] h-full">
              <Card width="100%" height="100%">
                <div className="card-body w-full justify-start items-start">
                  <div className="flex flex-col justify-start items-start px-2 lg:px-7 py-5 gap-3 lg:gap-7 w-full lg:w-[80%]">
                    <span className="text-[#0029ff] capitalize text-[1.2em] lg:text-[1.7em]">
                      join the sparkFi community
                    </span>
                    <p className="text-[#fff] text-[0.82rem] lg:text-[0.875rem] font-[400] leading-5 text-justify font-inter">
                      Are you interested in receiving updates about new projects on SparkFi? Register with your e-mail
                      address to never miss any updates again.
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[70%] gap-2 justify-start items-start px-2 lg:px-7">
                    <InputField placeholder="Your Email" width="100%" height={50} />
                    <div className="form-control w-full">
                      <label onClick={() => setNewsletterChecked(c => !c)} className="label cursor-pointer gap-4">
                        <div className="bg-[#0f1122] rounded-[8px] w-[33px] h-[1.5rem] flex justify-center items-center">
                          {newsletterChecked && <FiCheck />}
                        </div>
                        <span className="text-[#fff] font-[400] leading-5 text-justify font-inter text-[0.76rem] lg:text-[0.8rem]">
                          I agree to receive newsletters and promotional emails from SparkFi (you can unsubscribe at any
                          time).
                        </span>
                      </label>
                    </div>
                    <div className="w-full lg:w-1/3">
                      <CTAPurple
                        label={<span className="uppercase text-[1.2em] text-[#fff]">sign up now!</span>}
                        width="100%"
                        height={52}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col text-[#0029ff]">
              <div className="flex justify-center gap-7 lg:gap-24 items-center w-full -mb-5">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://t.me/Official_SparkFi", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaTelegramPlane className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://twitter.com/sparkfi_xyz", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaTwitter className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://discord.com/invite/WtBvqvuaTu", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaDiscord className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center gap-7 lg:gap-24 items-center w-full -mt-5">
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://github.com/SparkFi-Labs", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <FaGithub className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
                <div className="w-[120px] h-[108px] lg:w-[161px] lg:h-[145px] rounded-[8px]">
                  <Card
                    width="100%"
                    height="100%"
                    onPress={() => window.open("https://sparkfi-xyz.medium.com/", "_blank")}
                  >
                    <div className="card-body justify-center items-center">
                      <BsMedium className="text-[1.3em]" />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
