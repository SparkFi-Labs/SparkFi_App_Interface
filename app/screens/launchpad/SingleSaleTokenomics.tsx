import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { ceil, floor, isNil, map } from "lodash";
import { ThreeCircles } from "react-loader-spinner";
import { VictoryLabel, VictoryLegend, VictoryPie, VictoryTheme } from "victory";

interface SingleSaleTokenomicsProps {
  data: TokenSale;
}

const randomRGB = (index: number, length: number) => {
  const r = floor(40 * (index % 250)) * ceil(index / length) + Math.sqrt(255 / 25);
  const g = (index % 200) * floor(Math.sqrt(255 / length) * (index % 155));
  const b = ceil(40 * (index % 250)) * (index % 200);
  return `rgba(${r}, ${g}, ${b}, 0.76)`;
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
          <div className="w-full flex justify-center items-center flex-col gap-2 overflow-auto hidden-scrollbar">
            {!isNil(metadata) && (
              <>
                <svg viewBox="0 0 350 350" width="350" height="350">
                  <VictoryPie
                    innerRadius={80}
                    labelComponent={<VictoryLabel style={{ fill: "#fff", fontWeight: 500, fontSize: 12 }} />}
                    theme={VictoryTheme.material}
                    standalone={false}
                    width={350}
                    height={350}
                    labelRadius={97}
                    labels={({ datum }) => `${datum.y}%`}
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
                <div className="w-full lg:w-1/3 flex justify-center items-center gap-2 flex-wrap">
                  {map(metadata.tokenomics, (member, index: number) => (
                    <div className="flex justify-start gap-1 items-center">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: randomRGB(index + 1, metadata.tokenomics.length)}}></span>
                      <span className="text-xs lg:text-sm text-[#fff] font-inter">{member.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
