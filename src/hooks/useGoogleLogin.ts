import { signInWithPopup } from "firebase/auth";
import { auth, db, googleAuthProvider } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultUserLinksPageData } from "../utils/defaultUserLinksPageData";
import { useUserData } from "../contexts/UserDataContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { UserLinksPageData } from "../pages/UserLinksPage";

export const useGoogleLogin = () => {

    const { user, setUser } = useUserData();
    const { showSnackbar } = useSnackbar();

    const handleLogin = async (redirectPath?: string, customCreationData?: UserLinksPageData) => {
        if (!user) {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const url = window.location.href;
            const inAppBrowsers = [
                'linkedinapp',
                'fban', 'fbav', 'instagram', 'line', 'wv', 'fb_iab'
            ];
            const isInAppBrowser = inAppBrowsers.some(app => userAgent.includes(app));
            const isMobileDevice = /iphone|ipad|android/i.test(userAgent);

            if (isMobileDevice && isInAppBrowser) {
                if (/iphone|ipad/i.test(userAgent)) {
                    window.location.href = 'x-safari-' + url;
                    return;
                }
                if (/android/i.test(userAgent)) {
                    window.location.href =
                        'intent://' + url.replace(/^https?:\/\//, '') +
                        '#Intent;scheme=https;package=com.android.chrome;end';
                    return;
                }
            }

            try {
                const result = await signInWithPopup(auth, googleAuthProvider);
                const user = result.user;

                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (!userDoc.exists()) {
                    await setDoc(userRef, {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        userLinksPageData: customCreationData ?? defaultUserLinksPageData,
                        lastLogin: new Date(),
                        likes: 0,
                        dislikes: 0,
                        views: [],
                        receivedClicks: []
                    });
                }

                setUser(user);
                if (redirectPath) window.location.href = redirectPath;
            } catch (error) {
                showSnackbar("Erro ao autenticar com o Google!");
                console.error("Erro ao autenticar com o Google:", error);
            }
        }
    };

    return { handleLogin };
};