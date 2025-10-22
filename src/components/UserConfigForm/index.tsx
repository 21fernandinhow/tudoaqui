import { useEffect, useState } from "react"
import { useUserData } from "../../context/UserDataContext"
import { AvatarUpload } from "./AvatarUpload"
import { UserInformationsInputs } from "./UserInformationInputs"
import { SetAppearenceData } from "./SetAppearenceData"
import { UserUrlInput } from "./UserUrlInput"
import { MannageUserLinks } from "./MannageUserLinks"
import { UserLinksPageContent } from "../UserLinksPageContent.tsx"
import { saveUserData } from "../../utils/saveUserData.ts"
import { getUserLinksPageDataByUid } from "../../utils/getUserLinksPageDataByUid.tsx"
import { CustomizeLinksStyle } from "./CustomizeLinksStyle/index.tsx"
import { useSnackbar } from "../../contexts/SnackbarContext"
import { defaultUserLinksPageData } from "../../utils/defaultUserLinksPageData.ts"
import { RiAiGenerate2 } from "react-icons/ri"
import ToggleSwitch from "../ToggleSwitch.tsx"
import { GeneratePageByAI } from "./GeneratePageByAI/index.tsx"
import { MdEdit } from "react-icons/md"
import { FaSave } from "react-icons/fa"

export interface UserLinksPageData {
    userUrl: string
    avatarImgUrl: string
    avatarImgName: string
    name: string
    bio: string
    colors: {
        primary: string
        secondary: string
        bg: string
        bgSecondary: string
        contrast: string
        shadow: string
        waves: string
    }
    bgImage: string
    font: string
    showShareBtn: boolean
    showAIAssistant: boolean
    hideCredits: boolean
    isPremium: boolean
    showPremiumIcon: boolean
    links: UserLinkOption[]
    buttonOptions: {
        style: "default" | "outline"
        borderRadius: "0" | "0.5" | "1" | "1.5"
    }
    iconOptions: {
        bgColor: "#fff" | "#ffffff" | "#000" | "#000000",
        floatingMode: boolean
    }
    hasSideWaves: boolean
}

export interface UserLinkOption {
    icon?: string,
    label: string
    url: string
    type: "icon" | "button"
}

export const UserConfigForm = () => {
    const { user } = useUserData()
    const { showSnackbar } = useSnackbar()

    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData>(defaultUserLinksPageData)
    const [backupUserLinksPageData, setBackupUserLinksPageData] = useState<UserLinksPageData>(defaultUserLinksPageData)
    const [isOpenModalAI, setIsOpenModalAI] = useState(false)
    const [visible, setVisible] = useState(false)
    const [animation, setAnimation] = useState<"enter" | "exit">("enter")

    const getUserLinksPageData = async () => {
        if (user?.uid) {
            const data = await getUserLinksPageDataByUid(user.uid)
            if (data) {
                setUserLinksPageData(data)
                setBackupUserLinksPageData(data)
                setIsOpenModalAI(true)
            }
        }
    }

    const handleChange = (key: string, value: any) => setUserLinksPageData(prev => ({ ...prev, [key]: value }))

    const handleSave = async () => {
        if (JSON.stringify(userLinksPageData) === JSON.stringify(backupUserLinksPageData)) {
            showSnackbar("Não há alterações para serem salvas")
        } else {
            const successfullSave = await saveUserData(user, userLinksPageData, showSnackbar)
            if (successfullSave) setBackupUserLinksPageData(userLinksPageData)
        }
    }

    const openForm = () => {
        setVisible(true)
        setAnimation("enter")
    }

    const closeForm = () => {
        setAnimation("exit")
        setTimeout(() => setVisible(false), 400)
    }

    useEffect(() => {
        getUserLinksPageData()
    }, [user])

    return (
        <div id="config-page">
            <button
                id="toggle-form-button"
                className="config-corner-button"
                onClick={visible ? closeForm : openForm}
            >
                <MdEdit />
            </button>

            {visible && (
                <div id="user-config-form" className={animation}>
                    <h2>Olá {user?.displayName}!</h2>
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
                                userUid={user?.uid}
                            />
                            <ToggleSwitch
                                isOn={userLinksPageData.isPremium && userLinksPageData.showPremiumIcon}
                                onToggle={(e) => handleChange("showPremiumIcon", e)}
                                label="Exibir ícone premium: "
                                disabled={!userLinksPageData.isPremium}
                                disabledMessage={"Recurso Premium"}
                                disabledMessagePosition="right"
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
                                disabled={!userLinksPageData.isPremium}
                                disabledMessage={"Recurso Premium"}
                                disabledMessagePosition="right"
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
            )}

            <div id="preview">
                <UserLinksPageContent
                    data={userLinksPageData}
                    isPreview
                    uid={user?.uid ?? ""}
                />
            </div>

            <GeneratePageByAI
                isOpen={isOpenModalAI}
                onClose={() => setIsOpenModalAI(false)}
                currentData={userLinksPageData}
                updateData={setUserLinksPageData}
            />

            <div className="generate-ai-icon" onClick={() => setIsOpenModalAI(prev => !prev)}>
                <RiAiGenerate2 />
            </div>

            <button
                id="save-button"
                className="config-corner-button"
                onClick={handleSave}
            >
                <FaSave />
            </button>
        </div>
    )
}