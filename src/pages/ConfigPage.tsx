import { Header } from "../components/Header";
import { useUserData } from "../context/UserDataContext";

const ConfigPage = () => {
    const { user } = useUserData();

    //fazer req pro banco de dados usando uid pra pegar dados de config do usuario
    //se não tiver, criar usuario com configurações padrão

    return (
        <>
            <Header />
            {user ?
                <p>ConfigPage {user?.uid} </p>
                : <p>Faça login</p>
            }
        </>
    );
};

export default ConfigPage;