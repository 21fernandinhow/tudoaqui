import { SelectInput } from "../../SelectInput"

interface CustomizeButtonsStyleProps {
    buttonsData: {
        style: "default" | "outline"
        borderRadius: "0" | "0.5" | "1" | "1.5"
    }
    updateData: (key: string, value: string) => void
}

export const CustomizeButtonsStyle = ({buttonsData, updateData}: CustomizeButtonsStyleProps) => {

    const buttonTypeOptions = [
        { label: "Somente borda", value: "outline" },
        { label: "Preenchido", value: "default" }
    ]

    const buttonBorderRadiusOptions = [
        { label: "Sem arredondamento", value: "0" },
        { label: "Pouco arredondamento", value: "0.5" },
        { label: "Arredondado", value: "1" },
        { label: "Arredondamento total", value: "1.5" }
    ]

    return (
        <>
            <SelectInput
                name="button-option-link-style"
                label="Estilo dos Botões:"
                value={buttonsData?.style}
                onChange={(e) => updateData("style", e.target.value)}
                options={buttonTypeOptions}
            />
            <SelectInput
                name="button-option-link-border-radius"
                label="Arredondamento das Bordas:"
                value={buttonsData?.borderRadius}
                onChange={(e) => updateData("borderRadius", e.target.value)}
                options={buttonBorderRadiusOptions}
            />
        </>
    )
}