import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { UserConfigForm } from "../components/UserConfigForm";
import { useUserData } from "../context/UserDataContext.tsx";
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

const ConfigPage = () => {
    const { user, loading } = useUserData();
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
        if (user) getUserLinksPageData()
    }, [user])


    if (loading) return <Header />;

    if (!loading && !user) window.location.href = '/'

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