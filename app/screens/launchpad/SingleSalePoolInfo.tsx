import { TokenSale } from "@/.graphclient";
import Card from "@/components/Card";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { map, multiply } from "lodash";
import truncateEthAddress from "truncate-eth-address";

interface SingleSalePoolInfoProps {
  data: TokenSale;
}

export default function SingleSalePoolInfo({ data }: SingleSalePoolInfoProps) {
  const { metadata } = useIPFSGetMetadata(data.metadataURI);
  return (
    <div className="flex justify-start items-center py-3 w-full prose max-w-none lg:prose-xl prose-sm">
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start w-full gap-5">
        <div className="w-full lg:w-1/2">
          <Card width="100%">
            <div className="card-body w-full gap-4">
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">sale start time</span>
                <span className="text-[#fff] text-[1em]">
                  {new Date(multiply(parseInt(data.startTime), 1000)).toUTCString()}
                </span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">sale end time</span>
                <span className="text-[#fff] text-[1em]">
                  {new Date(multiply(parseInt(data.endTime), 1000)).toUTCString()}
                </span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">token address</span>
                <span className="text-[#0029ff] text-[1em]">{truncateEthAddress(data.saleToken.id)}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">presale address</span>
                <span className="text-[#0029ff] text-[1em]">{truncateEthAddress(data.presaleId)}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">max. buy per wallet</span>
                <span className="text-[#fff] text-[1em]">
                  {data.maxTotalPayment} {data.paymentToken.symbol}
                </span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">min. buy per wallet</span>
                <span className="text-[#fff] text-[1em]">
                  {data.minTotalPayment} {data.paymentToken.symbol}
                </span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">project valuation</span>
                <span className="text-[#fff] text-[1em]">{metadata?.projectValuation}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">initial market cap</span>
                <span className="text-[#fff] text-[1em]">{metadata?.initialMarketCap}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">vesting details</span>
                {data.vestingType === "LINEAR" ? (
                  <span className="text-[#fff] text-[1em]">
                    100% tokens released on{" "}
                    {new Date(multiply(parseInt(data.linearVesting?.endTime || "0"), 1000)).toUTCString()}
                  </span>
                ) : (
                  <div className="flex flex-col justify-start items-start">
                    {data.cliffPeriod &&
                      map(data.cliffPeriod, (cliff, index) => (
                        <span key={index}>
                          {cliff.percentage}% tokens released on{" "}
                          {new Date(multiply(parseInt(cliff.claimTime), 1000)).toUTCString()}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-1/2">
          <Card width="100%">
            <div className="card-body w-full gap-4">
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">token name</span>
                <span className="text-[#fff] text-[1em]">{data.saleToken.name}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">ticker</span>
                <span className="text-[#fff] text-[1em]">{data.saleToken.symbol}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">decimals</span>
                <span className="text-[#fff] text-[1em]">{data.saleToken.decimals}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">total supply</span>
                <span className="text-[#fff] text-[1em]">{data.saleToken.totalSupply}</span>
              </div>
              <div className="w-full flex justify-between items-start">
                <span className="text-[#c1c9ff] text-[1em] capitalize">percentage for sale</span>
                <span className="text-[#fff] text-[1em]">
                  {(parseFloat(data.totalAvailableSaleTokens) / parseInt(data.saleToken.totalSupply)) * 100}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
