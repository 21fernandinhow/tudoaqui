interface HandleUserUrlNameProps {
    userUrl: string
    handleSave: () => void
    updateUserUrl: (key: string, value: any) => void
}

const HandleUserUrlName = ({userUrl, handleSave, updateUserUrl}: HandleUserUrlNameProps) => {

    return (
        <>
            <p>Vamos começar definindo seu url:</p>
            <input
                type="text"
                onChange={(e) => updateUserUrl("userUrl", e.target.value)}
                value={userUrl}
                placeholder="Digite aqui..."
            />
            <button className="btn" onClick={handleSave}> Salvar </button>
            <p>Sua pagina será <strong>tudoaqui.click/{userUrl}</strong></p>
        </>
    )
}

export default HandleUserUrlName
