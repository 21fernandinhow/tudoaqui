import { ReactNode } from "react"

interface SessionLayoutProps {
    reverse?: boolean
    secondaryBg?: boolean
    children: ReactNode
    imgSrc: string
    id?: string
}

export const LandingPageSession = ({ reverse = false, children, imgSrc, id = "", secondaryBg = false }: SessionLayoutProps) => (
    <div className={`lp-session ${secondaryBg ? 'secondary-bg' : ''}`}>
        <div className={`container row ${reverse ? 'row-reverse' : ''}`} id={id}>
            <div className="col-half fade-in-up">
                {children}
            </div>
            <div className="col-half">
                <img
                    src={imgSrc}
                    alt="imagem"
                />
            </div>
        </div>
    </div>
)