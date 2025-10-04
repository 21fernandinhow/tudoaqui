import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";
import { getCheckoutUrl, getPortalUrl } from "../utils/stripePayment";
import { getPremiumStatus } from "../utils/getPremiumStatus";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { LoadingPage } from "./LoadingPage";

const PremiumPage = () => {
  const { user, loading } = useUserData();
  const [isPremium, setIsPremium] = useState(false);
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  const openCheckout = async () => {
    if (!user?.uid) return;

    const priceId = "price_1RELVLCKszI7rOf1rgKhjspA";

    setShowButtonLoader(true);
    const checkoutUrl = await getCheckoutUrl(user.uid, priceId);

    if (checkoutUrl) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = checkoutUrl;
      } else {
        window.open(checkoutUrl, "_blank");
        setShowButtonLoader(false);
      }
    } else {
      setShowButtonLoader(false);
    }
  };

  const openStripeDashboard = async () => {
    if (!user?.uid) return;

    setShowButtonLoader(true);
    const portalUrl = await getPortalUrl();

    if (portalUrl) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = portalUrl;
      } else {
        window.open(portalUrl, "_blank");
        setShowButtonLoader(false);
      }
    } else {
      setShowButtonLoader(false);
    }
  };

  const verifyIsPremium = async (uid: string) => {
    const answer = await getPremiumStatus(uid);
    setIsPremium(answer);
  };

  useEffect(() => {
    if (user) verifyIsPremium(user.uid);
  }, [user]);

  if (loading)
    return (
      <>
        <Header />
        <LoadingPage />
      </>
    );

  if (!loading && !user) window.location.href = "/";

  return (
    <>
      <Header />

      <div id="premium-page">
        <div className="container">

          <h3>Sendo Premium você...</h3>
          <p>
            🌟 Tem um <strong>selo exclusivo</strong> exibido na sua página
          </p>
          <p>
            🚫 Pode <strong>remover a marca d'agua</strong> do TudoAqui no
            rodapé
          </p>
          <p>
            📊 Tem acesso as <strong>métricas avançadas</strong> e outros recursos futuros
          </p>
          <p>💖 Ajuda o TudoAqui a continuar existindo!</p>
          <h4>Por apenas R$ 9,90 !!!</h4>

          <hr className="custom-hr-secondary" />

          {isPremium ? (
            <p>
              Parabéns, você é um <strong>usuário premium!</strong>
            </p>
          ) : (
            <p>
              No momento, você está utilizando o <strong>plano gratuito</strong>.
              Vamos para o próximo nível?
            </p>
          )}

          {isPremium ? (
            <button
              className="btn"
              onClick={openStripeDashboard}
              disabled={showButtonLoader}
            >
              Gerenciar Assinatura {showButtonLoader && <Loader isSmall />}
            </button>
          ) : (
            <button
              className="btn"
              onClick={openCheckout}
              disabled={showButtonLoader}
            >
              Quero ser Premium {showButtonLoader && <Loader isSmall />}
            </button>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PremiumPage