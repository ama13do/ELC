<template>
  <div>
    <button
      v-if="!isVisible"
      class="summon-pet-btn"
      @click="resetPet"
      aria-label="Llamar asistente"
    >
      Llamar mascota
    </button>

    <div
      v-show="isVisible"
      ref="petWrapperRef"
      class="pet-draggable-wrapper"
      :style="{ transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)` }"
    >
      <div class="pet-float-wrapper">

        <!-- Burbuja de mensaje -->
        <div ref="speechBubbleRef" class="speech-bubble" @click.stop="openChatbot">
          <button class="close-btn" @click.stop="closePet" aria-label="Cerrar">✕</button>
          <div class="bubble-content">
            <span class="bubble-text" v-html="currentMessage"></span>
            <div class="bubble-actions">
              <button class="action-btn" @click.stop="openChatbot">
                Chatear
              </button>
              <button class="action-btn action-btn--secondary" @click.stop="toggleAppearance">
                Cambiar mascota
              </button>
            </div>
          </div>
        </div>

        <!-- Selector de apariencia -->
        <div v-if="showAppearanceSelector" class="pet-selector appearance-selector">
          <p class="selector-title">Elige a tu compañerx:</p>
          <div class="pet-options">
            <img
              v-for="pet in pets"
              :key="pet.id"
              :src="pet.src"
              :alt="pet.name"
              class="pet-option-img"
              :class="{ 'active-pet': currentPet.id === pet.id }"
              @click.stop="selectPet(pet)"
            />
          </div>
        </div>

        <!-- Imagen de mascota — clic abre el chatbot -->
        <img
          :src="currentPet.src"
          :alt="currentPet.name"
          class="pet-image"
          @mousedown.prevent="startDrag"
          @touchstart.prevent="startDrag"
          @click="handlePetClick"
        />
      </div>
    </div>

    <!-- Modal del chatbot -->
    <ChatbotModal
      :is-open="isChatbotOpen"
      :initial-character-id="currentPet.id"
      @close="closeChatbot"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ChatbotModal from './ChatbotModal.vue'

import panelinImg   from '../assets/pets/Panelin.webp'
import nubecinImg   from '../assets/pets/Nubecin.webp'
import hidraulinImg from '../assets/pets/Hidraulin.webp'
import abaniquinImg from '../assets/pets/Abaniquin.webp'

const isVisible = ref(true)
const showAppearanceSelector = ref(false)
const isChatbotOpen = ref(false)

const petWrapperRef = ref<HTMLElement | null>(null)
const speechBubbleRef = ref<HTMLElement | null>(null)

const pets = [
  { id: 'panelin',   src: panelinImg,   name: 'Panelín' },
  { id: 'nubecin',   src: nubecinImg,   name: 'Nubecín' },
  { id: 'hidraulin', src: hidraulinImg, name: 'Hidraulín' },
  { id: 'abaniquin', src: abaniquinImg, name: 'Abaniquín' },
]

const currentPet = ref(pets[0])

const messages = [
  '¿Ya te registraste en la Escuela de Liderazgo Climático? ¡Te estamos esperando!',
  'La transición energética necesita tu voz. ¡Inscríbete hoy mismo!',
  '¿Listx para hacer historia? Revisa las bases y postúlate.',
  'Cualquier duda con tu registro, escríbenos a <br><a href="mailto:hxnf@practica.lat" class="pet-link">hxnf@practica.lat</a>',
  'Conoce más de nuestro movimiento en Instagram: <br><a href="https://www.instagram.com/Hackersxnf/" target="_blank" class="pet-link">@Hackersxnf</a>',
  '¡No lo dejes para el último día! Completa tu postulación con tiempo.',
  '¿Tienes dudas sobre la convocatoria? ¡Mándanos un DM!',
  'Únete a la red de juventudes por el clima. ¡Tu participación es clave!'
]

const currentMessage = ref(messages[0])
let messageInterval: number | null = null

// ── Drag ────────────────────────────────────────────────────
const dragOffset = ref({ x: 0, y: 0 })
let isDragging = false
let isMoved = false
let dragStartX = 0
let dragStartY = 0
let initialOffsetX = 0
let initialOffsetY = 0

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging = true
  isMoved = false
  showAppearanceSelector.value = false

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  dragStartX = clientX
  dragStartY = clientY
  initialOffsetX = dragOffset.value.x
  initialOffsetY = dragOffset.value.y

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  if (Math.abs(clientX - dragStartX) > 5 || Math.abs(clientY - dragStartY) > 5) {
    isMoved = true
    if ('touches' in e && e.cancelable) e.preventDefault()
  }

  dragOffset.value.x = initialOffsetX + (clientX - dragStartX)
  dragOffset.value.y = initialOffsetY + (clientY - dragStartY)
}

const stopDrag = () => {
  isDragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}

// Clic en la mascota: si no se arrastró, abrir chatbot
const handlePetClick = () => {
  if (!isMoved) {
    openChatbot()
  }
}

// ── Animaciones ──────────────────────────────────────────────
function playEntrance() {
  nextTick(() => {
    gsap.fromTo(
      petWrapperRef.value,
      { y: 140, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.6)' }
    )
    gsap.fromTo(
      speechBubbleRef.value,
      { y: 16, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)', delay: 1.1 }
    )
  })
}

const closePet = () => {
  gsap.to(speechBubbleRef.value, {
    y: -8, opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in',
  })
  gsap.to(petWrapperRef.value, {
    y: 130, opacity: 0, duration: 0.45, ease: 'power2.in', delay: 0.1,
    onComplete: () => { isVisible.value = false },
  })
}

// ── Ciclo de mensajes ────────────────────────────────────────
onMounted(() => {
  messageInterval = window.setInterval(() => {
    if (!speechBubbleRef.value) return
    gsap.to(speechBubbleRef.value, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        currentMessage.value = messages[Math.floor(Math.random() * messages.length)]
        gsap.to(speechBubbleRef.value, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      },
    })
  }, 7000)

  nextTick(() => {
    gsap.fromTo(
      petWrapperRef.value,
      { y: 140, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.6)', delay: 0.9 }
    )
    gsap.fromTo(
      speechBubbleRef.value,
      { y: 16, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)', delay: 2.1 }
    )
  })
})

onBeforeUnmount(() => {
  if (messageInterval) clearInterval(messageInterval)
})

// ── Acciones ────────────────────────────────────────────────
const selectPet = (pet: typeof pets[0]) => {
  currentPet.value = pet
  showAppearanceSelector.value = false
}

const resetPet = () => {
  isVisible.value = true
  dragOffset.value = { x: 0, y: 0 }
  showAppearanceSelector.value = false
  playEntrance()
}

const toggleAppearance = () => {
  showAppearanceSelector.value = !showAppearanceSelector.value
}

const openChatbot = () => {
  showAppearanceSelector.value = false
  isChatbotOpen.value = true
}

const closeChatbot = () => {
  isChatbotOpen.value = false
}
</script>

<style scoped>
.summon-pet-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 9998;
  background-color: var(--color-blue);
  color: var(--color-white);
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 14px;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s, background-color 0.2s;
}

.summon-pet-btn:hover {
  transform: scale(1.05) translateY(-3px);
}

.pet-draggable-wrapper {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 9999;
  touch-action: none;
  opacity: 0;
}

.pet-float-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 4s ease-in-out infinite;
  position: relative;
}

/* ── Selector de mascota ── */
.pet-selector {
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  background-color: var(--color-black);
  border: 2px solid var(--color-accent);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  z-index: 20;
}

.appearance-selector {
  border-color: var(--color-orange);
}

.selector-title {
  color: var(--color-white);
  font-family: var(--font-parkinsans);
  font-size: 0.78rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.pet-options {
  display: flex;
  gap: 10px;
}

.pet-option-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  transition: transform 0.2s, background-color 0.2s;
  border: 2px solid transparent;
}

.pet-option-img:hover {
  transform: scale(1.15);
  background-color: rgba(255, 255, 255, 0.12);
}

.active-pet {
  background-color: rgba(11, 227, 64, 0.15);
  border-color: var(--color-accent);
}

/* ── Burbuja de mensaje ── */
.speech-bubble {
  position: relative;
  background-color: var(--color-beige);
  color: var(--color-black);
  border-radius: 16px;
  margin-bottom: 15px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: clamp(200px, 20vw, 300px);
  min-height: 85px;
  padding: 14px 16px;
  pointer-events: auto;
  opacity: 0;
  cursor: pointer;
  transition: transform 0.15s;
}

.speech-bubble:hover {
  transform: translateY(-2px);
}

.bubble-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.bubble-text {
  font-family: var(--font-parkinsans);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  font-weight: 600;
  line-height: 1.45;
}

.bubble-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  background-color: var(--color-black);
  color: var(--color-white);
  border: none;
  font-family: var(--font-parkinsans);
  font-size: 11px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.action-btn:hover {
  background-color: #222;
  transform: scale(1.04);
}

.action-btn:active {
  transform: scale(0.97);
}

.action-btn--secondary {
  background-color: transparent;
  color: var(--color-black);
  border: 1.5px solid rgba(0, 0, 0, 0.25);
}

.action-btn--secondary:hover {
  background-color: rgba(0, 0, 0, 0.08);
  transform: scale(1.04);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: var(--color-beige) transparent transparent transparent;
}

:deep(.pet-link) {
  color: var(--color-blue);
  font-weight: 800;
  text-decoration: none;
  border-bottom: 2px solid var(--color-blue);
  transition: all 0.2s ease;
  padding-bottom: 1px;
}

:deep(.pet-link):hover {
  background-color: var(--color-blue);
  color: var(--color-white);
  border-radius: 4px;
  padding: 2px 4px;
}

.close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--color-black);
  color: var(--color-white);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s;
  z-index: 10;
  pointer-events: auto;
}

.close-btn:hover {
  transform: scale(1.15) rotate(90deg);
}

/* ── Imagen de mascota ── */
.pet-image {
  width: clamp(130px, 16vw, 220px);
  height: auto;
  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
  transition: transform 0.2s;
}

.pet-image:hover {
  transform: scale(1.05);
}

.pet-image:active {
  cursor: grabbing;
}

@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .pet-draggable-wrapper {
    bottom: 15px;
    right: 15px;
  }

  .speech-bubble {
    width: 175px;
    min-height: 72px;
    padding: 10px 12px;
  }

  .action-btn {
    font-size: 10px;
    padding: 4px 9px;
  }

  .pet-image {
    width: 110px;
  }

  .pet-option-img {
    width: 40px;
    height: 40px;
  }
}
</style>