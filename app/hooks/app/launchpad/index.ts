import {
  type Contribution,
  IndexCompletedTokenSalesDocument,
  IndexOnGoingTokenSalesDocument,
  IndexSingleTokenSaleDocument,
  IndexUpcomingTokenSalesDocument,
  IndexUserContributionToSalesDocument,
  TokenSale,
  execute,
  IndexAccountOverviewDocument,
  type PresaleFactory,
  IndexPresaleFactoryOverviewDocument,
  IndexContributedTokenSalesMatchingSearchParamsDocument
} from "@/.graphclient";
import type { PresaleFactoryTypes } from "@/.graphclient/sources/PresaleFactory/types";
import { useWeb3React } from "@web3-react/core";
import { flatMap, floor, includes, isNil, map, subtract, toLower, trim } from "lodash";
import { useEffect, useMemo, useState } from "react";
import blacklist from "@/assets/blacklist.json";
import { subgraphChainIDToName } from "../shared";

export const useUpcomingSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const first = itemsPerPage;
        const skip = subtract(page, 1);
        const startTime = Math.floor(Date.now() / 1000);

        const result = await execute(IndexUpcomingTokenSalesDocument, { first, skip, startTime }, { chain });

        setData(result.data.tokenSales.filter((x: any) => !includes(blacklist, x.id)));
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [chain, itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useActiveSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const first = itemsPerPage;
        const skip = subtract(page, 1);
        const startTime = Math.floor(Date.now() / 1000);
        const endTime = Math.floor(Date.now() / 1000);

        const result = await execute(IndexOnGoingTokenSalesDocument, { first, skip, startTime, endTime }, { chain });

        setData(result.data.tokenSales.filter((x: any) => !includes(blacklist, x.id)));
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [chain, itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useCompletedSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(
          IndexCompletedTokenSalesDocument,
          {
            first: itemsPerPage,
            skip: subtract(page, 1),
            endTime: floor(Date.now() / 1000)
          },
          { chain }
        );

        setData(result.data.tokenSales.filter((x: any) => !includes(blacklist, x.id)));
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [chain, itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useSingleSale = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexSingleTokenSaleDocument, { id }, { chain });

          setData(result.data.tokenSale);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          setError(error);
          console.debug(error);
        }
      })();
    }
  }, [chain, id]);

  return { data, isLoading, error };
};

export const useMyContributionsMatchingSearchParams = (tokenName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Contribution[]>([]);
  const { account } = useWeb3React();
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);

  useEffect(() => {
    if (!isNil(account) && trim(tokenName).length > 0) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(
            IndexContributedTokenSalesMatchingSearchParamsDocument,
            {
              account: toLower(account),
              tokenName
            },
            { chain }
          );

          const fMap = flatMap(map(result.data.tokenSales, t => t.contributions));

          setData(fMap);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    }
  }, [account, chain, tokenName]);
  return { isLoading, data };
};

export const useMyContributions = (itemsPerPage: number = 15, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Contribution[]>([]);
  const { account } = useWeb3React();
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);

  useEffect(() => {
    if (!isNil(account)) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(
            IndexUserContributionToSalesDocument,
            {
              account: toLower(account),
              first: itemsPerPage,
              skip: subtract(page, 1)
            },
            { chain }
          );
          setData(result.data?.contributions || []);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    } else setData([]);
  }, [account, chain, itemsPerPage, page]);

  return { isLoading, data };
};

export const useMyAccountOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresaleFactoryTypes.Account | undefined>(undefined);
  const { account } = useWeb3React();
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);

  useEffect(() => {
    if (!isNil(account)) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexAccountOverviewDocument, { id: toLower(account) }, { chain });
          setData(result.data.contributions[0]?.user);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    } else setData(undefined);
  }, [account, chain]);

  return { isLoading, data };
};

export const usePresaleFactoryOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresaleFactory | undefined>(undefined);
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexPresaleFactoryOverviewDocument, {}, { chain });
        setData(result.data.presaleFactory);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.debug(error);
      }
    })();
  }, [chain]);

  return { isLoading, data };
};
