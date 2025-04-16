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
          userLinksPageData: {
            userUrl: "",
            avatarImgUrl: "",
            avatarImgName: "",
            name: "",
            bio: "",
            colors: {
              primary: "#fff",
              secondary: "#fff",
              bg: "#fff",
              bgSecondary: "#fff",
              contrast: "#000",
              shadow: "rgba(0,0,0, 0.4)"
            },
            bgImage: "",
            font: "",
            showShareBtn: false,
            showAIAssistant: false,
            hideCredits: false,
            links: [],
            buttonOptions: {
              style: "default",
              borderRadius: "0.5"
            },
            iconOptions: {
              bgColor: "#fff",
              floatingMode: false
            },
            isPremium: false,
          },
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
      <FcGoogle /> Entrar com Google
    </button>
  );
}