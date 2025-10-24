import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LandingPageSession } from "../components/LandingPageSession";
import FirstImage from "../assets/ilustrations/undraw_in-real-life_8znn.svg"
import SecondImage from "../assets/ilustrations/undraw_online-posts_avfn.svg"
import ThirdImage from "../assets/ilustrations/undraw_social-ideas_3znc.svg"
import { LoginButton } from "../components/LoginButton";

const HomePage = () => (
    <>
        <Header />
        <LandingPageSession imgSrc={FirstImage} imgWidth={596} imgHeight={728} priority>
            <h1>Crie sua página de links com IA</h1>
            <LoginButton />
        </LandingPageSession>
        <LandingPageSession imgSrc={SecondImage} id="about-session" reverse secondaryBg imgWidth={731} imgHeight={731}>
            <h3> Chega dos mesmos layouts de sempre! </h3>
            <p>Oferecemos liberdade total de personalização — do tema às animações. Crie algo único, do seu jeito!</p>
            <a href="#demo-session" className="btn">Conheça os resultados</a>
        </LandingPageSession>
        <LandingPageSession imgSrc={ThirdImage} id="demo-session" imgWidth={747} imgHeight={649}>
            <h3>Sua página não será "só mais uma" </h3>
            <p>Encante seus visitantes com ícones 3D animados e interativos!</p>
            <p>Mais conversões ao transformar sua página em uma experiência marcante.</p>
            <div>
                <LoginButton />
                <a href="/explore" className="btn">Veja exemplos</a>
            </div>
        </LandingPageSession>
        <Footer />
    </>
);

export default HomePage