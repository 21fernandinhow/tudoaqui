import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export const getUserLinksPageDataByUid = async (uid: string) => {
    if (uid) {
        const userRef = doc(db, 'users', uid)
        try {
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
                const userLinksPageData = docSnap.data().userLinksPageData
                return userLinksPageData
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error)
        }
    }
}