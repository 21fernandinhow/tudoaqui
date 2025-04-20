import { FcGoogle } from "react-icons/fc";
import { useUserData } from "../context/UserDataContext";
import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LoginButton = () => {
  const { user, setUser } = useUserData();

  const handleLogin = async () => {

    if (user) {
      alert("Você ja está logado!")
      return
    }

    const userAgent = window.navigator.userAgent;
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

      alert('caiu aqui')

      // For iOS devices
      if (/iphone|ipad/i.test(userAgent)) {
        alert('identificou iphone')
        window.location.href = 'x-safari-' + url;
        return;
      }
      // For Android devices
      if (/android/i.test(userAgent)) {
        alert('identificou android')
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
            showPremiumIcon: false
          },
          lastLogin: new Date(),
        });
      }

      setUser(user);
      window.location.href = "/config"
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