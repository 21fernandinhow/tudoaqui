import { Header } from "../components/Header";
import { UserConfigForm } from "../components/UserConfigForm";
import { useUserData } from "../context/UserDataContext";

const ConfigPage = () => {
    const { user, loading } = useUserData();

    if (loading) return <Header />;

    if(!loading && !user) window.location.href = '/'

    return (
        <>
            <Header />
            <UserConfigForm />
        </>
    );
};

export default ConfigPage