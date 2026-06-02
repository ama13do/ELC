<template>
  <div>
    <button
      v-if="!isVisible"
      class="summon-pet-btn"
      @click="resetPet"
      aria-label="Llamar asistente"
    >
      👋 Llamar mascota
    </button>

    <div
      v-show="isVisible"
      ref="petWrapperRef"
      class="pet-draggable-wrapper"
      :style="{ transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)` }"
    >
      <div class="pet-float-wrapper">

        <div ref="speechBubbleRef" class="speech-bubble">
          <button class="close-btn" @click="closePet" aria-label="Cerrar">✕</button>
          <span class="bubble-text" v-html="currentMessage"></span>
        </div>

        <div v-if="showSelector" class="pet-selector">
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

        <img
          :src="currentPet.src"
          :alt="currentPet.name"
          class="pet-image"
          @mousedown.prevent="startDrag"
          @touchstart.prevent="startDrag"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

import panelinImg from '../assets/pets/Panelin.webp'
import nubecinImg from '../assets/pets/Nubecin.webp'
import hidraulinImg from '../assets/pets/Hidraulin.webp'
import abaniquinImg from '../assets/pets/Abaniquin.webp'

const isVisible = ref(true)
const showSelector = ref(false)

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
  '¡Hola! 👋 ¿Ya te registraste en la Escuela de Liderazgo Climático? ¡Te estamos esperando! <br><a href="https://forms.gle/5Kc73ytz17qZWT1AA" target="_blank" class="pet-link">Regístrate aquí</a>',
  'La transición energética necesita tu voz. ⚡ ¡Inscríbete hoy mismo! <br><a href="https://forms.gle/5Kc73ytz17qZWT1AA" target="_blank" class="pet-link">Regístrate aquí</a>',
  '¿Listx para hacer historia? Revisa las bases y postúlate. 🚀 <br><a href="https://forms.gle/5Kc73ytz17qZWT1AA" target="_blank" class="pet-link">Regístrate aquí</a>',
  'Cualquier duda con tu registro, escríbenos a <br><a href="mailto:hxnf@practica.lat" class="pet-link">hxnf@practica.lat</a> ✉️',
  'Conoce más de nuestro movimiento en Instagram: <br><a href="https://www.instagram.com/Hackersxnf/" target="_blank" class="pet-link">@Hackersxnf</a> 📱',
  '¡No lo dejes para el último día! Completa tu postulación con tiempo. ⏳ <br><a href="https://forms.gle/5Kc73ytz17qZWT1AA" target="_blank" class="pet-link">Regístrate aquí</a>',
  '¿Tienes dudas sobre la convocatoria? ¡Mándanos un DM a <a href="https://ig.me/m/hackersxnf" target="_blank" class="pet-link">nuestro IG</a>!',
  'Únete a la red de juventudes por el clima. 🌱 ¡Tu participación es clave! <br><a href="https://forms.gle/5Kc73ytz17qZWT1AA" target="_blank" class="pet-link">Regístrate aquí</a>'
]

const currentMessage = ref(messages[0])
let messageInterval: number | null = null

// ── Entrada animada ──
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

// ── Salida animada ──
const closePet = () => {
  gsap.to(speechBubbleRef.value, {
    y: -8, opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in',
  })
  gsap.to(petWrapperRef.value, {
    y: 130,
    opacity: 0,
    duration: 0.45,
    ease: 'power2.in',
    delay: 0.1,
    onComplete: () => { isVisible.value = false },
  })
}

// Re-entrada al llamar a la mascota
watch(isVisible, (val) => {
  if (val) playEntrance()
})

onMounted(() => {
  // Cambio de mensaje con fade
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

  // Entrada inicial con delay para no solapar con la carga de la página
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

// ── Selección de mascota ──
const selectPet = (pet: typeof pets[0]) => {
  currentPet.value = pet
  showSelector.value = false
}

const resetPet = () => {
  isVisible.value = true
  dragOffset.value = { x: 0, y: 0 }
  showSelector.value = false
  // watch(isVisible) dispara playEntrance automáticamente
}

// ── Drag & Drop ──
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
  showSelector.value = false

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
  if (!isMoved) showSelector.value = true

  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
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
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
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
  opacity: 0; /* GSAP revela en onMounted */
}

.pet-float-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 4s ease-in-out infinite;
  position: relative;
}

.pet-selector {
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  background-color: var(--color-black);
  border: 2px solid var(--color-accent);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  z-index: 20;
  /* NUEVO: Limita el ancho para que jamás se salga de la pantalla del celular */
  max-width: calc(100vw - 40px);
}

.selector-title {
  color: var(--color-white);
  font-family: var(--font-parkinsans);
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  /* NUEVO: Evita que el título se encoja si falta espacio */
  flex-shrink: 0; 
}

.pet-options {
  display: flex;
  gap: 10px;
  /* NUEVO: Permite scroll horizontal si los iconos no caben */
  overflow-x: auto;
  width: 100%;
  padding-bottom: 5px; 
}

/* NUEVO: Estilos sutiles para la barra de scroll horizontal */
.pet-options::-webkit-scrollbar {
  height: 6px;
}
.pet-options::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.pet-options::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: 4px;
}

.pet-option-img {
  width: 50px;
  height: 50px;
  /* NUEVO: 'flex-shrink: 0' es CLAVE. Obliga al navegador a hacer scroll en lugar de aplastar las imágenes */
  flex-shrink: 0; 
  object-fit: contain;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.05);
  transition: transform 0.2s, background-color 0.2s;
}

.pet-option-img:hover {
  transform: scale(1.15);
  background-color: rgba(255,255,255,0.15);
}
.active-pet {
  background-color: rgba(11, 227, 64, 0.2);
  border: 2px solid var(--color-accent);
}

.speech-bubble {
  position: relative;
  background-color: var(--color-beige);
  color: var(--color-black);
  border-radius: 16px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: clamp(200px, 20vw, 280px);
  min-height: 85px;
  padding: 12px 20px;
  pointer-events: auto;
  opacity: 0; /* GSAP revela después del pet */
}

.bubble-text {
  font-family: var(--font-parkinsans);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 600;
  line-height: 1.4;
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
  width: 26px;
  height: 26px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  z-index: 10;
  pointer-events: auto;
}

.close-btn:hover {
  transform: scale(1.15) rotate(90deg);
}

.pet-image {
  width: clamp(140px, 18vw, 240px);
  height: auto;
  cursor: grab;
  -webkit-user-drag: none;
  user-select: none;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
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
    width: 170px;
    min-height: 70px;
    padding: 10px 15px;
  }

  .pet-image {
    width: 120px;
  }

  .pet-option-img {
    width: 40px;
    height: 40px;
  }
}
</style>
