import { useEffect, useState } from "react"
import { useUserData } from "../../context/UserDataContext"
import { AvatarUpload } from "./AvatarUpload"
import { UserInformationsInputs } from "./UserInformationInputs"
import { SetAppearenceData } from "./SetAppearenceData"
import { UserUrlInput } from "./UserUrlInput"
import { MannageUserLinks } from "./MannageUserLinks"
import { DisableCredits } from "./DisableCredits"
import { UserLinksPageContent } from "../UserLinksPageContent.tsx"
import { saveUserData } from "../../utils/saveUserData.ts"
import { getUserLinksPageDataByUid } from "../../utils/getUserLinksPageDataByUid.tsx"
import { CustomizeLinksStyle } from "./CustomizeLinksStyle/index.tsx"
import ToggleSwitch from "../ToggleSwitch.tsx"

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
        bgColor: "#fff" | "#000"
        floatingMode: boolean
    }
}

export interface UserLinkOption {
    icon?: string,
    label: string
    url: string
    type: "icon" | "button"
}

export const UserConfigForm = () => {

    const { user } = useUserData()

    const defaultData: UserLinksPageData = {
        userUrl: "",
        avatarImgUrl: "",
        avatarImgName: "",
        name: "",
        bio: "",
        colors: {
            primary: "#fff",
            secondary: "#fff",
            bg: "#fff",
            bgSecondary: "#fff",
            contrast: "#000",
            shadow: "rgba(0,0,0, 0.4)"
        },
        bgImage: "",
        font: "",
        showShareBtn: false,
        showAIAssistant: false,
        hideCredits: false,
        links: [],
        buttonOptions: {
            style: "default",
            borderRadius: "0.5"
        },
        iconOptions: {
            bgColor: "#fff",
            floatingMode: false
        },
        isPremium: false,
        showPremiumIcon: false
    }

    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData>(defaultData)
    const [backupUserLinksPageData, setBackupUserLinksPageData] = useState<UserLinksPageData>(defaultData)

    const getUserLinksPageData = async () => {
        if (user?.uid) {
            const data = await getUserLinksPageDataByUid(user.uid)
            if (data) {
                setUserLinksPageData(data)
                setBackupUserLinksPageData(data)
            }
        }
    }

    const handleChange = (key: string, value: any) => {
        setUserLinksPageData((prevState => ({ ...prevState, [key]: value })))
    }

    useEffect(() => {
        getUserLinksPageData()
    }, [user])

    return (
        <div id="config-page">

            <div id="user-config-form">

                <h2> Olá {user?.displayName} !</h2>
                <p>Aqui você configura a sua página de links personalizada!</p>
                <hr className="custom-hr-secondary" />

                <UserUrlInput updateUserUrl={handleChange} userUrl={userLinksPageData.userUrl} />
                <hr className="custom-hr-terciary" />

                <AvatarUpload
                    data={userLinksPageData}
                    updateData={handleChange}
                    userUid={user?.uid}
                />
                <hr className="custom-hr-primary" />

                <UserInformationsInputs
                    name={userLinksPageData.name}
                    bio={userLinksPageData.bio}
                    updateData={handleChange}
                />
                <ToggleSwitch
                    isOn={userLinksPageData.isPremium && userLinksPageData.showPremiumIcon}
                    onToggle={(e) => handleChange("showPremiumIcon", e)}
                    label="Exibir ícone premium: "
                    disabled={!userLinksPageData.isPremium}
                    disabledMessage={"Recurso Premium"}
                    disabledMessagePosition="right"
                />
                <hr className="custom-hr-secondary" />

                <SetAppearenceData updateData={handleChange} colors={userLinksPageData.colors} font={userLinksPageData.font} />
                <hr className="custom-hr-terciary" />

                <MannageUserLinks updateLinksArray={(value) => handleChange("links", value)} links={userLinksPageData.links} />
                <hr className="custom-hr-primary" />

                {userLinksPageData?.links?.length > 0 &&
                    <CustomizeLinksStyle
                        hasButton={userLinksPageData.links.some(item => item.type === "button")}
                        hasIcon={userLinksPageData.links.some(item => item.type === "icon")}
                        buttonOptions={userLinksPageData.buttonOptions}
                        iconOptions={userLinksPageData.iconOptions}
                        handleChange={handleChange}
                    />
                }

                <DisableCredits
                    handleChange={handleChange}
                    isUserPremium={userLinksPageData.isPremium}
                    hideCredits={userLinksPageData.hideCredits}
                />
                <hr className="custom-hr-terciary" />

                <div id="save-div">
                    {JSON.stringify(userLinksPageData) === JSON.stringify(backupUserLinksPageData) ?
                        <>
                            <p>Ainda não há alterações para serem salvas</p>
                            <button className="btn" disabled> Salvar </button>
                        </>
                        :
                        <>
                            <p>Tudo certo ? Salve suas alterações: </p>
                            <button className="btn" onClick={() => saveUserData(user, userLinksPageData)}> Salvar </button>
                        </>
                    }

                </div>

            </div>

            <div id="preview">
                <UserLinksPageContent data={userLinksPageData} isPreview />
            </div>

        </div>
    )
}
