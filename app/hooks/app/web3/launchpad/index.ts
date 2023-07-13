import { presaleFactoryContracts } from "@/assets/contracts";
import { useContract } from "@/hooks/global";
import presaleFactoryAbi from "@/assets/abis/PresaleFactory.json";
import presaleAbi from "@/assets/abis/Presale.json";
import erc20Abi from "@/assets/abis/ERC20.json";
import { useCallback, useEffect, useState } from "react";
import validateSchema from "@/utils/validateSchema";
import { ethereumAddressSchema, validNumberSchema, validURISchema } from "@/schemas";
import { useTokenDetails } from "@/hooks/contracts";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { ceil } from "lodash";
import { hexValue } from "@ethersproject/bytes";
import assert from "assert";
import { useSingleSale } from "../../launchpad";
import { useWeb3React } from "@web3-react/core";

export const usePresaleDeploymentInitializer = (
  newOwner: string,
  casher: string,
  funder: string,
  salePrice: number,
  paymentToken: string,
  saleToken: string,
  startTime: number,
  daysToLast: number,
  minTotalPayment: number,
  maxTotalPayment: number,
  withdrawalDelay: number
) => {
  const factoryContract = useContract(presaleFactoryContracts, presaleFactoryAbi);
  const paymentTokenDetails = useTokenDetails(paymentToken);
  const saleTokenDetails = useTokenDetails(saleToken);
  const [isLoading, setIsLoading] = useState(false);

  const initiateDeployment = useCallback(
    async (metadataURI: string) => {
      if (factoryContract && paymentTokenDetails && saleTokenDetails) {
        try {
          validateSchema(validURISchema, metadataURI);
          validateSchema(ethereumAddressSchema, newOwner);
          validateSchema(ethereumAddressSchema, casher);
          validateSchema(ethereumAddressSchema, funder);
          validateSchema(ethereumAddressSchema, paymentToken);
          validateSchema(ethereumAddressSchema, saleToken);

          assert(salePrice > 0, "sale price must be greater than 0");
          assert(daysToLast >= 1, "duration must be at keast 24 hours");
          assert(minTotalPayment > 0, "minimum payment per account must be greater than 0");
          assert(maxTotalPayment > minTotalPayment, "maximum payment per account must be greater than minimum payment");

          setIsLoading(true);

          const salePriceHex = hexValue(
            parseUnits(
              salePrice.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
              paymentTokenDetails.decimals
            )
          );
          const startTimeHex = hexValue(startTime);
          const daysToLastHex = hexValue(ceil(daysToLast));
          const hardCapHex = hexValue(
            parseUnits(
              maxTotalPayment.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
              saleTokenDetails.decimals
            )
          );
          const softCapHex = hexValue(
            parseUnits(
              minTotalPayment.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
              saleTokenDetails.decimals
            )
          );
          const withdrawalDelayHex = hexValue(withdrawalDelay);

          const tx = await factoryContract.deploySale(
            metadataURI,
            newOwner,
            casher,
            funder,
            salePriceHex,
            paymentToken,
            saleToken,
            startTimeHex,
            daysToLastHex,
            softCapHex,
            hardCapHex,
            [],
            [],
            withdrawalDelayHex
          );

          const awaitedTx = await tx.wait();

          setIsLoading(false);
          return awaitedTx;
        } catch (error: any) {
          setIsLoading(false);
          return Promise.reject(error);
        }
      }
    },
    [
      casher,
      daysToLast,
      factoryContract,
      funder,
      maxTotalPayment,
      minTotalPayment,
      newOwner,
      paymentToken,
      paymentTokenDetails,
      salePrice,
      saleToken,
      saleTokenDetails,
      startTime,
      withdrawalDelay
    ]
  );

  return { initiateDeployment, isLoading };
};

export const usePresaleContributor = (saleId: string) => {
  const { data } = useSingleSale(saleId);
  const paymentTokenDetails = useTokenDetails(data?.paymentToken.id || "");
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);
  const erc20Contract = useContract(data?.paymentToken.id || "", erc20Abi);

  const contribute = useCallback(
    async (amount: number) => {
      if (presaleContract && paymentTokenDetails && data && erc20Contract) {
        try {
          validateSchema(validNumberSchema("amount"), amount);
          setIsLoading(true);

          const amountHex = hexValue(
            parseUnits(
              amount.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
              paymentTokenDetails.decimals
            )
          );
          const approvalTx = await erc20Contract.approve(saleId, amountHex);

          await approvalTx.wait();

          const contributionTx = await presaleContract.purchase(amountHex);
          const awaitedTx = await contributionTx.wait();

          setIsLoading(false);
          return awaitedTx;
        } catch (error: any) {
          setIsLoading(false);
          return Promise.reject(error);
        }
      }
    },
    [data, erc20Contract, paymentTokenDetails, presaleContract, saleId]
  );

  return { isLoading, contribute };
};

export const usePresaleFunder = (saleId: string) => {
  const { data } = useSingleSale(saleId);
  const saleTokenDetails = useTokenDetails(data?.saleToken.id || "");
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);
  const erc20Contract = useContract(data?.saleToken.id || "", erc20Abi);

  const fund = useCallback(
    async (amount: number) => {
      if (presaleContract && saleTokenDetails && data && erc20Contract) {
        try {
          validateSchema(validNumberSchema("amount"), amount);
          setIsLoading(true);

          const amountHex = hexValue(
            parseUnits(
              amount.toLocaleString("fullwide", { useGrouping: false, maximumSignificantDigits: 12 }),
              saleTokenDetails.decimals
            )
          );
          const approvalTx = await erc20Contract.approve(saleId, amountHex);

          await approvalTx.wait();

          const fundTx = await presaleContract.fund(amountHex);
          const awaitedTx = await fundTx.wait();

          setIsLoading(false);
          return awaitedTx;
        } catch (error: any) {
          setIsLoading(false);
          return Promise.reject(error);
        }
      }
    },
    [data, erc20Contract, presaleContract, saleId, saleTokenDetails]
  );

  return { isLoading, fund };
};

export const usePresaleCasher = (saleId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);

  const cash = useCallback(async () => {
    if (presaleContract) {
      try {
        setIsLoading(true);

        const cashTx = await presaleContract.cash();
        const awaitedTx = await cashTx.wait();

        setIsLoading(false);
        return awaitedTx;
      } catch (error: any) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [presaleContract]);

  return { isLoading, cash };
};

export const usePresaleWithdrawal = (saleId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);

  const withdrawal = useCallback(async () => {
    if (presaleContract) {
      try {
        setIsLoading(true);

        const withdrawalTx = await presaleContract.withdraw();
        const awaitedTx = await withdrawalTx.wait();

        setIsLoading(false);
        return awaitedTx;
      } catch (error: any) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [presaleContract]);

  return { isLoading, withdrawal };
};

export const usePresaleEmergencyWithdrawal = (saleId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);

  const emergencyWithdrawal = useCallback(async () => {
    if (presaleContract) {
      try {
        setIsLoading(true);

        const withdrawalTx = await presaleContract.emergencyWithdraw();
        const awaitedTx = await withdrawalTx.wait();

        setIsLoading(false);
        return awaitedTx;
      } catch (error: any) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [presaleContract]);

  return { isLoading, emergencyWithdrawal };
};

export const useMyClaimableInSale = (saleId: string) => {
  const [claimable, setClaimable] = useState(0);
  const { data: tokenSaleData } = useSingleSale(saleId);
  const tokenDetails = useTokenDetails(tokenSaleData?.saleToken.id || "");
  const saleContract = useContract(saleId, presaleAbi);
  const { account } = useWeb3React();

  useEffect(() => {
    if (saleId && saleContract && tokenDetails && account) {
      (async () => {
        try {
          const claimable = await saleContract.getCurrentClaimableToken(account);
          let formatted: string | number = formatUnits(claimable, tokenDetails.decimals);
          formatted = parseFloat(formatted);
          setClaimable(formatted);
        } catch (error: any) {
          console.debug(error);
        }
      })();
    } else setClaimable(0);
  }, [account, saleContract, saleId, tokenDetails]);

  return claimable;
};

export const useMyTotalPurchasedInSale = (saleId: string) => {
  const [claimable, setClaimable] = useState(0);
  const { data: tokenSaleData } = useSingleSale(saleId);
  const tokenDetails = useTokenDetails(tokenSaleData?.saleToken.id || "");
  const saleContract = useContract(saleId, presaleAbi);
  const { account } = useWeb3React();

  useEffect(() => {
    if (saleId && saleContract && tokenDetails && account) {
      (async () => {
        try {
          const claimable = await saleContract.totalPurchased(account);
          let formatted: string | number = formatUnits(claimable, tokenDetails.decimals);
          formatted = parseFloat(formatted);
          setClaimable(formatted);
        } catch (error: any) {
          console.debug(error);
        }
      })();
    } else setClaimable(0);
  }, [account, saleContract, saleId, tokenDetails]);

  return claimable;
};

export const useAccountIsPresaleFactoryAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { account } = useWeb3React();
  const presaleFactory = useContract(presaleFactoryContracts, presaleFactoryAbi);

  useEffect(() => {
    if (presaleFactory && account) {
      (async () => {
        try {
          const adminRole = await presaleFactory.ADMIN_ROLE();
          const hasRole = await presaleFactory.hasRole(adminRole, account);
          setIsAdmin(hasRole);
        } catch (error: any) {
          console.debug(error);
        }
      })();
    } else setIsAdmin(false);
  }, [account, presaleFactory]);
  return isAdmin;
};

export const useAccountIsPresaleFunder = (saleId: string) => {
  const [isFunder, setIsFunder] = useState(false);
  const { account } = useWeb3React();
  const presale = useContract(saleId, presaleAbi);

  useEffect(() => {
    if (saleId && account && presale) {
      (async () => {
        try {
          const funder = await presale.funder();
          setIsFunder(account === funder);
        } catch (error: any) {
          console.debug(error);
        }
      })();
    } else setIsFunder(false);
  }, [account, presale, saleId]);
  return isFunder;
};
