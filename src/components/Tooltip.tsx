import { ReactNode, useState } from 'react';

interface TooltipProps {
    children: ReactNode;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ children, text, position = 'top' }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div className={`tooltip-text tooltip-${position}`}>
                    {text}
                </div>
            )}
        </div>
    );
};