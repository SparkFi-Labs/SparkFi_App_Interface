import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { assign, ceil, floor, isNil, map } from "lodash";
import { ThreeCircles } from "react-loader-spinner";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory";

interface SingleSaleTokenomicsProps {
  data: TokenSale;
}

const randomRGB = (index: number, length: number) => {
  const r = (index % 200) * floor(Math.sqrt(255 / length) * (index % 255));
  const g = floor(40 * (index % 200)) * ceil(index / length);
  const b = ceil(40 * (index % 200)) * (index % 200);
  return `rgb(${r}, ${g}, ${b})`;
};

export default function SingleSaleTokenomicsInfo({ data }: SingleSaleTokenomicsProps) {
  const { metadata, isLoading, error } = useIPFSGetMetadata(data.metadataURI);
  return (
    <div className="flex flex-col justify-start items-start px-1 py-1 lg:py-3 lg:px-3 w-full overflow-auto gap-7">
      {isLoading || !isNil(error) ? (
        <div className="flex w-full justify-center items-center">
          <ThreeCircles color="#fff" width={60} />
        </div>
      ) : (
        <>
          <span className="font-[400] text-sm lg:text-xl capitalize">tokenomics</span>
          <div className="w-full flex justify-center items-center flex-col gap-4">
            {!isNil(metadata) && (
              <svg viewBox="0 0 400 400" width="100%" height={500}>
                <VictoryPie
                  events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => {
                          return [
                            {
                              target: "data",
                              mutation: ({ ...props }) => {
                                return assign(
                                  { ...props },
                                  {
                                    padAngle: 10
                                  }
                                );
                              }
                            }
                          ];
                        },
                        onMouseLeave: () => {
                          return [
                            {
                              target: "data",
                              mutation: () => {
                                return null;
                              }
                            }
                          ];
                        }
                      }
                    }
                  ]}
                  theme={VictoryTheme.material}
                  labelComponent={
                    <VictoryLabel
                      style={[
                        {
                          fill: "#7f00ff"
                        },
                        {
                          fill: "#fff"
                        }
                      ]}
                    />
                  }
                  standalone={false}
                  width={400}
                  labels={({ datum }) => [datum.name, `${datum.y}%`]}
                  colorScale={map(metadata.tokenomics, (m, index: number) =>
                    randomRGB(index + 1, metadata.tokenomics.length)
                  )}
                  data={map(metadata.tokenomics, (member, index) => ({
                    x: index,
                    y: member.value,
                    name: member.name
                  }))}
                />
              </svg>
            )}
            <article className="prose w-full max-w-none prose-slate lg:prose-lg prose-sm prose-a:break-all prose-a:text-[#0029ff] text-[#d9d9d9] font-inter flex justify-center items-center">
              {!isNil(metadata) && (
                <ul className="w-full flex flex-col justify-start items-start">
                  {map(metadata.tokenomics, (member, index) => (
                    <li key={index}>
                      <span className="font-inter text-sm lg:text-lg">
                        {member.value}% {member.name} - {member.description}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        </>
      )}
    </div>
  );
}
