import { useState } from "react";
import { DonateModal } from "./DonateModal"

export const Footer = () => {
    const [donateModalIsOpen, setDonateModalIsOpen] = useState(false);

    return (
        <>
            <footer> 
                <p>Feito com ❤️ por <a href="https://tudoaqui.click/founder" target="_blank" rel="noopener noreferrer">Fernando</a>.</p> 
                <p className="donate-option" onClick={() => setDonateModalIsOpen(true)}>Apoie este projeto</p>
            </footer>
            <DonateModal isOpen={donateModalIsOpen} onClose={() => setDonateModalIsOpen(false)} />
        </>
    )
}