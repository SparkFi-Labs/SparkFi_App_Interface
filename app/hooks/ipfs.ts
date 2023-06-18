import { create } from "ipfs-http-client";
import { useCallback } from "react";

export const useIPFSUpload = (data: any, url: string = "/ipfs") => {
  const executeUpload = useCallback(() => {
    try {
      const ipfs = create({ url });
      return ipfs.add(data);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }, [data, url]);

  return { executeUpload };
};
