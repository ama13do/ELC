<template>
  <section class="reel-section" ref="sectionRef">
    
    <div class="reel-header">
      <h2 class="reel-title">
        Participar en la Escuela de Liderazgo Climático es solo el inicio
      </h2>
      <p class="reel-subtitle">
        Conecta con juventudes de todo el país, lidera proyectos reales y sé el motor de la transición energética.
      </p>
    </div>

    <div 
      ref="carouselRef"
      class="reel-carousel scrollbar-hide"
      @mousedown="startDrag"
      @mouseleave="stopDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
    >
      <div 
        v-for="(photo, index) in photoGallery" 
        :key="index" 
        class="photo-wrapper"
      >
        <img 
          :src="photo" 
          alt="Experiencia ELC Hackers por Nuestro Futuro" 
          class="photo-img"
          @dragstart.prevent
        />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

// ── 📸 IMPORTACIÓN EXACTA DE TUS 12 FOTOS ──
// Basado en el listado de archivos provisto (Hackaton y foto x)
import img1 from '../assets/reel/foto 1.jpg'
import img2 from '../assets/reel/foto 2.jpg'
import img3 from '../assets/reel/foto 4.jpg'
import img4 from '../assets/reel/FOTO 6.jpg'
import img5 from '../assets/reel/FOTO 7.jpg'
import img6 from '../assets/reel/Hackaton-19.jpg'
import img7 from '../assets/reel/Hackaton-29.jpg'
import img8 from '../assets/reel/Hackaton-58.jpg'
import img9 from '../assets/reel/Hackaton-60.jpg'
import img10 from '../assets/reel/Hackaton-70.jpg'
import img11 from '../assets/reel/Hackaton-73.jpg'
import img12 from '../assets/reel/Hackaton-75.jpg'

// Arreglo con todas las imágenes listas para iterar
const photoGallery = [
  img1, img2, img3, img4, img5, img6, 
  img7, img8, img9, img10, img11, img12
]

// ── 🖱️ LÓGICA DE ARRASTRE PARA MOUSE (PC) ──
const carouselRef = ref<HTMLElement | null>(null)
let isDown = false
let startX = 0
let scrollLeft = 0

const startDrag = (e: MouseEvent) => {
  if (!carouselRef.value) return
  isDown = true
  // Clase CSS para cambiar el cursor a "agarrando"
  carouselRef.value.classList.add('is-dragging')
  // Posición inicial del clic en relación al contenedor
  startX = e.pageX - carouselRef.value.offsetLeft
  scrollLeft = carouselRef.value.scrollLeft
}

const stopDrag = () => {
  isDown = false
  if (carouselRef.value) {
    carouselRef.value.classList.remove('is-dragging')
  }
}

const onDrag = (e: MouseEvent) => {
  if (!isDown || !carouselRef.value) return
  
  // Previene comportamiento por defecto (seleccionar texto)
  e.preventDefault() 
  
  // Calculamos la distancia movida
  const x = e.pageX - carouselRef.value.offsetLeft
  // Velocidad de scroll multiplicada por 2 (ajústalo si lo sientes rápido)
  const walk = (x - startX) * 2 
  
  // Aplicamos el scroll
  carouselRef.value.scrollLeft = scrollLeft - walk
}

onMounted(() => {
  gsap.context(() => {
    gsap.from('.reel-title', { y: 35, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.reel-subtitle', { y: 25, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 78%', toggleActions: 'play none none none' }
    })
    gsap.from('.photo-wrapper', { y: 30, duration: 0.55, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 72%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
/* ── Contenedor Principal (Full Width) ── */
.reel-section {
  width: 100vw;
  /* Rompe márgenes del layout central para ir de borde a borde */
  margin-left: calc(-50vw + 50%); 
  background-color: var(--color-black);
  padding: clamp(4rem, 8vh, 6rem) 0;
  overflow: hidden;
}

/* ── Encabezado ── */
.reel-header {
  max-width: 900px;
  margin: 0 auto clamp(2.5rem, 5vh, 4rem) auto;
  text-align: center;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reel-title {
  /* Fuente Parkinsans */
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  /* Tamaño responsivo grande */
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

.reel-subtitle {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  margin: 0;
}

/* ── Carrusel Base ── */
.reel-carousel {
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  /* Padding lateral ajustado para móviles/PC */
  padding: 1rem clamp(1.5rem, 5vw, 4rem) 3rem clamp(1.5rem, 5vw, 4rem);
  
  /* Lógica de imán (snap) para trackpad/móvil */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  align-items: center;
  
  /* Cursor de "manita" para PC */
  cursor: grab;
}

/* Ocultar barra de desplazamiento manteniendo funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

/* ── 🔥 ESTADO ACTIVO: Cuando el mouse está arrastrando 🔥 ── */
.reel-carousel.is-dragging {
  cursor: grabbing; /* Manita cerrada */
  /* CRÍTICO PARA EL ARRASTRE DEL MOUSE EN PC: 
     Desactivamos temporalmente el snap y el behavior smooth 
     para que el movimiento responda instantáneamente a la mano */
  scroll-snap-type: none; 
  scroll-behavior: auto;
}

/* ── Tarjetas de Fotos (Wrapper) ── */
.photo-wrapper {
  flex: 0 0 auto;
  /* Tamaños responsivos clamp */
  width: clamp(280px, 40vw, 420px);
  height: clamp(350px, 45vw, 480px);
  scroll-snap-align: center;
  position: relative;
  border-radius: 1.5rem;
  /* Transición suave para los efectos de inclinación (transform) */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Recorta la imagen para llenar el contenedor */
  border-radius: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.15); /* Borde base sutil */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  
  /* Protecciones extra para evitar comportamiento extraño al arrastrar */
  user-select: none;
  -webkit-user-drag: none;
}

/* ── 🎨 FORMATEO BONITO: Colores de la paleta alternados en Hover 🎨 ── */

/* 1. Lógica para alternar colores y rotaciones usando nth-child */

/* Fotos 1, 5, 9... -> Color VERDE ACCENT (#0BE340) e inclinación izq */
.photo-wrapper:nth-child(4n + 1):hover {
  transform: translateY(-10px) rotate(-2deg);
}
.photo-wrapper:nth-child(4n + 1):hover .photo-img {
  border-color: #0BE340;
  box-shadow: 0 15px 35px rgba(11, 227, 64, 0.3); /* Resplandor verde */
}

/* Fotos 2, 6, 10... -> Color AMARILLO (#E0FA49) e inclinación der */
.photo-wrapper:nth-child(4n + 2):hover {
  transform: translateY(-10px) rotate(2deg);
}
.photo-wrapper:nth-child(4n + 2):hover .photo-img {
  border-color: #E0FA49;
  box-shadow: 0 15px 35px rgba(224, 250, 73, 0.3); /* Resplandor amarillo */
}

/* Fotos 3, 7, 11... -> Color AZUL (#2E7DFC) e inclinación sutil izq */
.photo-wrapper:nth-child(4n + 3):hover {
  transform: translateY(-10px) rotate(-1deg);
}
.photo-wrapper:nth-child(4n + 3):hover .photo-img {
  border-color: #2E7DFC;
  box-shadow: 0 15px 35px rgba(46, 125, 252, 0.3); /* Resplandor azul */
}

/* Fotos 4, 8, 12... -> Color ROSA/NARANJA e inclinación sutil der */
.photo-wrapper:nth-child(4n + 4):hover {
  transform: translateY(-10px) rotate(1deg);
}
.photo-wrapper:nth-child(4n + 4):hover .photo-img {
  /* Si tienes configurada una variable --color-orange/pink úsala, si no usa el hex */
  border-color: var(--color-orange, #FF5722); 
  box-shadow: 0 15px 35px rgba(255, 87, 34, 0.3); /* Resplandor naranja */
}

/* ── Responsive Mobile ── */
@media (max-width: 640px) {
  .photo-wrapper {
    width: 260px;
    height: 340px;
  }
}
</style>