import { ReactNode } from "react"

interface SessionLayoutProps {
    reverse?: boolean
    secondaryBg?: boolean
    children: ReactNode
    imgSrc: string
    imgWidth?: number
    imgHeight?: number
    id?: string
    priority?: boolean
}

export const LandingPageSession = ({
    reverse = false,
    children,
    imgSrc,
    imgWidth,
    imgHeight,
    id = "",
    secondaryBg = false,
    priority = false
}: SessionLayoutProps) => (
    <div className={`lp-session ${secondaryBg ? 'secondary-bg' : ''}`}>
        <div className={`container row ${reverse ? 'row-reverse' : ''}`} id={id}>
            <div className="col-half fade-in-up">
                {children}
            </div>
            <div className="col-half">
                <img
                    src={imgSrc}
                    alt="imagem"
                    width={imgWidth}
                    height={imgHeight}
                    fetchPriority={priority ? "high" : undefined}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                />
            </div>
        </div>
    </div>
)