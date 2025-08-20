import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LandingPageSession } from "../components/LandingPageSession";
import FirstImage from "../assets/ilustrations/undraw_in-real-life_8znn.svg"
import SecondImage from "../assets/ilustrations/undraw_online-posts_avfn.svg"
import ThirdImage from "../assets/ilustrations/undraw_social-ideas_3znc.svg"
import { LoginButton } from "../components/LoginButton";

const HomePage = () => {

    return (
        <>
            <Header />
            <LandingPageSession imgSrc={FirstImage} imgWidth={596} imgHeight={728} priority>
                <h1>tudoaqui</h1>
                <p>Seu link na bio com identidade. Bonito, moderno e com 3D interativo.</p>
                <div>
                    <a href="#about-session" className="btn">Saiba mais</a>
                    <LoginButton />
                </div>
            </LandingPageSession>
            <LandingPageSession imgSrc={SecondImage} id="about-session" reverse secondaryBg imgWidth={731} imgHeight={731}>
                <h3> Chega dos mesmos layouts de sempre! </h3>
                <p>Nós oferecemos uma interface diferenciada de <strong>links na bio</strong>, para te destacar da multidão.</p>
                <a href="#demo-session" className="btn">Diferente como?</a>
            </LandingPageSession>
            <LandingPageSession imgSrc={ThirdImage} id="demo-session" imgWidth={747} imgHeight={649}>
                <h3>Sua página não será "só mais uma" </h3>
                <p>Encante seus visitantes com ícones 3D animados que se movem conforme a interação.</p>
                <p>Simples, bonito, impactante. E altamente personalizável!</p>
                <div>
                    <a href="/explore" className="btn">Veja na prática</a>
                    <LoginButton />
                </div>
            </LandingPageSession>
            <Footer />
        </>
    );
};

export default HomePage