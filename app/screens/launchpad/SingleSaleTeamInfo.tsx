import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { isNil, map } from "lodash";
import { ThreeCircles } from "react-loader-spinner";

interface SingleSaleTeamInfoProps {
  data: TokenSale;
}

export default function SingleSaleTeamInfo({ data }: SingleSaleTeamInfoProps) {
  const { metadata, isLoading, error } = useIPFSGetMetadata(data.metadataURI);
  return (
    <div className="flex flex-col justify-start items-start px-1 py-1 lg:py-3 lg:px-3 w-full overflow-auto gap-7">
      {isLoading || !isNil(error) ? (
        <div className="flex w-full justify-center items-center">
          <ThreeCircles color="#fff" width={60} />
        </div>
      ) : (
        <>
          <span className="font-[400] text-sm lg:text-xl capitalize">team</span>
          <article className="prose w-full max-w-none prose-slate lg:prose-lg prose-sm prose-a:break-all prose-a:text-[#0029ff] text-[#d9d9d9] font-inter">
            {!isNil(metadata) && (
              <div className="flex flex-col justify-start items-start">
                {map(metadata.team, (member, index) => (
                  <div key={index}>
                    <div className="flex flex-col justify-start items-start w-full">
                      <h4 className="font-[600] text-sm lg:text-lg font-inter">
                        {member.name} - {member.role}
                      </h4>
                      <p className="w-full text-justify font-inter">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </>
      )}
    </div>
  );
}
