import { TbWorld } from "react-icons/tb";
import { ReceivedClicksData } from "../../../utils/getUserMetrics";
import { MostClickedLinksItem } from "./MostClickedLinksItem";

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
                countClicksByUrl(data).map(item => <MostClickedLinksItem value={item.clicks} url={item.url} key={item.url}/>)
                : 
                <p className="warning">Você ainda não recebeu nenhum clique :/</p>
        }
    </div>
)