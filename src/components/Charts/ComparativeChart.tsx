import { ReactNode } from "react"

interface ComparativeChartProps {
    data: { label: string, value: number | string, obs?: string, icon?: ReactNode }[]
    title?: string
}

export const ComparativeChart = ({ data, title }: ComparativeChartProps) => {
    return (
        <div className="comparative-chart">
            {title && <h3>{title}</h3>}
            {data.length > 0 ?
                data.map(item => (
                    <div className="comparative-chart-item">
                        {item.icon}
                        <h4>{item.label} - {item.value} %</h4>
                        {item.obs && <p>{item.obs}</p>}
                    </div>
                ))
                :
                <p className="warning">Ainda não há nenhum dado para descobrir por aqui :/</p>
            }
        </div>
    )
}