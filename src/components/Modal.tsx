import { ReactNode } from "react"
import { createPortal } from "react-dom"

interface Modal {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

export const Modal = ({ isOpen, children, onClose }: Modal) => {

    if (!isOpen) {
        return false
    }

    const root = document.querySelector('body')

    return (
        <>
            {root &&
                createPortal(
                    <div className="modal-backdrop" onClick={onClose}>
                        <div className="modal-container" onClick={(event) => event.stopPropagation()}>
                            {children}
                        </div>
                    </div>, root
                )
            }
        </>

    )
}