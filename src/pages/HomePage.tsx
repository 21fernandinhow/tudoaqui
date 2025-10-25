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
            <h1>Crie sua página de links com IA em segundos!</h1>
            <p>Diga adeus aos layouts genéricos: personalize cores, fontes e ícones sem complicação.</p>
            <LoginButton>Comece Grátis</LoginButton>
        </LandingPageSession>
        <LandingPageSession imgSrc={SecondImage} id="about-session" reverse secondaryBg imgWidth={731} imgHeight={731}>
            <h3>Chega de páginas iguais!</h3>
            <p>Com a nossa IA, você cria seu próprio tema e transforma sua página em algo que chama atenção. Total liberdade de personalização, do seu jeito.</p>
            <a href="#demo-session" className="btn">Veja o que é possível</a>
        </LandingPageSession>
        <LandingPageSession imgSrc={ThirdImage} id="demo-session" imgWidth={747} imgHeight={649}>
            <h3>Mais cliques, mais destaque</h3>
            <p>Use ícones interativos e layouts únicos para fazer sua página se destacar e aumentar a conversão.</p>
            <p>Seja mais você, impacte seu público e turbine seus resultados em poucos minutos.</p>
            <div>
                <LoginButton>Comece Grátis</LoginButton>
                <a href="/explore" className="btn">Veja páginas de nossos usuários</a>
            </div>
        </LandingPageSession>
        <Footer />
    </>
);

export default HomePage;