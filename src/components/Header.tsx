import { Navbar } from "./Navbar"

export const Header = () => {
    return (
        <header>
            <div className="logo-div">
                <a href={"/"}>
                    <img src="/logo.webp" width={70} height={70} alt="tudoaqui.click" />
                </a>
            </div>
            <Navbar />
        </header>
    )
}