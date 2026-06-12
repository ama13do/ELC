// src/utils/chatApi.ts
import {
  characters,
  isSmallTalk,
  isRelevantMessage,
  findQuickReply,
} from "./characters";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type MessageKind =
  | "ai"
  | "quick"
  | "smalltalk"
  | "offtopic"
  | "farewell"
  | "limit";

export interface ChatResponse {
  response: string;
  kind: MessageKind;
  ctaBanner?: string;
  footer: string;
}

// ─────────────────────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────────────────────
const MAX_AI_MESSAGES  = 8;
const AI_COOLDOWN_MS   = 10000;
const MAX_HISTORY_TURNS = 2;

const FOOTER = "Tienes más dudas? Escríbenos a [Instagram](https://ig.me/m/hackersxnf)";

// ─────────────────────────────────────────────────────────────
//  SMALL TALK
// ─────────────────────────────────────────────────────────────
const SMALLTALK_RESPONSES = [
  "¡Hola! ¿Tienes alguna duda sobre la Escuela de Liderazgo Climático 2026?",
  "Con gusto te ayudo. ¿Qué quieres saber sobre la convocatoria o el registro?",
  "¡Hasta luego! Si tienes dudas sobre la ELC, aquí estaremos.",
];

function getSmallTalkResponse(): string {
  return SMALLTALK_RESPONSES[Math.floor(Math.random() * SMALLTALK_RESPONSES.length)];
}

// ─────────────────────────────────────────────────────────────
//  ESTADO
// ─────────────────────────────────────────────────────────────
export interface ChatServiceState {
  aiCount: number;
  lastAiCallAt: number;
}

export function createChatServiceState(): ChatServiceState {
  return { aiCount: 0, lastAiCallAt: 0 };
}

export function getCooldownRemaining(state: ChatServiceState): number {
  if (state.lastAiCallAt === 0) return 0;
  const elapsed = Date.now() - state.lastAiCallAt;
  return Math.max(0, AI_COOLDOWN_MS - elapsed);
}

export function canSendAi(state: ChatServiceState): boolean {
  return getCooldownRemaining(state) === 0;
}

export const AI_COOLDOWN_SECONDS = Math.round(AI_COOLDOWN_MS / 1000);
export { MAX_AI_MESSAGES };

// ─────────────────────────────────────────────────────────────
//  FUNCIÓN PRINCIPAL
// ─────────────────────────────────────────────────────────────
export async function sendChatMessage(
  message: string,
  characterId: string,
  conversationHistory: ChatMessage[],
  state: ChatServiceState,
): Promise<ChatResponse> {
  const character = characters[characterId];
  if (!character) {
    return { response: "Personaje no encontrado.", kind: "offtopic", footer: FOOTER };
  }

  const trimmed = message.trim();

  // ── 1. SMALL TALK ─────────────────────────────────────────
  if (isSmallTalk(trimmed)) {
    return { response: getSmallTalkResponse(), kind: "smalltalk", footer: FOOTER };
  }

  if (trimmed === '¿Quién es tu creador?') {
    return {
      response: 'Mi creador es Amado 💻 [Instagram Ama13do](https://ig.me/m/ama13do)',
      kind: 'smalltalk',
      footer: FOOTER,
    }
  }

  // ── 2. QUICK REPLIES ──────────────────────────────────────
  const qr = findQuickReply(trimmed);
  if (qr) {
    return { response: qr, kind: "quick", ctaBanner: character.ctaBanner, footer: FOOTER };
  }

  // ── 3. LÍMITE DE MENSAJES IA ──────────────────────────────
  if (state.aiCount >= MAX_AI_MESSAGES) {
    return { response: character.farewellMessage, kind: "farewell", footer: FOOTER };
  }

  // ── 4. OFF-TOPIC ──────────────────────────────────────────
  if (trimmed.length < 50 && !isRelevantMessage(trimmed)) {
    return {
      response: `Soy ${character.name}, asistente de la ELC 2026. Solo puedo ayudarte con dudas sobre la convocatoria, el proceso de registro o el movimiento HxNF. ¿Tienes alguna pregunta sobre eso?`,
      kind: "offtopic",
      footer: FOOTER,
    };
  }

  // ── 5. LLAMADA AL SERVIDOR ────────────────────────────────
  const historyMessages = conversationHistory
    .slice(0, -1)
    .slice(-(MAX_HISTORY_TURNS * 2))
    .map((msg) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Solo enviamos characterId y messages — sin temperature, max_tokens ni stop
      body: JSON.stringify({
        characterId,
        messages: [...historyMessages, { role: "user", content: trimmed }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`API ${res.status}:`, err);
      throw new Error(`HTTP ${res.status}`);
    }

    // El backend solo devuelve { content: string }
    const data = await res.json() as { content?: string };
    const content = data.content;

    if (!content) throw new Error("Respuesta vacía");

    state.aiCount++;
    state.lastAiCallAt = Date.now();

    return { response: content, kind: "ai", ctaBanner: character.ctaBanner, footer: FOOTER };

  } catch (err) {
    console.error("sendChatMessage error:", err);
    return {
      response: `¡Ups! 🚨 Tuve que salir de emergencia a hackear la crisis climática un ratito. 🌍💻 Intenta de nuevo en unos minutos o cambia de asistente a ver si te contestan mis compañerxs. Si te urge mucho, tiranos un mensaje directo acá: https://ig.me/m/hackersxnf o a hxnf@practica.lat 🔥`,
      kind: "offtopic",
      footer: FOOTER,
    };
  }
}