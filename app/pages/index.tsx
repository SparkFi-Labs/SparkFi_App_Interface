/* eslint-disable @next/next/no-img-element */
import { Accordion, AccordionItem } from "@/components/Accordion";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Card from "@/components/Card";
import { InputField } from "@/components/Input";
import UpcomingSalesView from "@/screens/home/UpcomingProjectsView";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { FaDiscord, FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

export default function Home() {
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  return (
    <>
      <Head>
        <title>SparkFi | Incubation Hub</title>
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
        <section className="py-12 px-3 w-full flex justify-center items-center gap-3">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6 relative lg:py-[6rem]">
            <span className="text-[#fff] text-2xl lg:text-4xl capitalize font-[400] text-center">
              ignite your startup&apos;s success
            </span>
            <span className="text-[#aaa] lg:text-lg text-sm font-[500] leading-5 text-center font-inter">
              An innovative solution for token launches, supporting new projects and fostering liquidity provisioning on
              Base Network
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Buy $SPAK" width="50%" height={50} />
              <CTAPurpleOutline
                label="Read Docs"
                width="50%"
                height={50}
                onPress={() => window.open("https://docs.sparkfi.xyz", "_blank")}
              />
            </div>
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-7 lg:mt-12 pt-20 pb-6 lg:pb-48">
          <div className="flex flex-col-reverse lg:flex-row justify-start items-center lg:justify-around gap-10 lg:items-start w-full container mx-auto">
            <div className="flex justify-center items-center relative w-full lg:w-1/2 text-center">
              <img src="/images/cubes.svg" className="w-full h-full m-auto" alt="cubes" />
              <Image
                src="/images/box.gif"
                alt="box"
                width={500}
                height={500}
                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              />
            </div>
            <div className="flex flex-col justify-start items-center lg:items-start gap-12 lg:w-1/3 px-3">
              <span className="capitalize text-[#fff] font-[400] text-[1.4em] lg:text-[30px] leading-9">
                about sparkFi
              </span>
              <p className="text-[#aaa] font-[500] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                SparkFi is the first launchpad platform built on the Base blockchain, designed to support new blockchain
                projects in a decentralized manner. By possessing a specific amount of SPAK tokens, users can
                participate in any launch on SparkFi, allowing them to purchase tokens from promising projects right
                from their early stages.
              </p>

              <p className="text-[#aaa] font-[500] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                Our mission is to provide a decentralized launchpad platform on the Base blockchain for new and
                innovative blockchain projects to be launched and achieve their full potential.
              </p>

              <p className="text-[#aaa] font-[500] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                By offering carefully vetted opportunities, we empowers retail investors with the chance to get in on
                the ground floor of potential high-growth ventures. Whether you&apos;re a seasoned investor or just
                starting, we provides a user-friendly platform for you to explore and diversify your investments in the
                thriving world of crypto projects opportunities.
              </p>

              <p className="text-[#aaa] font-[500] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                With our easy-to-use interface and advanced features, SparkFi is set to become the go-to platform for
                innovative blockchain projects looking to get off the ground and easily reach their full potential.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col justify-start items-center gap-4 px-3 lg:px-8 py-12 bg-transparent">
          <UpcomingSalesView />
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-9 lg:gap-12 py-12 flex-1">
          <span className="capitalize text-[#fff] font-[400] text-[1.4em] lg:text-[30px] leading-9">
            what makes us different
          </span>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-7 lg:gap-10 items-center lg:items-start w-full mx-auto relative container">
            <div className="flex flex-col gap-8 lg:gap-14 w-full lg:w-1/3">
              <div className="flex flex-col justify-start items-center lg:items-start w-full gap-5 px-2 lg:px-8">
                <Image src="/images/shopping_cart.svg" width={70} height={70} alt="shopping_cart" />
                <span className="text-[#fff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  selective listing
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                  We adopt a careful and selective approach to project listings on our platform. We prioritize projects
                  with strong fundamentals, innovative concepts, and real-world use cases.
                </p>
              </div>

              <div className="flex flex-col justify-start items-center lg:items-start w-full gap-5 px-2 lg:px-8">
                <Image src="/images/heart.svg" width={70} height={70} alt="heart" />
                <span className="text-[#fff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  user friendly
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                  We designed our platform to be accessible and user-friendly, making it easier for both seasoned
                  investors and newcomers to explore and participate in the world of blockchain projects.
                </p>
              </div>
            </div>

            <div className="hidden lg:block absolute h-80 w-80 rounded-[50%] bg-[radial-gradient(50%_50.00%_at_50%_50.00%,_rgba(0,_41,_255,_0.70)_0%,_rgba(7,_13,_55,_0.00)_100%)] lg:left-[calc(50%_-_353.23px/2_-_0.39px)]"></div>

            <div className="flex flex-col gap-8 lg:gap-14 w-full lg:w-1/3">
              <div className="flex flex-col justify-start items-center lg:items-start w-full gap-5 px-2 lg:px-8">
                <Image src="/images/shield.svg" width={70} height={70} alt="shield" />
                <span className="text-[#fff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  SparkFi protect
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                  We developed a special feature that safeguards Vested IDOs on the our platform. It is designed to
                  ensure the protection and integrity of both investors and the projects launched on our platform.
                </p>
              </div>

              <div className="flex flex-col justify-start items-center lg:items-start w-full gap-5 px-2 lg:px-8">
                <Image src="/images/link.svg" width={70} height={70} alt="link" />
                <span className="text-[#fff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  built on base
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em] font-inter text-center lg:text-justify">
                  We developed our platform on Base, most secure, low-cost, developer-friendly Ethereum L2 network built
                  to bring the next billion users to web3. It is powered by Optimism&apos;s OP Stack.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="w-full flex flex-col justify-start items-start lg:items-center gap-7 lg:gap-16 px-3 lg:px-10 py-3 lg:py-12 bg-transparent"
        >
          <span className="capitalize text-[#fff] font-[400] text-[1.4em] lg:text-[30px] leading-9">
            frequently asked questions
          </span>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start w-full gap-7 container mx-auto">
            <div className="w-full lg:w-1/2">
              <Accordion>
                <AccordionItem title="What is SparkFi?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    SparkFi is a pioneering GameFi-designed launchpad that serves as the ultimate incubator for
                    high-quality projects on the Base chain and beyond.
                  </span>
                </AccordionItem>
                <AccordionItem title="What kind of projects should we expect on SparkFi?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    We only select the best projects. Projects to look out for are focused on blockchain games, NFTs,
                    the Metaverse, DeFi, and other recent developments in the blockchain space.
                  </span>
                </AccordionItem>
                <AccordionItem title="How do I participate in the IDO?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    Buy and stake SPAK or SPAK-LP tokens to gain a spot in IDOs while you wait for the IDO pools to
                    open. When the pool is open, participate by depositing a minimum amount of desired token allocation
                    you want to purchase in ETH.
                  </span>
                </AccordionItem>
                <AccordionItem title="Is SparkFi multi-chain?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    Currently, it is only on BASE. We&apos;ll gradually integrate other chains to make SparkFi a
                    multichain launchpad.
                  </span>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-full lg:w-1/2 lg:px-12">
              <Accordion>
                <AccordionItem title="When can we claim the IDO tokens?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    Token unlock/claim will be in accordance with the vesting schedule of the project.
                  </span>
                </AccordionItem>
                <AccordionItem title="Why Base?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    Base offers a secure, low-cost, flexible and developer-friendly Ethereum L2 blockchain platform that
                    support a wide range of use cases, from gaming and entertainment to finance and commerce.
                  </span>
                </AccordionItem>
                <AccordionItem title="Will there be a token? Where can I learn about it?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    The token is expected to launch in Q2-Q3 of 2023.
                  </span>
                </AccordionItem>
                <AccordionItem title="How can I contact the team?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5 font-inter">
                    You can get in touch with the team via our social handles.
                  </span>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
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
                        <div className="bg-[#0f1122] rounded-[8px] w-[33px] h-[1.5rem] flex justify-center items-center">
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
