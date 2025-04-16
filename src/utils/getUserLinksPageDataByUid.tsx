import { doc, getDoc } from "firebase/firestore"
import { app, db } from "../firebase"
import { getPremiumStatus } from "./getPremiumStatus"

export const getUserLinksPageDataByUid = async (uid: string) => {
    if (uid) {
        const userRef = doc(db, 'users', uid)
        try {
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
                const userLinksPageData = docSnap.data().userLinksPageData
                const isUserPremium = await getPremiumStatus(app, uid)
                userLinksPageData.isPremium = isUserPremium
                return userLinksPageData
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error)
        }
    }
}