import { CTAPurple } from "@/components/Button";
import { useAssetList, useSingleTokenData } from "@/hooks/app/analytics";
import { useTokenList } from "@/hooks/app/swap";
import LineChart from "@/ui/Charts/LineChart";
import NoDataOrError from "@/ui/NoDataOrError";
import { isNil, map, toLower } from "lodash";
import { useCallback, useMemo, useState } from "react";

export default function AssetsInfoView() {
  const tokenList = useTokenList();
  const { data: assetList, isLoading: assetListLoading } = useAssetList();
  const [selectedAsset, setSelectedAsset] = useState("");
  const { data: singleTokenData, isLoading: singleTokenDataLoading } = useSingleTokenData(selectedAsset);
  const tokenDayData = useMemo(
    () =>
      singleTokenData?.tokenDayData.map(dayData => ({
        date: new Date(dayData.date * 1000),
        priceUSD: parseFloat(dayData.priceUSD)
      })),
    [singleTokenData?.tokenDayData]
  );

  const assetFromId = useCallback(
    (id: string) => {
      return tokenList.find(token => toLower(token.address) === toLower(id));
    },
    [tokenList]
  );

  return (
    <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start w-full gap-3 lg:gap-7">
      {assetListLoading ? (
        <span className="loading loading-infinity loading-md text-accent"></span>
      ) : (
        <div className="flex flex-row lg:flex-col justify-evenly lg:justify-start items-center w-full lg:w-1/5 gap-2 lg:gap-3 flex-wrap">
          {map(assetList, (asset, index) => (
            <button
              onClick={() => setSelectedAsset(asset.id)}
              key={index}
              className="bg-[#131735] border border-[#292d32] rounded-md flex justify-start items-center gap-2 px-3 py-2 w-1/4 lg:w-full"
            >
              <div className="avatar">
                <div className="w-6 lg:w-8 rounded-full">
                  <img src={assetFromId(asset.id)?.logoURI} alt={assetFromId(asset.id)?.symbol} />
                </div>
              </div>
              <span className="font-inter text-xs lg:text-lg text-[#fff] font-[500]">{asset.symbol}</span>
            </button>
          ))}
        </div>
      )}
      {singleTokenDataLoading ? (
        <span className="loading loading-infinity loading-lg text-accent"></span>
      ) : (
        <>
          {isNil(singleTokenData) ? (
            <NoDataOrError message="No data to display" />
          ) : (
            <div className="flex flex-col justify-start items-center w-full lg:w-[75%] gap-4">
              <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-between items-center py-3 lg:py-6 w-full px-4">
                <div className="border border-[#292d32] px-2 py-2 flex justify-center items-center gap-1 lg:gap-3 rounded-md">
                  <div className="avatar">
                    <div className="w-6 lg:w-8 rounded-full">
                      <img
                        src={assetFromId(singleTokenData.id)?.logoURI}
                        alt={assetFromId(singleTokenData.id)?.symbol}
                      />
                    </div>
                  </div>
                  <span className="font-inter text-xs lg:text-lg text-[#fff] font-[500]">{singleTokenData.symbol}</span>
                  <div className="border border-[#292d32] px-1 py-1 flex justify-center items-center gap-3 rounded-md">
                    <span className="font-inter text-xs text-[#0061f3]">
                      &#36; {parseFloat(singleTokenData.priceUSD).toLocaleString("en-US", { maximumFractionDigits: 3 })}
                    </span>
                  </div>
                </div>

                <div className="w-1/4 lg:w-1/5 h-10 lg:h-[55px]">
                  <CTAPurple width="100%" height="100%" label="Swap" />
                </div>
              </div>

              <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-center items-center py-3 lg:py-6 w-full px-2 h-96 lg:h-[650px]">
                {!isNil(tokenDayData) && (
                  <LineChart
                    data={tokenDayData}
                    chartType="monotone"
                    xKey="date"
                    yKey="priceUSD"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
