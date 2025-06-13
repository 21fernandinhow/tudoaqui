import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import { UserLinksPageData } from "../UserConfigForm";
import { useState } from "react";
import { Loader } from "../Loader";
import { MdDeleteSweep } from "react-icons/md";
import { Modal } from "../Modal";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface AvatarUploadProps {
    data: UserLinksPageData, // use all data and not just avatarImgName because this component made a save for himself
    userUid?: string,
    updateData: (key: string, value: string) => void
}

export const AvatarUpload = ({ data, userUid, updateData }: AvatarUploadProps) => {
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowButtonLoader(true)

        const file = e.target.files?.[0];

        if (!file || !userUid) return;

        if (!file.type.startsWith('image/')) {
            showSnackbar("Por favor, selecione um arquivo de imagem válido.");
            setShowButtonLoader(false)
            return;
        }

        try {
            const storageRef = ref(storage, `users/${userUid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            updateData("avatarImgUrl", downloadURL)
            updateData("avatarImgName", file.name)

            setShowButtonLoader(false)
            showSnackbar("Foto de perfil enviada com sucesso!");
        } catch (error) {
            setShowButtonLoader(false)
            console.error("Erro ao fazer upload da imagem:", error);
            showSnackbar("Erro ao fazer upload da imagem!");
        }
    };

    const handleDeleteImage = async () => {
        if (!userUid || !data.avatarImgName || showButtonLoader) return;

        try {
            const storageRef = ref(storage, `users/${userUid}/${data.avatarImgName}`);
            await deleteObject(storageRef);

            updateData("avatarImgUrl", "");
            updateData("avatarImgName", "");
            setDeleteModalIsOpen(false);
            showSnackbar("Foto de perfil deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar a imagem:", error);
            showSnackbar("Erro ao deletar a imagem!");
        }
    };

    return (
        <>
            <div className="img-input">
                <input type="file" accept="image/*" onChange={handleImageUpload} id="img-input" />
                <label htmlFor="img-input" className={showButtonLoader ? "disabled" : ""}> Escolher avatar </label>
                <span>
                    {data.avatarImgName && data.avatarImgName.length > 16 ?
                        data.avatarImgName.slice(0, 16) + "..." : data.avatarImgName
                    }
                    {showButtonLoader && <Loader isSmall />}
                </span>
                {data.avatarImgName && (
                    <span className="delete-box-btn" onClick={() => setDeleteModalIsOpen(true)}>
                        <MdDeleteSweep />
                    </span>
                )}
            </div>

            <Modal isOpen={deleteModalIsOpen} onClose={() => setDeleteModalIsOpen(false)}>
                <p>Tem certeza que deseja deletar sua foto de perfil?</p>
                <div className="modal-actions">
                    <button className="btn" onClick={() => setDeleteModalIsOpen(false)}>Cancelar</button>
                    <button
                        className="btn btn-error"
                        onClick={handleDeleteImage}
                    >
                        Deletar
                    </button>
                </div>
            </Modal>
        </>
    )
}