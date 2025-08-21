import { useState } from "react"
import { Modal } from "../Modal"
import { UserLinkOption, UserLinksPageData } from "."

interface GeneratePageByAIProps {
    currentData: UserLinksPageData
    updateData: (value: UserLinksPageData) => void
    isOpen: boolean
    onClose: () => void
}

export const GeneratePageByAI = ({ currentData, updateData, isOpen, onClose }: GeneratePageByAIProps) => {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const encriptedKey = import.meta.env.VITE_OPENAI_APIKEY
    const decriptedKey = atob(encriptedKey).split("").reverse().join("");

    const model = "gpt-4o-mini"

    const removeDuplicateLinks = (links: UserLinkOption[]) => {
        const seen = new Set<string>();
        return links.filter(link => {
            if (seen.has(link.url)) {
                return false;
            }
            seen.add(link.url);
            return true;
        });
    }

    const scrollToSaveButton = () => {
        const button = document.getElementById("save-div")
        if (button) {
            button.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }

    const sanitizeJSON = (text: string) => {
        try {
            const match = text.match(/\{[\s\S]*\}/)
            return match ? JSON.parse(match[0]) : null
        } catch {
            return null
        }
    }

    const handleGenerate = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${decriptedKey}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: "system",
                            content: `
              
                                Você é responsável por gerar páginas de links  para clientes do tudoaqui.click, um site de link in bio 
                                que conta com liberdade de customização e variações de icones interativos 3d alem do design tradicional. 

                                Leia atentamente o prompt que receberá sobre como o usuario quer sua pagina de links e retorne um JSON 
                                com a estrutura adequada, essa estrutura será usada pelo nosso sistema pra montar a pagina dele. 
                                Veja abaixo o exemplo de estrutura:

                                {
                                    userUrl: "", // keep the value you receive from this field, dont change it!
                                    avatarImgUrl: "https://firebasestorage.googleapis.com/v0/b/tudoaqui-2936b.firebasestorage.app/o/users%2FBs2nV5ovXcYborimonm8Uxax9a53%2Fdefault-avatar-icon-of-social-media-user-vector.jpg?alt=media&token=9c367c77-04cf-48e4-bfd6-38ab1af39780", keep the value you receive from this field, dont change it!
                                    avatarImgName: "default-avatar.jpg", // keep the value you receive from this field, dont change it!
                                    name: "", // user name
                                    bio: "", // user bio
                                    colors: {
                                        primary: "#8c8c8c", // color of the title and buttons
                                        secondary: "#ddd", // color of the image border and other details
                                        bg: "#fff", // color of background, used on a gradient with bgSecondary
                                        bgSecondary: "#f5f5f5", // color of background, used on a gradient with bg
                                        contrast: "#000", // text color
                                        shadow: "rgba(0,0,0, 0.4)", // don change this value
                                        waves: "#8c8c8c", // color of waves animations, change only if user said that wants another color
                                    },
                                    bgImage: "", keep the value you receive from this field, dont change it!
                                    font: "", // font family, look at the font options
                                    showShareBtn: false, // premium user only, dont change this value
                                    showAIAssistant: false, keep the value you receive from this field, dont change it!
                                    hideCredits: false, keep the value you receive from this field, dont change it!, premium user only
                                    links: [], // array of links of the user, look bellow the links structure and icon options
                                    buttonOptions: {
                                        style: "default", // can be default or outlined
                                        borderRadius: "0.5" // border radius of buttons, the defaults is 0.5
                                    },
                                    iconOptions: {
                                        bgColor: "#fff", // bg color of the icon, can be light (#fff) or dark (#000), the default is light
                                        floatingMode: true // if icons are floating or not, the default is true, change only if user ask for
                                    },
                                    isPremium: false, // DONT TOUCH THIS ONE
                                    showPremiumIcon: false, // DONT TOUCH THIS ONE
                                    hasSideWaves: false // if waves animations is disabled or not, keep false if user dont ask for
                                }

                                font options:
                                const fontOptions = [
                                        { value: "Teko", label: "Teko" },
                                        { value: "Montserrat", label: "Montserrat" },
                                        { value: "sans-serif", label: "Sans Serif" },
                                        { value: "monospace", label: "Monospace" },
                                        { value: "Times New Roman", label: "Times New Roman" },
                                        { value: "Verdana", label: "Verdana" },
                                        { value: "Comic Sans MS, Comic Sans, Comic Relief", label: "Comic Sans MS" },
                                        { value: "cursive ", label: "Caligrafia" },
                                    ]


                                links structure:
                                export interface UserLinkOption {
                                    icon?: string, // is undefined if the link is not an 3d animated icon
                                    label: string
                                    url: string
                                    type: "icon" | "button"
                                }

                                icon options:
                                const iconOptions = [
                                        { label: "Outro...", value: "logos/default.webp" },
                                        { label: "Whatsapp", value: "logos/whatsapp.webp" },
                                        { label: "Facebook", value: "logos/facebook.webp" },
                                        { label: "Instagram", value: "logos/instagram_logo.webp" },
                                        { label: "Pinterest", value: "logos/pinterest.webp" },
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

                                    Essa é a configuração atual do usuário:     
                                    ${currentData}

                                    Altere-a de acordo com o que ele pedir em seu prompt.
                                    A chave de uma boa personalização visual está não só nas cores de destaque (primaryColor e 
                                    secondaryColor) mas também nas cores de fundo (bg e bgSecondary).
                                    ***Lembre-se de RETORNAR SOMENTE O JSON VÁLIDO***
                                `
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.5,
                    max_tokens: 4000,
                }),
            })

            const data = await response.json()
            const rawContent = data.choices[0].message.content

            const parsed: UserLinksPageData | null = sanitizeJSON(rawContent)
            if (parsed) {
                updateData({
                    ...parsed,
                    name: currentData.name,
                    bio: currentData.bio,
                    avatarImgName: currentData.avatarImgName,
                    avatarImgUrl: currentData.avatarImgUrl,
                    isPremium: currentData.isPremium,
                    userUrl: currentData.userUrl,
                    links: removeDuplicateLinks([...parsed.links, ...currentData.links])
                })
                setSuccess(true)
            } else {
                console.error("Falha ao parsear JSON:", rawContent)
                setError("A IA não retornou uma configuração válida. Tente novamente mais tarde.")
            }

        } catch (err) {
            console.error("Erro ao gerar com IA:", err)
            setError("Erro ao se comunicar com a IA.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFinish = () => {
        scrollToSaveButton()
        setSuccess(false)
        setPrompt("")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div id="generate-page-by-ai">
                {!success ? (
                    <>
                        <h4>Novidade!</h4>
                        <h2>🚀 Configure sua página com IA</h2>
                        <p>Descreva como gostaria que sua página fosse.</p>
                        <p>Lembre-se de fornecer os links e especificar o tipo, quanto mais detalhado melhor.</p>

                        <textarea
                            rows={6}
                            placeholder="Exemplo: Quero fundo preto, cor de destaque verde e links de icone para WhatsApp (o link é x) e Instagram (link y)"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            disabled={isLoading}
                        />

                        {!isLoading && <p className="error-text">{error}</p>}

                        <button
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                        >
                            {isLoading ? "✨ Gerando..." : "GERAR MEU TUDOAQUI"}
                        </button>

                        <button className="btn" onClick={onClose}>Configurar manualmente</button>

                    </>
                ) : (
                    <>
                        <h2>✅ Página criada com sucesso!</h2>
                        <p>
                            Agora basta clicar em "salvar" para publica-la ou editar os detalhes que você preferir {"=)"}
                        </p>

                        <div className="modal-actions">
                            <button className="btn" onClick={handleFinish}>
                                Continuar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}