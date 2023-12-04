import { useEffect, useState } from "react";

export const subgraphChainIDToName = (chainId: number) =>
  ({
    84531: "base-goerli",
    8453: "base"
  })[chainId] as string;

export const useAtomicDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return date;
};
