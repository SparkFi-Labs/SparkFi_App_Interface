import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { isNil } from "lodash";
import { ThreeCircles } from "react-loader-spinner";

interface SingleSaleDescriptionProps {
  data: TokenSale;
}

export default function SingleSaleDescription({ data }: SingleSaleDescriptionProps) {
  const { metadata, isLoading, error } = useIPFSGetMetadata(data.metadataURI);
  return (
    <div className="flex flex-col justify-start items-start px-1 py-1 lg:py-3 lg:px-3 w-full overflow-auto gap-7">
      {isLoading || !isNil(error) ? (
        <div className="flex w-full justify-center items-center">
          <ThreeCircles color="#fff" width={60} />
        </div>
      ) : (
        <>
          <span className="font-[400] text-sm lg:text-xl capitalize">what&apos;s {metadata?.name}?</span>
          <article
            className="prose w-full max-w-none prose-slate lg:prose-lg prose-sm prose-a:break-all prose-headings:font-manuale prose-ul:font-inter prose-li:font-inter prose-a:font-inter prose-em:font-inter prose-strong:font-inter prose-a:text-[#0029ff] text-[#d9d9d9] font-inter prose-p:font-inter prose-fuchsia break-all"
            dangerouslySetInnerHTML={{
              __html: metadata?.description || ""
            }}
          />
        </>
      )}
    </div>
  );
}
