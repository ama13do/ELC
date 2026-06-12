<template>
  <div>
    <button
      v-if="!isVisible"
      class="summon-pet-btn"
      @click="resetPet"
      aria-label="Llamar asistente"
    >
      Llamar compañerx
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
              <button class="action-btn action-btn--primary" @click.stop="openChatbot">
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
            <button
              v-for="pet in pets"
              :key="pet.id"
              class="pet-option-btn"
              :class="{ 'active-pet': currentPet.id === pet.id }"
              :style="{ '--pet-color': pet.color }"
              @click.stop="selectPet(pet)"
            >
              <img
                :src="pet.src"
                :alt="pet.name"
                class="pet-option-img"
              />
              <span class="pet-option-name">{{ pet.shortName }}</span>
            </button>
          </div>
        </div>

        <!-- Imagen de mascota — clic abre el chatbot -->
        <div class="pet-image-container">
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
    </div>

    <!-- Modal del chatbot -->
    <ChatbotModal
      :is-open="isChatbotOpen"
      :current-character-id="currentPet.id"
      @close="closeChatbot"
      @character-change="onCharacterChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ChatbotModal from './ChatbotModal.vue'
import { characters } from '../utils/characters'

const isVisible = ref(true)
const showAppearanceSelector = ref(false)
const isChatbotOpen = ref(false)

const petWrapperRef = ref<HTMLElement | null>(null)
const speechBubbleRef = ref<HTMLElement | null>(null)

// Construimos la lista de mascotas desde el objeto characters para no duplicar datos
const pets = Object.values(characters).map((c) => ({
  id: c.id,
  src: c.src,
  name: c.name,
  shortName: c.shortName,
  color: c.bubbleColor,
}))

// ── Estado global de mascota ─────────────────────────────────
// currentPet es la fuente de verdad para toda la app.
// Al cambiarla aquí O desde el modal, ambos componentes se sincronizan.
const currentPet = ref(pets[0])

const messages = [
  '¿Ya te registraste en la Escuela de Liderazgo Climático? ¡Te estamos esperando <br><a href="https://es.surveymonkey.com/r/hxnf2026" target="_blank" class="pet-link">Formulario</a>!',
  'La transición energética necesita tu voz. ¡Inscríbete hoy mismo <br><a href="https://es.surveymonkey.com/r/hxnf2026" target="_blank" class="pet-link">Formulario</a>!',
  '¿Listx para hacer historia? Revisa las bases y postúlate aquí: <br><a href="https://es.surveymonkey.com/r/hxnf2026" target="_blank" class="pet-link">Formulario</a>',
  'Cualquier duda con tu registro, escríbenos a <br><a href="mailto:hxnf@practica.lat" class="pet-link">hxnf@practica.lat</a>',
  'Conoce más de nuestro movimiento en Instagram: <br><a href="https://www.instagram.com/Hackersxnf/" target="_blank" class="pet-link">@Hackersxnf</a>',
  '¡No lo dejes para el último día! Completa tu postulación con tiempo <br><a href="https://es.surveymonkey.com/r/hxnf2026" target="_blank" class="pet-link">Formulario</a>.',
  '¿Tienes dudas sobre la convocatoria? ¡Mándanos un <br><a href="https://ig.me/m/hackersxnf" target="_blank" class="pet-link">DM en Instagram</a>!',
]

const currentMessage = ref(messages[0])
let messageInterval: number | null = null

// ── Drag ─────────────────────────────────────────────────────
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

const handlePetClick = () => {
  if (!isMoved) openChatbot()
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

// ── Acciones ─────────────────────────────────────────────────
const selectPet = (pet: typeof pets[0]) => {
  currentPet.value = pet
  showAppearanceSelector.value = false
}

// Cuando el modal cambia de personaje, actualizamos currentPet aquí también
const onCharacterChange = (id: string) => {
  const found = pets.find((p) => p.id === id)
  if (found) currentPet.value = found
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
/* ─────────────────────────────────────────────────────────────
   z-index alto para flotar sobre iframes y otros elementos
   de la página (videos embebidos, mapas, etc.)
───────────────────────────────────────────────────────────── */
.summon-pet-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 2147483640; /* máximo posible, encima de iframes */
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
  z-index: 2147483640; /* encima de iframes */
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

/* ── Selector de apariencia ── */
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
  z-index: 2147483641;
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
  gap: 8px;
}

.pet-option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.18s;
}

.pet-option-btn:hover {
  border-color: var(--pet-color, #E0FA49);
  background-color: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.active-pet {
  border-color: var(--pet-color, #E0FA49) !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.pet-option-img {
  /* Tamaño estandarizado — todas las mascotas igual */
  width: 44px;
  height: 44px;
  object-fit: contain;
  -webkit-user-drag: none;
  user-select: none;
}

.pet-option-name {
  font-family: var(--font-parkinsans);
  font-size: 8px;
  font-weight: 700;
  color: var(--color-white);
  text-align: center;
  white-space: nowrap;
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
.action-btn--primary {
  background-color: var(--color-black);
  height: 30px;
  width: 80px;
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

/* Pico de la burbuja */
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
  z-index: 2147483642;
  pointer-events: auto;
}

.close-btn:hover {
  transform: scale(1.15) rotate(90deg);
}

/* ── Imagen de mascota ──────────────────────────────────────
   Contenedor con tamaño fijo para que todas las mascotas
   ocupen el mismo espacio visual independientemente de sus
   proporciones originales.
───────────────────────────────────────────────────────────── */
.pet-image-container {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-image {
  /* object-fit: contain garantiza que ninguna se recorte */
  width: 100%;
  height: 100%;
  object-fit: contain;
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

/* ─────────────────────────────────────────────────────────────
   Móvil — mascota más pequeña y perfectamente estandarizada
───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .pet-draggable-wrapper {
    bottom: 15px;
    right: 15px;
  }

  /* Todas las mascotas: mismo cuadro fijo en móvil */
  .pet-image-container {
    width: 88px;
    height: 88px;
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

  .pet-option-img {
    width: 36px;
    height: 36px;
  }
}
</style>