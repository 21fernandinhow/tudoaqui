interface HandleUserUrlInputProps {
    userUrl: string
    updateUserUrl: (key: string, value: any) => void
}

export const HandleUserUrlInput = ({userUrl, updateUserUrl}: HandleUserUrlInputProps) => {

    return (
        <>
            <p>Vamos começar definindo o seu link personalizado:</p>
            <input
                type="text"
                onChange={(e) => updateUserUrl("userUrl", e.target.value)}
                value={userUrl}
                placeholder="Digite aqui..."
            />
            <p>Sua pagina será <strong>tudoaqui.click/{userUrl}</strong></p>
        </>
    )
}