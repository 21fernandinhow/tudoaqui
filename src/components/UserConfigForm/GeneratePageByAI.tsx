import { useState } from "react"
import { Modal } from "../Modal"
import { UserLinkOption, UserLinksPageData } from "."
import { z } from "zod"
import { linkIconOptions } from "./UserLinkOptionConfigBox"
import { fontOptions } from "./SetAppearenceData"

interface GeneratePageByAIProps {
    currentData: UserLinksPageData
    updateData: (value: UserLinksPageData) => void
    isOpen: boolean
    onClose: () => void
}

const visualDataSchema = z.object({
    colors: z.object({
        primary: z.string(),
        secondary: z.string(),
        bg: z.string(),
        bgSecondary: z.string(),
        contrast: z.string(),
        shadow: z.string(),
        waves: z.string(),
    }),
    font: z.string(),
    buttonOptions: z.object({
        style: z.enum(["default", "outline"]),
        borderRadius: z.enum(["0", "0.5", "1", "1.5"])
    }),
    iconOptions: z.object({
        bgColor: z.enum(["#fff", "#ffffff", "#000", "#000000"]),
        floatingMode: z.boolean(),
        iconsColor: z.string().optional()
    }).passthrough(),
    links: z.array(
        z.object({
            icon: z.string().optional(),
            label: z.string(),
            url: z.string(),
            type: z.enum(["icon", "button"]),
        })
    )
})

export const GeneratePageByAI = ({ currentData, updateData, isOpen, onClose }: GeneratePageByAIProps) => {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const encriptedKey = import.meta.env.VITE_OPENAI_APIKEY
    const decriptedKey = atob(encriptedKey).split("").reverse().join("")
    const model = "gpt-4o-mini"

    const removeDuplicateLinks = (links: UserLinkOption[]) => {
        const seen = new Set<string>()
        return links.filter(link => {
            if (seen.has(link.url)) return false
            seen.add(link.url)
            return true
        })
    }

    const normalizeIcon = (icon?: string) => {
        const validIcons = linkIconOptions.map(opt => opt.value)
        if (!icon || !validIcons.includes(icon)) return "logos/default.webp"
        return icon
    }

    const normalizeBgColor = (color: string): "#fff" | "#ffffff" | "#000" | "#000000" => {
        const c = color.toLowerCase()
        if (c === "#000" || c === "#000000") return "#000"
        if (c === "#fff" || c === "#ffffff") return "#fff"
        return "#000"
    }

    const scrollToSaveButton = () => {
        const button = document.getElementById("save-div")
        if (button) button.scrollIntoView({ behavior: "smooth", block: "center" })
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
                    Authorization: `Bearer ${decriptedKey}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: "system",
                            content: `
                                Você é responsável por gerar APENAS os dados visuais e links para uma página de links do tudoaqui.click.

                                **Formato exato que o JSON deve ter**:
                                {
                                "colors": {
                                    "primary": "#hex",
                                    "secondary": "#hex",
                                    "bg": "#hex",
                                    "bgSecondary": "#hex",
                                    "contrast": "#hex",
                                    "shadow": "rgba(...)",
                                    "waves": "#hex"
                                },
                                "font": "string",
                                "buttonOptions": {
                                    "style": "default" | "outline",
                                    "borderRadius": "0" | "0.5" | "1" | "1.5"
                                },
                                "iconOptions": {
                                    "bgColor": "#fff" | "#ffffff" | "#000" | "#000000",
                                    "floatingMode": boolean,
                                    "iconsColor": "#hex"
                                },
                                "links": [
                                    {
                                    "type": "icon" | "button",
                                    "label": "string",
                                    "url": "string",
                                    "icon": "logos/default.webp" | "logos/whatsapp.webp" | "logos/facebook.webp" | "logos/instagram_logo.webp" | ...
                                    }
                                ]
                                }

                                **Regras:**
                                - Retorne apenas JSON válido, sem comentários ou texto adicional.
                                - Use apenas os ícones disponíveis: ${linkIconOptions.map(i => i.value).join(", ")}
                                - Use apenas as fontes válidas: ${fontOptions.map(f => `[${f.value}]`).join(", ")}.
                                - As cores de fundo (bg e bgSecondary) são cruciais.
                                - Para campos não mencionados, use valores default neutros.
                             `
                        },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.3,
                    max_tokens: 1500,
                }),
            })

            const data = await response.json()
            const rawContent = data.choices?.[0]?.message?.content
            const parsed = sanitizeJSON(rawContent)

            if (!parsed) {
                setError("A IA não retornou um JSON válido. Tente novamente.")
                return
            }

            if (parsed.iconOptions) {
                parsed.iconOptions = {
                    ...parsed.iconOptions,
                    bgColor: normalizeBgColor(parsed.iconOptions.bgColor)
                }
            }

            let validated
            try {
                validated = visualDataSchema.parse(parsed)
            } catch (err) {
                console.error("Erro de validação Zod:", err)
                setError("A configuração retornada pela IA é inválida. Tente detalhar melhor seu prompt.")
                return
            }

            const merged: UserLinksPageData = {
                ...currentData,
                colors: validated.colors,
                font: validated.font,
                buttonOptions: validated.buttonOptions,
                iconOptions: {
                    ...currentData.iconOptions,
                    ...validated.iconOptions
                },
                links: removeDuplicateLinks(validated.links.map(link => ({
                    ...link,
                    icon: normalizeIcon(link.icon)
                })))
            }

            updateData(merged)
            setSuccess(true)
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
                        <textarea
                            rows={6}
                            placeholder="Exemplo: Quero fundo preto, cor de destaque verde e links de ícone para WhatsApp (meu número é X) e mais um link pra e-book (link é tal)"
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
                            {"✨ " + (isLoading ? "Gerando..." : "Gerar Página")}
                        </button>

                        <button className="btn" onClick={onClose}>Configurar manualmente</button>
                    </>
                ) : (
                    <>
                        <h2>✅ Página criada com sucesso!</h2>
                        <p>Basta clicar em "salvar" para publicar ou editar os detalhes que quiser {"=)"}</p>
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