import { ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
    showCloseButton?: boolean
}

export const Modal = ({ children, isOpen, onClose, showCloseButton = false }: ModalProps) => {

    if (!isOpen) return null

    const root = document.body

    return (
        <>
            {root &&
                createPortal(
                    <div className="modal-backdrop" onClick={onClose}>
                        <div className="modal-container" onClick={(event) => event.stopPropagation()}>
                            {showCloseButton && <button className="modal-close" onClick={onClose} aria-label="Fechar modal"> × </button>}
                            {children}
                        </div>
                    </div>, root
                )
            }
        </>

    )
}