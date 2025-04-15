import { CustomizeButtonsStyle } from "./CustomizeButtonsStyle";
import { CustomizeIconsStyle } from "./CustomizeIconsStyle";


interface CustomizeLinksStyleProps {
  hasButton: boolean;
  hasIcon: boolean;
  buttonOptions: {
    style: "default" | "outline"
    borderRadius: "0" | "0.5" | "1" | "1.5"
  };
  iconsColor: "#fff" | "#000";
  handleChange: (key: string, value: any) => void;
};

export const CustomizeLinksStyle = ({
  hasButton,
  hasIcon,
  buttonOptions,
  iconsColor,
  handleChange,
}: CustomizeLinksStyleProps) => {
  return (
    <>
      <p>Estamos quase lá! Vamos aos detalhes finais sobre a aparência dos seus links: </p>

      {hasButton && (
        <CustomizeButtonsStyle
          buttonsData={buttonOptions}
          updateData={(key: string, value: string) =>
            handleChange("buttonOptions", { ...buttonOptions, [key]: value })
          }
        />
      )}

      {hasIcon && (
        <CustomizeIconsStyle
          iconsColor={iconsColor}
          updateData={handleChange}
        />
      )}

      <hr className="custom-hr-secondary" />
    </>
  );
};
