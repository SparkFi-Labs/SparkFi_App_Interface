import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { ceil, floor, isNil, map } from "lodash";
import { ThreeCircles } from "react-loader-spinner";
import { VictoryLabel, VictoryLegend, VictoryPie, VictoryTheme } from "victory";

interface SingleSaleTokenomicsProps {
  data: TokenSale;
}

const randomRGB = (index: number, length: number) => {
  const r = floor(40 * (index % 140)) * ceil(index / length) + Math.sqrt(100 / 25);
  const g = (index % 100) * floor(Math.sqrt(255 / length) * (index % 155));
  const b = ceil(40 * (index % 100)) * (index % 100);
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
          <div className="w-full flex justify-center items-center flex-col gap-2 overflow-auto hidden-scrollbar">
            {!isNil(metadata) && (
              <>
                <svg viewBox="0 0 400 400" width="400" height="400">
                  <VictoryPie
                    innerRadius={80}
                    labelComponent={<VictoryLabel style={{ fill: "#fff", fontWeight: 500, fontSize: 12 }} />}
                    theme={VictoryTheme.material}
                    standalone={false}
                    width={400}
                    height={400}
                    labelRadius={110}
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
                <svg viewBox="0 0 700 100" width="700" height="100" className="overflow-x-auto">
                  <VictoryLegend
                    symbolSpacer={5}
                    theme={VictoryTheme.material}
                    gutter={20}
                    width={700}
                    height={100}
                    standalone={false}
                    x={190}
                    y={50}
                    orientation="horizontal"
                    style={{ labels: { fontSize: 12 } }}
                    centerTitle
                    data={map(metadata.tokenomics, (member, index: number) => ({
                      labels: { fill: "#fff" },
                      symbol: { fill: randomRGB(index + 1, metadata.tokenomics.length) },
                      name: member.name
                    }))}
                  />
                </svg>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
