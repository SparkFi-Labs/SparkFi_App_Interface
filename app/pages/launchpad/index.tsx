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
  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const { push } = useRouter();
  return (
    <>
      <Head>
        <title>Launchpad | Pools</title>
      </Head>
      <div className="flex flex-col w-screen gap-12 justify-start items-start relative">
        <div className="absolute -left-64 lg:-left-44 -top-10">
          <img
            src="/images/vr_wearer_1.png"
            className="lg:w-[906px] lg:h-[789px] w-[421px] h-[367px]"
            alt="vr_wearer"
          />
        </div>

        <div className="absolute -right-64 lg:-right-44 -top-24">
          <img
            src="/images/vr_wearer_2.png"
            className="lg:w-[906px] lg:h-[789px] w-[421px] h-[367px]"
            alt="vr_wearer"
          />
        </div>
        <section className="py-12 px-3 w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6 relative lg:py-[6rem]">
            {/* <div className="absolute lg:-top-[8rem] rounded-[1000px]">
            <Image src="/images/ellipse_top.svg" width={1400} height={1000} alt="ellipse" />
            </div> */}

            <span className="text-[#fff] text-2xl lg:text-4xl capitalize font-[400] text-center">
              the launching point for exceptional ideas
            </span>
            <span className="text-[#aaa] lg:text-lg text-sm font-[500] leading-5 text-center font-inter">
              Welcome to SparkFi, the launching point for exceptional ideas and the bridge between vision and reality.
              Powered by Base network
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Launchpad" width="50%" height={50} onPress={() => push("/launchpad")} />
              <CTAPurpleOutline
                label="Read Docs"
                width="50%"
                height={50}
                onPress={() => window.open("https://docs.sparkfi.xyz", "_blank")}
              />
            </div>
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-7 pt-6 lg:pt-12 pb-6 lg:pb-12 px-3 lg:px-8 lg:mt-12">
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
            <span className="capitalize text-lg lg:text-2xl text-[#fff] font-[400]">stay updated</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start w-full gap-12 px-3 lg:px-5 lg:h-96">
            <div className="w-full lg:w-1/2 rounded-[8px] h-full">
              <Card width="100%" height="100%">
                <div className="card-body w-full justify-start items-start">
                  <div className="flex flex-col justify-start items-start px-2 lg:px-7 py-5 gap-3 lg:gap-7 w-full lg:w-[80%]">
                    <span className="text-[#0029ff] capitalize text-sm lg:text-lg">join the sparkFi community</span>
                    <p className="text-[#fff] text-xs lg:text-sm font-[400] leading-5 text-justify font-inter">
                      Are you interested in receiving updates about new projects on SparkFi? Register with your e-mail
                      address to never miss any updates again.
                    </p>
                  </div>
                  <div className="flex flex-col w-full lg:w-[70%] gap-2 justify-start items-start px-2 lg:px-7">
                    <InputField placeholder="Your Email" width="100%" height={50} />
                    <div className="form-control w-full">
                      <label onClick={() => setNewsletterChecked(c => !c)} className="label cursor-pointer gap-4">
                        <div className="bg-[#0f1122] rounded-[8px] w-[2.5rem] h-[1.5rem] flex justify-center items-center">
                          {newsletterChecked && <FiCheck />}
                        </div>
                        <span className="text-[#fff] font-[400] leading-5 text-justify font-inter text-xs lg:text-sm">
                          I agree to receive newsletters and promotional emails from SparkFi (you can unsubscribe at any
                          time).
                        </span>
                      </label>
                    </div>
                    <div className="w-full lg:w-1/3">
                      <CTAPurple
                        label={<span className="uppercase text-xs lg:text-sm text-[#fff]">sign up now!</span>}
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
