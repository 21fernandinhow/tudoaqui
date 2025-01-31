import { CtaButton } from "@/components/CtaButton";
import { Footer } from "@/components/Footer";
import { LandingPageSession } from "@/components/LandingPageSession";
import Logo from "./assets/logo.webp"
import OutsideBox from "./assets/outside-box.webp"
import Example3d from "./assets/3dexample.webp"
import Calendar from "./assets/calendar.webp"

export default function Home() {
  return (
    <>
      <LandingPageSession imgSrc={Logo}>
        <h1>tudoaqui</h1>
        <p>Encontre, conecte, resolva. Tudo aqui.</p>
        <div>
          <a href="#about-session" className="btn">Saiba mais</a>
          <a href="#cta-session" className="btn">Quero experimentar!</a>
        </div>
      </LandingPageSession>
      <LandingPageSession imgSrc={OutsideBox} id="about-session" reverse secondaryBg>
        <p>
          Chega do mesmo layout padrão para mostrar seus links!
          Nós oferecemos uma interface diferenciada de <strong>links in bio</strong>, para te destacar da multidão.
        </p>
        <a href="#demo-session" className="btn">Diferente como?</a>
      </LandingPageSession>
      <LandingPageSession imgSrc={Example3d} id="demo-session">
        <p>
          Use a tecnologia 3d para encantar seus visitantes, com os icones de suas redes sociais
          animados, se movendo conforme a interação do usuário.
        </p>
        <div>
          <a href="https://paschoalinks.vercel.app" className="btn" target="_blank" rel="noopener noreferrer">Ver demo</a>
          <a href="#cta-session" className="btn">Quero experimentar!</a>
        </div>
      </LandingPageSession>
      <LandingPageSession imgSrc={Calendar} reverse id="cta-session" secondaryBg>
        <p>
          Em breve, disponível, para você!
          Daremos 1 mês de Premium para os 20 primeiros a se cadastrarem em nossa lista de interessados!
        </p>
        <CtaButton />
      </LandingPageSession>
      <Footer />
    </>
  );
}
