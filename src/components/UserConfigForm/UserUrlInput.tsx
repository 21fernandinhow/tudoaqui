interface UserUrlInputProps {
    userUrl: string
    updateUserUrl: (key: string, value: any) => void
}

export const UserUrlInput = ({ userUrl, updateUserUrl }: UserUrlInputProps) => {

    return (
        <>
            <h4>Sua URL</h4>
            <input
                id="url-input"
                type="text"
                onChange={(e) => updateUserUrl("userUrl", e.target.value.replace(/\s+/g, '').slice(0, 40))}
                value={userUrl}
                placeholder="Digite aqui..."
            />
            <p>Sua pagina será <strong>tudoaqui.click/{userUrl}</strong></p>
        </>
    )
}