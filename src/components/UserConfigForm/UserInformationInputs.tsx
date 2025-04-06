interface UserInformationsInputsProps {
    name: string
    bio: string
    updateData: (key: string, value: any) => void
}

export const UserInformationsInputs = ({ name, bio, updateData }: UserInformationsInputsProps) => {
    return (
        <>
            <p>Mais algumas informaçõezinhas sobre você...</p>
            <input placeholder="Nome" value={name} onChange={(e) => updateData("name", e.target.value.slice(0, 30))}/>
            <textarea placeholder="Bio" value={bio} onChange={(e) => updateData("bio", e.target.value.slice(0, 150))}/>
        </>
    )
}