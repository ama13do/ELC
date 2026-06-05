import { characters } from './characters'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  response: string
}

export async function sendChatMessage(
  message: string,
  characterId: string,
  _conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  const character = characters[characterId as keyof typeof characters]

  if (!character) {
    return { response: 'Personaje no encontrado.' }
  }

  // Vite lee la variable con import.meta.env
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    console.error("No se encontró VITE_GROQ_API_KEY");
    return { response: 'Error interno: Falta la llave de conexión.' }
  }

  const resolvedSystemPrompt = `Eres la mascota virtual de la Escuela de Liderazgo Climático, organizada por Hackers por nuestro futuro (HXNF).
Tu ÚNICO propósito es ayudar a las juventudes a resolver dudas sobre la convocatoria y el registro.
Si preguntan algo fuera de tema, redirígelos al DM de Instagram: https://www.instagram.com/direct/t/Hackersxnf
Sé breve: máximo 2-3 oraciones por respuesta.
INFORMACIÓN OFICIAL:
- Registro: Del 1 al 26 de junio a las 23:59 horas.
- Fechas de la Escuela: Del 6 al 31 de julio de 2026.
- Requisitos: Llenar el cuestionario y subir un video (máximo 6 minutos).`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: resolvedSystemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.3,
        max_tokens: 150,
      }),
    })

    if (!res.ok) {
      throw new Error(`Groq falló con estado HTTP ${res.status}`)
    }

    const data = await res.json()
    return {
      response: data.choices?.[0]?.message?.content ?? 'Lo siento, no pude procesar tu mensaje. Intenta nuevamente.',
    }
  } catch (error) {
    console.error('Error en sendChatMessage:', error)
    return {
      response: 'Ocurrió un error de conexión. Puedes escribirnos directamente a nuestro Instagram: https://www.instagram.com/direct/t/Hackersxnf',
    }
  }
}