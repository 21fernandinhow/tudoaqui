import { UserLinkOption } from "../UserConfigForm";
import { IconCanvas } from "./IconCanvas";

interface IconsGridProps {
  icons: UserLinkOption[];
  activateFloating: boolean
  isPreview?: boolean
}

export const IconsGrid = ({ icons, activateFloating, isPreview }: IconsGridProps) => {

  const handleClickIcon = (url: string) => {
    if(!isPreview){
      window.open(url, "_blank")
    }
  }
  
  return (
    <div className="icons-grid">
      {icons.map((item, index) => (
        <IconCanvas
          key={index}
          iconUrl={item.icon ?? ""}
          onClick={() => handleClickIcon(item.url)}
          label={item.label}
          activateFloating={activateFloating}
        />
      ))}
    </div>
  );
}
