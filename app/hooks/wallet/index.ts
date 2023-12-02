import { formatEther, formatUnits } from "@ethersproject/units";
import { useContract } from "../global";
import erc20Abi from "@/assets/abis/ERC20.json";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

export const useERC20Balance = (tokenAddress: string | { [chainId: number]: string }) => {
  const erc20Contract = useContract(tokenAddress, erc20Abi);
  const [balance, setBalance] = useState(0);
  const { account, provider } = useWeb3React();

  useEffect(() => {
    if (provider && erc20Contract && account) {
      provider.on("block", () => {
        erc20Contract.decimals().then((dec: any) => {
          erc20Contract.balanceOf(account).then((bal: any) => {
            const formatted = formatUnits(bal, dec);
            setBalance(parseFloat(formatted));
          });
        });
      });
    }
  }, [account, erc20Contract, provider]);

  useEffect(() => {
    if (erc20Contract && account) {
      erc20Contract.decimals().then((dec: any) => {
        erc20Contract.balanceOf(account).then((bal: any) => {
          const formatted = formatUnits(bal, dec);
          setBalance(parseFloat(formatted));
        });
      });
    } else setBalance(0);
  }, [account, erc20Contract]);

  return balance;
};

export const useETHBalance = () => {
  const [balance, setBalance] = useState(0);
  const { account, provider } = useWeb3React();

  useEffect(() => {
    if (provider && account) {
      provider.on("block", () => {
        provider.getBalance(account).then(val => {
          const formatted = formatEther(val);
          setBalance(parseFloat(formatted));
        });
      });
    }
  }, [account, provider]);

  useEffect(() => {
    if (account && provider) {
      provider.getBalance(account).then(val => {
        const formatted = formatEther(val);
        setBalance(parseFloat(formatted));
      });
    } else setBalance(0);
  }, [account, provider]);
  return balance;
};
