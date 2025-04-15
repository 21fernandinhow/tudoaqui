export const SubscribeContent = () => (
    
    <div className="subscribe-content">

        <h2>🌟 Faça Parte da Nossa Lista Exclusiva! 🚀</h2>
        <p>Estamos preparando algo incrível e você pode ser um dos primeiros a conferir! 💡</p>
        <p>
            Cadastre-se agora e receba em primeira mão todas as novidades sobre o nosso lançamento.
            <strong> Os 20 primeiros terão 1 mês de premium.</strong>
        </p>

        <form action="https://formspree.io/f/xbldydlv" method="POST">
            <input type="text" name="name" placeholder="Nome" id="name" required />
            <input type="email" name="email" placeholder="Email" id="email" required />
            <button className="btn" type="submit">Enviar</button>
        </form>

    </div>
)
