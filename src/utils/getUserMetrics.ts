import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { VisitLocationData } from "../pages/UserLinksPage";

export interface ViewLinksPageData {
    visitedAt: string; // ISO string
    origin: string;
    device: string;
    location: VisitLocationData
}

export interface ReceivedClicksData {
    clickedAt: string; // ISO string
    device: string;
    icon: string;
    label: string;
    location: VisitLocationData;
    type: string;
    url: string;
}

export interface UserMetrics {
  likes: number;
  dislikes: number;
  views: ViewLinksPageData[];
  receivedClicks: ReceivedClicksData[];
}

export const getUserMetrics = async (uid: string): Promise<UserMetrics | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return {
        likes: data.likes ?? 0,
        dislikes: data.dislikes ?? 0,
        views: data.views ?? [],
        receivedClicks: data.receivedClicks ?? [],
      };
    } else {
      console.warn("Usuário não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar métricas do usuário:", error);
    return null;
  }
};