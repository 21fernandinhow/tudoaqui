import { UserLinkOption } from "."
import { UserLinkOptionConfigBox } from "./UserLinkOptionConfigBox"

interface MannageUserLinksProps {
    links: UserLinkOption[]
    updateLinksArray: (value: UserLinkOption[]) => void
}

export const MannageUserLinks = ({ links, updateLinksArray }: MannageUserLinksProps) => {

    const handleAddLink = () => {
        const newDefaultLink: UserLinkOption = {
            url: "",
            label: "",
            icon: "urlDeIconePadrao",
            type: "icon"
        }
        updateLinksArray(links?.length > 0 ? [newDefaultLink, ...links] : [newDefaultLink])
    }

    const handleEditLink = (index: number, key: keyof UserLinkOption, value: string) => {
        const newEditedLinkOption = { ...links[index], [key]: value };
        const newEditedLinksArray = [...links];
        newEditedLinksArray[index] = newEditedLinkOption;
        updateLinksArray(newEditedLinksArray);
    }

    const handleDeleteLink = (indexToDelete: number) => {
        const newLinks = links.filter((_, index) => index !== indexToDelete);
        updateLinksArray(newLinks);
    };

    const moveLinkForward = (index: number) => {
        if (index > 0) {
            const newLinks = [...links];
            [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
            updateLinksArray(newLinks);
        }
    };

    const moveLinkBackward = (index: number) => {
        if (index < links.length - 1) {
            const newLinks = [...links];
            [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
            updateLinksArray(newLinks);
        }
    };

    return (
        <>
            <p>Chegou a hora de definir seus links! </p> 
            <p>Você pode adicionar links como <strong>Icones 3D animados</strong> ou <strong>botões</strong>, conforme preferir:</p>
            <button className="btn" onClick={handleAddLink}>Adicionar novo link</button>

            {links && links.map((item, index) =>
                <UserLinkOptionConfigBox
                    index={index}
                    key={index}
                    linkOptionData={item}
                    updateLinkOptionData={handleEditLink}
                    deleteLinkOption={handleDeleteLink}
                    moveLinkForward={moveLinkForward}
                    moveLinkBackward={moveLinkBackward}
                    showMoveLinkForward={index > 0}
                    showMoveLinkBackward={index < links.length - 1}
                />
            )}
        </>
    )
}