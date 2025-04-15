import { UserLinkOption } from "../UserConfigForm";

interface ButtonsGridProps {
    buttons: UserLinkOption[];
    buttonStyle: "default" | "outline"
}

export const ButtonsGrid = ({ buttons, buttonStyle }: ButtonsGridProps) => (
    <div className="buttons-grid">
        {buttons.map((item, index) => (
            <button 
                key={index}
                onClick={() => window.open(item.url, "_blank")}  
                className={buttonStyle === "default" ? "user-btn-default" : "user-btn-outline"}
            >
                {item.label}
            </button>
        ))}
    </div>
);
