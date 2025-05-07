import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar a URL dinâmica
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { UserLinksPageData } from "../components/UserConfigForm";
import { UserLinksPageContent } from "../components/UserLinksPageContent.tsx";
import { Loader } from "../components/Loader.tsx";
import { UserNotFound } from "./UserNotFound.tsx";

export const UserLinksPage = () => {
    const { userUrl } = useParams();
    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserLinksPageData = async () => {
        if (userUrl) {
            const q = query(collection(db, "users"), where("userLinksPageData.userUrl", "==", userUrl));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const data = userDoc.data()
                    setUid(data.uid);
                    setUserLinksPageData(data.userLinksPageData);
                    document.title = data.userLinksPageData.name
                } else {
                    console.log("Usuário não encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserLinksPageData();
    }, [userUrl]);

    if (loading) {
        return <div className="loading-page"> <Loader /> </div>
    }

    return userLinksPageData && uid ? <UserLinksPageContent data={userLinksPageData} uid={uid}/> : <UserNotFound />
};
