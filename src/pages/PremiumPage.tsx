import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";

export const PremiumPage = () => {

    //lp pra assinar com um popup pro pagamento
    const { user } = useUserData()

    return (
        <>
            <Header />
            {user ?
                <p>assine!</p>
                :
                <p>cade o login meu caro ???</p>
            }
        </>
    );
};
