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
import { flatMap, floor, isNil, map, subtract, toLower, trim } from "lodash";
import { useEffect, useState } from "react";

export const useUpcomingSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexUpcomingTokenSalesDocument, {
          first: itemsPerPage,
          skip: subtract(page, 1),
          startTime: floor(Date.now() / 1000)
        });

        setData(result.data.tokenSales);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useActiveSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexOnGoingTokenSalesDocument, {
          first: itemsPerPage,
          skip: subtract(page, 1),
          startTime: floor(Date.now() / 1000),
          endTime: floor(Date.now() / 1000)
        });

        setData(result.data.tokenSales);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useCompletedSales = (itemsPerPage: number = 2, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexCompletedTokenSalesDocument, {
          first: itemsPerPage,
          skip: subtract(page, 1),
          endTime: floor(Date.now() / 1000)
        });

        setData(result.data.tokenSales);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError(error);
        console.debug(error);
      }
    })();
  }, [itemsPerPage, page]);

  return { data, isLoading, error };
};

export const useSingleSale = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TokenSale | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexSingleTokenSaleDocument, { id });

          setData(result.data.tokenSale);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          setError(error);
          console.debug(error);
        }
      })();
    }
  }, [id]);

  return { data, isLoading, error };
};

export const useMyContributionsMatchingSearchParams = (tokenName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Contribution[]>([]);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!isNil(account) && trim(tokenName).length > 0) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexContributedTokenSalesMatchingSearchParamsDocument, {
            account: toLower(account),
            tokenName
          });

          const fMap = flatMap(map(result.data.tokenSales, t => t.contributions));

          setData(fMap);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    }
  }, [account, tokenName]);
  return { isLoading, data };
};

export const useMyContributions = (itemsPerPage: number = 15, page: number = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Contribution[]>([]);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!isNil(account)) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexUserContributionToSalesDocument, {
            account: toLower(account),
            first: itemsPerPage,
            skip: subtract(page, 1)
          });
          setData(result.data?.contributions || []);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    } else setData([]);
  }, [account, itemsPerPage, page]);

  return { isLoading, data };
};

export const useMyAccountOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresaleFactoryTypes.Account | undefined>(undefined);
  const { account } = useWeb3React();

  useEffect(() => {
    if (!isNil(account)) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexAccountOverviewDocument, { id: toLower(account) });
          setData(result.data.contributions[0]?.user);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.debug(error);
        }
      })();
    } else setData(undefined);
  }, [account]);

  return { isLoading, data };
};

export const usePresaleFactoryOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresaleFactory | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await execute(IndexPresaleFactoryOverviewDocument, {});
        setData(result.data.presaleFactory);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.debug(error);
      }
    })();
  }, []);

  return { isLoading, data };
};
