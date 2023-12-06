import { Line, ResponsiveContainer, LineChart as Chart, XAxis, CartesianGrid, YAxis } from "recharts";

interface LineChartProps {
  chartType: "monotone" | "linear";
  width: string | number;
  height: string | number;
  data: any[];
  xKey: string;
  yKey: string;
}

export default function LineChart({ chartType, width, height, data, xKey, yKey }: LineChartProps) {
  return (
    <ResponsiveContainer width={width} height={height} className="font-inter text-[#fff]">
      <Chart data={data}>
        <CartesianGrid strokeDasharray="0" />
        <XAxis tick={{ fill: "#fff", fontSize: 10 }} dataKey={xKey} />
        <YAxis tick={{ fill: "#fff", fontSize: 10 }} />
        <Line type={chartType} stroke="#18a0fb" dataKey={yKey} strokeWidth={2} />
      </Chart>
    </ResponsiveContainer>
  );
}
