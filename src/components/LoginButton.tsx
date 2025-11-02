import { FcGoogle } from "react-icons/fc";
import { useUserData } from "../contexts/UserDataContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

interface LoginButtonProps {
  children?: ReactNode
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const { user } = useUserData();
  const { showSnackbar } = useSnackbar();
  const { handleLogin } = useGoogleLogin()
  const navigate = useNavigate()

  return (
    <button onClick={() => {
      if (user) {
        if (location.pathname === "/") navigate("/config");
        showSnackbar("Você ja está logado!")
        return
      } else handleLogin("/config")
    }} className="btn">
      <FcGoogle /> {children || "Entrar com Google"}
    </button>
  );
}