interface UserUrlInputProps {
    userUrl: string
    updateUserUrl: (key: string, value: any) => void
}

export const UserUrlInput = ({userUrl, updateUserUrl}: UserUrlInputProps) => {

    return (
        <>
            <p>Vamos começar definindo o seu link personalizado:</p>
            <input
                type="text"
                onChange={(e) => updateUserUrl("userUrl", e.target.value.replace(/\s+/g, '').slice(0, 40))}
                value={userUrl}
                placeholder="Digite aqui..."
            />
            <p>Sua pagina será <strong>tudoaqui.click/{userUrl}</strong></p>
        </>
    )
}