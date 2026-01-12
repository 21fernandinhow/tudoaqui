import { ListChartItem } from "./ListChartItem";

interface ListChartProps<T> {
    data: T[] | null;
    title: string;
    keyField?: keyof T;
    secondaryKeyField?: keyof T | null;
}

const countOcurrenciesByKey = <T extends Record<string, any>>(items: T[], key: keyof T = "url" as keyof T) => {
    const counts: Record<string, number> = {};

    items.forEach(item => {
        const value = item[key];
        if (typeof value === "string") {
            counts[value] = (counts[value] || 0) + 1;
        }
    });

    return Object.entries(counts).map(([value, count]) => ({
        label: value,
        value: count,
    }));
};

export const ListChart = <T extends Record<string, any>>({ data, title, keyField = "url" as keyof T }: ListChartProps<T>) => (
    <div className="list-chart-wrapper">
        <h3>{title}</h3>
        {data && data.length > 0 ? (
            countOcurrenciesByKey(data, keyField)
                .sort((a, b) => b.value - a.value)
                .map(item => <ListChartItem value={item.value} label={item.label} key={item.label} />)
        ) : (
            <p className="warning">Ainda não há nenhum dado para descobrir por aqui :/</p>
        )}
    </div>
);