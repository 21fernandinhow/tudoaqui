import { FcGoogle } from "react-icons/fc";
import { useUserData } from "../context/UserDataContext";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginButton = () => {
  const { setUser } = useUserData();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          isPremium: false,
          lastLogin: new Date(),
        });
      }

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