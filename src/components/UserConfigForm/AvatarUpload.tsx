import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserLinksPageData } from "../UserConfigForm";

interface AvatarUploadProps {
    data: UserLinksPageData, // use all data and not just avatarImgName because this component made a save for himself
    userUid?: string,
    updateData: (key: string, value: any) => void
}

export const AvatarUpload = ({ data, userUid, updateData }: AvatarUploadProps) => {

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(e.target.files)
        if (!file || !userUid) return;

        try {
            const storageRef = ref(storage, `users/${userUid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            await setDoc(doc(db, 'users', userUid), {
                userLinksPageData: {
                    ...data,
                    avatarImgUrl: downloadURL,
                    avatarImgName: file.name
                }
            }, { merge: true });
            updateData("avatarImgUrl", downloadURL)
            updateData("avatarImgName", file.name)

            alert('Foto de perfil enviada com sucesso!');
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            alert("Erro ao fazer upload da imagem!");
        }
    };

    return (
        <>
            <p>Escolha uma foto para ser seu avatar: </p>
            <div className="img-input">
                <input type="file" accept="image/*" onChange={handleImageUpload} id="img-input" />
                <label htmlFor="img-input">Selecionar imagem</label>
                <span>
                    {data.avatarImgName && data.avatarImgName.length > 16 ?
                        data.avatarImgName.slice(0, 16) + "..." : data.avatarImgName
                    }
                </span>
            </div>
        </>
    )
}