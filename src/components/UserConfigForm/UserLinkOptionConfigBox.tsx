import { MdDeleteSweep } from "react-icons/md"
import { UserLinkOption } from "."
import { SelectInput } from "../SelectInput"
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6"
import { Modal } from "../Modal"
import { useState } from "react"

interface UserLinkOptionConfigBoxProps {
    linkOptionData: UserLinkOption
    index: number
    updateLinkOptionData: (index: number, key: keyof UserLinkOption, value: string) => void
    deleteLinkOption: (index: number) => void
    moveLinkBackward: (index: number) => void
    moveLinkForward: (index: number) => void
    showMoveLinkForward: boolean
    showMoveLinkBackward: boolean
}

export const UserLinkOptionConfigBox = ({
    index,
    linkOptionData,
    updateLinkOptionData,
    deleteLinkOption,
    moveLinkBackward,
    moveLinkForward,
    showMoveLinkForward,
    showMoveLinkBackward
}: UserLinkOptionConfigBoxProps) => {

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const iconOptions = [
        { label: "Outro...", value: "logos/default.webp" },
        { label: "Whatsapp", value: "logos/whatsapp.webp" },
        { label: "Facebook", value: "logos/facebook.webp" },
        { label: "Instagram", value: "logos/instagram_logo.webp" },
        { label: "Vsco", value: "logos/vsco.webp" },
        { label: "X", value: "logos/x.webp" },
        { label: "Tiktok", value: "logos/tiktok.webp" },
        { label: "Youtube", value: "logos/youtube_logo.webp" },
        { label: "Twitch", value: "logos/twitch_logo.webp" },
        { label: "Discord", value: "logos/discord_logo.webp" },
        { label: "Spotify", value: "logos/spotify.webp" },
        { label: "Soundcloud", value: "logos/soundcloud.webp" },
        { label: "Deezer", value: "logos/deezer.webp" },
        { label: "iFood", value: "logos/ifood.webp" },
        { label: "LinkedIn", value: "logos/linkedin.webp" },
        { label: "Github", value: "logos/github.webp" },
        { label: "Hotmart", value: "logos/hotmart.webp" },
        { label: "Pix", value: "logos/pix.webp" },
        { label: "Telegram", value: "logos/telegram.webp" },
        { label: "Onlyfans", value: "logos/onlyfans.webp" },
        { label: "Privacy", value: "logos/privacy.webp" },
        { label: "Amazon", value: "logos/amazon_logo.webp" },
        { label: "E-mail", value: "logos/email_logo.webp" },
        { label: "Localização", value: "logos/location.webp" },
        { label: "Ligação", value: "logos/call.webp" },
    ]

    return (
        <>
            <div className="user-link-option-config-wrapper">

                <div className="change-order-arrows">
                    {showMoveLinkForward && <FaArrowUpLong onClick={() => moveLinkForward(index)} />}
                    {showMoveLinkBackward && <FaArrowDownLong onClick={() => moveLinkBackward(index)} />}
                </div>

                <div className="user-link-option-config-box">

                    <SelectInput
                        name={`select-link-type-${index}`}
                        label="Tipo de Link:"
                        options={[{ label: "Ícone", value: "icon" }, { label: "Botão", value: "button" }]}
                        value={linkOptionData.type}
                        onChange={(e) => updateLinkOptionData(index, "type", e.target.value)}
                    />

                    {linkOptionData.type === "icon" &&
                        <SelectInput
                            name={`select-link-icon-${index}`}
                            label="Icone"
                            options={iconOptions}
                            value={linkOptionData.icon ?? ""}
                            onChange={(e) => updateLinkOptionData(index, "icon", e.target.value)}
                        />
                    }

                    <input
                        placeholder={linkOptionData.type === "button" ? "Texto" : "Texto (opcional)"}
                        value={linkOptionData.label.slice(0, 20)}
                        onChange={(e) => updateLinkOptionData(index, "label", e.target.value)}
                    />

                    <input
                        placeholder={"Link"}
                        value={linkOptionData.url.slice(0, 512)}
                        onChange={(e) => updateLinkOptionData(index, "url", e.target.value.slice(0, 512))}
                        onBlur={() => {
                            const cleanUrl = linkOptionData.url.replace(/^(https?:\/\/)+/i, "");
                            const sanitizedUrl = `https://${cleanUrl}`;
                            if (linkOptionData.url !== sanitizedUrl) {
                                updateLinkOptionData(index, "url", sanitizedUrl);
                            }
                        }}
                    />

                    <span className="delete-box-btn" onClick={() => setDeleteModalIsOpen(true)}> <MdDeleteSweep /> Deletar Link </span>
                </div>

            </div>

            <Modal isOpen={deleteModalIsOpen} onClose={() => setDeleteModalIsOpen(false)}>
                <p>Tem certeza que deseja deletar esse link?</p>
                <div className="modal-actions">
                    <button className="btn" onClick={() => setDeleteModalIsOpen(false)}>Cancelar</button>
                    <button
                        className="btn btn-error"
                        onClick={() => {
                            setDeleteModalIsOpen(false)
                            deleteLinkOption(index)
                        }}
                    >
                        Deletar
                    </button>
                </div>
            </Modal>
        </>
    )
}