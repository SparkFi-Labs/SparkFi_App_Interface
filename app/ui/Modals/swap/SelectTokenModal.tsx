/* eslint-disable react/display-name */
import { useTokenList } from "@/hooks/app/swap";
import SwapListItem from "@/ui/ListItems/SwapListItem";
import { map, startsWith, toLower } from "lodash";
import { forwardRef, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SelectTokenModalProps {
  selectedTokens: string[];
  onItemClick: (selected: string) => any;
  close?: () => any;
}

const SelectTokenModal = forwardRef<HTMLInputElement, SelectTokenModalProps>(
  ({ selectedTokens, onItemClick, close }, ref) => {
    const modalId = useMemo(() => "swap-modal-" + Date.now() + "-" + Math.floor(Math.random() * Date.now()), []);
    const [searchValue, setSearchValue] = useState("");
    const tokenList = useTokenList();

    const filteredTokenList = useMemo(
      () =>
        tokenList.filter(
          token =>
            startsWith(token.name.toLowerCase(), searchValue.toLowerCase()) ||
            startsWith(token.symbol.toLowerCase(), searchValue.toLowerCase()) ||
            startsWith(token.address.toLowerCase(), searchValue.toLowerCase())
        ),
      [searchValue, tokenList]
    );
    return (
      <>
        <input type="checkbox" className="modal-toggle" id={modalId} ref={ref} />
        <div className="modal" role="dialog">
          <div className="bg-[#0c0e1c] rounded-[3.679px] modal-box flex flex-col justify-start items-center gap-7 z-20 border border-[#292d32]">
            <div className="flex justify-end items-center w-full px-1">
              <label htmlFor={modalId} className="btn btn-circle btn-ghost btn-sm text-[#fff] p-1 text-[0.95em]">
                <FiX />
              </label>
            </div>

            <div className="flex flex-col gap-3 justify-start items-center w-full px-1">
              <div className="w-full border bg-transparent border-[#292d32] flex justify-start items-center gap-1 rounded-[3.679px] py-2 px-2">
                <FiSearch className="text-sm md:text-lg text-[#fff]" />
                <input
                  className="w-full bg-transparent outline-0 text-[#6e7276] font-inter"
                  placeholder="Search token by name/symbol/address"
                  onChange={e => setSearchValue(e.target.value)}
                />
              </div>

              <div className="w-full bg-transparent overflow-auto self-stretch flex flex-col justify-start items-center gap-2 py-3 h-[26rem]">
                {map(filteredTokenList, (token, index) => (
                  <button
                    disabled={selectedTokens.map(t => toLower(t)).includes(toLower(token.address))}
                    key={index}
                    className="w-full flex justify-center items-center btn btn-ghost min-h-[5rem]"
                    onClick={() => {
                      onItemClick(token.address);

                      if (close) close();
                    }}
                  >
                    <SwapListItem imgURI={token.logoURI} tokenAddress={token.address} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default SelectTokenModal;
