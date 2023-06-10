/* eslint-disable @next/next/no-img-element */
import { CTAPurple, CTAPurpleOutline } from "@/components/Button";
import Head from "next/head";
import Image from "next/image";

const BenefitCard = ({ children }: any) => (
  <div className="rounded-[7px] py-14 px-2 bg-[radial-gradient(100%_134.13%_at_0%_0%,_#000000_0%,_#000000_100%)] w-full lg:w-1/3 lg:min-h-[35rem]">
    {children}
  </div>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>SparkFi | Incubation Hub</title>
      </Head>
      <div className="flex flex-col w-screen gap-12 justify-start items-start">
        <section className="py-12 px-3 w-full flex justify-center items-center">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/3 gap-6">
            <Image src="/images/sparkfi_logo.svg" width={300} height={300} alt="logo" />

            <span className="text-[#fff] text-[1.4em] lg:text-[30px] capitalize font-[600] text-center leading-9">
              incubation hub for the NEXT-GEN innovation
            </span>
            <span className="text-[#aaa] text-[0.8em] font-[400] leading-5 text-center">
              A pioneering GameFi-designed launchpad that serves as the ultimate incubator for high-quality projects on
              the Base chain and beyond.
            </span>
            <div className="w-full lg:w-1/2 flex justify-center items-center gap-3 lg:gap-7 px-3">
              <CTAPurple label="enter app" width="50%" height={50} />
              <CTAPurpleOutline label="buy SPAK" width="50%" height={50} />
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
            <div className="flex flex-col justify-start items-start w-full lg:w-1/2 gap-5 lg:gap-7 lg:px-8">
              <span className="text-[#fff] font-[700] text-[1.4em] lg:text-[30px] capitalize leading-9">
                about sparkFi
              </span>
              <div className="flex flex-col justify-start items-start gap-5 text-[#aaa] font-[400] text-[0.96em] lg:text-[1em]">
                <p>
                  Welcome to SparkFi, the ultimate destination for those seeking to explore and participate in the
                  groundbreaking world of blockchain gaming, metaverse development, and AI innovation. As the leading
                  launchpad in the industry, we specialize in launching, investing in, and incubating the most promising
                  projects that are revolutionizing these transformative fields.
                </p>
                <p>
                  At SparkFi, we understand the immense potential of blockchain technology and its ability to reshape
                  industries. That&apos;s why we are committed to identifying and supporting the most visionary and
                  groundbreaking initiatives in blockchain gaming, metaverse creation, and AI advancement. By partnering
                  with forward-thinking entrepreneurs and developers, we aim to empower them to bring their innovative
                  ideas to life and drive the future of blockchain technology.
                </p>
                <p>
                  Holding $SPAK grants you access to exclusive investment opportunities, project governance, and a range
                  of incentives within the SparkFi ecosystem. By becoming a part of the SparkFi community, you not only
                  benefit from early access to groundbreaking projects but also actively contribute to shaping the
                  future of blockchain gaming, metaverse development, and AI advancement.
                </p>
              </div>
            </div>
            <Image src="/images/sparkfi_logo.svg" width={400} height={400} alt="logo" />
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

            <div className="hidden lg:block absolute h-80 w-80 rounded-[50%] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(97,_0,_255,_0.7)_0%,_rgba(7,_13,_55,_0)_100%)] lg:left-[calc(50%_-_353.23px/2_-_0.39px)]"></div>

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
        <section className="w-full flex flex-col justify-start items-center gap-4 px-3 lg:px-9 py-12 bg-transparent">
          <span className="capitalize text-[#fff] font-[600] text-[1.4em] lg:text-[30px] leading-9">
            frequently asked questions
          </span>
        </section>
      </div>
    </>
  );
}
