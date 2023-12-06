import {
  IndexAllTokensDocument,
  type Token,
  execute,
  IndexSingleTokenDocument,
  type Router,
  IndexRouterInfoDocument,
  type RouterDayData,
  IndexRouterDayDataDocument,
  type Adapter,
  IndexAdaptersDocument,
  IndexSingleAdapterDocument
} from "@/.graphclient";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useMemo } from "react";
import { subgraphChainIDToName } from "../shared";
import { isNil } from "lodash";
import { exchangeRouterContracts } from "@/assets/contracts";

export const useAssetList = () => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const [data, setData] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    execute(IndexAllTokensDocument, {}, { chain })
      .then(val => {
        setData(val.data.tokens);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.debug(err);
        setIsLoading(false);
      });
  }, [chain]);

  return { data, isLoading };
};

export const useSingleTokenData = (id: string) => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const [data, setData] = useState<Token>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isNil(id)) {
      setIsLoading(true);
      execute(IndexSingleTokenDocument, { id }, { chain })
        .then(val => {
          setData(val.data.token);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.debug(err);
          setIsLoading(false);
        });
    }
  }, [chain, id]);

  return { data, isLoading };
};

export const useRouterInfo = () => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const routerId = useMemo(() => exchangeRouterContracts[chainId ?? 84531], [chainId]);
  const [data, setData] = useState<Router>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    execute(IndexRouterInfoDocument, { id: routerId }, { chain })
      .then(val => {
        setData(val.data.router);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.debug(err);
        setIsLoading(false);
      });
  }, [chain, routerId]);

  return { data, isLoading };
};

export const useRouterDayData = () => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const [data, setData] = useState<RouterDayData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    execute(IndexRouterDayDataDocument, {}, { chain })
      .then(val => {
        setData(val.data.routerDayDatas);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.debug(err);
        setIsLoading(false);
      });
  }, [chain]);

  return { data, isLoading };
};

export const useAdaptersList = () => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const [data, setData] = useState<Adapter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    execute(IndexAdaptersDocument, {}, { chain })
      .then(val => {
        setData(val.data.adapters);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.debug(err);
        setIsLoading(false);
      });
  }, [chain]);

  return { data, isLoading };
};

export const useAdapter = (id: string) => {
  const { chainId } = useWeb3React();
  const chain = useMemo(() => subgraphChainIDToName(chainId ?? 84531), [chainId]);
  const [data, setData] = useState<Adapter>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isNil(id)) {
      setIsLoading(true);
      execute(IndexSingleAdapterDocument, { id }, { chain })
        .then(val => {
          setData(val.data.adapter);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.debug(err);
          setIsLoading(false);
        });
    }
  }, [chain, id]);

  return { data, isLoading };
};
