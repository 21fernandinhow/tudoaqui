import "../../styles/pages/userLinksPage/index.scss"
import { useEffect } from "react";
import { UserLinksPageHeader } from "./UserLinksPageHeader";
import { IconsGrid } from "./IconsGrid";
import { ButtonsGrid } from "./ButtonsGrid";
import { PoweredBy } from "./PoweredBy";
import { UserLinksPageOptionsMenu } from "./UserLinksPageOptionsMenu";
import { UserLinksPageData, VisitLocationData } from "../../pages/UserLinksPage";

interface UserLinksPageContentProps {
    data: UserLinksPageData
    isPreview?: boolean
    uid: string
    visitLocation?: VisitLocationData
}

export const UserLinksPageContent = ({ data, isPreview, uid, visitLocation }: UserLinksPageContentProps) => {
    const root = document.documentElement;

    const applyThemeVariables = () => {
        root.style.setProperty("--user-font", data.font);
        root.style.setProperty("--user-primary-color", data.colors.primary);
        root.style.setProperty("--user-secondary-color", data.colors.secondary);
        root.style.setProperty("--user-bg-color", data.colors.bg);
        root.style.setProperty("--user-bg-secondary-color", data.colors.bgSecondary);
        root.style.setProperty("--user-contrast-color", data.colors.contrast);
        root.style.setProperty("--user-shadow-color", data.colors.shadow);
        root.style.setProperty("--user-button-border-radius", data.buttonOptions.borderRadius + "rem");
        root.style.setProperty("--user-icons-background-color", data.iconOptions.bgColor);
        root.style.setProperty("--user-wave-color", data.colors.waves);
        root.style.setProperty("--select-color", data.colors.bg);
        root.style.setProperty("--select-background", data.colors.primary);

        if (!isPreview) {
            root.style.setProperty("--scrollbar-color", data.colors.primary);
            root.style.setProperty("--scrollbar-background", data.colors.bgSecondary);
        }
    }

    useEffect(() => {
        applyThemeVariables()
        return () => {
            root.style.setProperty("--select-color", "#fff");
            root.style.setProperty("--select-background", "#e63946");
            root.style.setProperty("--scrollbar-color", "#ef529c");
            root.style.setProperty("--scrollbar-background", "#f5f5f5");
        }
    }, [data])

    return (
        <div id="user-links-page-content">

            {data.hasSideWaves &&
                <div className="user-links-page-wave">
                    <div className="wave wave-1"></div>
                    <div className="wave wave-2"></div>
                </div>
            }

            <div className="user-links-page-container">

                {!isPreview && <UserLinksPageOptionsMenu uid={uid} />}

                <UserLinksPageHeader
                    imageUrl={data.avatarImgUrl}
                    name={data.name ? data.name : isPreview ? "Aqui aparecerá seu nome" : ""}
                    bio={data.bio ? data.bio : isPreview ? "Aqui aparecerá sua bio" : ""}
                    showPremiumIcon={data.isPremium && data.showPremiumIcon}
                />

                <IconsGrid
                    icons={data.links.filter(item => item.type === "icon" && item.icon && item.url)}
                    activateFloating={data.iconOptions.floatingMode}
                    isPreview={isPreview}
                    uid={uid}
                    visitLocation={visitLocation}
                />

                <ButtonsGrid
                    buttons={data.links.filter(item => item.type === "button" && item.label && item.url)}
                    buttonStyle={data.buttonOptions.style}
                />

                {!data.hideCredits && <PoweredBy />}

            </div>

        </div>
    )
}