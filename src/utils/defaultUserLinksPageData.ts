import { UserLinksPageData } from "../components/UserConfigForm";

export const defaultUserLinksPageData: UserLinksPageData = {
    userUrl: "",
    avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/tudoaqui-2936b.firebasestorage.app/o/users%2FBs2nV5ovXcYborimonm8Uxax9a53%2Fdefault-avatar-icon-of-social-media-user-vector.jpg?alt=media&token=9c367c77-04cf-48e4-bfd6-38ab1af39780",
    avatarImgName: "default-avatar.jpg",
    name: "",
    bio: "",
    colors: {
        primary: "#8c8c8c",
        secondary: "#ddd",
        bg: "#fff",
        bgSecondary: "#f5f5f5",
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
        floatingMode: true
    },
    isPremium: false,
    showPremiumIcon: false,
    hasSideWaves: false
}