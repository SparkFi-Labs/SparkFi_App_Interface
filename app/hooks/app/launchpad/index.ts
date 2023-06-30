import {
  Contribution,
  IndexCompletedTokenSalesDocument,
  IndexOnGoingTokenSalesDocument,
  IndexSingleTokenSaleDocument,
  IndexUpcomingTokenSalesDocument,
  IndexUserContributionToSaleDocument,
  TokenSale,
  execute
} from "@/.graphclient";
import { useWeb3React } from "@web3-react/core";
import { floor, subtract } from "lodash";
import { useEffect, useState } from "react";

export const useUpcomingSales = (itemsPerPage: number = 3, page: number = 1) => {
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

export const useActiveSales = (itemsPerPage: number = 3, page: number = 1) => {
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

export const useCompletedSales = (itemsPerPage: number = 3, page: number = 1) => {
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

export const useMyContributions = (sale: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Contribution[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { account } = useWeb3React();

  useEffect(() => {
    if (account && sale) {
      (async () => {
        try {
          setIsLoading(true);

          const result = await execute(IndexUserContributionToSaleDocument, { sale, account });
          setData(result.data?.contributions || []);
          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          setError(error);
          console.debug(error);
        }
      })();
    } else setData([]);
  }, [account, sale]);

  return { isLoading, data, error };
};
