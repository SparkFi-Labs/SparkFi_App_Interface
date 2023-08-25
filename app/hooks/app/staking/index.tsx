import {
  type Allocator,
  execute,
  IndexAllocatorInfoDocument,
  IndexAllTiersDocument,
  type Tier,
  type Account,
  IndexAccountInfoDocument
} from "@/.graphclient";
import { useWeb3React } from "@web3-react/core";
import { isNil, toLower } from "lodash";
import { useEffect, useState } from "react";

export const useAllTiers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Tier[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexAllTiersDocument, {});
        setData(result.data.tiers);

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.debug(error);
      }
    })();
  }, []);

  return { isLoading, data };
};

export const useAllocatorInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Allocator | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexAllocatorInfoDocument, {});
        setData(result.data.allocator);

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.debug(error);
      }
    })();
  }, []);

  return { isLoading, data };
};

export const useAccountAllocationInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Account | undefined>(undefined);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!isNil(account)) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexAccountInfoDocument, { id: toLower(account) });
          setData(result.data.account);

          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    }
  }, [account]);

  return { isLoading, data };
};
