import { FcGoogle } from "react-icons/fc";
import { useUserData } from "../context/UserDataContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";

export const LoginButton = () => {
  const { setUser } = useUserData();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  return (
    <button onClick={handleLogin} className="btn">
      <FcGoogle /> Login com Google 
    </button>
  );
}