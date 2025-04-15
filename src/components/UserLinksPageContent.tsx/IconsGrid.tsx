import { UserLinkOption } from "../UserConfigForm";
import { IconCanvas } from "./IconCanvas";

interface IconsGridProps {
  icons: UserLinkOption[];
}

export const IconsGrid = ({ icons }: IconsGridProps) => (
  <div className="icons-grid">
    {icons.map((item, index) => (
      <IconCanvas
        key={index}
        iconUrl={item.icon ?? ""}
        onClick={() => window.open(item.url, "_blank")}
        label={item.label}
      />
    ))}
  </div>
);
