import {
  IndexCompletedTokenSalesDocument,
  IndexOnGoingTokenSalesDocument,
  IndexUpcomingTokenSalesDocument,
  TokenSale,
  execute
} from "@/.graphclient";
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
