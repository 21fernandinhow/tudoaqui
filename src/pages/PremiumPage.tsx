import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";

export const PremiumPage = () => {

    //lp pra assinar com um popup pro pagamento
    const { user, loading } = useUserData()

    if (loading) return <Header />;

    if (!loading && !user) window.location.href = '/'

    return (
        <>
            <Header />
            <p>assine</p>
        </>
    );
};
