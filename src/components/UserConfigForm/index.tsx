import { useEffect, useState } from "react"
import { useUserData } from "../../context/UserDataContext"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../firebase"
import { AvatarUpload } from "./AvatarUpload"
import { UserInformationsInputs } from "./UserInformationInputs"
import { SetAppearenceData } from "./SetAppearenceData"
import { UserUrlInput } from "./UserUrlInput"
import { MannageUserLinks } from "./MannageUserLinks"
import { PersonalizeButtons } from "./PersonalizeButtons"
import { DisableCredits } from "./DisableCredits"
import { User } from "firebase/auth"

export interface UserLinksPageData {
    userUrl: string
    avatarImgUrl: string
    avatarImgName: string
    name: string
    bio: string
    colors: {
        main: string
        mainSecondary: string
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
    links: UserLinkOption[]
    buttonOptions: {
        style: "default" | "outline"
        borderRadius: "0" | "0.5" | "1.5" | "2"
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
            main: "#fff",
            mainSecondary: "#fff",
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
        isPremium: false
    }

    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData>(defaultData)
    const [backupUserLinksPageData, setBackupUserLinksPageData] = useState<UserLinksPageData>(defaultData)

    const getUserLinksPageData = async () => {
        if (user) {
            const userRef = doc(db, 'users', user.uid)
            try {
                const docSnap = await getDoc(userRef)
                if (docSnap.exists()) {
                    setUserLinksPageData(docSnap.data().userLinksPageData)
                    setBackupUserLinksPageData(docSnap.data().userLinksPageData)
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error)
            }
        }
    }

    const handleChange = (key: string, value: any) => {
        setUserLinksPageData((prevState => ({ ...prevState, [key]: value })))
    }

    const handleSaveData = async (user: User | null, data: UserLinksPageData) => {
        if (!user) return

        const userUrl = data.userUrl
        if (!userUrl) {
            alert("Você precisa definir uma URL personalizada!")
            return
        }

        try {

            const querySnapshot = await getDocs(
                query(collection(db, 'users'), where('userLinksPageData.userUrl', '==', userUrl))
            )

            const urlUsedByOther = querySnapshot.docs.find(doc => doc.id !== user.uid)

            if (urlUsedByOther) {
                alert("Erro: essa URL já está em uso por outro usuário.")
                return
            }

            if(data.links.some(item => (item.type === "icon" && !item.icon) || !item.label || !item.url)){
                alert("Erro: você tem uma opção de link com informações incompletas e/ou inválidas!")
                return
            }

            const userRef = doc(db, 'users', user.uid)
            await setDoc(userRef, { data }, { merge: true })

            alert('Dados salvos com sucesso!')
        } catch (error) {
            alert('Erro ao salvar dados!')
            console.error('Erro ao salvar dados:', error)
        }
    }

    useEffect(() => {
        getUserLinksPageData()
    }, [user])

    return (
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

            <UserInformationsInputs name={userLinksPageData.name} bio={userLinksPageData.bio} updateData={handleChange} />
            <hr className="custom-hr-secondary" />

            <SetAppearenceData updateData={handleChange} colors={userLinksPageData.colors} font={userLinksPageData.font} />
            <hr className="custom-hr-terciary" />

            <MannageUserLinks updateLinksArray={(value) => handleChange("links", value)} links={userLinksPageData.links} />
            {userLinksPageData?.links.some(item => item.type === "button") &&
                <PersonalizeButtons
                    buttonsData={userLinksPageData.buttonOptions}
                    updateData={(key: string, value: string) => handleChange("buttonOptions", { ...userLinksPageData.buttonOptions, [key]: value })}
                />
            }
            <hr className="custom-hr-primary" />

            <DisableCredits
                handleChange={handleChange}
                isUserPremium={userLinksPageData.isPremium}
                hideCredits={userLinksPageData.hideCredits}
            />
            <hr className="custom-hr-secondary" />

            <div id="save-div">
                {JSON.stringify(userLinksPageData) === JSON.stringify(backupUserLinksPageData) ?
                    <>
                        <p>Ainda não há alterações para serem salvas</p>
                        <button className="btn" disabled> Salvar </button>
                    </>
                    :
                    <>
                        <p>Tudo certo ? Salve suas alterações: </p>
                        <button className="btn" onClick={() => handleSaveData(user, userLinksPageData)}> Salvar </button>
                    </>
                }

            </div>

        </div>
    )
}
