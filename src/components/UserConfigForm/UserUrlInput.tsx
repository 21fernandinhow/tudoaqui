import { slugify } from "../../utils/slugify"

interface UserUrlInputProps {
    userUrl: string
    updateUserUrl: (key: string, value: any) => void
}

export const UserUrlInput = ({ userUrl, updateUserUrl }: UserUrlInputProps) => {

    return (
        <>
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