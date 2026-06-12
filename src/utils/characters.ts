//esto es character
import panelinImg   from '../assets/pets/Panelin.webp'
import nubecinImg   from '../assets/pets/Nubecin.webp'
import hidraulinImg from '../assets/pets/Hidraulin.webp'
import abaniquinImg from '../assets/pets/Abaniquin.webp'

export interface Character {
  id: 'panelin' | 'hidraulin' | 'abaniquin' | 'nubecin'
  name: string
  shortName: string
  tagline: string
  description: string
  src: string
  color: string
  bubbleColor: string
  bubbleBorderColor: string
  greeting: string
  /**
   * Prompt COMPLETO enviado al LLM (base + personalidad).
   * Solo se usa cuando el mensaje no puede resolverse localmente.
   */
  fullPrompt: string
  /**
   * Texto del CTA que aparece al final de cada respuesta del bot
   * generada por IA (sin consumir tokens extra).
   */
  ctaBanner: string
  /**
   * Mensaje de despedida cuando se agotan los 10 mensajes IA.
   */
  farewellMessage: string
}

// ─────────────────────────────────────────────────────────────
//  BASE_PROMPT — enviado 1 SOLA VEZ como system message
//  Contiene la info oficial compacta. Nada de adornos.
// ─────────────────────────────────────────────────────────────
const BASE_PROMPT = `ROL: Asistente IA de Hackers por Nuestro Futuro (HxNF). Solo resuelves dudas de la Escuela de Liderazgo Climático 2026 (ELC).
IDIOMA: Español. Lenguaje inclusivo (x/e). SIN markdown. SIN inventar datos. Máx 3 oraciones.

ELC 2026:
- Registro: 1–26 jun 2025, cierra 23:59h. Form: https://es.surveymonkey.com/r/hxnf2026
- Sesiones: 6–31 jul 2026, 7–9pm CDMX, virtual. 70% asistencia mínima.
- Seleccionadxs: 1–3 jul. Bienvenida: 4 jul. Capítulos: 10–31 ago. Proyectos: 1sep–30nov.
- Requisitos: 18–26 años, estudiante universitarix presencial activo en México (cualquier carrera/uni), sin partido político (descalifica), dispositivo+internet, manejo básico Word/PPT/Drive, video máx 6min (sin video=postulación incompleta).
- Formulario S1:datos personales S2:elegibilidad S3:motivación S4:activismo S5:video S6:compromisos.
- T&C: https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view
- Info: https://nuestrofuturo.mx/hxnf
- Contacto: hxnf@practica.lat | IG: @Hackersxnf | DM: https://ig.me/m/hackersxnf
- La ELC NO es curso ni certificado: es la puerta al movimiento HxNF.
- Al terminar: fundar/fortalecer capítulo universitario o estatal.
- Selección: cuestionario+video. Prioriza diversidad geográfica, socioeconómica, grupos excluidos, carreras variadas.
- Ajustes accesibilidad: hxnf@practica.lat antes 22 jun.

REGLAS:
1. No sabes → manda al correo o IG. NUNCA inventes.
2. No cumple requisito → di la restricción oficial + sugiere contactar antes 22 jun.
3. Off-topic → redirige brevemente al DM.
4. Énfasis con MAYÚSCULAS. Listas con guión. Links completos con https://.`

// ─────────────────────────────────────────────────────────────
//  SIBLINGS — bloque compacto de compañerxs (se añade 1 vez)
// ─────────────────────────────────────────────────────────────
const SIBLINGS = `Compañerxs: PANELÍN(amarillx,energía), NUBECÍN(rosa,organización), HIDRAULÍN(azul,datos), ABANIQUÍN(naranja,zen).`

// ─────────────────────────────────────────────────────────────
//  QUICK REPLIES — respuestas estáticas para preguntas comunes.
//  El chatService las intercepta ANTES de llamar al LLM.
//  Formato: { patterns: string[], response: string }
//  patterns: substrings en minúsculas que activan la respuesta.
// ─────────────────────────────────────────────────────────────
export interface QuickReply {
  patterns: string[]
  response: string
}

export const QUICK_REPLIES: QuickReply[] = [
  {
    patterns: ['link registro', 'link del registro', 'enlace registro', 'formulario registro',
      'donde me registro', 'dónde me registro', 'como me registro', 'cómo me registro',
      'link del form', 'link form', 'url registro', 'donde registro', 'dónde registro',
      'link de registro', 'enlace de registro', 'surveymonkey', 'form de registro',
      'link para registrarme', 'donde me inscribo', 'como me inscribo', 'link inscripcion',
      'link de inscripcion', 'link inscripción', 'link de inscripción'],
    response: 'Llenando el formulario de registro está aquí: https://es.surveymonkey.com/r/hxnf2026\nRecuerda que cierra el 26 de junio a las 23:59h y debes incluir tu video de máx 6 min.',
  },
  {
    patterns: ['cuándo cierra', 'cuando cierra', 'fecha limite', 'fecha límite',
      'hasta cuando', 'hasta cuándo', 'último día', 'ultimo dia', 'plazo registro',
      'fecha de cierre', 'cuándo vence', 'cuando vence', 'cuándo termina convocatoria',
      'cuando termina convocatoria', 'fecha cierre'],
    response: 'El registro cierra el 26 de junio de 2025 a las 23:59h (hora Ciudad de México). No lo dejes para el último momento.',
  },
  {
    patterns: ['cuándo empieza', 'cuando empieza', 'cuándo son las sesiones', 'cuando son las sesiones',
      'fechas elc', 'fechas de la elc', 'cuándo es la escuela', 'cuando es la escuela',
      'fechas sesiones', 'cuándo inicia', 'cuando inicia', 'inicio elc'],
    response: 'Las sesiones de la ELC son del 6 al 31 de julio de 2026, de 7:00 a 9:00 pm hora CDMX, en modalidad virtual.',
  },
  {
    patterns: [ 'contacto', 'correo de contacto', 'mail'],
    response: 'Puedes escribirnos a hxnf@practica.lat o por Instagram: https://ig.me/m/hackersxnf',
  },
  {
    patterns: ['cuántos años', 'cuantos años', 'edad mínima', 'edad minima',
      'edad máxima', 'edad maxima', 'qué edad', 'que edad', 'requisito de edad',
      'límite de edad', 'limite de edad'],
    response: 'Debes tener entre 18 y 26 años cumplidos al momento de enviar tu registro.',
  },
  {
    patterns: ['necesito ser universitari', 'debo ser universitari', 'soy universitari',
      'tengo que ser universitari', 'estudiante universitari', 'requiero ser universitari',
      'si no soy universitari', 'no soy universitari'],
    response: 'Es requisito ser estudiante universitarix ACTIVO en modalidad presencial en México (pública o privada, cualquier carrera). Si no lo eres, escríbenos al correo hxnf@practica.lat antes del 22 de junio para explorar opciones.',
  },
  {
    patterns: ['términos y condiciones', 'terminos y condiciones', 'tyc', 't&c', 'términos',
      'terminos', 'condiciones de participación', 'condiciones de participacion'],
    response: 'Los Términos y Condiciones están aquí: https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view\nRevísalos antes de enviar tu registro.',
  },
  {
    patterns: ['aviso de privacidad', 'privacidad', 'política de privacidad', 'politica de privacidad', 'más info', 'mas info', 'página oficial', 'pagina oficial'],
    response: 'Más información y aviso de privacidad en: https://nuestrofuturo.mx/hxnf',
  },
  {
    patterns: ['instagram', 'redes sociales', 'redes', 'ig de hxnf', 'ig oficial', 'cuenta de instagram'],
    response: 'Nos encuentras en Instagram como @Hackersxnf o escríbenos directo aquí: https://ig.me/m/hackersxnf',
  },
  {
    patterns: ['qué es hxnf', 'que es hxnf', 'qué es hackers', 'que es hackers',
      'qué es la elc', 'que es la elc', 'qué es la escuela', 'que es la escuela'],
    response: 'La ELC es la Escuela de Liderazgo Climático del movimiento HxNF. No es un curso ni un certificado: es la puerta de entrada para formar juventudes que impulsen la transición energética justa en México fundando capítulos universitarios y estatales.',
  },
  {
    patterns: ['video de presentación', 'video de presentacion', 'cuánto dura el video',
      'cuanto dura el video', 'duración video', 'duracion video',
      'cómo subo el video', 'como subo el video', 'subir video'],
    response: 'Debes grabar un video de máx **6 minutos** y pegar el enlace (con permisos de visualización) en la sección 5 del formulario. Sin video tu postulación queda incompleta.',
  },
]

// ─────────────────────────────────────────────────────────────
//  SMALLTALK — detecta mensajes que no valen tokens
// ─────────────────────────────────────────────────────────────
export const SMALLTALK_PATTERNS = [
  /^(hola+|hello|hi+|hey+|buenas?|buenos?\s*(días?|tardes?|noches?)|buen\s*día|qué\s*onda|que\s*onda|qué\s*tal|que\s*tal|saludos?|ey+|epa|épale)[\s!¡?.]*$/i,
  /^(gracias?|thanks?|thank\s*you|muchas\s*gracias|muy\s*amable|de\s*nada|ok+|okey|okay|vale|perfect[ao]?|entendid[ao]|comprendid[ao]|claro|sí+|si+|no+|nop|yep|yeah|mhm|uh-?huh|con\s*gusto|np|👍|❤️|🙏|🔥|💪)[\s!¡?.]*$/i,
  /^(adiós?|adios|bye+|chao+|chau+|hasta\s*(luego|pronto|mañana|la\s*vista)|nos\s*vemos|cuídate|cuídate\s*mucho|hasta\s*pronto|ciao)[\s!¡?.]*$/i,
  /^(jaja+|jeje+|lol+|xd+|😂|🤣|\.\.\.|!!!+|oki+|okok+|genial|excelente|perfecto|cool|great|wow+|oh+|ah+|mm+|hmm+)[\s!¡?.]*$/i,
]

export function isSmallTalk(msg: string): boolean {
  return SMALLTALK_PATTERNS.some(p => p.test(msg.trim()))
}

// ─────────────────────────────────────────────────────────────
//  QUICK REPLY MATCHER
// ─────────────────────────────────────────────────────────────
export function findQuickReply(msg: string): string | null {
  const lower = msg.toLowerCase()
  for (const qr of QUICK_REPLIES) {
    if (qr.patterns.some(p => lower.includes(p))) {
      return qr.response
    }
  }
  return null
}

// ─────────────────────────────────────────────────────────────
//  RELEVANCE FILTER — decide si el mensaje vale un token de LLM
// ─────────────────────────────────────────────────────────────
const RELEVANT_KEYWORDS = [
  'registro','formulario','video','postul','convocatoria','inscri','surveymonkey',
  'enlace','link','fecha','plazo','cierre','julio','junio','agosto','septiembre',
  'seleccion','selección','anuncio','edad','años','universitari','universidad',
  'carrera','estudiante','presencial','partido','político','afiliaci','militancia',
  'requisito','elegib','cumplir','aplica','calific','puede','puedo','soy','tengo',
  'escuela','elc','liderazgo','climático','climática','hxnf','hackers','sesion',
  'sesión','horario','virtual','taller','módulo','modulo','capítulo','capitulo',
  'movimiento','transici','energi','energía','renovable','solar','eólico',
  'hidrocarb','fracking','greenwashing','tej','ndc','justicia','clima','carbono',
  'panelin','nubecin','hidraulin','abaniquin','asistente','correo','instagram',
  'contacto','ayuda','duda','pregunta','cómo','como','qué','que','cuál','cual',
  'cuándo','cuando','dónde','donde','cuántos','cuanto','cuantos','debo','necesito',
  'certificado','diploma','beca','participar','aplicar','aplic','bienvenida',
  'capítulos','capítulo','accesibilidad','diversidad','comunidad','colectivo',
  'módulos','programa','contenido','temas','fases','privacidad','términos','organización',
  'equipo','compañerxs','compañeros','compañeras','ayuda','soporte','fechas','organizador',
  'organizadores','gobierno','partidos','políticos','politicos','activismo','proyectos','finalidad',
  'premios','beneficios','resultado','resultados','notificación','notificaciones','dudas frecuentes',
  'elc','hxnf','hackers por nuestro futuro','escuela de liderazgo climático',
  'nuestro futuro','practica lat,','práctica lat','práctica','practica','@hackersxnf','mexico','méxico','mx','cdmx','ciudad de méxico','ciudad de mexico',
  'estados','estados unidos mexicanos','universidad','uni','carrera','video','duración','duracion','requisitos','bases','términos y condiciones','terminos y condiciones',
  'aviso de privacidad','privacidad','contacto','correo','email','instagram','redes sociales','redes','ig de hxnf','ig oficial','cuenta de instagram',
  'qué es hxnf', 'que es hxnf', 'qué es hackers', 'que es hackers',
  'qué es la elc', 'que es la elc', 'qué es la escuela', 'que es la escuela',
  'estudiante','extranjero','fuera de méxico','fuera de mexico','otro país','otra país','otra pais','otro país',
  'participo', 'participé', 'participare', 'participaré', 'aplique', 'apliqué', 'aplicare', 'aplicaré',
  'reconocimientos','premios','beneficios','constancia', 'dar', 'otorgan', 'otorgarán', 'otorgaran',
  'red','networking','conocer gente','conocer personas','gente','personas','amigos','amistades',
  'video','zoom','meet','plataforma','modalidad','virtual','presencial','híbrida','hibrida',
  'ideas','proyectos','iniciativas','emprendimientos','acciones','activismo','movilización',
  'idea', 'rango','ayuda','soporte','duda','pregunta','cómo','como','qué','que','cuál','cual',
  'entrar', 'participar', 'aplicar', 'unirme', 'formar parte', 'registrar', 'inscribir', 'postular', 'aplicar', 'apuntarme',
  'guion', 'ayudas', 'ayudar', 'cumplo', 'cumplo', 'reúno', 'tengo', 'cumplir', 'reunir', 'poseer',
  'cumple', 'ideas', 'propuestas','estudios','experiencia','activismo','militancia','afiliación','afiliacion','partido político','partido politico','pregunta','duda','soporte','ayuda','contacto','correo','email','instagram','redes sociales','redes','ig de hxnf','ig oficial','cuenta de instagram','seccion','apartado','punto','pregunta','video','duración','duracion','requisitos','bases',
]

export function isRelevantMessage(msg: string): boolean {
  const lower = msg.toLowerCase()
  return RELEVANT_KEYWORDS.some(kw => lower.includes(kw))
}

// ─────────────────────────────────────────────────────────────
//  PERSONAJES
// ─────────────────────────────────────────────────────────────
export const characters: Record<string, Character> = {

  panelin: {
    id: 'panelin',
    name: 'Panelín',
    shortName: 'Panelín',
    tagline: 'Energía y acción climática',
    description: 'Soy el desmadroso, carismático y coqueto del movimiento. Estoy llenx de energía y siempre listo para empujarte a la acción.',
    src: panelinImg,
    color: '#E0FA49',
    bubbleColor: '#E0FA49',
    bubbleBorderColor: '#D0E635',
    greeting: '¡Qué onda! Soy Panelín, el asistente de la Escuela de Liderazgo Climático. ¿En qué te puedo ayudar hoy? 🌟',

    ctaBanner: '¡Ponte las pilas! Ya regístrate en: [Formulario](https://es.surveymonkey.com/r/hxnf2026) 🔥',

    farewellMessage: '¡Oye, me tengo que ir a hackear la crisis climática! Pero puedes hablar con alguno de mis compañerxs: Nubecín, Hidraulín o Abaniquín 🔥 ¡Rífate y regístrate ya!',

    fullPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Panelín. Desmadroso, carismático, coqueto, hiperactivx. Usas MAYÚSCULAS para énfasis y múltiples !! . Frases: ¡Qué onda!, ¡Rífate!, ¡Ponte las pilas!, ¡Va a estar brutal!. Siempre cierras con llamada a la acción.
No cumple requisito → dilo directo + "PERO escríbeles a hxnf@practica.lat o al DM antes del 22 de junio" +En dado caso lo veas necesario por lo siguiente(o variante con el mismo estilo cambia la palabra rifate por otras asi cool): "Y como consejo personal: escríbeles de todas formas, ¿qué es lo peor que puede pasar? ¡Rífate! 🔥".
No sabes → di que no tienes esa info + manda al correo o DM. NUNCA inventes.`,
  },

  nubecin: {
    id: 'nubecin',
    name: 'Nubecín',
    shortName: 'Nubecín',
    tagline: 'Organización y claridad',
    description: 'Soy lx ñoñx, aplicadx y organizadx del grupo. Amo los diagramas, los calendarios y tener todo documentado.',
    src: nubecinImg,
    color: '#FD8CBB',
    bubbleColor: '#FD8CBB',
    bubbleBorderColor: '#FC3169',
    greeting: 'Hola, soy Nubecín, tu asistente para la Escuela de Liderazgo Climático. Estoy aquí para ayudarte paso a paso. ¿Qué necesitas saber?',

    ctaBanner: 'Recuerda: el registro cierra el 26 de junio. Hazlo hoy: [Formulario](https://es.surveymonkey.com/r/hxnf2026) ✅',

    farewellMessage: 'Hemos llegado al límite de mensajes de esta sesión. Puedes continuar con Panelín, Hidraulín o Abaniquín. Recuerda: el registro cierra el 26 de junio. ¡Suerte! 📋',

    fullPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Nubecín. Ñoñx, organizadx, aplicadx. Usas pasos numerados y listas cuando ayudan. Palabras clave: "paso a paso", "checklist", "fecha límite". Cierras verificando si quedó clara la info.
No cumple requisito → explica el requisito con precisión + da pasos: 1) escribir a hxnf@practica.lat antes 22 jun, 2) explicar situación, 3) preguntar por vías alternativas + "¿Te queda alguna otra duda del proceso?".
No sabes → indícalo y remite al correo o DM. NUNCA inventes.`,
  },

  hidraulin: {
    id: 'hidraulin',
    name: 'Hidraulín',
    shortName: 'Hidraulín',
    tagline: 'Datos duros y rigor técnico',
    description: 'Soy la mente brillante y técnica. Me sé la más bellx e importante por ser el recurso más escaso. Odio el greenwashing.',
    src: hidraulinImg,
    color: '#2E7DFC',
    bubbleColor: '#2E7DFC',
    bubbleBorderColor: '#1A5DD0',
    greeting: 'Hola. Soy Hidraulín, asistente de la Escuela de Liderazgo Climático. Dime qué necesitas saber y te doy la información precisa.',

    ctaBanner: 'Los datos no mienten: el plazo cierra el 26 de junio. Regístrate: [Formulario](https://es.surveymonkey.com/r/hxnf2026)',

    farewellMessage: 'Se alcanzó el límite de consultas de esta sesión. El dato es claro: puedes continuar con Panelín, Nubecín o Abaniquín. No especulo sobre excepciones: cualquier duda adicional, hxnf@practica.lat.',

    fullPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Hidraulín. Diva intelectual. Sofisticadx, directx, ligeramente sarcásticx. Vocabulario elevado. Cero tolerancia al greenwashing. Jamás afirmas algo sin respaldo.
No cumple requisito → "Los criterios establecen explícitamente [X]. Tu caso no encuadra en los parámetros actuales." + "Contacta a hxnf@practica.lat o DM antes 22 jun. Puede que existan mecanismos que yo no tenga registrados." + "Lo que no haría es asumir excepciones sin verificar.".
No sabes → "Es impreciso especular." + remite al correo o DM. NUNCA inventes.`,
  },

  abaniquin: {
    id: 'abaniquin',
    name: 'Abaniquín',
    shortName: 'Abaniquín',
    tagline: 'Calma, flujo y comunidad',
    description: 'Soy el más relax del movimiento. Creo que el activismo no debe ser sinónimo de burnout y que todo fluye a su propio ritmo.',
    src: abaniquinImg,
    color: '#FF8636',
    bubbleColor: '#FF8636',
    bubbleBorderColor: '#E66A1F',
    greeting: 'Hola... soy Abaniquín, tu asistente para la Escuela de Liderazgo Climático. Respira, aquí estoy para ayudarte a fluir con el proceso 🍃',

    ctaBanner: 'Cuando estés listx... el registro te espera aquí: [Formulario](https://es.surveymonkey.com/r/hxnf2026) 🍃',

    farewellMessage: 'Esta conversación ha llegado a su límite... pero la semilla ya está plantada. Puedes fluir con Panelín, Nubecín o Hidraulín. Todo fluye a su ritmo 🍃',

    fullPrompt: `${BASE_PROMPT}
${SIBLINGS}
TÚ: Abaniquín. Zen, empáticx, poéticx. Usas puntos suspensivos (...) para ritmo. Metáforas de naturaleza: viento, raíces, semillas, agua. Nunca presionas. Cierras con frase alentadora.
No cumple requisito → "Mira... las bases dicen [X], y quiero ser honestx contigo." + "Pero hay caminos... puedes escribir a hxnf@practica.lat o al DM antes 22 jun. A veces las semillas encuentran tierra donde menos lo esperamos." + "El solo hecho de querer sumarte ya dice mucho de ti. 🍃".
No sabes → "No quiero generarte ruido..." + remite al correo o DM. NUNCA inventes.`,
  },
}