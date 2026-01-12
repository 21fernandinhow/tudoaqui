import { useUserData } from "../contexts/UserDataContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { BiSolidDonateHeart } from "react-icons/bi";

export const GoToPremiumButton = () => {

    const { user } = useUserData();
    const { showSnackbar } = useSnackbar()

    const goToPremiumPage = () => {
        if (user) window.open("https://tudoaqui.click/premium", "_blank")
        else showSnackbar('Você precisa estar logado para explorar os recursos premium!')
    }

    return <button id="go-to-premium-button" className="config-corner-button" onClick={goToPremiumPage}><BiSolidDonateHeart /></button>
};
