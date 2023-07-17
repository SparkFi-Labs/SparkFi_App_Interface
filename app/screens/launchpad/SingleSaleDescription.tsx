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
              className="prose w-full overflow-auto max-w-none prose-slate lg:prose-lg prose-sm prose-a:break-all prose-a:text-[#0029ff] text-[#878aa1]"
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
