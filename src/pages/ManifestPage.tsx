import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const ManifestPage = () => {
    return (
        <>
            <Header />
            <main className="container" id="manifest-page">
                <section>
                    <h1>
                        Não é sobre links.
                        <br />
                        É sobre essência.
                    </h1>
                    <p>
                        A internet virou uma coleção de perfis genéricos,
                        moldados por atalhos, fórmulas prontas e padrões repetidos.
                    </p>
                    <p>
                        O <strong>tudoaqui.click</strong> nasce na direção oposta.
                    </p>
                    <p>
                        Não para simplificar pessoas.
                        <br />
                        Mas para abrir espaço para quem elas são.
                    </p>
                </section>

                <hr className="custom-hr-terciary" />

                <section>
                    <h2>Autenticidade acima de tudo</h2>
                    <p>Autenticidade não se fabrica.</p>
                    <p>Não se copia.</p>
                    <p>Não se força.</p>
                    <p>
                        Aqui, você não se encaixa em um molde.
                        <br />
                        Você molda o espaço ao seu redor.
                    </p>
                </section>

                <hr className="custom-hr-secondary" />

                <section>
                    <h2>Personalidade não é detalhe</h2>
                    <p>Você não é um card empilhado.</p>
                    <p>Não é um template.</p>
                    <p>Não é mais um botão chamativo.</p>
                    <p>
                        Personalidade é aquilo que o mundo só encontra, em você.
                    </p>
                    <p>
                        Cores, movimento, forma, presença.
                        <br />
                        Tudo comunica.
                    </p>
                    <p>
                        O <strong>tudoaqui.click</strong> existe para que essas escolhas sejam suas —
                        <br />
                        não herdadas.
                    </p>

                </section>

                <hr className="custom-hr-primary" />

                <section>
                    <h2>Simplicidade é clareza</h2>
                    <p>Simplicidade não é ausência.</p>
                    <p>É intenção.</p>
                    <p>Quando o caminho é reto, visível, nítido.</p>
                    <p>Você chega onde quer sem ser trabalhoso, porque está simplesmente sendo você</p>
                </section>

                <hr className="custom-hr-secondary" />

                <section>
                    <p>
                        O <strong>tudoaqui.click</strong> não quer ser tudo.
                    </p>
                    <p>
                        Quer ser o suficiente para você ser você.
                    </p>
                    <p>
                        Se isso faz sentido,
                        <br />
                        então já está tudo aqui.
                    </p>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default ManifestPage