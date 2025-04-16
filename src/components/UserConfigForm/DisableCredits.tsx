import ToggleSwitch from "../ToggleSwitch"

interface DisableCreditsProps {
    isUserPremium: boolean
    hideCredits: boolean
    handleChange: (key: string, value: boolean) => void
}

export const DisableCredits = ({ isUserPremium, handleChange, hideCredits }: DisableCreditsProps) => (
    <>
        <p>Nós sempre deixamos uma mensagem de rodapé, incentivando os seus visitantes a também criarem seu <strong>tudoaqui.click</strong> !</p>

        <p>Porém um segredo 🤫🤫 é que você pode desativar isso (se for um assinante premium).</p>

        <ToggleSwitch
            label="Ocultar créditos no rodapé: "
            isOn={hideCredits}
            disabled={!isUserPremium}
            disabledMessage={"Recurso Premium"}
            disabledMessagePosition="right"
            onToggle={(value) => handleChange("hideCredits", value)}
        />
    </>
)
