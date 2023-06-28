import axios from "axios";
import { create } from "kubo-rpc-client";
import type { AddResult } from "kubo-rpc-client/dist/src/types";
import { useCallback, useEffect, useState } from "react";

const address = process.env.NEXT_PUBLIC_IPFS_ADDRESS;
const signature = process.env.NEXT_PUBLIC_IPFS_SIGNATURE;
const authorization = address && signature ? `Basic ${btoa("eth-" + address + ":" + signature)}` : null;

export const useIPFSUpload = (data: any, url: string = "/ipfs-api/api/v0", onCompleted?: (r: AddResult) => any) => {
  const [isLoading, setIsLoading] = useState(false);
  const executeUpload = useCallback(async () => {
    try {
      const ipfs = create({ url, headers: authorization ? { authorization } : undefined });
      setIsLoading(true);
      const result = await ipfs.add(data, { pin: true });

      if (onCompleted) onCompleted(result);
      console.log(result);
      setIsLoading(false);
      return result;
    } catch (error: any) {
      console.debug(error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  }, [data, onCompleted, url]);

  return { executeUpload, isLoading };
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
