import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { UserConfigForm } from "../components/UserConfigForm";
import { useUserData } from "../context/UserDataContext";

export const ConfigPage = () => {
    const { user, loading } = useUserData();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 769);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            document.body.classList.remove("no-scroll");
        } else {
            document.body.classList.add("no-scroll");
        }
    }, [isMobile]);

    if (loading) return <Header />;

    return (
        <>
            <Header />
            {user ? <UserConfigForm /> : <p>Faça login</p>}
        </>
    );
};