import { ListChartItem } from "./ListChartItem";

interface ListChartProps<T> {
    data: T[] | null;
    isPremium: boolean;
    title: string;
    keyField?: keyof T;
}

const countClicksByKey = <T extends Record<string, any>>(items: T[], key: keyof T = "url" as keyof T) => {
    const counts: Record<string, number> = {};

    items.forEach(item => {
        const value = item[key];
        if (typeof value === "string") {
            counts[value] = (counts[value] || 0) + 1;
        }
    });

    return Object.entries(counts).map(([value, count]) => ({
        url: value,
        clicks: count,
    }));
};

export const ListChart = <T extends Record<string, any>>({ data, isPremium, title, keyField = "url" as keyof T }: ListChartProps<T>) => (
    <div className="list-chart-wrapper">
        <h3>{title}</h3>
        {!isPremium ? (
            <p className="warning">
                Bateu a curiosidade né? Você precisa ser <a href="/premium">assinante premium</a> para visualizar métricas avançadas!
            </p>
        ) : data && data.length > 0 ? (
            countClicksByKey(data, keyField)
                .sort((a, b) => b.clicks - a.clicks)
                .map(item => <ListChartItem value={item.clicks} url={item.url} key={item.url} />)
        ) : (
            <p className="warning">Ainda não há nenhum dado para descobrir por aqui :/</p>
        )}
    </div>
);