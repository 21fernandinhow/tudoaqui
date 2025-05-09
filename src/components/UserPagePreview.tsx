interface PagePreviewProps {
    url: string;
    title: string;
}

export const UserPagePreview = ({ url, title }: PagePreviewProps) => {
    return (
        <div className="user-preview-container" onClick={() => window.open(url, '_blank')}>
            <div className="user-page-preview">
                <div className="iframe-container">
                    <iframe
                        src={url}
                        title={title}
                        sandbox="allow-same-origin allow-scripts"
                    />
                </div>
            </div>
            <h3>{title}</h3>
        </div>
    )
} 