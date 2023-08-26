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
import { ceil, isEqual, isNil } from "lodash";
import { hexStripZeros, hexValue } from "@ethersproject/bytes";
import assert from "assert";
import { useSingleSale } from "../../launchpad";
import { useWeb3React } from "@web3-react/core";
import bytecodes from "@/assets/bytecodes";
import { _composeMerkleTree, _getProofForElement } from "@/utils/merkletree";
import { getWhitelist, getZKChallenge, saveWhitelist } from "@/utils/server";
import { AddressZero } from "@ethersproject/constants";

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
  withdrawalDelay: number,
  presaleType: 0 | 1
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
          const creationCode = presaleType === 0 ? bytecodes.regularSale : bytecodes.allocationSale;

          const tx = await factoryContract.deploySale(
            creationCode,
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
            withdrawalDelayHex,
            presaleType
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
      presaleType,
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
  const { account } = useWeb3React();

  const contribute = useCallback(
    async (amount: number) => {
      if (
        !isNil(presaleContract) &&
        !isNil(paymentTokenDetails) &&
        !isNil(data) &&
        !isNil(erc20Contract) &&
        !isNil(account)
      ) {
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

          const whitelistRootHash = await presaleContract.whitelistRootHash();

          let contributionTx: any;

          if (isEqual(hexStripZeros(whitelistRootHash), hexStripZeros(AddressZero))) {
            contributionTx = await presaleContract.purchase(amountHex);
          } else {
            const zkChallenge = await getZKChallenge();
            const whitelistResponse = await getWhitelist(saleId, zkChallenge.result);
            const proof = _getProofForElement(whitelistResponse.result, account);
            console.log(proof);
            contributionTx = await presaleContract.whitelistedPurchase(amountHex, proof);
          }

          const awaitedTx = await contributionTx.wait();

          setIsLoading(false);
          return awaitedTx;
        } catch (error: any) {
          setIsLoading(false);
          return Promise.reject(error);
        }
      }
    },
    [account, data, erc20Contract, paymentTokenDetails, presaleContract, saleId]
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
    if (!isNil(presaleContract)) {
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

export const usePresaleWhitelistSetCountdown = (saleId: string, startTime: number, durationInDays: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);

  const startWhitelistCountdown = useCallback(async () => {
    if (!isNil(presaleContract)) {
      try {
        setIsLoading(true);

        const startTimeHex = hexValue(startTime);
        const durationInDaysHex = hexValue(durationInDays);
        const startTx = await presaleContract.setWhitelistDuration(startTimeHex, durationInDaysHex);
        const awaitedTx = await startTx.wait();

        setIsLoading(false);
        return awaitedTx;
      } catch (error) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [durationInDays, presaleContract, startTime]);

  return { isLoading, startWhitelistCountdown };
};

export const usePresaleWhitelist = (saleId: string, whitelist: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const presaleContract = useContract(saleId, presaleAbi);

  const setWhitelist = useCallback(async () => {
    if (!isNil(presaleContract)) {
      try {
        setIsLoading(true);

        const mtree = _composeMerkleTree(whitelist);

        const whitelistTx = await presaleContract.setWhitelist(mtree.getHexRoot());
        const awaitedTx = await whitelistTx.wait();

        const zkChallenge = await getZKChallenge();
        await saveWhitelist(saleId, whitelist, zkChallenge.result);

        setIsLoading(false);
        return awaitedTx;
      } catch (error) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    }
  }, [presaleContract, saleId, whitelist]);

  return { isLoading, setWhitelist };
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

export const useAccountAllocation = (saleId: string) => {
  const [allocation, setAllocation] = useState(0);
  const presaleContract = useContract(saleId, presaleAbi);
  const { data: tokenSaleData } = useSingleSale(saleId);
  const tokenDetails = useTokenDetails(tokenSaleData?.paymentToken.id || "");
  const { account } = useWeb3React();

  useEffect(() => {
    if (saleId && !isNil(presaleContract) && !isNil(tokenDetails) && !isNil(account)) {
      (async () => {
        try {
          const accountAllocation = await presaleContract.getPaymentAllocationForAccount(account);
          let formatted: any = formatUnits(accountAllocation, tokenDetails.decimals);
          formatted = parseFloat(formatted);
          setAllocation(formatted);
        } catch (error) {
          console.debug(error);
        }
      })();
    } else setAllocation(0);
  }, [account, presaleContract, saleId, tokenDetails]);

  return allocation;
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
