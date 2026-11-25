import { AiPrompt } from "../src/components/UserConfigForm/GeneratePageByAI/prompt.js"

const MAX_PROMPT_LENGTH = 2000

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    })

export async function POST(request: Request): Promise<Response> {
    const apiKey = process.env.GEMINI_API_KEY
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash"

    if (!apiKey) {
        return json({ error: "GEMINI_API_KEY não configurada no servidor." }, 500)
    }

    let prompt: unknown
    try {
        prompt = (await request.json())?.prompt
    } catch {
        return json({ error: "Corpo da requisição inválido." }, 400)
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
        return json({ error: "Prompt vazio." }, 400)
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
        return json({ error: `Prompt muito longo (máx. ${MAX_PROMPT_LENGTH} caracteres).` }, 400)
    }

    const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: `${AiPrompt}\n\nPrompt do usuário: "${prompt}"` }] }],
                generationConfig: { responseMimeType: "application/json" },
            }),
        }
    )

    const data = await geminiResponse.json().catch(() => null)

    if (!geminiResponse.ok) {
        console.error("Gemini error:", geminiResponse.status, JSON.stringify(data))
        return json(
            { error: "Erro ao se comunicar com a IA.", upstreamStatus: geminiResponse.status },
            502
        )
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (typeof text !== "string") {
        console.error("Gemini sem texto na resposta:", JSON.stringify(data))
        return json({ error: "A IA não retornou conteúdo." }, 502)
    }

    return json({ text })
}
