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
      class="pet-draggable-wrapper"
      :style="{ transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)` }"
    >
      <div class="pet-float-wrapper">
        
        <div class="speech-bubble">
          <button class="close-btn" @click="isVisible = false" aria-label="Cerrar">✕</button>
          
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── IMPORTACIÓN DE LAS 4 MASCOTAS ──
import panelinImg from '../assets/pets/Panelin.png'
import nubecinImg from '../assets/pets/Nubecin.png'
import hidraulinImg from '../assets/pets/Hidraulin.png'
import abaniquinImg from '../assets/pets/Abaniquin.png'

// ── ESTADO Y DATOS ──
const isVisible = ref(true)
const showSelector = ref(false)

const pets = [
  { id: 'panelin', src: panelinImg, name: 'Panelín' },
  { id: 'nubecin', src: nubecinImg, name: 'Nubecín' },
  { id: 'hidraulin', src: hidraulinImg, name: 'Hidraulín' },
  { id: 'abaniquin', src: abaniquinImg, name: 'Abaniquín' }
]

const currentPet = ref(pets[0])

const messages = [
  '¡Hola! 👋 ¿Ya te registraste en la Escuela de Liderazgo Climático? ¡Te estamos esperando!',
  'La transición energética necesita tu voz. ⚡ ¡Inscríbete hoy mismo!',
  '¿Listx para hacer historia? Revisa las bases y postúlate. 🚀',
  'Cualquier duda con tu registro, escríbenos a <br><a href="mailto:hxnf@practica.lat" class="pet-link">hxnf@practica.lat</a> ✉️',
  'Conoce más de nuestro movimiento en Instagram: <br><a href="https://www.instagram.com/Hackersxnf/" target="_blank" class="pet-link">@Hackersxnf</a> 📱',
  '¡No lo dejes para el último día! Completa tu postulación con tiempo. ⏳',
  '¿Tienes dudas sobre la convocatoria? ¡Mándanos un DM a <a href="https://www.instagram.com/Hackersxnf/" target="_blank" class="pet-link">nuestro IG</a>!',
  'Únete a la red de juventudes por el clima. 🌱 ¡Tu participación es clave!'
]

const currentMessage = ref(messages[0])
let messageInterval: number | null = null

// Cambiar mensaje cada 5 segundos
onMounted(() => {
  messageInterval = window.setInterval(() => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    currentMessage.value = messages[randomIndex]
  }, 7000)
})

onBeforeUnmount(() => {
  if (messageInterval) clearInterval(messageInterval)
})

// ── LÓGICA DE SELECCIÓN ──
const selectPet = (pet: any) => {
  currentPet.value = pet
  showSelector.value = false
}

const resetPet = () => {
  isVisible.value = true
  dragOffset.value = { x: 0, y: 0 } // La regresa a su esquina original
  showSelector.value = false
}

// ── LÓGICA DE ARRASTRE (DRAG & DROP) Y CLIC ──
const dragOffset = ref({ x: 0, y: 0 })
let isDragging = false
let isMoved = false // Para diferenciar entre un "Clic" y un "Arrastre"
let dragStartX = 0
let dragStartY = 0
let initialOffsetX = 0
let initialOffsetY = 0

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging = true
  isMoved = false
  showSelector.value = false // Oculta el menú si empiezas a moverla

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

  // Si se mueve más de 5 píxeles, ya lo consideramos un arrastre y no un clic
  if (Math.abs(clientX - dragStartX) > 5 || Math.abs(clientY - dragStartY) > 5) {
    isMoved = true
    // Evita el scroll en móviles mientras la arrastras
    if ('touches' in e && e.cancelable) e.preventDefault() 
  }

  dragOffset.value.x = initialOffsetX + (clientX - dragStartX)
  dragOffset.value.y = initialOffsetY + (clientY - dragStartY)
}

const stopDrag = () => {
  isDragging = false
  
  // Si se soltó pero casi no se movió, ¡fue un clic! Abrimos el selector.
  if (!isMoved) {
    showSelector.value = true
  }

  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}
</script>

<style scoped>
/* ── Botón de Invocar (Aparece cuando la mascota se cierra) ── */
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

/* ── Contenedor Arrastrable ── */
.pet-draggable-wrapper {
  position: fixed;
  /* Posición inicial por defecto */
  bottom: 25px;
  right: 25px;
  z-index: 9999;
  touch-action: none; /* CRÍTICO: Permite arrastrar en móviles sin scrollear la página */
}

/* ── Animación Flotante ── */
.pet-float-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 4s ease-in-out infinite; /* Un poco más lenta para verse más natural */
  position: relative;
}

/* ── Selector de Mascotas (Menú emergente) ── */
.pet-selector {
  position: absolute;
  bottom: 100%; /* Aparece justo arriba de la mascota */
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
}

.selector-title {
  color: var(--color-white);
  font-family: var(--font-parkinsans);
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.pet-options {
  display: flex;
  gap: 10px;
}

.pet-option-img {
  width: 50px;
  height: 50px;
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
  background-color: rgba(11, 227, 64, 0.2); /* Verde de tu paleta */
  border: 2px solid var(--color-accent);
}

/* ── Burbuja de diálogo ── */
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
  
  /* TAMAÑOS PC: ¡Más grandes según lo pedido! */
  width: clamp(200px, 20vw, 280px);
  min-height: 85px;
  padding: 12px 20px;
  pointer-events: auto; /* Para que si arrastras desde el texto, no interfiera */
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
  color: var(--color-blue); /* Usa tu azul o cámbialo a verde si prefieres (#0BE340) */
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

/* ── Botón de Cerrar (X) ── */
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
  pointer-events: auto; /* Reactivamos los clicks para el botón */
}

.close-btn:hover {
  transform: scale(1.15) rotate(90deg);
}

/* ── Mascota ── */
.pet-image {
  /* TAMAÑO PC: Crece según la pantalla y es más grande que antes */
  width: clamp(140px, 18vw, 240px);
  height: auto;
  /* El cursor cambia a la manita que agarra */
  cursor: grab;
  /* CRÍTICO: Previene el efecto fantasma azul al arrastrar imágenes */
  -webkit-user-drag: none;
  user-select: none;
  /* Suaviza un poco la imagen */
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
}

.pet-image:active {
  cursor: grabbing;
}

/* ── Animación Flotante ── */
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

/* ── RESPONSIVE: MÓVILES ── */
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
    width: 120px; /* Sigue siendo responsiva, pero cómoda en el teléfono */
  }

  .pet-option-img {
    width: 40px;
    height: 40px;
  }
}
</style>