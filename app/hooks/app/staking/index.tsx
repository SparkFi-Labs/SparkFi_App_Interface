import { execute, IndexAllTiersDocument, type Tier } from "@/.graphclient";
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
