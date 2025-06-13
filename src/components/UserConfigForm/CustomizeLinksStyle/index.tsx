import { CustomizeButtonsStyle } from "./CustomizeButtonsStyle";
import { CustomizeIconsStyle } from "./CustomizeIconsStyle";


interface CustomizeLinksStyleProps {
  hasButton: boolean;
  hasIcon: boolean;
  buttonOptions: {
    style: "default" | "outline"
    borderRadius: "0" | "0.5" | "1" | "1.5"
  };
  iconOptions: {
    bgColor: "#fff" | "#000";
    floatingMode: boolean
  }
  handleChange: (key: string, value: any) => void;
};

export const CustomizeLinksStyle = ({
  hasButton,
  hasIcon,
  buttonOptions,
  iconOptions,
  handleChange,
}: CustomizeLinksStyleProps) => {
  return (
    <>

      {hasButton && (
        <CustomizeButtonsStyle
          buttonsData={buttonOptions}
          updateData={(key: string, value: string) => handleChange("buttonOptions", { ...buttonOptions, [key]: value })}
        />
      )}

      {hasIcon && (
        <CustomizeIconsStyle
          iconsData={iconOptions}
          updateData={(key: string, value: string) => handleChange("iconOptions", { ...iconOptions, [key]: value })}
        />
      )}

      <br/> <br/>
    </>
  );
};
