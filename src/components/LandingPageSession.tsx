import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { ReactNode } from "react"

interface SessionLayoutProps {
    reverse?: boolean
    secondaryBg?: boolean
    children: ReactNode
    imgSrc: StaticImport | string
    id?: string
}

export const LandingPageSession = ({ reverse = false, children, imgSrc, id = "", secondaryBg = false }: SessionLayoutProps) => (
    <div className={`lp-session ${secondaryBg ? 'secondary-bg' : ''}`}>
        <div className={`container row ${reverse ? 'row-reverse' : ''}`} id={id}>
            <div className="col-half">
                <Image
                    src={imgSrc}
                    alt="imagem"
                    width={280}
                    height={280}
                    layout="responsive"
                />
            </div>
            <div className="col-half fade-in-up">
                {children}
            </div>
        </div>
    </div>
)
