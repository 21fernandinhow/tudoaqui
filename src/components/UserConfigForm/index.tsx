import { useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AvatarUpload from "./AvatarUpload";
import HandleUserUrlInput from "./HandleUserUrlInput";
import UserInformationsInputs from "./UserInformationInputs";

export interface UserLinksPageData {
    userUrl: string;
    avatarImgUrl: string;
    avatarImgName: string;
    name: string;
    bio: string;
    colors: {
        main: string;
        mainSecondary: string;
        bg: string;
        bgSecondary: string;
        contrast: string;
        shadow: string;
    };
    bgImage: string;
    font: string;
    showShareBtn: boolean;
    showAIAssistant: boolean;
    showCredits: boolean;
    icons: any[];
    buttons: any[];
}

const UserConfigForm = () => {

    const { user } = useUserData();
    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData>({
        userUrl: "",
        avatarImgUrl: "",
        avatarImgName: "",
        name: "",
        bio: "",
        colors: {
            main: "",
            mainSecondary: "",
            bg: "",
            bgSecondary: "",
            contrast: "",
            shadow: ""
        },
        bgImage: "",
        font: "",
        showShareBtn: false,
        showAIAssistant: false,
        showCredits: true,
        icons: [],
        buttons: []
    })

    const getUserLinksPageData = async () => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setUserLinksPageData(docSnap.data().userLinksPageData || { userUrl: "" });
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        }
    };

    const handleChange = (key: string, value: any) => {
        setUserLinksPageData((prevState => ({ ...prevState, [key]: value })))
    }

    const handleSaveData = async () => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                await setDoc(userRef, { userLinksPageData }, { merge: true });
                alert('Dados salvos com sucesso!');
            } catch (error) {
                alert('Erro ao salvar dados!');
                console.error('Erro ao salvar URL personalizada:', error);
            }
        }
    }

    useEffect(() => {
        getUserLinksPageData()
    }, [user]);

    return (
        <div id="user-config-form">
            <h2> Olá {user?.displayName} !</h2>
            <p>Aqui você configura a sua página de links personalizada!</p>
            <hr className="custom-hr-secondary" />

            <HandleUserUrlInput updateUserUrl={handleChange} userUrl={userLinksPageData.userUrl} />
            <hr className="custom-hr-terciary" />

            <AvatarUpload
                data={userLinksPageData}
                updateData={handleChange}
                userUid={user?.uid}
            />
            <hr className="custom-hr-primary" />

            <UserInformationsInputs name={userLinksPageData.name} bio={userLinksPageData.bio} updateData={handleChange} />
            <hr className="custom-hr-secondary" />

            <div id="save-div">
                <p>Tudo certo ? Salve suas alterações: </p>
                <button className="btn" onClick={handleSaveData}> Salvar </button>
            </div>

        </div>
    )
}

export default UserConfigForm