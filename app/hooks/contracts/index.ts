import { useEffect, useState } from "react";
import { useContract, useContracts } from "../global";
import erc20Abi from "@/assets/abis/ERC20.json";
import { formatUnits } from "@ethersproject/units";
import { concat, isNull, toLower } from "lodash";

export const useContractOwner = (address: string | { [chainId: number]: string }, ABI: any) => {
  const contract = useContract(address, ABI);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    if (contract) {
      (async () => {
        try {
          const o = await contract.owner();
          setOwner(o);
        } catch (error: any) {
          console.debug(error.message);
        }
      })();
    }
  }, [contract]);

  return owner;
};

export const useTokenDetails = (addressOrAddressMap: string | { [chainId: number]: string }) => {
  const erc20Contract = useContract(addressOrAddressMap, erc20Abi);
  const [erc20Details, setERC20Details] = useState<
    { name: string; symbol: string; totalSupply: string; decimals: number; address: string } | undefined
  >(undefined);

  useEffect(() => {
    if (erc20Contract) {
      (async () => {
        try {
          const name = await erc20Contract.name();
          const symbol = await erc20Contract.symbol();
          const decimals = await erc20Contract.decimals();
          const totalSupply = formatUnits(await erc20Contract.totalSupply(), decimals);
          setERC20Details({ name, symbol, decimals, totalSupply, address: toLower(erc20Contract.address) });
        } catch (error: any) {
          setERC20Details(undefined);
          console.debug(error);
        }
      })();
    }
  }, [erc20Contract]);

  return erc20Details;
};

export const useTokensDetails = (addressesOrAddressMaps: (string | { [chainId: number]: string })[]) => {
  const erc20Contracts = useContracts(addressesOrAddressMaps, addressesOrAddressMaps?.map(() => erc20Abi) || []);
  const [erc20Details, setERC20Details] = useState<
    { name: string; symbol: string; totalSupply: string; decimals: number; address: string }[]
  >([]);

  useEffect(() => {
    if (erc20Contracts) {
      (async () => {
        try {
          let details: any[] = [];
          for (const contract of erc20Contracts) {
            if (!isNull(contract) || !!contract) {
              const name = await contract.name();
              const symbol = await contract.symbol();
              const decimals = await contract.decimals();
              const totalSupply = formatUnits(await contract.totalSupply(), decimals);

              details = concat(details, [{ name, symbol, decimals, totalSupply, address: toLower(contract.address) }]);
            }
          }

          setERC20Details(details);
        } catch (error: any) {
          setERC20Details([]);
          console.debug(error);
        }
      })();
    }
  }, [erc20Contracts]);

  return erc20Details;
};
