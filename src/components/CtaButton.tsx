import { useState } from "react"
import { Modal } from "./Modal"
import { SubscribeContent } from "./SubscribeContent"

export const CtaButton = () => {

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="btn"> Inscrever-se </button>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
               <SubscribeContent />
            </Modal>
        </>
    )
}