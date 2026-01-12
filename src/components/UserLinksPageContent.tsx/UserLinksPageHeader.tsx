interface UserLinksPageHeaderProps {
    imageUrl?: string
    name: string
    bio: string
}

export const UserLinksPageHeader = ({ imageUrl, name, bio }: UserLinksPageHeaderProps) => {
    return (
        <div className="user-links-page-header">
            {imageUrl && <img src={imageUrl} alt="avatar" className='avatar' />}
            <div className="title-div">
                <h1>{name}</h1>
            </div>
            <p>{bio}</p>
        </div>
    )
}