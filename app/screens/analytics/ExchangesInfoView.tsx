import { useAdapter, useAdaptersList } from "@/hooks/app/analytics";
import LineChart from "@/ui/Charts/LineChart";
import NoDataOrError from "@/ui/NoDataOrError";
import { CHAINS, type ExtendedChainInformation } from "@/web3/chains";
import { useWeb3React } from "@web3-react/core";
import { formatEthAddress } from "eth-address";
import { isNil, map } from "lodash";
import millify from "millify";
import Moment from "react-moment";
import { useEffect, useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

export default function ExchangesInfoView() {
  const { data: adaptersList, isLoading: adaptersListLoading } = useAdaptersList();
  const [selectedExchange, setSelectedExchange] = useState("");
  const { data: singleExchangeData, isLoading: singleExchangeDataLoading } = useAdapter(
    selectedExchange.trim().length > 0 ? selectedExchange : adaptersList[0] ? adaptersList[0]?.id : ""
  );
  const adapterDayData = useMemo(
    () =>
      singleExchangeData?.adapterDayData.map(dayData => ({
        date: new Date(dayData.date * 1000),
        dailyVolumeUSD: parseFloat(dayData.dailyVolumeUSD)
      })),
    [singleExchangeData?.adapterDayData]
  );
  const [txPage, setTxPage] = useState(1);
  const slicedSwapList = useMemo(
    () =>
      !isNil(singleExchangeData)
        ? singleExchangeData.swaps
            .sort((a, b) => parseInt(b.blockTimestamp) - parseFloat(a.blockTimestamp))
            .slice((txPage - 1) * 10, txPage * 10)
        : [],
    [singleExchangeData, txPage]
  );
  const swapLength = useMemo(() => (!isNil(singleExchangeData) ? singleExchangeData.txCount : 0), [singleExchangeData]);

  const { chainId } = useWeb3React();
  const explorerUrl = useMemo(
    () => (CHAINS[chainId ?? 84531] as ExtendedChainInformation).blockExplorerUrls?.[0],
    [chainId]
  );

  useEffect(() => {
    setTxPage(1);
  }, [singleExchangeData]);
  return (
    <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start w-full gap-3 lg:gap-7">
      {adaptersListLoading ? (
        <span className="loading loading-infinity loading-md text-accent"></span>
      ) : (
        <div className="flex flex-row lg:flex-col justify-evenly lg:justify-start items-center w-full lg:w-1/5 gap-2 lg:gap-3 flex-wrap">
          {map(adaptersList, (adapter, index) => (
            <button
              onClick={() => setSelectedExchange(adapter.id)}
              key={index}
              className="bg-[#131735] border border-[#292d32] rounded-md flex justify-center items-center gap-2 px-3 py-2 w-1/4 lg:w-full"
            >
              <span className="font-inter text-xs lg:text-lg text-[#fff] font-[500] capitalize">{adapter.name}</span>
            </button>
          ))}
        </div>
      )}
      {singleExchangeDataLoading ? (
        <span className="loading loading-infinity loading-lg text-accent"></span>
      ) : (
        <>
          {isNil(singleExchangeData) ? (
            <NoDataOrError message="No data to display" />
          ) : (
            <div className="flex flex-col justify-start items-center w-full lg:w-[75%] gap-4">
              <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-between items-center py-3 lg:py-6 w-full px-4">
                <div className="flex flex-col justify-start items-center gap-3">
                  <h4 className="font-inter capitalize font-[500] text-sm lg:text-lg text-[#fff]">
                    total traded volume (USD)
                  </h4>
                  <span className="font-inter text-[#0061f3] font-[500] text-lg lg:text-xl">
                    &#36;{millify(parseFloat(singleExchangeData.tradeVolumeUSD), { precision: 3 })}
                  </span>
                </div>

                <div className="flex flex-col justify-start items-center gap-3">
                  <h4 className="font-inter capitalize font-[500] text-sm lg:text-lg text-[#fff]">total trades</h4>
                  <span className="font-inter text-[#f35800] font-[500] text-lg lg:text-xl">
                    {millify(singleExchangeData.txCount, { precision: 3 })}
                  </span>
                </div>
              </div>

              <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-center items-center py-3 lg:py-6 w-full px-2 h-96 lg:h-[650px]">
                {!isNil(adapterDayData) && (
                  <LineChart
                    data={adapterDayData}
                    chartType="monotone"
                    xKey="date"
                    yKey="dailyVolumeUSD"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>

              <div className="flex flex-col justify-start items-start gap-5 w-full">
                <h4 className="font-inter capitalize font-[500] text-lg lg:text-xl text-[#fff]">transactions</h4>
                <div className="bg-[#131735] border border-[#292d32] rounded-md flex flex-col justify-center items-center gap-4 py-3 w-full px-4 overflow-x-auto">
                  <table className="table table-xs lg:table-lg">
                    <thead>
                      <tr className="capitalize text-[#d9d9d9]">
                        <th className="font-inter">from</th>
                        <th className="font-inter">to</th>
                        <th className="font-inter">amount0</th>
                        <th className="font-inter">amount1</th>
                        <th className="font-inter">account</th>
                        <th className="font-inter">transaction</th>
                        <th className="font-inter">time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(slicedSwapList, (swap, index) => (
                        <tr key={index} className="text-[#a3a4a5]">
                          <td className="font-inter">{swap.tokenIn.symbol}</td>
                          <td className="font-inter">{swap.tokenOut.symbol}</td>
                          <td className="font-inter">
                            {millify(parseFloat(swap.amountIn), { precision: 4 })} {swap.tokenIn.symbol}
                          </td>
                          <td className="font-inter">
                            {millify(parseFloat(swap.amountOut), { precision: 4 })} {swap.tokenOut.symbol}
                          </td>
                          <td>
                            <a
                              href={`${explorerUrl}/address/${swap.to}`}
                              className="font-inter text-[#0061f3] flex justify-start items-center gap-1"
                              target="_blank"
                            >
                              {formatEthAddress(swap.to, 5)}
                              <FiExternalLink />
                            </a>
                          </td>
                          <td>
                            <a
                              href={`${explorerUrl}/tx/${swap.transactionHash}`}
                              className="font-inter text-[#0061f3] capitalize flex justify-start items-center gap-1"
                              target="_blank"
                            >
                              view
                              <FiExternalLink />
                            </a>
                          </td>
                          <td>
                            <Moment className="font-inter" fromNow date={parseInt(swap.blockTimestamp) * 1000} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="join">
                    <button
                      onClick={() => setTxPage(p => p - 1)}
                      disabled={txPage === 1}
                      className="join-item btn btn-sm"
                    >
                      <HiChevronDoubleLeft />
                    </button>
                    <button disabled className="join-item btn btn-sm font-inter capitalize">
                      page {txPage}
                    </button>
                    <button
                      onClick={() => setTxPage(p => p + 1)}
                      disabled={txPage === Math.ceil(swapLength / 10)}
                      className="join-item btn btn-sm"
                    >
                      <HiChevronDoubleRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
