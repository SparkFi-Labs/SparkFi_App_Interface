import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { isAddress } from "@ethersproject/address";

export const useContract = (
  addressOrAddressMap: string | { [chainId: number]: string },
  ABI: any,
  useProviderIfNecessary: boolean = true
) => {
  const { chainId, provider } = useWeb3React();
  return useMemo(() => {
    if (!addressOrAddressMap) return null;
    if (!ABI) return null;
    let address: string;

    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId as number];

    if (address === AddressZero || !address) return null;

    if (!isAddress(address)) return null;

    return new Contract(address, ABI, useProviderIfNecessary ? provider?.getSigner() : undefined);
  }, [ABI, addressOrAddressMap, chainId, provider, useProviderIfNecessary]);
};

export const useContracts = (
  addressesOrAddressMaps: (string | { [chainId: number]: string })[],
  ABI: any[],
  useProviderIfNecessary: boolean = true
) => {
  const { chainId, provider } = useWeb3React();
  return useMemo(() => {
    if (!addressesOrAddressMaps) return null;
    if (addressesOrAddressMaps.length !== ABI.length) return null;
    return addressesOrAddressMaps.map((addressOrAddressMap, index) => {
      if (!addressOrAddressMap) return null;
      let address: string;

      if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
      else address = addressOrAddressMap[chainId as number];

      if (address === AddressZero || !address) return null;

      if (!isAddress(address)) return null;

      return new Contract(address, ABI[index], useProviderIfNecessary ? provider?.getSigner() : undefined);
    });
  }, [ABI, addressesOrAddressMaps, chainId, provider, useProviderIfNecessary]);
};
