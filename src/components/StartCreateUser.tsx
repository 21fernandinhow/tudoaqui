import { useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext"
import { useUserData } from "../contexts/UserDataContext";
import { slugify } from "../utils/slugify";

export const StartCreateUser = () => {
    const { user } = useUserData();
    const { showSnackbar } = useSnackbar()

    const [userUrl, setUserUrl] = useState(`${sessionStorage.getItem("userUrl") ?? ""}`)

    const handleStart = () => {
        if (!user) {
            sessionStorage.setItem("userUrl", userUrl)
            window.location.href = "/config"
        } showSnackbar("Você já tem uma conta")
    }

    return (
        <div className="start-create-user-wrapper container">
            <div className="start-create-user-content">
                <div className="start-create-user-input">
                    <span>tudoaqui.click/</span>
                    <input placeholder="seunome" value={userUrl} onChange={(e) => setUserUrl(slugify(e.target.value))}></input>
                </div>
                <button onClick={handleStart} className="btn-terciary btn-lg">Comece Grátis</button>
            </div>
        </div>
    )
}