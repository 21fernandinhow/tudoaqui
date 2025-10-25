import { FcGoogle } from "react-icons/fc";
import { useUserData } from "../context/UserDataContext";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSnackbar } from "../contexts/SnackbarContext";
import { defaultUserLinksPageData } from "../utils/defaultUserLinksPageData";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface LoginButtonProps {
  children?: ReactNode
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const { user, setUser } = useUserData();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const handleLogin = async () => {

    if (user) {
      if (location.pathname === "/") navigate("/config");
      showSnackbar("Você ja está logado!")
      return
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const url = window.location.href
    const inAppBrowsers = [
      'linkedinapp',
      'fban', // Facebook App
      'fbav', // Facebook App
      'instagram',
      'line',
      'wv', // WebView
      'fb_iab', // Facebook in-app browser
    ];
    const isInAppBrowser = inAppBrowsers.some(app => userAgent.includes(app));
    const isMobileDevice = /iphone|ipad|android/i.test(userAgent);

    if (isMobileDevice && isInAppBrowser) {

      // For iOS devices
      if (/iphone|ipad/i.test(userAgent)) {
        window.location.href = 'x-safari-' + url;
        return;
      }
      // For Android devices
      if (/android/i.test(userAgent)) {
        window.location.href = 'intent://' + url.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
        return;
      }
    }

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
          userLinksPageData: defaultUserLinksPageData,
          lastLogin: new Date(),
          likes: 0,
          dislikes: 0,
          views: [],
          receivedClicks: []
        });
      }

      setUser(user);
      window.location.href = "/config"
    } catch (error) {
      showSnackbar("Erro ao autenticar com o Google!")
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  return (
    <button onClick={handleLogin} className="btn">
      <FcGoogle /> {children || "Entrar com Google"}
    </button>
  );
}