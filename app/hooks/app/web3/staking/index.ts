import { allocatorContracts, sparkFiTokenContracts } from "@/assets/contracts";
import { useContract } from "@/hooks/global";
import allocatorAbi from "@/assets/abis/Allocator.json";
import erc20Abi from "@/assets/abis/ERC20.json";
import { useCallback, useEffect, useState } from "react";
import { isNil } from "lodash";
import { useTokenDetails } from "@/hooks/contracts";
import { hexValue } from "@ethersproject/bytes";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

export const useAllocatorStaking = (amount: number, lockDurationInDays: number) => {
  const stakingContract = useContract(allocatorContracts, allocatorAbi);
  const sparkfiTokenContract = useContract(sparkFiTokenContracts, erc20Abi);
  const sparkfiTokenDetails = useTokenDetails(sparkFiTokenContracts);
  const [isLoading, setIsLoading] = useState(false);

  const stake = useCallback(async () => {
    if (!isNil(stakingContract) && !isNil(sparkfiTokenContract) && !isNil(sparkfiTokenDetails)) {
      try {
        setIsLoading(true);

        const amountHex = hexValue(
          parseUnits(
            amount.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
            sparkfiTokenDetails.decimals
          )
        );
        const lockDurationInDaysHex = hexValue(lockDurationInDays);
        const approvalTx = await sparkfiTokenContract.approve(stakingContract.address, amountHex);

        await approvalTx.wait();

        const stakeTx = await stakingContract.stake(amountHex, lockDurationInDaysHex);
        const awaitedTx = await stakeTx.wait();

        setIsLoading(false);

        return awaitedTx;
      } catch (error: any) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [amount, lockDurationInDays, sparkfiTokenContract, sparkfiTokenDetails, stakingContract]);

  return { isLoading, stake };
};

export const useAllocatorUnstaking = () => {
  const stakingContract = useContract(allocatorContracts, allocatorAbi);
  const sparkfiTokenContract = useContract(sparkFiTokenContracts, erc20Abi);
  const sparkfiTokenDetails = useTokenDetails(sparkFiTokenContracts);
  const [isLoading, setIsLoading] = useState(false);

  const unstake = useCallback(async () => {
    if (!isNil(stakingContract) && !isNil(sparkfiTokenContract) && !isNil(sparkfiTokenDetails)) {
      try {
        setIsLoading(true);

        const unstakeTx = await stakingContract.unstake();
        const awaitedTx = await unstakeTx.wait();

        setIsLoading(false);

        return awaitedTx;
      } catch (error: any) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [sparkfiTokenContract, sparkfiTokenDetails, stakingContract]);

  return { isLoading, unstake };
};

export const useAccountTier = () => {
  const [tier, setTier] = useState("");
  const { account } = useWeb3React();
  const stakingContract = useContract(allocatorContracts, allocatorAbi);

  useEffect(() => {
    if (!isNil(account) && !isNil(stakingContract)) {
      (async () => {
        try {
          const x = await stakingContract.userTier(account);
          setTier(x[0]);
        } catch (error: any) {
          console.debug(error);
          setTier("");
        }
      })();
    } else setTier("");
  }, [account, stakingContract]);
  return tier;
};

export const useAccountReward = () => {
  const [reward, setReward] = useState(0);
  const { account } = useWeb3React();
  const stakingContract = useContract(allocatorContracts, allocatorAbi);

  useEffect(() => {
    if (!isNil(account) && !isNil(stakingContract)) {
      (async () => {
        try {
          const x = await stakingContract.accountReward(account);
          setReward(parseFloat(x.toString()));
        } catch (error: any) {
          console.debug(error);
          setReward(0);
        }
      })();
    } else setReward(0);
  }, [account, stakingContract]);
  return reward;
};
