import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSnackbar } from "../contexts/SnackbarContext";

export const LogoutButton = () => {

    const { showSnackbar } = useSnackbar();

    const handleLogout = async () => {
        try {
            await signOut(auth); 
            window.location.href = '/';
        } catch (error) {
            showSnackbar("Erro ao deslogar!")
            console.error("Erro ao deslogar: ", error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn">
            Sair
        </button>
    );
}