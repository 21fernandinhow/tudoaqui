import { Header } from "../components/Header";
import UserConfigForm from "../components/UserConfigForm";
import { useUserData } from "../context/UserDataContext";

const ConfigPage = () => {
    const { user } = useUserData();

    return (
        <>
            <Header />
            {user ?
                <>
                    <div id="config-page">
                        <UserConfigForm />
                        <div id="preview">preview</div>
                    </div>
                </>
                : <p>Faça login</p>
            }
        </>
    );
};

export default ConfigPage;