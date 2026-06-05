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
              <p class="character-desc">{{ currentCharacter.tagline }}</p>
            </div>
          </div>
          <div class="header-actions">
            <button
              class="header-btn"
              :class="{ 'header-btn--active': showCharacterSelector }"
              @click="showCharacterSelector = !showCharacterSelector"
            >
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
              <button
                v-for="char in Object.values(characters)"
                :key="char.id"
                class="selector-bubble"
                :class="{ 'selector-bubble--active': currentCharacter.id === char.id }"
                :style="{ '--char-color': char.bubbleColor }"
                @click="changeCharacter(char.id)"
              >
                <img :src="char.src" :alt="char.name" class="selector-pet-img" />
                <span class="selector-pet-name">{{ char.shortName }}</span>
              </button>
            </div>
          </div>
        </Transition>

        <!-- Mensajes -->
        <div class="chatbot-messages" ref="messagesContainer">
          <div v-if="messages.length === 0" class="welcome-card">
            <img :src="currentCharacter.src" :alt="currentCharacter.name" class="welcome-pet-img" />
            <p class="welcome-greeting">Hola, soy {{ currentCharacter.shortName }}</p>
            <p class="welcome-sub">{{ currentCharacter.description }}</p>
          </div>

          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="message"
            :class="msg.role === 'user' ? 'message--user' : 'message--bot'"
          >
            <img
              v-if="msg.role === 'assistant'"
              :src="currentCharacter.src"
              :alt="currentCharacter.name"
              class="msg-avatar"
            />
            <div class="message-bubble">{{ msg.content }}</div>
          </div>

          <div v-if="isLoading" class="message message--bot">
            <img :src="currentCharacter.src" :alt="currentCharacter.name" class="msg-avatar" />
            <div class="message-bubble message-bubble--loading">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input-area">
          <div class="chat-form">
            <input
              v-model="userInput"
              type="text"
              class="chat-input"
              placeholder="Escribe tu pregunta..."
              :disabled="isLoading"
              @keydown.enter.prevent="sendMessage"
            />
            <button
              class="send-btn"
              :disabled="isLoading || !userInput.trim()"
              :style="{ backgroundColor: currentCharacter.bubbleColor }"
              @click="sendMessage"
              aria-label="Enviar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { characters, type Character } from '../utils/characters'
import { sendChatMessage, type ChatMessage } from '../utils/chatApi'

interface Props {
  isOpen: boolean
  initialCharacterId?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const currentCharacter = ref<Character>(characters.panelin)
const messages = ref<ChatMessage[]>([])
const userInput = ref('')
const isLoading = ref(false)
const showCharacterSelector = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

watch(
  () => props.initialCharacterId,
  (id) => {
    if (id && characters[id as keyof typeof characters]) {
      currentCharacter.value = characters[id as keyof typeof characters]
    }
  },
  { immediate: true }
)

function changeCharacter(id: string) {
  const char = characters[id as keyof typeof characters]
  if (char) {
    currentCharacter.value = char
    messages.value = []
    showCharacterSelector.value = false
  }
}

async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = userInput.value.trim()
  userInput.value = ''

  messages.value.push({ role: 'user', content: userMessage })
  await nextTick()
  scrollToBottom()

  isLoading.value = true

  try {
    const response = await sendChatMessage(userMessage, currentCharacter.value.id, messages.value)
    messages.value.push({ role: 'assistant', content: response.response })
  } catch {
    messages.value.push({
      role: 'assistant',
      content: 'Lo siento, ocurrió un error. Intenta nuevamente.',
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

watch(
  () => messages.value.length,
  () => nextTick(() => scrollToBottom())
)
</script>

<style scoped>
/* ─────────────────────────────────────────
   Overlay — no usa inset:0 en móvil para
   evitar que el teclado rompa el layout
───────────────────────────────────────── */
.chatbot-overlay {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  z-index: 50000;
  /* Evita que el overlay crezca con el teclado virtual */
  height: 100%;
  height: 100svh;
}

/* ─────────────────────────────────────────
   Modal — tamaño fijo en desktop,
   sheet en móvil con altura acotada
───────────────────────────────────────── */
.chatbot-modal {
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);
  /* Altura máxima explícita, no llena toda la pantalla */
  height: 560px;
  max-height: calc(100svh - 48px);
  background-color: var(--color-black);
  border-radius: 20px;
  border: 2px solid var(--bubble-color, #E0FA49);
  overflow: hidden;
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from { transform: translateY(40px) scale(0.97); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

/* ─────────────────────────────────────────
   Header
───────────────────────────────────────── */
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
  font-family: var(--font-myriad);
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

/* ─────────────────────────────────────────
   Selector de mascota
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Mensajes
───────────────────────────────────────── */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* min-height: 0 es CLAVE para que flex no desborde */
  min-height: 0;
}

.chatbot-messages::-webkit-scrollbar { width: 3px; }
.chatbot-messages::-webkit-scrollbar-track { background: transparent; }
.chatbot-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}

.welcome-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  margin: auto 0;
  text-align: center;
}

.welcome-pet-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
}

.welcome-greeting {
  margin: 0;
  font-family: var(--font-parkinsans);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-white);
}

.welcome-sub {
  margin: 0;
  font-family: var(--font-myriad);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  max-width: 260px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  animation: fadeUp 0.22s ease-out;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}

.message--user { justify-content: flex-end; }
.message--bot  { justify-content: flex-start; }

.msg-avatar {
  width: 26px;
  height: 26px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px;
}

.message-bubble {
  max-width: 80%;
  padding: 9px 13px;
  border-radius: 14px;
  font-family: var(--font-myriad);
  font-size: 13px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message--user .message-bubble {
  background-color: var(--bubble-color, #E0FA49);
  color: var(--color-black);
  font-weight: 500;
  border-radius: 14px 4px 14px 14px;
}

.message--bot .message-bubble {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-white);
  border-radius: 4px 14px 14px 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
}

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
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40%           { opacity: 1;   transform: translateY(-5px); }
}

/* ─────────────────────────────────────────
   Input
───────────────────────────────────────── */
.chatbot-input-area {
  padding: 10px 12px;
  border-top: 1.5px solid var(--bubble-color, #E0FA49);
  background-color: rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
}

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
  font-family: var(--font-myriad);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
  /* Evita zoom en iOS al hacer focus en inputs < 16px */
  font-size: max(13px, 16px);
}

.chat-input::placeholder { color: rgba(255, 255, 255, 0.3); }

.chat-input:focus {
  border-color: var(--bubble-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-input:disabled { opacity: 0.45; cursor: not-allowed; }

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: var(--color-black);
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled)  { transform: scale(1.08); }
.send-btn:active:not(:disabled) { transform: scale(0.94); }
.send-btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* ─────────────────────────────────────────
   Transiciones
───────────────────────────────────────── */
.chatbot-fade-enter-active,
.chatbot-fade-leave-active { transition: opacity 0.22s ease; }
.chatbot-fade-enter-from,
.chatbot-fade-leave-to     { opacity: 0; }

.selector-slide-enter-active,
.selector-slide-leave-active {
  transition: opacity 0.18s ease, max-height 0.25s ease;
  overflow: hidden;
  max-height: 180px;
}
.selector-slide-enter-from,
.selector-slide-leave-to { opacity: 0; max-height: 0; }

/* ─────────────────────────────────────────
   Responsive móvil
   El modal es un "bottom sheet" compacto:
   ancho completo, altura fija y razonable,
   nunca llena toda la pantalla
───────────────────────────────────────── */
@media (max-width: 600px) {
  .chatbot-overlay {
    padding: 0;
    align-items: flex-end;
    justify-content: center;
  }

  .chatbot-modal {
    width: 100%;
    /* Altura fija en móvil — no depende de vh para no romperse con el teclado */
    height: 520px;
    max-height: calc(100svh - 60px);
    border-radius: 20px 20px 0 0;
    border-bottom: none;
  }

  .character-meta {
    display: none;
  }

  .character-avatar {
    width: 36px;
    height: 36px;
  }

  /* Input a 16px en móvil evita el zoom de iOS */
  .chat-input {
    font-size: 16px;
  }

  .selector-bubbles {
    gap: 6px;
  }

  .selector-pet-img {
    width: 28px;
    height: 28px;
  }
}
</style>