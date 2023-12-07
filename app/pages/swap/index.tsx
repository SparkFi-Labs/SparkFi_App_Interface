import { CTAPurple } from "@/components/Button";
import { useTokenList } from "@/hooks/app/swap";
import { useERC20Balance, useETHBalance } from "@/hooks/wallet";
import { AddressZero } from "@ethersproject/constants";
import { isNil, toLower } from "lodash";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiRefreshCw, FiSliders } from "react-icons/fi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { AiOutlineSwap } from "react-icons/ai";
import SelectTokenModal from "@/ui/Modals/swap/SelectTokenModal";
import SlippageSettingsModal from "@/ui/Modals/swap/SlippageSettingsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouterBestOffer, useRouterBestQuery, useSwapInitializer } from "@/hooks/app/web3/swap";
import { formatUnits } from "@ethersproject/units";
import { WETH } from "@/assets/contracts";
import { useWeb3React } from "@web3-react/core";
import RoutingModal from "@/ui/Modals/swap/RoutingModal";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Swap() {
  const tokenList = useTokenList();
  const [firstTokenAddress, setFirstTokenAddress] = useState<string>("");
  const [secondTokenAddress, setSecondTokenAddress] = useState<string>("");

  const firstToken = useMemo(
    () => tokenList.find(t => toLower(t.address) === toLower(firstTokenAddress)),
    [firstTokenAddress, tokenList]
  );
  const secondToken = useMemo(
    () => tokenList.find(t => toLower(t.address) === toLower(secondTokenAddress)),
    [secondTokenAddress, tokenList]
  );

  const ethBalance = useETHBalance();
  const firstTokenBalance = useERC20Balance(firstTokenAddress);
  const secondTokenBalance = useERC20Balance(secondTokenAddress);

  const { isActive } = useWeb3React();

  const firstTokenModalRef = useRef<HTMLInputElement>(null);
  const secondTokenModalRef = useRef<HTMLInputElement>(null);
  const slippageSettingsModalRef = useRef<HTMLInputElement>(null);
  const routingModalRef = useRef<HTMLInputElement>(null);

  const { slippage } = useSelector((state: RootState) => state.swap);
  const { chainId } = useWeb3React();

  const [amount, setAmount] = useState(0);
  const bestQuery = useRouterBestQuery(
    firstTokenAddress === AddressZero ? WETH[chainId ?? 84531] : firstTokenAddress,
    secondTokenAddress === AddressZero ? WETH[chainId ?? 84531] : secondTokenAddress,
    1
  );
  const priceInTokenOut = useMemo(
    () => parseFloat(formatUnits(bestQuery?.[3] ?? 0, secondToken?.decimals ?? 18)),
    [bestQuery, secondToken?.decimals]
  );
  const bestOffer = useRouterBestOffer(
    firstTokenAddress === AddressZero ? WETH[chainId ?? 84531] : firstTokenAddress,
    secondTokenAddress === AddressZero ? WETH[chainId ?? 84531] : secondTokenAddress,
    amount
  );

  const { swap, isLoading: swapLoading } = useSwapInitializer(
    firstTokenAddress === AddressZero ? WETH[chainId ?? 84531] : firstTokenAddress,
    secondTokenAddress === AddressZero ? WETH[chainId ?? 84531] : secondTokenAddress,
    amount,
    amount * priceInTokenOut - slippage * (amount * priceInTokenOut)
  );

  const { query, reload } = useRouter();
  const inputCurrency = useMemo(() => query.inputCurrency as string, [query.inputCurrency]);
  const outputCurrency = useMemo(() => query.outputCurrency as string, [query.outputCurrency]);

  const switchTokens = useCallback(() => {
    const first = firstTokenAddress;
    const second = secondTokenAddress;

    setFirstTokenAddress(second);
    setSecondTokenAddress(first);
  }, [firstTokenAddress, secondTokenAddress]);

  const swapTokens = useCallback(async () => {
    const toastId = toast("Now swapping. Please wait", { type: "info", autoClose: 90000 });

    try {
      await swap();

      toast.update(toastId, { render: "Successfully swapped tokens", type: "success", autoClose: 5000 });

      setAmount(0);
    } catch (error: any) {
      toast.update(toastId, { render: error.reason || error.message, type: "error", autoClose: 5000 });
    }
  }, [swap]);

  useEffect(() => {
    if (!isNil(inputCurrency)) setFirstTokenAddress(inputCurrency);
    else if (tokenList.length > 0) setFirstTokenAddress(tokenList[0].address);

    if (!isNil(outputCurrency)) setSecondTokenAddress(outputCurrency);
    else if (tokenList.length > 0) setSecondTokenAddress(tokenList[1].address);
  }, [inputCurrency, outputCurrency, tokenList]);
  return (
    <>
      <Head>
        <title>Swap</title>
      </Head>
      <div className="flex justify-center items-center w-screen py-10 px-2">
        <div className="bg-[#131735] rounded-lg w-full md:w-1/3 px-4 py-4 flex flex-col justify-start items-center gap-6">
          <div className="flex justify-between w-full items-center gap-3">
            <h4 className="font-inter font-[700] capitalize text-sm md:text-lg">trade</h4>
            <div className="flex justify-start items-center gap-2">
              <button
                onClick={reload}
                className="btn btn-square btn-ghost btn-xs md:btn-sm bg-[#fff] flex justify-center items-center px-1 py-1 text-[#000] text-xs md:text-sm"
              >
                <FiRefreshCw />
              </button>
              <button
                onClick={() => {
                  if (slippageSettingsModalRef.current) slippageSettingsModalRef.current.checked = true;
                }}
                className="btn btn-square btn-ghost btn-xs md:btn-sm bg-[#fff] flex justify-center items-center px-1 py-1 text-[#000] text-xs md:text-sm"
              >
                <FiSliders />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center w-full gap-12">
            <div className="flex flex-col w-full gap-3 justify-start items-center">
              <div className="flex w-full justify-between items-center gap-2">
                <span className="font-inter text-xs md:text-sm font-[400] capitalize">from</span>
                <div className="flex justify-end items-center gap-2 md:gap-3 w-1/2 md:w-1/3">
                  <span className="font-inter text-xs md:text-sm font-[400] capitalize">
                    balance:{" "}
                    {(firstTokenAddress === AddressZero ? ethBalance : firstTokenBalance).toLocaleString("en-US", {
                      maximumFractionDigits: 3
                    })}
                  </span>
                  <CTAPurple
                    onPress={() => setAmount(firstTokenAddress === AddressZero ? ethBalance : firstTokenBalance)}
                    label="MAX"
                    width="40%"
                    height={35}
                  />
                </div>
              </div>

              <div className="w-full bg-[#0c0e1e] px-2 py-2 rounded-[5px] flex justify-between items-center">
                <button
                  onClick={() => {
                    if (firstTokenModalRef.current) firstTokenModalRef.current.checked = true;
                  }}
                  className="btn btn-ghost flex justify-start items-center gap-2 btn-sm md:btn-md"
                >
                  <div className="avatar">
                    <div className="w-6 md:w-9 rounded-full">
                      <img src={firstToken?.logoURI} alt={firstToken?.symbol} />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-[#fff] font-inter font-[500]">{firstToken?.symbol}</span>
                  <FiChevronDown className="text-xs md:text-sm" />
                </button>

                <input
                  type="number"
                  onChange={e => setAmount(e.target.valueAsNumber || 0)}
                  value={amount}
                  className="text-right bg-transparent outline-0 w-full md:w-1/3 h-full px-1 py-1 font-inter"
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center relative">
              <button
                onClick={switchTokens}
                className="bg-[#0029ff] rounded-md absolute left-[49%] flex justify-center items-center px-2 py-2"
              >
                <CgArrowsExchangeAltV className="text-lg md:text-2xl text-[#000]" />
              </button>
              <div className="w-full bg-[#fff] h-[1px]"></div>
            </div>

            <div className="flex flex-col w-full gap-3 justify-start items-center">
              <div className="flex w-full justify-between items-center gap-2">
                <span className="font-inter text-xs md:text-sm font-[400] capitalize">to(estimated)</span>
                <span className="font-inter text-xs md:text-sm font-[400] capitalize">
                  balance:{" "}
                  {(secondTokenAddress === AddressZero ? ethBalance : secondTokenBalance).toLocaleString("en-US", {
                    maximumFractionDigits: 3
                  })}
                </span>
              </div>

              <div className="w-full bg-[#0c0e1e] px-2 py-2 rounded-[5px] flex justify-between items-center">
                <button
                  onClick={() => {
                    if (secondTokenModalRef.current) secondTokenModalRef.current.checked = true;
                  }}
                  className="btn btn-ghost flex justify-start items-center gap-2 btn-sm md:btn-md"
                >
                  <div className="avatar">
                    <div className="w-6 md:w-9 rounded-full">
                      <img src={secondToken?.logoURI} alt={secondToken?.symbol} />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm text-[#fff] font-inter font-[500]">{secondToken?.symbol}</span>
                  <FiChevronDown className="text-xs md:text-sm" />
                </button>

                <input
                  disabled
                  value={amount * priceInTokenOut}
                  className="text-right bg-transparent outline-0 w-full md:w-1/3 h-full px-1 py-1 font-inter"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 w-full">
            <span className="font-inter font-[400] capitalize text-xs md:text-sm text-[#fff]">slippage tolerance</span>
            <span className="font-inter font-[400] capitalize text-xs md:text-sm text-[#fff]">{slippage}%</span>
          </div>

          <div className="flex justify-between items-center gap-2 w-full">
            <span className="font-inter font-[400] capitalize text-xs md:text-sm text-[#fff]">
              1 {firstToken?.symbol} &asymp;{" "}
              {priceInTokenOut.toLocaleString("en-US", {
                maximumFractionDigits: 3
              })}{" "}
              {secondToken?.symbol}
            </span>
            <button
              onClick={() => {
                if (routingModalRef.current) routingModalRef.current.checked = true;
              }}
              className="btn btn-ghost btn-xs md:btn-sm btn-square text-[#292d32]"
            >
              <AiOutlineSwap />
            </button>
          </div>

          <CTAPurple
            onPress={swapTokens}
            disabled={swapLoading || amount <= 0 || !isActive}
            label={
              <div className="flex justify-center items-center text-[#fff] w-full gap-2">
                <span className="capitalize font-[500] font-inter text-lg md:text-xl">
                  {isActive ? "swap" : "please connect wallet"}
                </span>
                {swapLoading && <span className="loading loading-infinity loading-md text-accent"></span>}
              </div>
            }
            width="100%"
            height={55}
          />
        </div>
      </div>

      <SelectTokenModal
        ref={firstTokenModalRef}
        onItemClick={setFirstTokenAddress}
        selectedTokens={[firstTokenAddress, secondTokenAddress]}
        close={() => {
          if (firstTokenModalRef.current) firstTokenModalRef.current.checked = false;
        }}
      />

      <SelectTokenModal
        ref={secondTokenModalRef}
        onItemClick={setSecondTokenAddress}
        selectedTokens={[firstTokenAddress, secondTokenAddress]}
        close={() => {
          if (secondTokenModalRef.current) secondTokenModalRef.current.checked = false;
        }}
      />

      <SlippageSettingsModal ref={slippageSettingsModalRef} />

      <RoutingModal
        ref={routingModalRef}
        adapters={bestOffer?.[1] || []}
        path={bestOffer?.[2] || []}
        firstToken={firstTokenAddress}
        secondToken={secondTokenAddress}
      />

      <ToastContainer position="top-right" autoClose={5000} theme="dark" pauseOnFocusLoss />
    </>
  );
}
