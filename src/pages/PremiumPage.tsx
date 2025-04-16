import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";
import { getCheckoutUrl, getPortalUrl } from "../utils/stripePayment";

export const PremiumPage = () => {

    const { user, loading } = useUserData()

    const openCheckout = async () => {
        if(!user?.uid) return

        const priceId = "price_1RELVLCKszI7rOf1rgKhjspA"
        const checkoutUrl = await getCheckoutUrl(user.uid, priceId)
        if(checkoutUrl) window.open(checkoutUrl, "_blank")
    }

    const openStripeDashboard = async () => {
        if(!user?.uid) return

        const portalUrl = await getPortalUrl()
        if(portalUrl) window.open(portalUrl, "_blank")
    }

    if (loading) return <Header />;

    if (!loading && !user) window.location.href = '/'

    return (
        <>
            <Header />
            <p>assine</p>
            
            <button className="btn" onClick={openCheckout}> Assine agora </button>
            <button className="btn" onClick={openStripeDashboard}> Gerenciar </button>
        </>
    );
};
