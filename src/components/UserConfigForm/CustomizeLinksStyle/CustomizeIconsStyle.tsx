import { SelectInput } from "../../SelectInput"
import ToggleSwitch from "../../ToggleSwitch"

interface CustomizeIconsStyleProps {
    iconsData: {
        bgColor: "#fff" | "#000"
        floatingMode: boolean
    }
    updateData: (key: string, value: any) => void
}

export const CustomizeIconsStyle = ({ iconsData, updateData }: CustomizeIconsStyleProps) => {

    const selectBoxOptions = [
        { label: "Claro (padrão)", value: "#fff" },
        { label: "Escuro", value: "#000" }
    ]

    return (
        <>
            <SelectInput
                name="button-option-link-style"
                label="Cor da caixa de ícone: "
                value={iconsData?.bgColor}
                onChange={(e) => updateData("bgColor", e.target.value)}
                options={selectBoxOptions}
            />

            <ToggleSwitch
                isOn={iconsData?.floatingMode}
                label="Ícones flutuantes: "
                onToggle={(e) => updateData("floatingMode", e)}
            />
        </>
    )
}