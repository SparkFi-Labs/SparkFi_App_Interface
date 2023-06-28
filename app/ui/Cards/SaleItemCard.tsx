import Card, { ICardProps } from "@/components/Card";
import { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { BsEmojiNeutral } from "react-icons/bs";
import { Fragment } from "react";

interface ISaleItemCardProps extends ICardProps {
  data: TokenSale;
}

export default function SaleItemCard({ data, ...props }: ISaleItemCardProps) {
  const { metadata, error, isLoading } = useIPFSGetMetadata(data.metadataURI);
  return (
    <Card {...props}>
      {isLoading ? (
        <div className="flex w-full justify-center items-center">
          <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-full gap-9 rounded-[15px_15px_0px_0px]">
          {error ? (
            <div className="w-full flex justify-center items-center px-3 py-3 flex-col">
              <div className="w-10 h-10 lg:w-14 lg:h-14 px-3 py-3 rounded-full flex justify-center items-center bg-[#131735]">
                <BsEmojiNeutral className="text-[#c1c9ff] text-[2em]" />
              </div>
              <span className="text-[#fff] text-[1rem] lg:text-[1.875rem] font-[600]">{error.message}</span>
            </div>
          ) : (
            <>
              {metadata && (
                <Fragment>
                  <div
                    className="flex flex-col justify-end items-start w-full h-[10rem] lg:h-[18rem] rounded-[inherit]"
                    style={{
                      backgroundImage: `url(${metadata.bannerURI})`,
                      objectFit: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%"
                    }}
                  >
                    <div className="avatar relative ml-6 -mb-8">
                      <div className="w-12 lg:w-14 rounded-full ring ring-zinc-950">
                        <img src={metadata.logoURI} alt={data.saleToken.name} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-center w-full gap-3 py-4">
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.87rem] lg:text-[0.92rem] font-[700] text-[#fff]">{metadata.name}</span>
                      <div className="flex justify-center items-start gap-1">
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#0029ff]">
                          {data.totalPaymentMade}
                        </span>
                        <span>/</span>
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#fff]">
                          {data.maxTotalPayment}
                        </span>
                        <span className="text-[0.87rem] lg:text-[0.92rem] font-[400] text-[#fff]">
                          {data.paymentToken.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        hard cap
                      </span>
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#fff]">
                        {data.maxTotalPayment} {data.paymentToken.symbol}
                      </span>
                    </div>
                    <div className="w-full justify-between flex items-start px-2 py-2">
                      <span className="text-[0.73rem] lg:text-[0.84rem] font-[400] text-[#878aa1] capitalize">
                        soft cap
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
