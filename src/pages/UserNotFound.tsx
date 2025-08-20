import { IoEnterOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";

const UserNotFound = () => (
    <div id="not-found-user">
        <MdError />
        <h2>Ooops... usuário não encontrado</h2>
        <p>Verifique se a URL está correta.</p>
        <p>Ou então, essa página pode ser sua!</p>
        <button className="btn btn-outline-secondary fade-in-up" onClick={() => window.open("https://tudoaqui.click")}><IoEnterOutline /> Crie com <strong>tudoaqui.click</strong></button>
    </div>
)

export default UserNotFound