import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineGraphProps {
  data: Record<string, any>[];
  xKey: string;
  lines: {
    key: string;
    color?: string;
    name?: string;
  }[];
  height?: number;
  title?: string;
};

export const LineGraph = ({ data, xKey, lines, height = 350, title }: LineGraphProps) => (
  <div className="line-graph">
    {title && <h3 className="line-graph-title">{title}</h3>}

    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>

        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>

        <XAxis
          dataKey={xKey}
          axisLine={false}
          tickLine={false}
          dy={10}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
        />

        <Tooltip contentStyle={{ borderRadius: "1rem" }} />

        <Legend wrapperStyle={{ marginTop: "1rem" }} />

        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color || `hsl(${(index * 100) % 360}, 70%, 50%)`}
            name={line.name || line.key}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        ))}

      </LineChart>
    </ResponsiveContainer>
  </div>
);