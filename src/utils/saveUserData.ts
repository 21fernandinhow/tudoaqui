import { User } from "firebase/auth"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../firebase"
import { UserLinksPageData } from "../pages/UserLinksPage"

export const saveUserData = async (user: User | null, data: UserLinksPageData, showSnackbar: (message: string) => void) => {
    console.log("bateu aqui na savveUserData", user, data)

    if (!user) return false

    const userUrl = data.userUrl
    if (!userUrl) {
        showSnackbar("Você precisa definir uma URL personalizada!")
        return false
    }

    try {
        const querySnapshot = await getDocs(
            query(collection(db, 'users'), where('userLinksPageData.userUrl', '==', userUrl))
        )

        const urlUsedByOther = querySnapshot.docs.find(doc => doc.id !== user.uid)

        if (urlUsedByOther) {
            showSnackbar("Erro: essa URL já está em uso por outro usuário.")
            return false
        }

        if (data.links && data.links.some(item => (item.type === "icon" && !item.icon) || (item.type === "button" && !item.label) || !item.url)) {
            showSnackbar("Erro: você tem uma opção de link com informações incompletas e/ou inválidas!")
            return false
        }

        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, { userLinksPageData: data }, { merge: true })

        showSnackbar('Dados salvos com sucesso!')
        return true
    } catch (error) {
        showSnackbar('Erro ao salvar dados!')
        console.error('Erro ao salvar dados:', error)
        return false
    }
}