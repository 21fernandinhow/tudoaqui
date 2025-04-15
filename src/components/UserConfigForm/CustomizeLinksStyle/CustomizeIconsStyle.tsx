import { SelectInput } from "../../SelectInput"

interface CustomizeIconsStyleProps {
    iconsColor: "#fff" | "#000"
    updateData: (key: string, value: string) => void
}

export const CustomizeIconsStyle = ({iconsColor, updateData}: CustomizeIconsStyleProps) => {

    const selectBoxOptions = [
        { label: "Claro (padrão)", value: "#fff" },
        { label: "Escuro", value: "#000" }
    ]

    return (
        <>
            <SelectInput
                name="button-option-link-style"
                label="Cor da caixa de ícone: "
                value={iconsColor}
                onChange={(e) => updateData("iconsColor", e.target.value)}
                options={selectBoxOptions}
            />
        </>
    )
}