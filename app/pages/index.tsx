/* eslint-disable @next/next/no-img-element */
import { Accordion, AccordionItem } from "@/components/Accordion";
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import UpcomingSalesView from "@/screens/home/UpcomingProjectsView";
import Head from "next/head";
import { useRouter } from "next/router";

const BenefitCard = ({ children }: any) => (
  <div className="rounded-[7px] py-14 px-2 bg-[radial-gradient(100%_134.13%_at_0%_0%,_#000000_0%,_#000000_100%)] w-full lg:w-1/4 lg:min-h-[35rem]">
    {children}
  </div>
);

export default function Home() {
  const { push } = useRouter();
  return (
    <>
      <Head>
        <title>SparkFi | Incubation Hub</title>
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

            <span className="text-[#fff] text-[1.4rem] lg:text-[3.125rem] capitalize font-[600] text-center">
              incubation hub for the NEXT-GEN innovation
            </span>
            <span className="text-[#aaa] text-[0.8em] font-[400] leading-5 text-center">
              A pioneering GameFi-designed launchpad that serves as the ultimate incubator for high-quality projects on
              the Base chain and beyond.
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="Enter App" width="50%" height={50} onClick={() => push("/launchpad")} />
              <CTAPurpleOutline label="Read Docs" width="50%" height={50} />
            </div>
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-center gap-4 px-3 lg:px-9 py-12">
          <span className="capitalize text-[#fff] font-[600] text-[1em] lg:text-[30px] leading-9">
            our hub&apos;s benefits
          </span>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start px-3 lg:px-10 gap-3 lg:gap-7 py-3 lg:py-8 w-full">
            <BenefitCard>
              <div className="flex flex-col gap-3 justify-start items-center w-full px-4">
                <div className="avatar">
                  <div className="w-24 rounded-full border border-[#6100ff]">
                    <img src="/images/spark_logo_black.svg" alt="logo_black" />
                  </div>
                </div>
                <span className="text-[#fff] capitalize text-center text-[1em] font-[500] leading-6">
                  $SPAK holders
                </span>
                <ul className="flex flex-col justify-start items-start gap-3 font-[400] px-2 text-[#aaa] text-[0.96em] list-disc leading-4">
                  <li>
                    <span>
                      Access to early-stage investment opportunities in promising gaming, metaverse and AI projects.
                    </span>
                  </li>
                  <li>
                    <span>
                      Peace of mind investment into bona fide and high vetted ideas built by team you can trust.
                    </span>
                  </li>
                  <li>
                    <span>Opportunity to participate in governance and decision-making around projects.</span>
                  </li>
                  <li>
                    <span>Access to staking and rewards programs.</span>
                  </li>
                </ul>
              </div>
            </BenefitCard>

            <BenefitCard>
              <div className="flex flex-col gap-3 justify-start items-center w-full px-4">
                <div className="avatar">
                  <div className="w-24 rounded-full border border-[#6100ff]">
                    <img src="/images/spark_logo_black.svg" alt="logo_black" />
                  </div>
                </div>
                <span className="text-[#fff] capitalize text-center text-[1em] font-[500] leading-6">new projects</span>
                <ul className="flex flex-col justify-start items-start gap-3 font-[400] px-2 text-[#aaa] text-[0.96em] list-disc leading-4">
                  <li>
                    <span>Access to funding from investors who are actively involved in the SparkFi ecosystem.</span>
                  </li>
                  <li>
                    <span>
                      Opportunity to gain valuable exposure and recognition through some of the industry well-known
                      names.
                    </span>
                  </li>
                  <li>
                    <span>Access to our incubation service, industry expertise and networking.</span>
                  </li>
                  <li>
                    <span>
                      Opportunity to engaged with a ready-made community who are eager to engage with new projects.
                    </span>
                  </li>
                </ul>
              </div>
            </BenefitCard>

            <BenefitCard>
              <div className="flex flex-col gap-3 justify-start items-center w-full px-4">
                <div className="avatar">
                  <div className="w-24 rounded-full border border-[#6100ff]">
                    <img src="/images/spark_logo_black.svg" alt="logo_black" />
                  </div>
                </div>
                <span className="text-[#fff] capitalize text-center text-[1em] font-[500] leading-6">
                  venture funds
                </span>
                <ul className="flex flex-col justify-start items-start gap-3 font-[400] px-2 text-[#aaa] text-[0.96em] list-disc leading-4">
                  <li>
                    <span>
                      Opportunity to empower engaged communities by accelerating projects and amplifying their reach in
                      the market.
                    </span>
                  </li>
                  <li>
                    <span>Access to deeper insight into why and how other successful projects have thrived.</span>
                  </li>
                  <li>
                    <span>Opportunity to secure investment in next-gen metaverse and AI projects.</span>
                  </li>
                  <li>
                    <span>
                      Giving back to the community by sharing knowledge, and engaging with passionate individuals.
                    </span>
                  </li>
                </ul>
              </div>
            </BenefitCard>
          </div>
        </section>

        <section className="w-full flex flex-col justify-start items-center gap-4 px-3 lg:px-9 py-12 bg-transparent">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-7 lg:gap-10 items-center lg:items-start w-full lg:px-10 px-2">
            <UpcomingSalesView />
          </div>
        </section>
        <section className="bg-[#101221] w-full flex flex-col justify-start items-start lg:items-center gap-9 lg:gap-12 px-3 lg:px-9 py-12 flex-1">
          <span className="capitalize text-[#fff] font-[600] text-[1.4em] lg:text-[30px] leading-9">
            how sparkFi works
          </span>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-7 lg:gap-10 items-center lg:items-start w-full lg:px-10 relative">
            <div className="flex flex-col gap-8 lg:gap-14 w-full lg:w-1/3">
              <div className="flex flex-col justify-start items-start w-full gap-5 lg:px-8">
                <span className="text-[#c1c9ff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  project selection
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em]">
                  SparkFi carefully selects high-quality GameFi projects to be featured on its platform. Projects are
                  evaluated based on their uniqueness, potential for success, and alignment with SparkFi&apos;s mission
                  of revolutionizing the gaming industry. This ensures that only the most promising projects are
                  presented to the community.
                </p>
              </div>

              <div className="flex flex-col justify-start items-start w-full gap-5 lg:px-8">
                <span className="text-[#c1c9ff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  decentralized funding
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em]">
                  SparkFi provides developers with access to decentralized funding opportunities. This enables
                  developers to access decentralized funding opportunities from SparkFi community through various
                  mechanisms such as token sales, initial NFTs offerings (INOs), or token auctions. This allows
                  developers to secure the necessary resources to develop and scale their projects.
                </p>
              </div>
            </div>

            <div className="hidden lg:block absolute h-80 w-80 rounded-[50%] bg-[radial-gradient(50%_50.00%_at_50%_50.00%,_rgba(0,_41,_255,_0.70)_0%,_rgba(7,_13,_55,_0.00)_100%)] lg:left-[calc(50%_-_353.23px/2_-_0.39px)]"></div>

            <div className="flex flex-col gap-8 lg:gap-14 w-full lg:w-1/3">
              <div className="flex flex-col justify-start items-start w-full gap-5 lg:px-8">
                <span className="text-[#c1c9ff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  incubation & support
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em]">
                  Once selected, SparkFi provides comprehensive support and resources to GameFi projects. Developers
                  receive guidance, mentorship, technical expertise, and marketing assistance to enhance the success and
                  growth of their projects. This incubation process helps developers navigate the challenges of building
                  and launching innovative gaming experiences.
                </p>
              </div>

              <div className="flex flex-col justify-start items-start w-full gap-5 lg:px-8">
                <span className="text-[#c1c9ff] font-[500] text-[0.98em] lg:text-[20px] capitalize leading-6">
                  launch & distribution
                </span>
                <p className="text-[#aaa] font-[400] text-[0.85em] lg:text-[0.96em]">
                  Once a project is developed and ready for launch, SparkFi facilitates its token distribution to the
                  community. The platform helps with marketing efforts, creating awareness, and attracting users to
                  experience the innovative games created through the SparkFi ecosystem and also launch the project
                  tokens on partners exchanges.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col justify-start items-center gap-4 lg:gap-16 px-3 lg:px-10 py-3 lg:py-12 bg-transparent">
          <span className="capitalize text-[#fff] font-[600] text-[1.4em] lg:text-[30px] leading-9">
            frequently asked questions
          </span>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start w-full gap-7">
            <div className="w-full lg:w-1/2 lg:px-12">
              <Accordion>
                <AccordionItem title="What is SparkFi?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    SparkFi is a pioneering GameFi-designed launchpad that serves as the ultimate incubator for
                    high-quality projects on the Base chain and beyond.
                  </span>
                </AccordionItem>
                <AccordionItem title="What kind of projects should we expect on SparkFi?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    We only select the best projects. Projects to look out for are focused on blockchain games, NFTs,
                    the Metaverse, DeFi, and other recent developments in the blockchain space.
                  </span>
                </AccordionItem>
                <AccordionItem title="How do I participate in the IDO?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    Buy and stake SPAK or SPAK-LP tokens to gain a spot in IDOs while you wait for the IDO pools to
                    open. When the pool is open, participate by depositing a minimum amount of desired token allocation
                    you want to purchase in ETH.
                  </span>
                </AccordionItem>
                <AccordionItem title="Is SparkFi multi-chain?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    Currently, it is only on BASE. We&apos;ll gradually integrate other chains to make SparkFi a
                    multichain launchpad.
                  </span>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-full lg:w-1/2 lg:px-12">
              <Accordion>
                <AccordionItem title="When can we claim the IDO tokens?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    Token unlock/claim will be in accordance with the vesting schedule of the project.
                  </span>
                </AccordionItem>
                <AccordionItem title="Why Base?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    Base offers a secure, low-cost, flexible and developer-friendly Ethereum L2 blockchain platform that
                    support a wide range of use cases, from gaming and entertainment to finance and commerce.
                  </span>
                </AccordionItem>
                <AccordionItem title="Will there be a token? Where can I learn about it?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    The token is expected to launch in Q2-Q3 of 2023.
                  </span>
                </AccordionItem>
                <AccordionItem title="How can I contact the team?">
                  <span className="font-[500] text-[0.95em] lg:text-[1em] text-[#fff] leading-5">
                    You can get in touch with the team via our social handles.
                  </span>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        {/* <section className="w-full flex justify-center items-center gap-4 lg:gap-16 px-3 lg:px-10 py-3 lg:py-36 bg-transparent">
          <div className="w-full bg-[linear-gradient(98.34deg,_#000000_-2.54%,_#6100FF_70.68%,_#000000_105.77%)] rounded-[20px] flex justify-center items-start px-3 py-5 lg:py-12 overflow-clip">
            <div className="flex flex-col w-full lg:w-1/3 justify-start items-center gap-2 lg:gap-5">
              <img src="/images/polygon1.svg" className="w-1/3 h-32 lg:h-56 -mt-[4rem]" alt="triangle" />
              <div className="flex flex-col gap-2 justify-start items-center w-full">
                <span className="text-[#fff] font-[600] text-[1.4em] lg:text-[35px] leading-9 text-center">
                  Is your project ready to take off on SparkFi?
                </span>
                <span className="text-[#aaa] font-[400] text-[0.89em] lg:text-[18px] text-center leading-5">
                  Apply to launch your project on SparkFi, or submit an early expression of interest to join our
                  innovative platform and get set for an incredible launch experience!
                </span>
              </div>
              <div className="w-full flex justify-start items-center gap-3">
                <img src="/images/polygon2.svg" className="w-1/3 h-32 lg:h-56" alt="triangle" />
                <CTAMainBG
                  label="Apply for launch"
                  width="33.3%"
                  height={50}
                  onPress={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSfydXr1FpS954vGzRTiOhy-U_B5SNYYjMgSHL5Ndz7hl3zd7A/viewform?vc=0&c=0&w=1&flr=0",
                      "_blank"
                    )
                  }
                />
                <img src="/images/polygon3.svg" className="w-1/3 h-32 lg:h-56" alt="triangle" />
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}
