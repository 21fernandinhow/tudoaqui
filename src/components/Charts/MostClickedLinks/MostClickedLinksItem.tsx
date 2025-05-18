import { useEffect, useState } from "react";
import { animateNumber } from "../DashboardStat";
import { TbWorld } from "react-icons/tb";

interface MostClickedLinksItemProps {
    url: string;
    value: number;
    duration?: number; // em milissegundos
};

export const MostClickedLinksItem = ({ url, value, duration = 1000 }: MostClickedLinksItemProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animateNumber(0, value, duration, setDisplayValue, false);
    }, [value, duration]);

    return (
        <div className="most-clicked-links-item">
            <TbWorld />
            <h4 className="url-value">{url}</h4>
            <h4 className="clicks-value">{displayValue}</h4>
        </div>
    );
}

