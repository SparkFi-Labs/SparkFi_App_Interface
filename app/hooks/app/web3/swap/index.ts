import { WETH, exchangeRouterContracts } from "@/assets/contracts";
import routerABI from "@/assets/abis/Router.json";
import adapterABI from "@/assets/abis/Adapter.json";
import erc20ABI from "@/assets/abis/ERC20.json";
import { useTokenDetails } from "@/hooks/contracts";
import { useContract } from "@/hooks/global";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { isNil } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { hexValue } from "@ethersproject/bytes";

const SWAP_FEE = 999;

export const useRouterBestQuery = (tokenIn: string, tokenOut: string, amountIn: number) => {
  const [query, setQuery] = useState<any>(null);
  const tokenInDetails = useTokenDetails(tokenIn);
  const tokenOutDetails = useTokenDetails(tokenOut);

  const { provider } = useWeb3React();
  const contract = useContract(exchangeRouterContracts, routerABI);

  useEffect(() => {
    if (!isNil(tokenInDetails) && !isNil(tokenOutDetails) && !isNil(contract)) {
      const amountInFormatted = parseUnits(amountIn.toString(), tokenInDetails.decimals);

      contract.query(tokenIn, tokenOut, amountInFormatted).then(setQuery).catch(console.debug);
    }
  }, [amountIn, contract, tokenIn, tokenInDetails, tokenOut, tokenOutDetails]);

  useEffect(() => {
    if (!isNil(tokenInDetails) && !isNil(tokenOutDetails) && !isNil(contract) && !isNil(provider)) {
      provider.on("block", () => {
        const amountInFormatted = parseUnits(amountIn.toString(), tokenInDetails.decimals);

        contract.query(tokenIn, tokenOut, amountInFormatted).then(setQuery).catch(console.debug);
      });
    }

    return () => {
      if (!isNil(provider)) {
        provider.removeAllListeners("block");
      }
    };
  }, [amountIn, contract, provider, tokenIn, tokenInDetails, tokenOut, tokenOutDetails]);

  return query;
};

export const useRouterBestOffer = (tokenIn: string, tokenOut: string, amountIn: number, maxSteps: number = 2) => {
  const [offer, setOffer] = useState<any>(null);
  const tokenInDetails = useTokenDetails(tokenIn);
  const tokenOutDetails = useTokenDetails(tokenOut);

  const { provider } = useWeb3React();
  const contract = useContract(exchangeRouterContracts, routerABI);

  useEffect(() => {
    if (!isNil(tokenInDetails) && !isNil(tokenOutDetails) && !isNil(contract)) {
      const amountInFormatted = parseUnits(amountIn.toString(), tokenInDetails.decimals);

      contract.findBestPath(amountInFormatted, tokenIn, tokenOut, maxSteps).then(setOffer).catch(console.debug);
    }
  }, [amountIn, contract, maxSteps, tokenIn, tokenInDetails, tokenOut, tokenOutDetails]);

  useEffect(() => {
    if (!isNil(tokenInDetails) && !isNil(tokenOutDetails) && !isNil(contract) && !isNil(provider)) {
      provider.on("block", () => {
        const amountInFormatted = parseUnits(amountIn.toString(), tokenInDetails.decimals);

        contract.findBestPath(amountInFormatted, tokenIn, tokenOut, maxSteps).then(setOffer).catch(console.debug);
      });
    }

    return () => {
      if (!isNil(provider)) {
        provider.removeAllListeners("block");
      }
    };
  }, [amountIn, contract, maxSteps, provider, tokenIn, tokenInDetails, tokenOut, tokenOutDetails]);

  return offer;
};

export const useAdapterName = (adapter: string) => {
  const [name, setName] = useState("");
  const contract = useContract(adapter, adapterABI);

  useEffect(() => {
    if (!isNil(contract)) {
      contract.name().then(setName).catch(console.debug);
    }
  }, [contract]);

  return name;
};

export const useSwapInitializer = (tokenIn: string, tokenOut: string, amountIn: number, amountOut: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const { account, chainId } = useWeb3React();
  const routerContract = useContract(exchangeRouterContracts, routerABI);
  const tokenInDetails = useTokenDetails(tokenIn);
  const tokenOutDetails = useTokenDetails(tokenOut);
  const tokenInContract = useContract(tokenIn, erc20ABI);
  const bestOffer = useRouterBestOffer(tokenIn, tokenOut, amountIn);

  const swap = useCallback(async () => {
    if (
      !isNil(account) &&
      !isNil(routerContract) &&
      !isNil(tokenInDetails) &&
      !isNil(tokenOutDetails) &&
      !isNil(tokenInContract) &&
      !isNil(chainId) &&
      !isNil(bestOffer)
    ) {
      try {
        setIsLoading(true);
        const amountInParsed = parseUnits(amountIn.toString(), tokenInDetails.decimals);
        const amountOutParsed = parseUnits(amountOut.toString(), tokenOutDetails.decimals);
        const allowance = await tokenInContract.allowance(account, routerContract.address);
        const weth = WETH[chainId ?? 84531];

        if (allowance.lt(amountInParsed) && tokenIn !== weth) {
          const approvalTx = await tokenInContract.approve(routerContract.address, amountInParsed);

          await approvalTx.wait();
        }

        const trade = [hexValue(amountInParsed), hexValue(amountOutParsed), bestOffer[2], bestOffer[1]];
        const swapTx = await routerContract.swap(trade, account, hexValue(SWAP_FEE), {
          value: tokenIn === weth ? hexValue(amountInParsed) : hexValue(0)
        });
        const awaitedTx = await swapTx.wait();

        setIsLoading(false);

        return awaitedTx;
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [
    account,
    amountIn,
    amountOut,
    bestOffer,
    chainId,
    routerContract,
    tokenIn,
    tokenInContract,
    tokenInDetails,
    tokenOutDetails
  ]);

  return { isLoading, swap };
};
