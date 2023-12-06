import { IndexAllTokensDocument, type Token, execute, IndexSingleTokenDocument } from "@/.graphclient";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { subgraphChainIDToName } from "../shared";
import { isNil } from "lodash";

export const useAssetList = () => {
  const { chainId } = useWeb3React();
  const chain = subgraphChainIDToName(chainId ?? 84531);
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
  const chain = subgraphChainIDToName(chainId ?? 84531);
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
