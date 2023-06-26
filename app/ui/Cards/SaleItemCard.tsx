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
        <div className="flex flex-col justify-start items-center w-full gap-3">
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
                    className="flex flex-col justify-end items-start w-full h-[10rem] lg:h-[14rem]"
                    style={{ backgroundImage: `url(${metadata.bannerURI})`, objectFit: "cover" }}
                  >
                    <div className="avatar relative ml-6 -mb-8">
                      <div className="w-20 lg:w-24 rounded-full">
                        <img src={metadata.tokenImageURI} alt={data.saleToken.name} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full justify-between flex items-center">
                    <span className="text-[0.87rem] lg:text-[1rem] font-[700]">{metadata.name}</span>
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
