import { ReactNode } from "react"

interface Modal {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

export const Modal = ({isOpen, children, onClose}: Modal) => {

    if(!isOpen){
        return false
    }
    
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}