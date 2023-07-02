import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import NoDataOrError from "@/ui/NoDataOrError";

interface SingleSaleDescriptionProps {
  data: TokenSale;
}

export default function SingleSaleDescription({ data }: SingleSaleDescriptionProps) {
  const { metadata, isLoading, error } = useIPFSGetMetadata(data.metadataURI);
  return (
    <div className="flex justify-start items-center py-12 w-full overflow-auto">
      {isLoading ? (
        <span className="loading loading-infinity loading-lg text-[#0029ff]"></span>
      ) : (
        <>
          {error ? (
            <NoDataOrError message={error.message} />
          ) : (
            <article
              className="text-[#878aa1] w-full overflow-auto text-[0.85em] lg:text-[1em]"
              dangerouslySetInnerHTML={{
                __html: metadata?.description || ""
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
