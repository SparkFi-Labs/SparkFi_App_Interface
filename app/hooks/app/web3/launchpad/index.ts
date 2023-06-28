import { presaleFactoryContracts } from "@/assets/contracts";
import { useContract } from "@/hooks/global";
import presaleFactoryAbi from "@/assets/abis/PresaleFactory.json";
import { useCallback, useState } from "react";
import validateSchema from "@/utils/validateSchema";
import { ethereumAddressSchema, validURISchema } from "@/schemas";
import { useTokenDetails } from "@/hooks/contracts";
import { parseUnits } from "@ethersproject/units";
import { ceil, toString } from "lodash";
import { hexValue } from "@ethersproject/bytes";
import assert from "assert";

export const usePresaleDeploymentInitializer = (
  newOwner: string,
  casher: string,
  funder: string,
  salePrice: number,
  paymentToken: string,
  saleToken: string,
  startTime: number,
  daysToLast: number,
  softCap: number,
  hardCap: number,
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
          assert(hardCap > 0, "hard cap must be greater than 0");
          assert(hardCap > softCap, "hard cap must be greater than soft cap");

          setIsLoading(true);

          const salePriceHex = hexValue(parseUnits(toString(salePrice), paymentTokenDetails.decimals));
          const startTimeHex = hexValue(startTime);
          const daysToLastHex = hexValue(ceil(daysToLast));
          const hardCapHex = hexValue(parseUnits(toString(hardCap), saleTokenDetails.decimals));
          const softCapHex = hexValue(parseUnits(toString(softCap), saleTokenDetails.decimals));
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
      hardCap,
      newOwner,
      paymentToken,
      paymentTokenDetails,
      salePrice,
      saleToken,
      saleTokenDetails,
      softCap,
      startTime,
      withdrawalDelay
    ]
  );

  return { initiateDeployment, isLoading };
};
