import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const LogoutButton = () => {

    const handleLogout = async () => {
        try {
            await signOut(auth); 
            window.location.href = '/';
        } catch (error) {
            console.error("Erro ao deslogar: ", error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn">
            Sair
        </button>
    );
}