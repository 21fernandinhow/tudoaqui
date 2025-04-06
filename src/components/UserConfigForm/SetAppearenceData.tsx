import { ColorInput } from "../ColorInput";

interface SetAppearenceDataProps {
    updateData: (key: string, value: any) => void
    colors: {
        main: string;
        mainSecondary: string;
        bg: string;
        bgSecondary: string;
        contrast: string;
        shadow: string;
    };
    font: string
}

export const SetAppearenceData = ({ colors, font, updateData }: SetAppearenceDataProps) => {
    return (
        <>
            <p>Agora vamos aplicar um estilo que seja a sua vibe!</p>

            <ColorInput
                label="Cor Principal"
                value={colors?.main}
                onChange={(color) => updateData("colors", { ...colors, main: color })}
            />

            <ColorInput
                label="Cor Secundária"
                value={colors?.mainSecondary}
                onChange={(color) => updateData("colors", { ...colors, mainSecondary: color })}
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
        </>
    )
}