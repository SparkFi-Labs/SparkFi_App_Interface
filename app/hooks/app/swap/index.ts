import { getTokenList } from "@/utils/server";
import { useWeb3React } from "@web3-react/core";
import { isNil } from "lodash";
import { useEffect, useState } from "react";

export const useTokenList = () => {
  const [data, setData] = useState<any[]>([]);
  const { chainId } = useWeb3React();

  useEffect(() => {
    if (!isNil(chainId))
      getTokenList(chainId)
        .then(list => setData(list.result))
        .catch(console.error);
    else
      getTokenList(84531)
        .then(list => setData(list.result))
        .catch(console.error);
  }, [chainId]);

  return data;
};
