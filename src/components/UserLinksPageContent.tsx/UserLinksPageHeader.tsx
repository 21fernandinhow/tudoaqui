import { RiVipCrownLine } from "react-icons/ri"
import { Tooltip } from "../Tooltip"

interface UserLinksPageHeaderProps {
    imageUrl?: string
    name: string
    bio: string
    showPremiumIcon?: boolean
}

export const UserLinksPageHeader = ({ imageUrl, name, bio, showPremiumIcon }: UserLinksPageHeaderProps) => {
    return (
        <div className="user-links-page-header">
            {imageUrl && <img src={imageUrl} alt="avatar" className='avatar' />}
            <div className="title-div">
                <h1>{name}</h1>
                {showPremiumIcon && <Tooltip text={"Premium User"} position="right"><RiVipCrownLine className="premium-icon" /></Tooltip>}
            </div>
            <p>{bio}</p>
        </div>
    )
}