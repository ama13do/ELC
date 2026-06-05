import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("--> 1. Petición llegó al backend");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { userMessage, systemPrompt } = req.body
}

//const apiKey = process.env.local.GROQ_API_KEY
  
  console.log("--> 2. Llave de Groq detectada:", !!apiKey);

  if (!apiKey) {
    console.error("--> 3. ERROR: No hay llave de Groq");
    return res.status(500).json({ error: 'Falta la API Key' })
  }

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'userMessage es requerido' })
  }

  // Si el frontend no mandó un systemPrompt (fallback de seguridad)
  const resolvedSystemPrompt =
    typeof systemPrompt === 'string' && systemPrompt.trim().length > 0
      ? systemPrompt
      : `Eres la mascota virtual de la Escuela de Liderazgo Climático, organizada por Hackers por nuestro futuro (HXNF).
Tu ÚNICO propósito es ayudar a las juventudes a resolver dudas sobre la convocatoria y el registro.
Usa siempre lenguaje inclusivo con terminaciones en "x" o "e".
Si preguntan algo fuera de tema, redirígelos al DM de Instagram: https://www.instagram.com/direct/t/Hackersxnf
Sé breve: máximo 2-3 oraciones por respuesta.

INFORMACIÓN OFICIAL:
- Registro: Del 1 al 26 de junio a las 23:59 horas.
- Fechas de la Escuela: Del 6 al 31 de julio de 2026.
- Requisitos: Llenar el cuestionario y subir un video (máximo 6 minutos).
- Contacto: hxnf@practica.lat | Instagram: @Hackersxnf`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: resolvedSystemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Groq API error:', errorData)
      return res.status(502).json({ error: 'Error al comunicarse con Groq' })
    }

    const data = await response.json()
    const botReply: string = data.choices?.[0]?.message?.content ?? ''

    return res.status(200).json({ reply: botReply })
  } catch (error) {
    console.error('Error con Groq:', error)
    return res.status(500).json({ error: 'Error de conexión con Groq' })
  }
}