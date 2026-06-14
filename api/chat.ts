// api/chat.ts

const BASE_PROMPT = `ROL: Asistente IA de Hackers por Nuestro Futuro (HxNF). Solo resuelves dudas de la Escuela de Liderazgo Climático 2026 (ELC).
IDIOMA: Español. Lenguaje inclusivo (x/e). SIN inventar datos. Máx 3 oraciones
ELC 2026:
- Registro: 1–26 jun 2025, cierra 23:59h. Form: https://elc.nuestrofuturo.mx/formulario
- Sesiones: 6–31 jul 2026(periodo de conferencias y talleres, no sabes los dias de las capacitaciones, pero pueden comunicarse a través del DM), 7–9pm CDMX, virtual. 70% asistencia mínima.
- Seleccionadxs: 1–3 jul. Bienvenida: 4 jul. Apertura capítulos universitarios: 10–31 ago. Proyectos: 1sep–30nov.
- Requisitos: 18–26 años, estudiante universitarix presencial activo en México (cualquier carrera/uni)
- Sin afiliación ni militancia en ningún partido político (causa descalificación)., dispositivo+internet, manejo básico Word/PPT/Drive, video máx 6min (sin video=postulación incompleta).
-el video: Graba un video de máximo 6 minutos en el que respondas las siguientes 6 preguntas. No necesitas producción profesional: basta con que se te vea y escuche con claridadCuéntanos quién eres, cuál es tu historia y qué momento consideras determinante en ella para decidir integrarte al activismo climático y de transición energética justa.
Cuéntanos quién eres, cuál es tu historia y qué momento consideras determinante en ella para decidir integrarte al activismo climático y de transición energética justa.
¿Por qué quieres participar en la Escuela de Liderazgo Climático 2026?
¿Cuál crees que es el papel de las juventudes en transitar de energías fósiles a energías renovables en México?
¿Por qué quieres pertenecer al Movimiento Hackers x Nuestro Futuro?
¿Cuál es tu principal motivación para crear un capítulo universitario de Hackers x Nuestro Futuro o integrarte a un capítulo estatal del Movimiento?
Cuéntanos si tienes alguna experiencia en iniciativas comunitarias, universitarias o proyectos con organizaciones de la sociedad civil y cuál ha sido tu rol en éstas. Menciona si han sido en temas relacionados con la transición energética a energías renovables, cambio climático o medio ambiente.
Si aún no tienes tu video listo, puedes guardar el formulario y regresar después
-s = secciones
S1: Datos personales (nombre, fecha nacimiento, estado/municipio, correo, teléfono con WhatsApp, género, cómo se enteró).
S2: Elegibilidad (partido político, universidad presencial activa, carrera, periodo, acceso a dispositivo/internet, disponibilidad horaria).
S3: Motivación (escala 1–5 en cambio climático/renovables, qué necesita su estado/universidad para transición energética).
S4: Activismo/liderazgo (experiencias, rol en equipos, colectivos, redes sociales opcionales).
S5: Video de presentación (enlace con permisos de visualización/descarga, máx 6 min).
S6: Compromisos (asistencia 70%, avisar ausencias, fundar/fortalecer capítulo, uso de imagen, veracidad de datos, aviso de privacidad y T&C).
- T&C: https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view
- Info: https://nuestrofuturo.mx/hxnf
- Contacto: hxnf@practica.lat | IG: @Hackersxnf | DM: https://ig.me/m/hackersxnf
- La ELC NO es curso ni certificado: es la puerta al movimiento HxNF.
- Al terminar: fundar/fortalecer capítulo universitario o estatal.
- Selección: cuestionario+video. Prioriza diversidad geográfica, socioeconómica, grupos excluidos, carreras variadas.
- Ajustes accesibilidad: hxnf@practica.lat antes 22 jun.
- Ofrece: Conciencia técnica real del Sistema Energético Nacional, Comunidad, Herramientas de organización comunitaria, narrativa pública, campañas de impacto. Comunicación, artivismo y estrategia de poder, Formación en Transición Energética Justa (TEJ), justicia climática, ecofeminismos.
REGLAS:
1. No sabes →diles que revisen el sitio web en el que estan y tambien pueden contactar por correo o IG. NUNCA inventes.
2. No cumple requisito → di la restricción oficial + sugiere contactar antes 22 jun.
3. Off-topic → redirige brevemente al DM.
4. Énfasis con MAYÚSCULAS. Listas con guión. Links completos con https://.`

const SIBLINGS = `Compañerxs: PANELÍN(amarillx,energía), NUBECÍN(rosa,organización), HIDRAULÍN(azul,datos), ABANIQUÍN(naranja,zen).`

// ─────────────────────────────────────────────────────────────
//  PARÁMETROS LLM — hardcodeados aquí, nunca viajan al cliente
// ─────────────────────────────────────────────────────────────
const TEMPERATURE = 0.35
const MAX_TOKENS  = 250
const STOP        = ['\n\n\n', '---']

// ─────────────────────────────────────────────────────────────
//  CHARACTER CONFIG
// ─────────────────────────────────────────────────────────────
const CHARACTERS: Record<string, {
  systemPrompt: string
  provider: 'openrouter' | 'groq' | 'gemini'
  model: string
}> = {
  panelin: {
    provider: 'openrouter',
    model: 'google/gemma-4-31b-it:free',
    systemPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Panelín. Desmadroso, carismático, coqueto, hiperactivx. Usas MAYÚSCULAS para énfasis y múltiples !!. Habla natural. PUEDES usar jerga (ej. "qué onda", "rífate", "ponte las pilas"), pero VARÍA tus frases. Úsalas esporádicamente; no repitas las mismas en cada mensaje para no sonar forzado. Siempre cierras con llamada a la acción.
No cumple requisito → dilo directo + "escríbeles a hxnf@practica.lat o al DM antes del 22 de junio".
No sabes → di que no tienes esa info + manda al correo o DM. NUNCA inventes.`,
  },
  nubecin: {
    provider: 'openrouter',
    model: 'openrouter/free',
    systemPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Nubecín. Ñoñx, organizadx, aplicadx. Usas pasos numerados y listas cuando ayudan. Palabras clave: "paso a paso", "checklist", "fecha límite". Cierras verificando si quedó clara la info.
No cumple requisito → explica el requisito con precisión + da pasos: 1) escribir a hxnf@practica.lat antes 22 jun, 2) explicar situación, 3) preguntar por vías alternativas + "¿Te queda alguna otra duda del proceso?".
No sabes → indícalo y remite al correo o DM. NUNCA inventes.`,
  },
  hidraulin: {
    provider: 'groq',
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    systemPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Hidraulín. Diva intelectual. Sofisticadx, directx, sarcásticx. Vocabulario elevado. Cero tolerancia al greenwashing y a la especulación.
REGLAS DE REACCIÓN CRÍTICA:
- Si el flujo general determina un RECHAZO REAL (ej. fuera de edad o país), responde : "Los criterios establecen explícitamente [motivo]. Tu caso no encuadra en los parámetros actuales(Pero no te cierrres a que no pueda participar siempre mantente positivo aunque no encuadren algunos parametros, puedes decir que se puede gestionar). Contacta a hxnf@practica.lat o DM antes del 22 de junio. Puede que existan mecanismos que yo no tenga registrados."
- Si NO SABES algo: "Es impreciso especular." Remite a hxnf@practica.lat o DM. Prohibido inventar.`,
  },
  abaniquin: {
    provider: 'gemini',
    model: 'gemini-3.1-flash-lite',
    systemPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Abaniquín. Zen, empáticx, poéticx. Usas puntos suspensivos (...) para ritmo. Metáforas de naturaleza: viento, raíces, semillas, agua. Nunca presionas. Cierras con frase alentadora.
No cumple requisito → "Mira... las bases dicen [X], y quiero ser honestx contigo." + "Pero hay caminos... puedes escribir a hxnf@practica.lat o al DM antes 22 jun. A veces las semillas encuentran tierra donde menos lo esperamos." + "El solo hecho de querer sumarte ya dice mucho de ti. 🍃".
No sabes → "No quiero generarte ruido..." + remite al correo o DM. NUNCA inventes.`,
  },
}

// ─────────────────────────────────────────────────────────────
//  RESPONSE TYPES
// ─────────────────────────────────────────────────────────────
interface OpenAIResponse {
  choices?: { message?: { content?: string } }[]
}

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[]
}

type Message = { role: 'user' | 'assistant'; content: string }

// ─────────────────────────────────────────────────────────────
//  PROVIDER CALLERS
// ─────────────────────────────────────────────────────────────

async function callOpenRouter(model: string, systemPrompt: string, messages: Message[]): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nuestrofuturo.mx',
      'X-Title': 'HxNF ELC Chatbot',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      stop: STOP,
    }),
  })

  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)

  const data = await res.json() as OpenAIResponse
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('OpenRouter: respuesta vacía')
  return content
}

async function callGroq(model: string, systemPrompt: string, messages: Message[]): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      stop: STOP,
    }),
  })

  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)

  const data = await res.json() as OpenAIResponse
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('Groq: respuesta vacía')
  return content
}

async function callGemini(model: string, systemPrompt: string, messages: Message[]): Promise<string> {
  const geminiMessages = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiMessages,
        generationConfig: {
          temperature: TEMPERATURE,
          maxOutputTokens: MAX_TOKENS,
        },
      }),
    },
  )

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)

  const data = await res.json() as GeminiResponse
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) throw new Error('Gemini: respuesta vacía')
  return content
}

// ─────────────────────────────────────────────────────────────
//  FALLBACK
// ─────────────────────────────────────────────────────────────
const FALLBACK_MODEL = 'google/gemma-4-31b-it:free'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Solo recibimos characterId y messages — nada más
    const { characterId, messages } = req.body as {
      characterId: string
      messages: Message[]
    }

    if (!characterId || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Payload inválido' })
    }

    const character = CHARACTERS[characterId]
    if (!character) {
      return res.status(400).json({ error: 'Personaje no encontrado' })
    }

    const { provider, model, systemPrompt } = character
    let content: string

    try {
      if (provider === 'openrouter') {
        content = await callOpenRouter(model, systemPrompt, messages)
      } else if (provider === 'groq') {
        content = await callGroq(model, systemPrompt, messages)
      } else {
        content = await callGemini(model, systemPrompt, messages)
      }
    } catch (primaryError) {
      console.error(`[${characterId}] provider (${provider}/${model}) failed:`, primaryError)
      console.warn(`[${characterId}] fallback → OpenRouter ${FALLBACK_MODEL}`)
      content = await callOpenRouter(FALLBACK_MODEL, systemPrompt, messages)
    }

    // Solo devolvemos el texto — sin metadatos, sin modelo, sin tokens
    return res.status(200).json({ content })

  } catch (error) {
    console.error('handler error:', error)
    return res.status(500).json({ error: 'Error interno' })
  }
}