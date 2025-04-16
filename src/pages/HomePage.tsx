import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LandingPageSession } from "../components/LandingPageSession";
import FirstImage from "../assets/ilustrations/undraw_in-real-life_8znn.svg"
import SecondImage from "../assets/ilustrations/undraw_online-posts_avfn.svg"
import ThirdImage from "../assets/ilustrations/undraw_social-ideas_3znc.svg"
import { LoginButton } from "../components/LoginButton";

export const HomePage = () => {

    return (
        <>
            <Header />
            <LandingPageSession imgSrc={FirstImage}>
                <h1>tudoaqui</h1>
                <p>Seu link-in-bio com identidade. Bonito, moderno e com 3D interativo.</p>
                <div>
                    <a href="#about-session" className="btn">Saiba mais</a>
                    <LoginButton />
                </div>
            </LandingPageSession>
            <LandingPageSession imgSrc={SecondImage} id="about-session" reverse secondaryBg>
                <h3> Chega dos mesmos layouts de sempre! </h3>
                <p>Nós oferecemos uma interface diferenciada de <strong>links in bio</strong>, para te destacar da multidão.</p>
                <a href="#demo-session" className="btn">Diferente como?</a>
            </LandingPageSession>
            <LandingPageSession imgSrc={ThirdImage} id="demo-session">
                <h3>Sua página não será "só mais uma" </h3>
                <p>Encante seus visitantes com ícones 3D animados que se movem conforme a interação.</p>
                <p>Simples, bonito, impactante. E altamente personalizável!</p>
                <div>
                    <a href="https://paschoalinks.vercel.app" className="btn" target="_blank" rel="noopener noreferrer">Ver demo</a>
                    <LoginButton />
                </div>
            </LandingPageSession>
            <Footer />
        </>
    );
};