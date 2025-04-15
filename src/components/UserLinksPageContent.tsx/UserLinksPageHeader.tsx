interface UserLinksPageHeaderProps {
    imageUrl?: string
    name: string
    bio: string
}

export const UserLinksPageHeader = ({ imageUrl, name, bio }: UserLinksPageHeaderProps) => {
    return (
        <div className="user-links-page-header">
            {imageUrl && <img src={imageUrl} alt="avatar" className='avatar' />}
            <h1>{name}</h1>
            <p>{bio}</p>
        </div>
    )
}