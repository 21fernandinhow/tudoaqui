import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const colors = ["#ef529c", "#ef4523", "#8d2c91"];

interface DataItem {
  name: string;
  value: number;
};

interface BarHorizontalGraphProps {
  data: DataItem[] | null;
  title?: string
  isPremium?: boolean
};

export const BarHorizontalGraph = ({ data, title, isPremium = false }: BarHorizontalGraphProps) => {
  return (
    <div className="bar-horizontal-graph">

      {title && <h3 className="bar-horizontal-graph-title">{title}</h3>}

      {!isPremium ?

        <p className="warning">
          Bateu a curiosidade né? Você precisa ser um <a href="/premium">assinante premium</a> para visualizar métricas avançadas!
        </p>

        :

        data ?
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              barSize={24}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 5, 5, 0]} name="Visitas">
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 3]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          :
          <p className="warning">Ainda não há nenhum dado para descobrir por aqui :/</p>
      }

    </div>
  );
}