/* eslint-disable react/display-name */
import { useTokenList } from "@/hooks/app/swap";
import { useAdapterName } from "@/hooks/app/web3/swap";
import { RootState } from "@/store";
import { map, toLower } from "lodash";
import { forwardRef, useMemo } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";

interface RoutingModalProps {
  adapters: string[];
  firstToken: string;
  secondToken: string;
  path: string[];
}

const SingleRoute = ({ tokens, adapter, index = 0 }: { tokens: any[][]; adapter: string; index?: number }) => {
  const adapterName = useAdapterName(adapter);
  const tks = useMemo(() => tokens[index], [index, tokens]);

  return (
    <div className="flex justify-center items-center px-3 py-3 border border-[#292d32] rounded-[5px]">
      <div className="flex flex-col justify-start items-start px-2 py-2 border border-[#292d32] w-full gap-2 rounded-[5px]">
        <span className="font-inter text-xs md:text-sm text-[#fff] capitalize font-[400]">{adapterName}</span>
        <div className="flex justify-start items-center gap-1 text-xs md:text-sm font-[400] text-[#fff] uppercase">
          <span className="font-inter">{index === 0 ? tks?.[0]?.symbol : tokens[index - 1]?.[1]?.symbol}</span>
          <FiChevronRight />
          <span className="font-inter">{index === 0 ? tks?.[1]?.symbol : tokens[index]?.[0]?.symbol}</span>
          <span className="font-inter">100%</span>
        </div>
      </div>
    </div>
  );
};

const RoutingModal = forwardRef<HTMLInputElement, RoutingModalProps>(
  ({ adapters, firstToken, secondToken, path }, ref) => {
    const modalId = useMemo(() => "routing-modal-" + Date.now() + "-" + Math.floor(Math.random() * Date.now()), []);
    const { slippage } = useSelector((state: RootState) => state.swap);
    const tokenList = useTokenList();
    const fToken = useMemo(
      () => tokenList.find(tk => toLower(tk.address) === toLower(firstToken)),
      [firstToken, tokenList]
    );
    const sToken = useMemo(
      () => tokenList.find(tk => toLower(tk.address) === toLower(secondToken)),
      [secondToken, tokenList]
    );
    return (
      <>
        <input type="checkbox" className="modal-toggle" id={modalId} ref={ref} />
        <div className="modal" role="dialog">
          <div className="bg-[#0c0e1c] rounded-[3.679px] modal-box flex flex-col justify-start items-center gap-2 z-20 border border-[#292d32]">
            <div className="flex justify-between items-center gap-3 w-full px-1">
              <span className="capitalize font-inter font-[400] text-sm md:text-lg text-[#fff]">routing</span>
              <span className="capitalize font-inter font-[400] text-sm md:text-lg text-[#fff]">
                slippage: {slippage}%
              </span>
            </div>
            <div className="flex justify-between items-center gap-2 px-2 py-2 rounded-md w-full overflow-auto">
              <div className="avatar">
                <div className="w-6 md:w-9 rounded-full">
                  <img src={fToken?.logoURI} alt={fToken?.symbol} />
                </div>
              </div>
              {map(adapters, (adapter, index) => (
                <div key={index} className="flex justify-center items-center gap-2">
                  {index === 0 && <FiChevronRight className="text-lg md:text-xl" />}
                  <SingleRoute
                    index={index}
                    adapter={adapter}
                    tokens={map(path, pt => tokenList.find(tk => toLower(tk.address) === toLower(pt))).reduce(
                      (all, one, i) => {
                        const location = Math.floor(i / 2);
                        all[location] = [].concat(all[location] || [], one);
                        return all;
                      },
                      []
                    )}
                  />
                  <FiChevronRight className="text-lg md:text-xl" />
                </div>
              ))}
              <div className="avatar">
                <div className="w-6 md:w-9 rounded-full">
                  <img src={sToken?.logoURI} alt={sToken?.symbol} />
                </div>
              </div>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor={modalId}>
            x
          </label>
        </div>
      </>
    );
  }
);

export default RoutingModal;
