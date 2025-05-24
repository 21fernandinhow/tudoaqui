import { ReactNode } from "react"

interface ComparativeChartProps {
    isPremium?: boolean
    data: { label: string, value: number | string, obs?: string, icon?: ReactNode }[]
    title?: string
}

export const ComparativeChart = ({ isPremium = false, data, title }: ComparativeChartProps) => {
    return (
        <div className="comparative-chart">
            {title && <h3>{title}</h3>}
            {!isPremium ?

                <p className="warning">
                    Bateu a curiosidade né? Você precisa ser um <a href="/premium">assinante premium</a> para visualizar métricas avançadas!
                </p>

                :

                data.length > 0 ?
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