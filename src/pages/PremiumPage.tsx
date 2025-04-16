import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";
import { getCheckoutUrl, getPortalUrl } from "../utils/stripePayment";
import { getPremiumStatus } from "../utils/getPremiumStatus";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

export const PremiumPage = () => {

    const { user, loading } = useUserData()
    const [isPremium, setIsPremium] = useState(false)

    const openCheckout = async () => {
        if (!user?.uid) return

        const priceId = "price_1RELVLCKszI7rOf1rgKhjspA"
        const checkoutUrl = await getCheckoutUrl(user.uid, priceId)
        if (checkoutUrl) window.open(checkoutUrl)
    }

    const openStripeDashboard = async () => {
        if (!user?.uid) return

        const portalUrl = await getPortalUrl()
        if (portalUrl) window.open(portalUrl)
    }

    const verifyIsPremium = async (uid: string) => {
        const answer = await getPremiumStatus(uid)
        setIsPremium(answer)
    }

    useEffect(() => {
        if (user) verifyIsPremium(user.uid)
    }, [user])

    if (loading) return (
        <>
            <Header />
            <div className="loading-page">
                <Loader />
            </div>
        </>
    )

    if (!loading && !user) window.location.href = '/'

    return (
        <>
            <Header />

            <div id="premium-page">
                <div className="container">
                    <h2>Assinatura</h2>

                    {isPremium ?
                        <p>Parabéns, você é um <strong>usuário premium!</strong></p>
                        : <p>No momento, você está utilizando o <strong>plano gratuito</strong>.</p>
                    }

                    {isPremium ?
                        <button className="btn" onClick={openStripeDashboard}> Gerenciar Assinatura </button>
                        : <button className="btn" onClick={openCheckout}> Assine Premium </button>
                    }

                    <hr className="custom-hr-secondary" />

                    <h3>Sendo Premium você...</h3>
                    <p>🌟 Tem um <strong>selo exclusivo</strong> exibido na sua página</p>
                    <p>🚫 Pode <strong>remover a marca d'agua</strong> do TudoAqui no rodapé</p>
                    <p>📊 Tem acesso ao <strong>dashboard de métricas</strong> (ainda em construção) e outros recursos futuros</p>
                    <p>💖 Ajuda o TudoAqui a continuar existindo!</p>
                    <h4>Por apenas R$ 9,90 !!!</h4>

                    {isPremium ?
                        <>
                            <hr className="custom-hr-terciary" />
                            <p>Muito obrigado por estar do nosso lado nessa! Esperamos que esteja curtindo sua assinatura 😊</p>
                        </>
                        :
                        <div className="sign-premium-please">
                            <button className="btn-outline" onClick={openCheckout}> Quero ser Premium 🤩 </button>
                            <button className="btn-outline-secondary" onClick={openCheckout}> 9,90 é baratinho, eu quero! 😉 </button>
                            <button className="btn-outline-terciary" onClick={openCheckout}> Seja Premium pfv 🥺 </button>
                        </div>
                    }
                </div>
            </div>

            <Footer />

        </>
    );
};
