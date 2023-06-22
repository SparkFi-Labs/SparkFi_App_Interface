import { isEqual, isNull, keys } from "lodash";
import type { AddEthereumChainParameter } from "@web3-react/types";

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation };

export const TESTNET_CHAINS: ChainConfig = {
  84531: {
    urls: ["https://goerli.base.org"],
    name: "Base Goerli",
    blockExplorerUrls: ["https://goerli.basescan.org"],
    nativeCurrency: {
      name: "Base Goerli",
      decimals: 18,
      symbol: "ETH"
    }
  }
};

export const CHAINS: ChainConfig = { ...TESTNET_CHAINS };

const isExtendedChainInformation = (chainInformation: BasicChainInformation | ExtendedChainInformation) =>
  !isEqual((chainInformation as ExtendedChainInformation).nativeCurrency, undefined) &&
  !isNull((chainInformation as ExtendedChainInformation).nativeCurrency);

export const getAddChainParameter: (chainId: number) => AddEthereumChainParameter | number = (chainId: number) => {
  const chainInformation = CHAINS[chainId];

  if (isExtendedChainInformation(chainInformation))
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: (chainInformation as ExtendedChainInformation).nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: (chainInformation as ExtendedChainInformation).blockExplorerUrls
    };
  return chainId;
};

export const URLS: { [chainId: number]: string[] } = keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validUrls = CHAINS[Number(chainId)].urls;

    if (validUrls.length) accumulator[Number(chainId)] = validUrls;

    return accumulator;
  },
  {}
);
