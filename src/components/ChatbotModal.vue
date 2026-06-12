<template>
  <Transition name="chatbot-fade">
    <div v-if="isOpen" class="chatbot-overlay" @click.self="closeChatbot">
      <div class="chatbot-modal" :style="{ '--bubble-color': currentCharacter.bubbleColor } as any">

        <!-- Header -->
        <div class="chatbot-header">
          <div class="character-info">
            <div class="character-avatar">
              <img :src="currentCharacter.src" :alt="currentCharacter.name" class="avatar-img" />
            </div>
            <div class="character-meta">
              <h2 class="character-name">{{ currentCharacter.name }}</h2>
              <p class="character-desc">Chat temporal<br>sin historial guardado</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="header-btn" :class="{ 'header-btn--active': showCharacterSelector }"
              @click="showCharacterSelector = !showCharacterSelector">
              Cambiar mascota
            </button>
            <button class="close-chatbot-btn" @click="closeChatbot" aria-label="Cerrar">✕</button>
          </div>
        </div>

        <!-- Selector de mascota -->
        <Transition name="selector-slide">
          <div v-if="showCharacterSelector" class="character-selector">
            <p class="selector-label">Elige tu compañerx:</p>
            <div class="selector-bubbles">
              <button v-for="char in Object.values(characters)" :key="char.id" class="selector-bubble"
                :class="{ 'selector-bubble--active': currentCharacter.id === char.id }"
                :style="{ '--char-color': char.bubbleColor }" @click="changeCharacter(char.id)">
                <img :src="char.src" :alt="char.name" class="selector-pet-img" />
                <span class="selector-pet-name">{{ char.shortName }}</span>
              </button>
            </div>
          </div>
        </Transition>

        <!-- Mensajes -->
        <div class="chatbot-messages" ref="messagesContainer">

          <!-- Pantalla de bienvenida (chat vacío) -->
          <div v-if="messages.length === 0" class="welcome-screen">
            <div class="welcome-avatar-wrap">
              <img :src="currentCharacter.src" :alt="currentCharacter.name" class="welcome-pet-img" />
            </div>
            <p class="welcome-greeting-text">{{ currentCharacter.greeting }}</p>
            <!-- Aviso de sesión temporal — visible en desktop Y móvil -->
            <div class="session-notice">
              <span class="session-notice__icon">⚠️</span>
              <span>Este chat es temporal. Si cierras la ventana, el historial se borra.</span>
            </div>
          </div>

          <!-- Mensajes del historial -->
          <div v-for="(msg, idx) in messages" :key="idx" class="message"
            :class="msg.role === 'user' ? 'message--user' : 'message--bot'">
            <img v-if="msg.role === 'assistant'" :src="currentCharacter.src" :alt="currentCharacter.name"
              class="msg-avatar" />
            <div class="msg-col">
              <!-- Burbuja principal -->
              <div v-if="msg.role === 'assistant'" class="message-bubble message-bubble--bot-html"
                v-html="formatMessage(msg.content)" />
              <div v-else class="message-bubble">{{ msg.content }}</div>

              <!-- CTA Banner estático (solo mensajes IA o quick-reply) -->
              <div v-if="msg.role === 'assistant' && msg.ctaBanner" class="cta-banner"
                v-html="formatMessage(msg.ctaBanner)" />

              <!-- Footer fijo debajo de cada burbuja bot -->
              <div v-if="msg.role === 'assistant' && msg.footer" class="msg-footer" v-html="formatMessage(msg.footer)">

              </div>
            </div>
          </div>

          <!-- Indicador de carga -->
          <div v-if="isLoading" class="message message--bot">
            <img :src="currentCharacter.src" :alt="currentCharacter.name" class="msg-avatar" />
            <div class="msg-col">
              <div class="message-bubble message-bubble--loading">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input-area">
          <!-- Barra de progreso de mensajes IA -->
          <div class="ai-progress" v-if="serviceState.aiCount > 0">
            <div class="ai-progress__bar" :style="{ width: (serviceState.aiCount / MAX_AI_MESSAGES * 100) + '%' }" />
            <span class="ai-progress__label">{{ serviceState.aiCount }}/{{ MAX_AI_MESSAGES }} mensajes</span>
          </div>

          <div class="chat-form">
            <input v-model="userInput" type="text" class="chat-input" placeholder="Escribe tu pregunta..."
              :disabled="isLoading || isAtLimit" @keydown.enter.prevent="sendMessage" maxlength="300" />
            <!-- Botón con cooldown o normal -->
            <button class="send-btn" :class="{ 'send-btn--cooldown': cooldownRemaining > 0 }"
              :disabled="isLoading || isAtLimit || !userInput.trim()"
              :style="{ backgroundColor: cooldownRemaining > 0 ? 'rgba(255,255,255,0.18)' : currentCharacter.bubbleColor }"
              @click="sendMessage" aria-label="Enviar">
              <!-- Contador de cooldown -->
              <span v-if="cooldownRemaining > 0" class="cooldown-count">{{ cooldownRemaining }}</span>
              <!-- Icono enviar normal -->
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          <!-- Hint de cooldown -->
          <p v-if="cooldownRemaining > 0 && !isAtLimit" class="cooldown-hint">
            Espera {{ cooldownRemaining }}s para enviar otra pregunta
          </p>
          <!-- Mensaje de límite alcanzado -->
          <p v-if="isAtLimit" class="limit-hint">
            Límite de mensajes alcanzado. Cambia de mascota para continuar.
          </p>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onUnmounted } from 'vue'
import { characters, type Character } from '../utils/characters'
import {
  sendChatMessage,
  createChatServiceState,
  getCooldownRemaining,
  MAX_AI_MESSAGES,
  AI_COOLDOWN_SECONDS,
  type ChatMessage,
  type ChatServiceState,
} from '../utils/chatApi'

// ── Props & Emits ────────────────────────────────────────────
interface Props {
  isOpen: boolean
  currentCharacterId?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'character-change', id: string): void
}>()

// ── Estado ───────────────────────────────────────────────────
const localCharacterId = ref<string>(props.currentCharacterId ?? 'panelin')
const currentCharacter = computed<Character>(() => characters[localCharacterId.value] ?? characters['panelin'])

// Mensajes con campos extra para CTA y footer
interface DisplayMessage extends ChatMessage {
  ctaBanner?: string
  footer?: string
}
const messages = ref<DisplayMessage[]>([])
const userInput = ref('')
const isLoading = ref(false)
const showCharacterSelector = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Estado de servicio (cooldown + contador IA)
const serviceState = ref<ChatServiceState>(createChatServiceState())

// Cooldown reactivo — actualizado cada segundo mediante un ticker
const cooldownRemaining = ref(0)
let cooldownTicker: ReturnType<typeof setInterval> | null = null

function startCooldownTicker() {
  if (cooldownTicker) clearInterval(cooldownTicker)
  cooldownTicker = setInterval(() => {
    const remaining = Math.ceil(getCooldownRemaining(serviceState.value) / 1000)
    cooldownRemaining.value = remaining
    if (remaining === 0 && cooldownTicker) {
      clearInterval(cooldownTicker)
      cooldownTicker = null
    }
  }, 250)
}

onUnmounted(() => {
  if (cooldownTicker) clearInterval(cooldownTicker)
})

// Límite alcanzado
const isAtLimit = computed(() => serviceState.value.aiCount >= MAX_AI_MESSAGES)

// ── Sincronización con FloatingPet ───────────────────────────
watch(
  () => props.currentCharacterId,
  (id) => {
    if (id && id !== localCharacterId.value && characters[id]) {
      localCharacterId.value = id
      messages.value = []
      serviceState.value = createChatServiceState()
      cooldownRemaining.value = 0
    }
  }
)

// ── Cambio de personaje desde el modal ───────────────────────
function changeCharacter(id: string) {
  if (!characters[id]) return
  if (id !== localCharacterId.value) {
    localCharacterId.value = id
    messages.value = []
    serviceState.value = createChatServiceState()
    cooldownRemaining.value = 0
    emit('character-change', id)
  }
  showCharacterSelector.value = false
}

// ── Formateo de mensajes ─────────────────────────────────────
function formatMessage(text: string): string {
  if (!text) return ''

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  // 2. Detectar URLs y convertirlas en links clicables
  const linkify = (s: string) => {
    // Primero: Detectar formato Markdown -> [Nombre clean](https://link.com)
    // Esto mantendrá los nombres limpios (ej: "Instagram" en el footer).
    let text = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, name, url) => {
      // Re-usamos escape() de tu componente original para seguridad XSS en el nombre
      const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${escape(name)}</a>`
    })

    // Segundo: Fallback para URLs "sueltas" en el cuerpo del chat.
    // Usamos (^|[^"]) para no romper los links que ya metimos en una etiqueta <a> arriba.
    text = text.replace(/(^|[^"])(https?:\/\/[^\s<>"',)\]]+)/g, (match, prefix, url) => {
      const clean = url.replace(/[.,;:!?)]+$/, '')
      const trail = url.slice(clean.length)
      
      // GENERAR UN NOMBRE DE DISPLAY LIMPIO DESDE EL DOMINIO:
      // Esto tomará el link y lo dejará tipo "formulario.elc.mx" o "registros.elc.mx".
      // Ya no dirá "Enlace" y tampoco se verá la URL desordenada con https://www.
      const display = clean.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
      // Re-usamos escape() de tu componente original para seguridad XSS en el nombre
      const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

      return `${prefix}<a href="${clean}" target="_blank" rel="noopener noreferrer" class="chat-link">${escape(display)}</a>${escape(trail)}`
    })

    return text // <- ¡Este return es súper importante!
  }
  const boldItalic = (s: string) =>
    s
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')

  const lines = text.split('\n')
  const output: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (/^[-*•]\s+/.test(trimmed)) {
      if (!inList) { output.push('<ul class="chat-list">'); inList = true }
      output.push(`<li>${linkify(boldItalic(escape(trimmed.replace(/^[-*•]\s+/, ''))))}</li>`)
    } else {
      if (inList) { output.push('</ul>'); inList = false }
      if (trimmed === '') {
        if (output.length > 0 && i < lines.length - 1) output.push('<br>')
      } else {
        output.push(`<span class="chat-line">${linkify(boldItalic(escape(trimmed)))}</span>`)
      }
    }
  }
  if (inList) output.push('</ul>')
  return output.join('\n')
}

// ── Envío de mensajes ────────────────────────────────────────
async function sendMessage() {
  const text = userInput.value.trim()
  if (!text || isLoading.value || isAtLimit.value) return

  // Si hay cooldown activo Y el mensaje necesitaría LLM → bloquear
  // (quick replies y smalltalk pueden pasar igual)
  // Lo decidirá el servicio, pero el botón ya comunica el estado.

  userInput.value = ''
  messages.value.push({ role: 'user', content: text })
  await nextTick()
  scrollToBottom()

  isLoading.value = true

  try {
    const res = await sendChatMessage(
      text,
      currentCharacter.value.id,
      messages.value,
      serviceState.value,
    )

    messages.value.push({
      role: 'assistant',
      content: res.response,
      ctaBanner: res.ctaBanner,
      footer: res.footer,
    })

    // Si fue una llamada al LLM, iniciar cooldown visual
    if (res.kind === 'ai') {
      cooldownRemaining.value = AI_COOLDOWN_SECONDS
      startCooldownTicker()
    }
  } catch {
    messages.value.push({
      role: 'assistant',
      content: 'Lo siento, ocurrió un error. Intenta nuevamente.',
      footer: '¿Tienes más dudas? Escríbenos: instagram.com/direct/t/17843950122449171',
    })
  } finally {
    isLoading.value = false
    await nextTick()
    scrollToBottom()
  }
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function closeChatbot() {
  emit('close')
}

watch(() => messages.value.length, () => nextTick(() => scrollToBottom()))
</script>

<style scoped>
/* ── Overlay ── */
.chatbot-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  z-index: 2147483647;
  height: 100svh;
}

/* ── Modal ── */
.chatbot-modal {
  display: flex;
  flex-direction: column;
  width: min(100%, 500px);
  height: 600px;
  max-height: calc(100svh - 48px);
  background-color: var(--color-black);
  border-radius: 20px;
  border: 2px solid var(--bubble-color, #E0FA49);
  overflow: hidden;
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: var(--font-parkinsans);
  
  
}

@keyframes slideUp {
  from {
    transform: translateY(40px) scale(0.97);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* ── Header ── */
.chatbot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1.5px solid var(--bubble-color, #E0FA49);
  gap: 8px;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.02);
}

.character-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.character-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1.5px solid var(--bubble-color, #E0FA49);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 3px;
}

.character-meta {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.character-name {
  margin: 0;
  font-family: var(--font-parkinsans);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.character-desc {
  margin: 0;
  font-family: var(--font-parkinsans);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.header-btn {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-parkinsans);
  font-size: 10px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.header-btn:hover,
.header-btn--active {
  border-color: var(--bubble-color, #E0FA49);
  color: var(--bubble-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.06);
}

.close-chatbot-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
  cursor: pointer;
  padding: 4px 5px;
  border-radius: 6px;
  transition: all 0.2s;
  line-height: 1;
}

.close-chatbot-btn:hover {
  color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.1);
}

/* ── Selector de mascota ── */
.character-selector {
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background-color: rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
}

.selector-label {
  margin: 0 0 8px 0;
  font-family: var(--font-parkinsans);
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.selector-bubbles {
  display: flex;
  gap: 8px;
}

.selector-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 7px 10px;
  cursor: pointer;
  transition: all 0.18s;
  flex: 1;
}

.selector-bubble:hover {
  border-color: var(--char-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
}

.selector-bubble--active {
  border-color: var(--char-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.07);
}

.selector-pet-img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.selector-pet-name {
  font-family: var(--font-parkinsans);
  font-size: 9px;
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
}

/* ── Mensajes ── */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.chatbot-messages::-webkit-scrollbar {
  width: 3px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}

/* ── Bienvenida ── */
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 12px;
  margin: auto 0;
  text-align: center;
  animation: fadeUp 0.4s ease-out;
}

.welcome-avatar-wrap {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-pet-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}

.welcome-greeting-text {
  margin: 0;
  font-family: var(--font-parkinsans);
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
  max-width: 280px;
}

/* ── Aviso de sesión temporal ── */
.session-notice {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 8px 12px;
  max-width: 280px;
  font-family: var(--font-parkinsans);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.45;
  text-align: left;
}

.session-notice__icon {
  flex-shrink: 0;
  font-size: 13px;
}

/* ── Mensajes chat ── */
.message {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  animation: fadeUp 0.22s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message--user {
  justify-content: flex-end;
}

.message--bot {
  justify-content: flex-start;
}

.msg-avatar {
  width: 26px;
  height: 26px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px;
  align-self: flex-end;
  margin-bottom: 22px;
  /* aligns above footer */
}

/* Columna que agrupa burbuja + cta + footer */
.msg-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 82%;
}

.message--user .msg-col {
  align-items: flex-end;
}

.message--bot .msg-col {
  align-items: flex-start;
}

/* ── Burbujas ── */
.message-bubble {
  padding: 10px 14px;
  font-family: var(--font-parkinsans);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.55;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.message--user .message-bubble {
  background-color: var(--bubble-color, #E0FA49);
  color: var(--color-black);
  font-weight: 600;
  border-radius: 16px 16px 4px 16px;
}

.message--bot .message-bubble {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-white);
  border-radius: 4px 16px 16px 16px;
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.message-bubble--bot-html {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ── CTA Banner ── */
.cta-banner {
  font-family: var(--font-parkinsans);
  font-size: 11px;
  font-weight: 700;
  color: var(--bubble-color, #E0FA49);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--bubble-color, #E0FA49);
  border-radius: 8px;
  padding: 6px 10px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* ── Footer de mensaje ── */
.msg-footer {
  font-family: var(--font-parkinsans);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  padding: 0 2px;
  margin-top: 4px; /* Un pequeño margen para separarlo de la burbuja */
}

/* Forzar el texto dentro del footer a ser pequeño y opaco */
.msg-footer :deep(.chat-line) {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.2;
}

/* Ajustar el link para que combine con el tamaño del footer */
.msg-footer :deep(.chat-link) {
  font-size: 12px;
  /* Puedes dejar el azul (#3b82f6) o usar este gris más claro para que no resalte tanto */
  color: #2E7DFC; 
}

/* ── Contenido HTML del bot ── */
:deep(.chat-line) {
  display: block;
  font-size: 13px;
  line-height: 1.55;
  color: var(--color-white);
}

:deep(.chat-list) {
  margin: 4px 0 2px 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

:deep(.chat-list li) {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-white);
  list-style-type: disc;
}

:deep(strong) {
  font-weight: 700;
  color: var(--color-white);
}

:deep(em) {
  font-style: italic;
  opacity: 0.9;
}

:deep(br) {
  content: '';
  display: block;
  margin: 3px 0;
}

:deep(.chat-link) {
  color: var(--bubble-color, #E0FA49);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1.5px solid currentColor;
  padding-bottom: 1px;
  word-break: break-all;
  transition: opacity 0.15s;
  display: inline;
}

:deep(.chat-link):hover {
  opacity: 0.75;
}

:deep(.chat-link):active {
  opacity: 0.55;
}

/* ── Loading dots ── */
.message-bubble--loading {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 11px 14px;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.45);
  animation: bounce 1.3s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.15s;
}

.dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-5px);
  }
}

/* ── Input area ── */
.chatbot-input-area {
  padding: 8px 12px 10px;
  padding-bottom: max(10px, env(safe-area-inset-bottom));
  border-top: 1.5px solid var(--bubble-color, #E0FA49);
  background-color: rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
}
/* ── Barra de progreso ── */
.ai-progress {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 7px;
}

.ai-progress__bar {
  height: 3px;
  background: var(--bubble-color, #E0FA49);
  border-radius: 2px;
  transition: width 0.4s ease;
  flex: 1;
  max-width: calc(100% - 60px);
  background-color: var(--bubble-color, #E0FA49);
  /* Track */
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.08);
  /* Usando pseudo-element trick con background-size */
}

/* Track gris detrás de la barra */
.ai-progress {
  position: relative;
}

.ai-progress::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 3px;
  width: calc(100% - 60px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.ai-progress__label {
  font-family: var(--font-parkinsans);
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
  margin-left: auto;
}

/* ── Chat form ── */
.chat-form {
  display: flex;
  gap: 7px;
  align-items: center;
}

.chat-input {
  flex: 1;
  padding: 9px 13px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  color: var(--color-white);
  font-family: var(--font-parkinsans);
  font-size: max(13px, 16px);
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.chat-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.chat-input:focus {
  border-color: var(--bubble-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-input:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Botón enviar / cooldown ── */
.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: var(--color-black);
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.08);
}

.send-btn:active:not(:disabled) {
  transform: scale(0.94);
}

.send-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.send-btn--cooldown {
  cursor: not-allowed;
}

.cooldown-count {
  font-family: var(--font-parkinsans);
  font-size: 13px;
  font-weight: 800;
  color: var(--color-white);
  line-height: 1;
}

/* ── Hints bajo el input ── */
.cooldown-hint,
.limit-hint {
  margin: 5px 0 0 0;
  font-family: var(--font-parkinsans);
  font-size: 10px;
  text-align: center;
  line-height: 1.3;
}

.cooldown-hint {
  color: rgba(255, 255, 255, 0.35);
}

.limit-hint {
  color: var(--bubble-color, #E0FA49);
  font-weight: 600;
}

/* ── Transiciones ── */
.chatbot-fade-enter-active,
.chatbot-fade-leave-active {
  transition: opacity 0.22s ease;
}

.chatbot-fade-enter-from,
.chatbot-fade-leave-to {
  opacity: 0;
}

.selector-slide-enter-active,
.selector-slide-leave-active {
  transition: opacity 0.18s ease, max-height 0.25s ease;
  overflow: hidden;
  max-height: 180px;
}

.selector-slide-enter-from,
.selector-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ── Responsive móvil ── */
@media (max-width: 600px) {
  .chatbot-overlay {
    padding: 0;
    padding-bottom: 0px;
    align-items: flex-end;
    justify-content: center;
  }

  .chatbot-modal {
    width: 100%;
    height: 85svh;
    max-height: 85svh;
    border-radius: 20px 20px 20px 20px;
    border-width: 2px 2px 2px 2px;
  }
  .chatbot-input-area {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
  .character-desc {
    display: none;
  }

  .character-name {
    font-size: 12px;
  }

  .character-avatar {
    width: 34px;
    height: 34px;
  }

  .selector-bubbles {
    gap: 6px;
  }

  .selector-pet-img {
    width: 28px;
    height: 28px;
  }

  .chatbot-messages {
    padding: 12px 10px;
    gap: 12px;
  }

  .message-bubble {
    padding: 11px 14px;
    font-size: 14px;
  }

  :deep(.chat-line),
  :deep(.chat-list li) {
    font-size: 14px;
  }

  :deep(.chat-link) {
    font-size: 13px;
  }

  .msg-avatar {
    width: 28px;
    height: 28px;
  }

  .message {
    gap: 8px;
  }

  .msg-col {
    max-width: 88%;
  }

  .welcome-screen {
    padding: 14px 10px;
    gap: 10px;
  }

  .welcome-avatar-wrap {
    width: 64px;
    height: 64px;
  }

  .welcome-greeting-text {
    font-size: 13px;
    max-width: 240px;
  }

  .session-notice {
    font-size: 10px;
    max-width: 240px;
  }
}
</style>