interface UserUrlInputProps {
    userUrl: string
    updateUserUrl: (key: string, value: any) => void
}

export const UserUrlInput = ({ userUrl, updateUserUrl }: UserUrlInputProps) => {

    const slugify = (input: string) => {
        return input
            .normalize('NFD')                     // Remove acentos
            .replace(/[\u0300-\u036f]/g, '')      // Remove marcas de acento
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')                 // Substitui espaços por hífens
            .replace(/[^a-z0-9-]/g, '')           // Remove tudo que não é letra, número ou hífen
            .replace(/--+/g, '-')                 // Evita múltiplos hífens seguidos
            .slice(0, 40);
    }

    return (
        <>
            <h4>Sua URL</h4>
            <input
                id="url-input"
                type="text"
                onChange={(e) => updateUserUrl("userUrl", slugify(e.target.value))}
                value={userUrl}
                placeholder="Digite aqui..."
            />
            <p>Sua pagina será <strong>tudoaqui.click/{userUrl}</strong></p>
        </>
    )
}