import { UserLinksPageData } from "../UserConfigForm"
import "../../styles/pages/userLinksPage/index.scss"
import { useEffect } from "react";
import { UserLinksPageHeader } from "./UserLinksPageHeader";
import { IconsGrid } from "./IconsGrid";
import { ButtonsGrid } from "./ButtonsGrid";
import { PoweredBy } from "./PoweredBy";

interface UserLinksPageContentProps {
    data: UserLinksPageData
}

export const UserLinksPageContent = ({ data }: UserLinksPageContentProps) => {

    const applyThemeVariables = () => {
        const root = document.documentElement;
        root.style.setProperty("--user-font", data.font);
        root.style.setProperty("--user-primary-color", data.colors.primary);
        root.style.setProperty("--user-secondary-color", data.colors.secondary);
        root.style.setProperty("--user-bg-color", data.colors.bg);
        root.style.setProperty("--user-bg-secondary-color", data.colors.bgSecondary);
        root.style.setProperty("--user-contrast-color", data.colors.contrast);
        root.style.setProperty("--user-shadow-color", data.colors.shadow);
        root.style.setProperty("--user-button-border-radius", data.buttonOptions.borderRadius + "rem");
        root.style.setProperty("--user-icons-background-color", data.iconsColor);
    }

    useEffect(() => {
        applyThemeVariables()
    }, [data])

    return (
        <div id="user-links-page-content">

            <div className="user-links-page-container">

                <UserLinksPageHeader imageUrl={data.avatarImgUrl} name={data.name} bio={data.bio} />

                <IconsGrid icons={data.links.filter(item => item.type === "icon" && item.icon && item.url)} />

                <ButtonsGrid
                    buttons={data.links.filter(item => item.type === "button" && item.label && item.url)}
                    buttonStyle={data.buttonOptions.style}
                />

                {!data.hideCredits && <PoweredBy />}

            </div>

        </div>
    )
}