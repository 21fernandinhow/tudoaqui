import { useEffect, useState } from "react";

interface DashboardStatProps {
  label: string;
  value: number;
  duration?: number; // em milissegundos
  showInPercentage?: boolean
  color?: "primary" | "secondary" | "terciary";
};

export const animateNumber = (from: number, to: number, duration: number, callback: (val: number) => void, showInPercentage = false) => {
  let start: number | null = null;
  const change = to - from;

  const step = (timestamp: number) => {
    if (start === null) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    const currentValue = showInPercentage ? from + change * percent : Math.floor(from + change * percent);
    callback(currentValue);

    if (percent < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export const DashboardStat = ({ label, value, duration = 1000, showInPercentage = false, color = "terciary" }: DashboardStatProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animateNumber(0, value, duration, setDisplayValue, showInPercentage);
  }, [value, duration]);

  return (
    <div className={`dashboard-stat color-${color}`}>
      <div className="dashboard-stat-value">{displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}{showInPercentage && <span>%</span>}</div>
      <div className="dashboard-stat-label">{label}</div>
    </div>
  );
}

