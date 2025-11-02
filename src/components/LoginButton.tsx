import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

interface LoginButtonProps {
  children?: ReactNode
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const { handleLogin } = useGoogleLogin()

  return (
    <button onClick={() => handleLogin("/config")} className="btn">
      <FcGoogle /> {children || "Entrar com Google"}
    </button>
  );
}