import type { TokenSale } from "@/.graphclient";
import { useIPFSGetMetadata } from "@/hooks/ipfs";
import { assign, ceil, floor, isNil, map } from "lodash";
import { ThreeCircles } from "react-loader-spinner";
import { VictoryChart, VictoryLabel, VictoryLegend, VictoryPie, VictoryTheme } from "victory";

interface SingleSaleTokenomicsProps {
  data: TokenSale;
}

const randomRGB = (index: number, length: number) => {
  const r = (index % 100) * floor(Math.sqrt(155 / length) * (index % 255));
  const g = floor(40 * (index % 240)) * ceil(index / length);
  const b = ceil(40 * (index % 100)) * (index % 200);
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
              <svg viewBox="0 0" width={300} height={300}>
                <VictoryPie
                  innerRadius={90}
                  labelComponent={<VictoryLabel style={{ fill: "#fff", fontWeight: 500, fontSize: 10 }} />}
                  theme={VictoryTheme.material}
                  standalone={false}
                  labelRadius={100}
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
          </div>
        </>
      )}
    </div>
  );
}
