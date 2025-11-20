import { RiVipCrownLine } from "react-icons/ri";
import { useUserData } from "../contexts/UserDataContext";
import { useSnackbar } from "../contexts/SnackbarContext";

export const GoToPremiumButton = () => {

    const { user } = useUserData();
    const { showSnackbar } = useSnackbar()

    const goToPremiumPage = () => {
        if (user) window.open("https://tudoaqui.click/premium", "_blank")
        else showSnackbar('Você precisa estar logado para explorar os recursos premium!')
    }

    return <button id="go-to-premium-button" className="config-corner-button" onClick={goToPremiumPage}><RiVipCrownLine /></button>
};
