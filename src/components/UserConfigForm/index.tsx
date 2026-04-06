import { AvatarUpload } from "./AvatarUpload"
import { MusicUpload } from "./MusicUpload"
import { UserInformationsInputs } from "./UserInformationInputs"
import { SetAppearenceData } from "./SetAppearenceData"
import { UserUrlInput } from "./UserUrlInput"
import { MannageUserLinks } from "./MannageUserLinks"
import { CustomizeLinksStyle } from "./CustomizeLinksStyle/index.tsx"
import ToggleSwitch from "../ToggleSwitch.tsx"
import { UserLinksPageData } from "../../pages/UserLinksPage.tsx"

interface UserConfigFormProps {
    userLinksPageData: UserLinksPageData
    handleChange: (key: string, value: any) => void
    animation: "enter" | "exit"
    displayName?: string
    userUid: string
}

export const UserConfigForm = ({ userLinksPageData, handleChange, animation, displayName, userUid }: UserConfigFormProps) => (
    <div id="user-config-form" className={animation}>
        <h2>Olá {displayName ?? "Visitante"}!</h2>
        <p>Aqui você configura a sua página de links personalizada!</p>
        <hr className="custom-hr-secondary" />

        <div className="user-config-form-content">

            <details open>
                <summary><strong>🌐 URL da Página</strong></summary>
                <UserUrlInput updateUserUrl={handleChange} userUrl={userLinksPageData.userUrl} />
            </details>

            <hr className="custom-hr-terciary" />

            <details>
                <summary><strong>👤 Personalizar Cabeçalho</strong></summary>
                <UserInformationsInputs
                    name={userLinksPageData.name}
                    bio={userLinksPageData.bio}
                    updateData={handleChange}
                />
                <AvatarUpload
                    data={userLinksPageData}
                    updateData={handleChange}
                    userUid={userUid}
                />
                <MusicUpload
                    data={userLinksPageData}
                    updateData={handleChange}
                    userUid={userUid}
                />
            </details>

            <hr className="custom-hr-primary" />

            <details>
                <summary><strong>🎨 Crie seu tema</strong></summary>
                <SetAppearenceData
                    updateData={handleChange}
                    colors={userLinksPageData.colors}
                    font={userLinksPageData.font}
                    showWavesInput={userLinksPageData?.hasSideWaves}
                />
                <ToggleSwitch
                    label="Ocultar créditos no rodapé: "
                    isOn={userLinksPageData.hideCredits}
                    onToggle={(value) => handleChange("hideCredits", value)}
                />
                <ToggleSwitch
                    isOn={userLinksPageData?.hasSideWaves}
                    onToggle={(e) => handleChange("hasSideWaves", e)}
                    label="Animação lateral de ondas: "
                />
            </details>

            <hr className="custom-hr-secondary" />

            <details>
                <summary><strong>🔗 Gerenciar Links</strong></summary>
                <MannageUserLinks
                    updateLinksArray={(value) => handleChange("links", value)}
                    links={userLinksPageData.links}
                />
                {userLinksPageData?.links?.length > 0 && (
                    <CustomizeLinksStyle
                        hasButton={userLinksPageData.links.some(item => item.type === "button")}
                        hasIcon={userLinksPageData.links.some(item => item.type === "icon")}
                        buttonOptions={userLinksPageData.buttonOptions}
                        iconOptions={userLinksPageData.iconOptions}
                        handleChange={handleChange}
                    />
                )}
            </details>

        </div>
    </div>
)
