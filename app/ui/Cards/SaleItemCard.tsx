import Card, { ICardProps } from "@/components/Card";
import { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { Fragment } from "react";
import Countdown from "react-countdown";
import { floor, multiply } from "lodash";
import NoDataOrError from "../NoDataOrError";
import { useAtomicDate } from "@/hooks/app/shared";
import { ThreeCircles } from "react-loader-spinner";
import Image from "next/image";
import { CTAPurple } from "@/components/Button";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";

interface ISaleItemCardProps extends ICardProps {
  data: TokenSale;
  label?: "upcoming" | "live" | "completed";
}

export default function SaleItemCard({ data, label = "upcoming", ...props }: ISaleItemCardProps) {
  const { push } = useRouter();
  const { metadata, error, isLoading } = useIPFSGetMetadata(data.metadataURI);
  const atomicDate = useAtomicDate();
  return (
    <Card {...props}>
      {isLoading ? (
        <div className="card-body justify-center items-center">
          <ThreeCircles color="#fff" width={60} />
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-full gap-9 rounded-[15px_15px_0px_0px]">
          {error ? (
            <NoDataOrError message={error.message} />
          ) : (
            <>
              {metadata && (
                <Fragment>
                  <div className="bg-[#141a45] rounded-t-[inherit] w-full flex flex-col gap-4 min-h-[174px] lg:min-h-[212px] py-7 px-7">
                    <div className="flex justify-between items-start w-full">
                      <span className="font-inter font-[600] text-[1em] lg:text-[2em]">{metadata.name}</span>
                      <span className="capitalize flex justify-center items-center px-1 py-1 bg-[#101121] text-[#ffe603] font-inter font-[400] text-[0.8em] lg:text-[0.88em] rounded-sm">
                        {label}
                      </span>
                    </div>

                    <div className="flex justify-between w-full items-center">
                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={metadata.projectLogoURI}
                          width={100}
                          height={100}
                          alt={metadata.name}
                          className="rounded-full"
                        />
                        <span className="text-[#fff] font-[500] text-[1.5em] lg:text-[2em] font-manuale">
                          {metadata.name}
                        </span>
                      </div>
                      <Image
                        src={metadata.tokenLogoURI}
                        width={80}
                        height={80}
                        alt={metadata.name}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex justify-start items-start w-full">
                      <span className="capitalize flex justify-center items-center px-1 py-1 bg-[#0f1122] rounded-[8px] text-[#fff] font-inter text-[1rem]">
                        {metadata.genre}
                      </span>
                    </div>
                  </div>

                  <div className="w-full card-body">
                    <div className="w-full flex justify-between items-start gap-3">
                      <div className="flex flex-col w-1/2 lg:w-1/3 justify-start items-start gap-3">
                        <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">price</span>
                        <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                          {data.salePrice} {data.paymentToken.symbol}
                        </span>
                      </div>
                      <div className="flex flex-col w-1/2 lg:w-1/3 justify-start items-start gap-3">
                        <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">
                          min. allocation
                        </span>
                        <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                          {data.minTotalPayment} {data.paymentToken.symbol}
                        </span>
                      </div>
                      <div className="hidden lg:flex flex-col w-1/2 lg:w-1/3 justify-start items-start gap-3">
                        <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">
                          max. allocation
                        </span>
                        <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                          {data.maxTotalPayment} {data.paymentToken.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions p-[var(--padding-card,_1rem)] border-t border-t-[#0029ff]/20 w-full flex-col lg:flex-row justify-start lg:justify-between gap-5">
                    <div className="flex justify-between items-start w-full lg:w-1/2">
                      <div className="flex lg:hidden flex-col w-1/2 lg:w-1/3 justify-start items-start gap-3">
                        <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">
                          max. allocation
                        </span>
                        <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                          {data.maxTotalPayment} {data.paymentToken.symbol}
                        </span>
                      </div>
                      {parseInt(data.startTime) > floor(atomicDate.getTime() / 1000) ? (
                        <Countdown
                          date={multiply(parseInt(data.startTime), 1000)}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <div className="flex flex-col w-1/2 lg:w-1/2 justify-start items-start gap-3">
                              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">
                                sale starts in
                              </span>
                              <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                                {days}D:{hours}H:{minutes}M:{seconds}S
                              </span>
                            </div>
                          )}
                        />
                      ) : (
                        <Countdown
                          date={multiply(parseInt(data.endTime), 1000)}
                          renderer={({ days, hours, minutes, seconds, completed }) => (
                            <div className="flex flex-col w-1/2 lg:w-1/2 justify-start items-start gap-3">
                              <span className="font-inter font-[500] capitalize text-[1em] lg:text-[1.6em]">
                                {!completed ? "sale closes on" : "sale closed on"}
                              </span>
                              <span className="font-inter font-[400] uppercase text-[0.92em] lg:text-[1.2em]">
                                {!completed
                                  ? `${days}D:${hours}H:${minutes}M:${seconds}S`
                                  : new Date(multiply(parseInt(data.endTime), 1000)).toISOString()}
                              </span>
                            </div>
                          )}
                        />
                      )}
                    </div>
                    <div className="w-full lg:w-1/3 h-14 lg:h-16">
                      <CTAPurple
                        onPress={() => push(`/launchpad/sales/${data.id}`)}
                        label={
                          <div className="flex w-full justify-center items-center gap-9 group">
                            <span className="font-inter font-[500] capitalize text-[1.6em]">pool info</span>
                            <BsArrowRight size={40} className="group-hover:translate-x-5 duration-150 ease-in-out" />
                          </div>
                        }
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
}
