import { User } from "firebase/auth"
import { UserLinksPageData } from "../components/UserConfigForm"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../firebase"

export const saveUserData = async (user: User | null, data: UserLinksPageData) => {
    if (!user) return

    const userUrl = data.userUrl
    if (!userUrl) {
        alert("Você precisa definir uma URL personalizada!")
        return
    }

    try {

        const querySnapshot = await getDocs(
            query(collection(db, 'users'), where('userLinksPageData.userUrl', '==', userUrl))
        )

        const urlUsedByOther = querySnapshot.docs.find(doc => doc.id !== user.uid)

        if (urlUsedByOther) {
            alert("Erro: essa URL já está em uso por outro usuário.")
            return
        }

        if (data.links && data.links.some(item => (item.type === "icon" && !item.icon) || (item.type === "button" && !item.label) || !item.url)) {
            alert("Erro: você tem uma opção de link com informações incompletas e/ou inválidas!")
            return
        }

        const userRef = doc(db, 'users', user.uid)
        await setDoc(userRef, { userLinksPageData: data }, { merge: true })

        alert('Dados salvos com sucesso!')
    } catch (error) {
        alert('Erro ao salvar dados!')
        console.error('Erro ao salvar dados:', error)
    }
}