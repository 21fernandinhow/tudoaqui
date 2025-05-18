import { TbWorld } from "react-icons/tb";
import { ReceivedClicksData } from "../../utils/getUserMetrics";

interface MostClickedLinksProps {
    data: ReceivedClicksData[] | null
    isPremium: boolean
}

const countClicksByUrl = (clicks: ReceivedClicksData[]) => {
    const counts: Record<string, number> = {};

    clicks.forEach(click => {
        counts[click.url] = (counts[click.url] || 0) + 1;
    });

    return Object.entries(counts).map(([url, clicks]) => ({
        url,
        clicks,
    }));
};

export const MostClickedLinks = ({ data, isPremium }: MostClickedLinksProps) => (
    <div className="most-clicked-links-wrapper">
        <h3>Links mais Clickados</h3>
        {!isPremium ?
            <p className="warning">
                Bateu a curiosidade né? Você precisa ser <a href="/premium">assinante premium</a> para visualizar métricas avançadas!
            </p>
            : data ?
                countClicksByUrl(data).map(item => (
                    <div className="most-clicked-links-item">
                        <TbWorld />
                        <h4 className="url-value">{item.url}</h4>
                        <h4 className="clicks-value">{item.clicks}</h4>
                    </div>
                ))
                : <p className="warning">Você ainda não recebeu nenhum clique :/</p>
        }
    </div>
)