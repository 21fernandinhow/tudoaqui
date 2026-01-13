import { useState } from "react";
import { DonateModal } from "./DonateModal";
import { BiSolidDonateHeart } from "react-icons/bi";

export const DonateButton = () => {

    const [donateModalIsOpen, setDonateModalIsOpen] = useState(false);

    return (
        <>
            <button
                id="donate-button"
                className="config-corner-button"
                onClick={() => setDonateModalIsOpen(true)}
                aria-label="Apoiar o projeto"
            >
                <BiSolidDonateHeart />
            </button>

            <DonateModal
                isOpen={donateModalIsOpen}
                onClose={() => setDonateModalIsOpen(false)}
            />
        </>
    );
};