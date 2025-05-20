import { ColorInput } from "../ColorInput";
import { SelectInput } from "../SelectInput";

interface SetAppearenceDataProps {
    updateData: (key: string, value: any) => void
    colors: {
        primary: string;
        secondary: string;
        bg: string;
        bgSecondary: string;
        contrast: string;
        shadow: string;
    };
    font: string
}

export const SetAppearenceData = ({ colors, font, updateData }: SetAppearenceDataProps) => {
    const fontOptions = [
        { value: "Teko", label: "Teko" },
        { value: "Montserrat", label: "Montserrat" },
        { value: "sans-serif", label: "Sans Serif" },
        { value: "monospace", label: "Monospace" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Verdana", label: "Verdana" },
        { value: "Comic Sans MS, Comic Sans, Comic Relief", label: "Comic Sans MS" },
        { value: "cursive ", label: "Caligrafia" },
    ]
    return (
        <>
            <p>Agora vamos aplicar um estilo que seja a sua vibe!</p>

            <ColorInput
                label="Cor Principal"
                value={colors?.primary}
                onChange={(color) => updateData("colors", { ...colors, primary: color })}
            />

            <ColorInput
                label="Cor Secundária"
                value={colors?.secondary}
                onChange={(color) => updateData("colors", { ...colors, secondary: color })}
            />

            <ColorInput
                label="Cor de Fundo"
                value={colors?.bg}
                onChange={(color) => updateData("colors", { ...colors, bg: color })}
            />

            <ColorInput
                label="Cor de Fundo Secundária"
                value={colors?.bgSecondary}
                onChange={(color) => updateData("colors", { ...colors, bgSecondary: color })}
            />

            <ColorInput
                label="Cor de Contraste"
                value={colors?.contrast}
                onChange={(color) => updateData("colors", { ...colors, contrast: color })}
            />

            <SelectInput
                label={"Selecione uma fonte: "}
                name="font"
                value={font}
                onChange={(e) => updateData("font", e.target.value)}
                options={fontOptions}
            />
        </>
    )
}