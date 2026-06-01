<template>
  <section class="experience-section" ref="sectionRef">

    <!-- Hero edge-to-edge con título abajo-izquierda -->
    <div class="experience-hero">
      <img src="../assets/images/EXPERIENCE.svg" alt="" class="experience-hero-bg" />
      
      <img 
        :src="stickerMasIdeas" 
        alt="Más Ideas" 
        class="sticker-top-right" 
      />

      <div class="experience-hero-text">
        <img 
          :src="stickerHxnf" 
          alt="Sticker HXNF" 
          class="sticker-bottom-left" 
        />
        
        <h2 class="experience-title">¿Qué obtengo<br />de esta experiencia?</h2>
      </div>
    </div>

    <!-- Card con borde naranja, sin lado izquierdo -->
    <div class="experience-body">
      <div class="experience-card">
        <span class="experience-dot" />
        <ul class="experience-list">
          <li v-for="(item, index) in benefits" :key="index" class="experience-item">
            <span class="item-dot" />
            <span class="item-text">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.experience-title', { y: 35, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.experience-item', { y: 25, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})

import stickerHxnf from '../assets/images/StickerHXNF.png'
import stickerMasIdeas from '../assets/images/Mas Ideas.png'
const benefits = [
  'Conocer a personas jóvenes de tu estado y de todo el país interesadas en acelerar la adopción de energías renovables en el país de forma creativa e interdisciplinaria.',
  'Pláticas con personas líderes de la transición energética justa en México.',
  'Un reconocimiento de participación en la Escuela de Liderazgo Climático.',
  'Incorporarse al Movimiento Hackers por Nuestro Futuro, a través de la creación de tu propio capítulo universitario.',
  'Contar con orientación del equipo de coordinación del Movimiento y el apoyo de la red ampliada de alianzas para impulsar iniciativas desde tu capítulo.',
  'La posibilidad de convertirse en vocerx de las propuestas y actividades de tu capítulo frente a tu universidad, medios de comunicación, líderes de opinión y tomadores de decisiones para impulsar la adopción de una transición energética justa a nivel local y nacional.',
]
</script>

<style scoped>
.experience-section {
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

/* ── Hero ── */
.experience-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  
  overflow: hidden;
}

.experience-hero-bg {
  
  inset: 0;
  width: 100%;
  height: 100%;
  /* CAMBIO AQUÍ: 'contain' evita el zoom y mantiene el formato intacto */

  object-position: center top;
  display: block;
}

.experience-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
  /* Convertimos esto en flex para apilar el sticker y el título */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* ── 🔵 STICKER HXNF (Inferior Izquierdo) ── */
.sticker-bottom-left {
  width: clamp(150px, 22vw, 240px); /* Grande y responsivo */
  margin-bottom: 0.5rem;
  /* El margen negativo lo saca un poco hacia la izquierda del marco */
  margin-left: -2.5rem; 
  /* Inclinación hacia la derecha */
  transform: rotate(-12deg); 
  pointer-events: none;
  animation: destello-espejo 6s linear infinite;
}

/* ── 💡 STICKER MÁS IDEAS (Superior Derecho) ── */
.sticker-top-right {
  position: absolute;
  top: 8%;
  right: 1.5rem; /* Un poco salido del marco hacia la derecha */
  width: clamp(140px, 20vw, 220px); /* Grande y responsivo */
  /* Inclinación hacia la derecha */
  transform: rotate(-10deg); 
  z-index: 15;
  pointer-events: none;
  animation: destello-espejo 6s linear infinite;
  animation-delay: .5s;
}

.experience-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Ajustes móviles para los stickers ── */
@media (max-width: 640px) {
  .sticker-bottom-left {
    margin-left: -1rem; /* Que no se salga tanto en celular */
  }
  .sticker-top-right {
    top: 5%;
    right: -1rem;
  }
}

/* ── Body ── */
.experience-body {
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 6vw, 5rem);
}

/* ── Card: C abierta a la izquierda, color naranja ── */
.experience-card {
  position: relative;
  background-color: var(--color-black);
  border-top:    1.5px solid var(--color-orange);
  border-right:  1.5px solid var(--color-orange);
  border-bottom: 1.5px solid var(--color-orange);
  border-left:   none;
  border-radius: 0 0.9rem 0.9rem 0;
  padding: 2rem 1.8rem 2rem 1.6rem;
  margin-top: 0.6rem;
}

.experience-dot {
  position: absolute;
  top: -0.6rem;
  left: -0.6rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: var(--color-orange);
}

/* ── Lista ── */
.experience-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.experience-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.item-dot {
  flex-shrink: 0;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background-color: var(--color-orange);
  margin-top: 0.38rem;
}

.item-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  line-height: 1.65;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .experience-body {
    padding: 2rem 1.2rem;
  }

  .experience-card {
    padding: 1.6rem 1.2rem 1.6rem 1.2rem;
  }
}
/* ── ✨ ANIMACIÓN DE DESTELLO TIPO ESPEJO ✨ ── */
@keyframes destello-espejo {
  0%, 40% {
    filter: brightness(1) contrast(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  }
  50% {
    /* El momento exacto donde la luz pega en el espejo */
    filter: brightness(1.4) contrast(1.15) drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
  60%, 100% {
    filter: brightness(1) contrast(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  }
}
</style>