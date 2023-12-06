import { useRouterDayData, useRouterInfo } from "@/hooks/app/analytics";
import LineChart from "@/ui/Charts/LineChart";
import NoDataOrError from "@/ui/NoDataOrError";
import { CHAINS, type ExtendedChainInformation } from "@/web3/chains";
import { useWeb3React } from "@web3-react/core";
import { formatEthAddress } from "eth-address";
import { isNil, map } from "lodash";
import millify from "millify";
import { useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Moment from "react-moment";

export default function TradesInfoView() {
  const { data: routerInfo, isLoading: routerInfoLoading } = useRouterInfo();
  const { data: routerDayData, isLoading: routerDayDataLoading } = useRouterDayData();
  const dayData = useMemo(
    () =>
      routerDayData.map(data => ({
        date: new Date(data.date * 1000),
        dailyVolumeUSD: parseFloat(data.dailyVolumeUSD)
      })),
    [routerDayData]
  );

  const [txPage, setTxPage] = useState(1);
  const slicedSwapList = useMemo(
    () =>
      !isNil(routerInfo)
        ? routerInfo.swaps
            .sort((a, b) => parseInt(b.blockTimestamp) - parseFloat(a.blockTimestamp))
            .slice((txPage - 1) * 10, txPage * 10)
        : [],
    [routerInfo, txPage]
  );
  const swapLength = useMemo(() => (!isNil(routerInfo) ? routerInfo.swapCount : 0), [routerInfo]);

  const { chainId } = useWeb3React();
  const explorerUrl = useMemo(
    () => (CHAINS[chainId ?? 84531] as ExtendedChainInformation).blockExplorerUrls?.[0],
    [chainId]
  );
  return (
    <div className="flex flex-col justify-start items-center w-full gap-4">
      {routerInfoLoading ? (
        <span className="loading loading-infinity loading-lg text-accent"></span>
      ) : (
        <>
          {isNil(routerInfo) ? (
            <NoDataOrError message="No data to display" />
          ) : (
            <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-between items-center py-3 lg:py-6 w-full px-4">
              <div className="flex flex-col justify-start items-center gap-3">
                <h4 className="font-inter capitalize font-[500] text-sm lg:text-lg text-[#fff]">
                  total traded volume (USD)
                </h4>
                <span className="font-inter text-[#0061f3] font-[500] text-lg lg:text-xl">
                  &#36;{millify(parseFloat(routerInfo.totalTradeVolumeUSD), { precision: 3 })}
                </span>
              </div>

              <div className="flex flex-col justify-start items-center gap-3">
                <h4 className="font-inter capitalize font-[500] text-sm lg:text-lg text-[#fff]">total trades</h4>
                <span className="font-inter text-[#f35800] font-[500] text-lg lg:text-xl">
                  {millify(routerInfo.swapCount, { precision: 3 })}
                </span>
              </div>
            </div>
          )}
        </>
      )}
      <div className="bg-[#131735] border border-[#292d32] rounded-md flex justify-center items-center py-3 lg:py-6 w-full px-2 h-96 lg:h-[650px]">
        <LineChart data={dayData} xKey="date" yKey="dailyVolumeUSD" chartType="linear" width="100%" height="100%" />
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
                  <td className="font-inter">{millify(parseFloat(swap.amountIn), { precision: 4 })}</td>
                  <td className="font-inter">{millify(parseFloat(swap.amountOut), { precision: 4 })}</td>
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
            <button onClick={() => setTxPage(p => p - 1)} disabled={txPage === 1} className="join-item btn btn-sm">
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
  );
}
