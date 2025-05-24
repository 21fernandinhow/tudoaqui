import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>

        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />

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

        {lines.map((line, index) => (
          <Area
            type="monotone"
            dataKey={line.key}
            stroke={line.color || `hsl(${(index * 100) % 360}, 70%, 50%)`}
            fill={line.color || `hsl(${(index * 100) % 360}, 70%, 50%)`}
            fillOpacity={0.1}
            name={line.name || line.key}
            strokeWidth={2}
            dot={{ r: 3, fillOpacity: 1 }}
            activeDot={{ r: 6 }}
            key={line.name}
          />
        ))}

      </AreaChart>
    </ResponsiveContainer>

    <div className="custom-legend">
      {lines.map((line, index) => (
        <div key={line.key} className="custom-legend-item">
          <div
            style={{
              width: "1rem",
              height: "1rem",
              backgroundColor: line.color || `hsl(${(index * 100) % 360}, 70%, 50%)`,
              borderRadius: "100%",
            }} />
          <span>{line.name || line.key}</span>
        </div>
      ))}
    </div>

  </div>
);