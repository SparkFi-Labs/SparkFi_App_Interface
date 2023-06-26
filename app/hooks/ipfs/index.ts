import axios from "axios";
import { create } from "kubo-rpc-client";
import { useCallback, useEffect, useState } from "react";

export const useIPFSUpload = (data: any, url: string = "/ipfs-api/api/v0") => {
  const executeUpload = useCallback(() => {
    try {
      const ipfs = create({ url });
      return ipfs.add(data, { pin: true });
    } catch (error: any) {
      return Promise.reject(error);
    }
  }, [data, url]);

  return { executeUpload };
};

export const useIPFSGetMetadata = (uri: string) => {
  const [metadata, setMetadata] = useState<{ [key: string]: any } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  useEffect(() => {
    if (uri) {
      (async () => {
        try {
          setIsLoading(true);

          const { data } = await axios.get(uri);
          setMetadata(data);

          setIsLoading(false);
        } catch (error: any) {
          setError(error);
          setIsLoading(false);
        }
      })();
    }
  }, [uri]);

  return { metadata, isLoading, error };
};
