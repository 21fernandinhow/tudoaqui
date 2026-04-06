import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import { useState } from "react";
import { Loader } from "../Loader";
import { MdDeleteSweep } from "react-icons/md";
import { Modal } from "../Modal";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { UserLinksPageData } from "../../pages/UserLinksPage";
import ToggleSwitch from "../ToggleSwitch";

const MAX_FILE_SIZE_MB = 15;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface MusicUploadProps {
    data: UserLinksPageData,
    userUid?: string,
    updateData: (key: string, value: string) => void
}

export const MusicUpload = ({ data, userUid, updateData }: MusicUploadProps) => {
    const [isEnabled, setIsEnabled] = useState(!!data.musicFileName);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleToggle = (value: boolean) => {
        if (!value && data.musicFileName) {
            setDeleteModalIsOpen(true);
            return;
        }
        setIsEnabled(value);
        if (!value) {
            updateData("musicFileUrl", "");
            updateData("musicFileName", "");
        }
    };

    const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !userUid) return;

        if (file.type !== "audio/mpeg" && !file.name.toLowerCase().endsWith(".mp3")) {
            showSnackbar("Por favor, selecione um arquivo MP3 válido.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            showSnackbar(`O arquivo deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setShowButtonLoader(true);

        try {
            const storageRef = ref(storage, `users/${userUid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            updateData("musicFileUrl", downloadURL);
            updateData("musicFileName", file.name);

            showSnackbar("Música enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao fazer upload da música:", error);
            showSnackbar("Erro ao fazer upload da música!");
        } finally {
            setShowButtonLoader(false);
        }
    };

    const handleDeleteMusic = async () => {
        if (!userUid || !data.musicFileName || showButtonLoader) return;

        try {
            const storageRef = ref(storage, `users/${userUid}/${data.musicFileName}`);
            await deleteObject(storageRef);

            updateData("musicFileUrl", "");
            updateData("musicFileName", "");
            setDeleteModalIsOpen(false);
            setIsEnabled(false);
            showSnackbar("Música deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar a música:", error);
            showSnackbar("Erro ao deletar a música!");
        }
    };

    return (
        <>
            <ToggleSwitch
                label="Música de perfil: "
                isOn={isEnabled}
                onToggle={handleToggle}
            />

            {isEnabled && (
                <div className="img-input">
                    <input
                        type="file"
                        accept=".mp3,audio/mpeg"
                        onChange={handleMusicUpload}
                        id="music-input"
                    />
                    <label htmlFor="music-input" className={showButtonLoader ? "disabled" : ""}>
                        Escolher MP3
                    </label>
                    <span>
                        {data.musicFileName && data.musicFileName.length > 16
                            ? data.musicFileName.slice(0, 16) + "..."
                            : data.musicFileName}
                        {showButtonLoader && <Loader isSmall />}
                    </span>
                    {data.musicFileName && (
                        <span className="delete-box-btn" onClick={() => setDeleteModalIsOpen(true)}>
                            <MdDeleteSweep />
                        </span>
                    )}
                </div>
            )}

            <Modal isOpen={deleteModalIsOpen} onClose={() => setDeleteModalIsOpen(false)}>
                <p>Tem certeza que deseja deletar sua música de perfil?</p>
                <div className="modal-actions">
                    <button className="btn" onClick={() => setDeleteModalIsOpen(false)}>Cancelar</button>
                    <button
                        className="btn btn-error"
                        onClick={handleDeleteMusic}
                    >
                        Deletar
                    </button>
                </div>
            </Modal>
        </>
    );
};
