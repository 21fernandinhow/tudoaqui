import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar a URL dinâmica
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { UserLinksPageContent } from "../components/UserLinksPageContent.tsx";
import UserNotFound  from "./UserNotFound.tsx";
import { LoadingPage } from "./LoadingPage.tsx";

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

export interface VisitLocationData {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
};

const UserLinksPage = () => {
    const { userUrl } = useParams();
    const [userLinksPageData, setUserLinksPageData] = useState<UserLinksPageData | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [visitLocation, setVisitLocation] = useState<VisitLocationData>()

    const getUserLocation = async () => {
        try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            const formattedData = {
                city: data.city,
                state: data.region,
                country: data.country_name,
                latitude: data.latitude,
                longitude: data.longitude
            };

            setVisitLocation(formattedData)
            return formattedData
        } catch (error) {
            console.error("Erro ao obter localização por IP:", error);
            return null;
        }
    };

    const trackVisit = async (userId: string) => {

        // Don't track in iframes
        if (window.self !== window.top) return;

        try {
            const location = await getUserLocation()

            const visit = {
                visitedAt: new Date().toISOString(),
                origin: document.referrer || "Acesso direto",
                location: location,
                device: navigator.userAgent
            };

            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                views: arrayUnion(visit)
            });

        } catch (error) {
            console.error("Erro ao registrar visita:", error);
        }
    };

    const fetchUserLinksPageData = async () => {
        if (userUrl) {
            const q = query(collection(db, "users"), where("userLinksPageData.userUrl", "==", userUrl));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const data = userDoc.data()
                    setUserLinksPageData(data.userLinksPageData);
                    document.title = data.userLinksPageData.name

                    if (data.uid) {
                        setUid(data.uid);
                        await trackVisit(data.uid);
                    }
                } else {
                    console.error("Usuário não encontrado");
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
        return <LoadingPage />
    }

    return userLinksPageData && uid ? <UserLinksPageContent data={userLinksPageData} uid={uid} visitLocation={visitLocation} /> : <UserNotFound />
};

export default UserLinksPage