import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ConfigPage = () => {
    const { user } = useUserData();
    const [userLinksPageData, setUserLinksPageData] = useState({
        userUrl: "",
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
                alert('URL personalizada salva com sucesso');
            } catch (error) {
                console.error('Erro ao salvar URL personalizada:', error);
            }
        }
    }

    useEffect(() => {
        getUserLinksPageData()
    }, [user]);


    return (
        <>
            <Header />
            {user ?
                <>
                    <h1>Olá {user.displayName} !</h1>
                    <p>Vamos começar configurando seu url:</p>

                    <input
                        type="text"
                        onChange={(e) => handleChange("userUrl", e.target.value)}
                        value={userLinksPageData.userUrl}
                    />

                    <button className="btn" onClick={handleSaveData}> Salvar </button>

                    <p>Sua pagina será <strong>tudoaqui.click/{userLinksPageData.userUrl}</strong></p>
                </>
                : <p>Faça login</p>
            }
        </>
    );
};

export default ConfigPage;