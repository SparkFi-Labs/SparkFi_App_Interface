import Card, { ICardProps } from "@/components/Card";
import { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { Fragment } from "react";
import { CTAPurpleOutline } from "@/components/Button";
import Countdown from "react-countdown";
import { divide, floor, multiply } from "lodash";
import NoDataOrError from "../NoDataOrError";
import { useAtomicDate } from "@/hooks/app/shared";

interface ISaleItemCardProps extends ICardProps {
  data: TokenSale;
}

export default function SaleItemCard({ data, ...props }: ISaleItemCardProps) {
  const { metadata, error, isLoading } = useIPFSGetMetadata(data.metadataURI);
  const atomicDate = useAtomicDate();
  return (
    <Card {...props}>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-full gap-9 rounded-[15px_15px_0px_0px]">
          {error ? (
            <NoDataOrError message={error.message} />
          ) : (
            <>
              {metadata && (
                <Fragment>
                  <figure className="w-full h-96 relative">
                    <img src={metadata.bannerURI} alt={metadata.name} className="w-full h-full" />

                    <div className="avatar absolute top-[50%] left-[49%]">
                      <div className="w-20 lg:w-24 rounded-full ring ring-slate-500">
                        <img src={metadata.logoURI} alt={data.saleToken.name} />
                      </div>
                    </div>
                  </figure>
                  <div className="w-full relative -mt-6">
                    <div className="avatar relative ml-6 -mt-32">
                      <div className="w-12 lg:w-14 rounded-full ring ring-zinc-950">
                        <img src={metadata.logoURI} alt={data.saleToken.name} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full card-body">
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="font-[700] text-[#fff] card-title">{metadata.name}</span>
                      <div className="flex justify-center items-start gap-1">
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#0029ff]">
                          {divide(parseInt(data.totalPaymentMade), parseFloat(data.salePrice))}
                        </span>
                        <span>/</span>
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#fff]">
                          {data.totalAvailableSaleTokens}
                        </span>
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#fff]">
                          {data.saleToken.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        max. buy per wallet
                      </span>
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#fff]">
                        {data.maxTotalPayment} {data.paymentToken.symbol}
                      </span>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        min. buy per wallet
                      </span>
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#fff]">
                        {data.minTotalPayment} {data.paymentToken.symbol}
                      </span>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        price
                      </span>
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#fff]">
                        {data.salePrice} {data.paymentToken.symbol}
                      </span>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        amount for sale
                      </span>
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#fff]">
                        {data.totalAvailableSaleTokens} {data.saleToken.symbol}
                      </span>
                    </div>
                    <div className="card-actions w-full justify-center">
                      <CTAPurpleOutline
                        label={
                          <div className="w-full">
                            {parseInt(data.startTime) > floor(atomicDate.getTime() / 1000) ? (
                              <Countdown
                                date={multiply(parseInt(data.startTime), 1000)}
                                renderer={({ days, hours, minutes, seconds, completed }) => (
                                  <div className="w-full flex justify-center items-center">
                                    <span className="text-[#fff] text-[0.9375rem] font-[500]">
                                      {completed
                                        ? "This pool has started"
                                        : `This pool will start in ${days}D:${hours}H:${minutes}M:${seconds}S`}
                                    </span>
                                  </div>
                                )}
                              />
                            ) : (
                              <Countdown
                                date={multiply(parseInt(data.endTime), 1000)}
                                renderer={({ days, hours, minutes, seconds, completed }) => (
                                  <div className="w-full flex justify-center items-center">
                                    <span className="text-[#fff] text-[0.9375rem] font-[500]">
                                      {completed
                                        ? "This pool has already ended"
                                        : `This pool will end in ${days}D:${hours}H:${minutes}M:${seconds}S`}
                                    </span>
                                  </div>
                                )}
                              />
                            )}
                          </div>
                        }
                        width="100%"
                        height={50}
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
