import { useEffect, useState } from "react";
import { animateNumber } from "../DashboardStat";
import { TbWorld } from "react-icons/tb";

interface ListChartItemProps {
    label: string;
    value: number;
    duration?: number; // em milissegundos
};

export const ListChartItem = ({ label, value, duration = 1000 }: ListChartItemProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animateNumber(0, value, duration, setDisplayValue, false);
    }, [value, duration]);

    return (
        <div className="list-chart-item">
            <div className="list-chart-item-icon"><TbWorld /></div>
            <h4 className="label-value">{label}</h4>
            <h4 className="clicks-value">{displayValue}</h4>
        </div>
    );
}

