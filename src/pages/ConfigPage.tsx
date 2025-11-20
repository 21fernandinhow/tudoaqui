import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { UserConfigForm } from "../components/UserConfigForm";
import { useUserData } from "../contexts/UserDataContext.tsx";
import { useSnackbar } from "../contexts/SnackbarContext.tsx";
import { defaultUserLinksPageData } from "../utils/defaultUserLinksPageData.ts";
import { getUserLinksPageDataByUid } from "../utils/getUserLinksPageDataByUid.tsx";
import { saveUserData } from "../utils/saveUserData.ts";
import { MdEdit } from "react-icons/md";
import { UserLinksPageContent } from "../components/UserLinksPageContent.tsx/index.tsx";
import { GeneratePageByAI } from "../components/UserConfigForm/GeneratePageByAI/index.tsx";
import { RiAiGenerate2 } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { UserLinksPageData } from "./UserLinksPage.tsx";
import { useGoogleLogin } from "../hooks/useGoogleLogin.ts";
import { GoToPremiumButton } from "../components/GoToPremiumButton.tsx";

const ConfigPage = () => {

    const { user, loading } = useUserData();
    const { handleLogin } = useGoogleLogin()
    const { showSnackbar } = useSnackbar()

    const initialData = { ...defaultUserLinksPageData, userUrl: sessionStorage.getItem("userUrl") ?? "" }
    
    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData>(initialData)
    const [backupUserLinksPageData, setBackupUserLinksPageData] = useState<UserLinksPageData>(initialData)
    const [isOpenModalAI, setIsOpenModalAI] = useState(true)
    const [visible, setVisible] = useState(false)
    const [animation, setAnimation] = useState<"enter" | "exit">("enter")
    const [unloggedSave, setUnloggedSave] = useState(false)

    const getUserLinksPageData = async () => {
        if (user?.uid) {
            const data = await getUserLinksPageDataByUid(user.uid)
            if (data) {
                setUserLinksPageData(data)
                setBackupUserLinksPageData(data)
                sessionStorage.removeItem("userUrl")
            }
        }
    }

    const handleChange = (key: string, value: any) => setUserLinksPageData(prev => ({ ...prev, [key]: value }))

    const handleSave = async () => {

        if (JSON.stringify(userLinksPageData) === JSON.stringify(backupUserLinksPageData)) {
            showSnackbar("Não há alterações para serem salvas")
            return
        }

        if (!user) {
            await handleLogin(undefined, userLinksPageData)
            setUnloggedSave(true)
        } else {
            const successfullSave = await saveUserData(user, userLinksPageData, showSnackbar)
            if (successfullSave) {
                setBackupUserLinksPageData(userLinksPageData)
                if (unloggedSave) setUnloggedSave(false)
                if (`${sessionStorage.getItem("userUrl") ?? ""}`.length > 0) sessionStorage.removeItem("userUrl")
            }
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
        if (user && JSON.stringify(userLinksPageData) === JSON.stringify(backupUserLinksPageData)) getUserLinksPageData()
    }, [user, loading])

    useEffect(() => {
        if (unloggedSave && user) handleSave()
    }, [unloggedSave])

    if (loading) return <Header />;

    return (
        <>
            <Header />

            <div id="config-page">
                <button
                    id="toggle-form-button"
                    className="config-corner-button"
                    onClick={visible ? closeForm : openForm}
                >
                    <MdEdit />
                </button>

                <GoToPremiumButton />

                {visible &&
                    <UserConfigForm
                        userLinksPageData={userLinksPageData}
                        handleChange={handleChange}
                        animation={animation}
                        displayName={user?.displayName ?? ""}
                        userUid={user?.uid ?? ""}
                    />
                }

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
        </>
    );
};

export default ConfigPage