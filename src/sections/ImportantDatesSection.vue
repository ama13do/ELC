<template>
  <section class="who-section" ref="sectionRef">

    <!-- Hero edge-to-edge con título abajo-izquierda -->
    <div class="who-hero">
      <img src="../assets/images/why.svg" alt="" class="who-hero-bg" />
      
      <div class="who-hero-text">
        <img 
          :src="aguasImg" 
          alt="Aguas" 
          class="who-aguas-img"
        />
        
        <h2 class="who-title">¿Quién puede<br />participar?</h2>
      </div>
    </div>

    <!-- Cuerpo -->
    <div class="who-body">

      <!-- Card: borde derecho+arriba+abajo, sin izquierdo, círculo azul -->
      <div class="who-card">
        <span class="who-card-dot" />
        <ul class="who-list">
          <li v-for="(item, index) in requirements" :key="index" class="who-item">
            <span class="who-dot" />
            <span class="who-text">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Texto inferior + botón + cierre -->
      <div class="who-footer">
        <p class="who-footer-text">
          ¿No eres estudiante universitario pero quieres sumarte al cambio? Los capítulos
          consolidados en los estados son tu espacio. Escríbenos y encuentra tu capítulo
          estatal más cercano
        </p>
        <BaseButton variant="primary" href="#contacto">CONTACTO</BaseButton>
      </div>

      <h3 class="who-cta">¡Sé parte del Movimiento<br />Hackers por Nuestro Futuro!</h3>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import aguasImg from '../assets/images/aguas.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.who-title', { y: 35, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none reverse' }
    })
    gsap.from('.who-item', { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none reverse' }
    })
    gsap.from('.who-cta', { y: 25, opacity: 0, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 65%', toggleActions: 'play none none reverse' }
    })
  }, sectionRef.value ?? undefined)
})
const requirements = [
  'Jóvenes de entre 18 y 26 años que vivan en México.',
  'Estudiantes universitarixs activos en modalidad presencial, en cualquier carrera y de cualquier universidad mexicana, pública o privada.',
  'Con acceso a un dispositivo electrónico e internet para participar en videollamadas y crear documentos de texto.',
  'Manejo básico de programas como Word, PowerPoint y Drive.',
  'Sin afiliación o militancia a algún partido político.',
  'Con disponibilidad para atender de forma virtual a las sesiones de la ELC del 6 al 31 de julio de 2026, de 7:00 a 9:00 pm (hora CDMX).',
  'Con interés o conocimientos en temas de medio ambiente, crisis climática y/o energías renovables, e intención de ampliarlos.',
  'Con interés por aprender organización colectiva para formar un capítulo universitario y/o integrarse a un capítulo estatal de Hackers por Nuestro Futuro al terminar la capacitación.',
]
</script>

<style scoped>
.who-section {
  width: 100%;
  background-color: var(--color-black);
  overflow: hidden;
}

/* ── Hero ── */
/* ── Hero ── */
.who-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: clamp(680px, 50vw, 800px);
  overflow: hidden;
  /* (Opcional) Si al poner 'contain' quedan bordes negros, 
     puedes descomentar la línea de abajo y poner el color de fondo de tu foto */
  /* background-color: #000; */ 
}

.who-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* CAMBIADO A CONTAIN: Evita el zoom y mantiene el formato original siempre */
  object-fit: contain; 
  object-position: center top;
  display: block;
}

.who-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
  display: flex; /* Añadido para apilar la imagen y el texto */
  flex-direction: column;
  align-items: flex-start;
}

/* ── 💧 ESTILOS PARA LA IMAGEN "AGUAS" 💧 ── */
.who-aguas-img {
  width: clamp(220px, 30vw, 280px); /* Tamaño responsivo */
  margin-bottom: 0.5rem;
  margin-left: -9rem; /* Separación con el título */
  transform: rotate(15deg); /* Inclinación a la izquierda */
  pointer-events: none;
  
  /* Animación de respiración */
  animation: breathe-aguas 4s ease-in-out infinite alternate;
}

/* ── Animación de respiración específica para mantener la rotación ── */
@keyframes breathe-aguas {
  0% {
    transform: rotate(15deg) scale(1);
  }
  100% {
    transform: rotate(15deg) scale(1.08); /* Crece un poquito suavemente */
  }
}

.who-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Body ── */
.who-body {
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 4vh, 3rem);
}

/* ── Card: C abierta a la izquierda ── */
.who-card {
  position: relative;
  width: 100%;
  background-color: var(--color-black);
  border-top:    1.5px solid var(--color-blue);
  border-right:  1.5px solid var(--color-blue);
  border-bottom: 1.5px solid var(--color-blue);
  border-left:   none;
  border-radius: 0 0.9rem 0.9rem 0;
  padding: 2rem 1.8rem 2rem 1.6rem;
  margin-top: 0.6rem;
}

.who-card-dot {
  position: absolute;
  top: -0.6rem;
  left: -0.6rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: var(--color-blue);
}

/* ── Lista ── */
.who-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.who-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.who-dot {
  flex-shrink: 0;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background-color: var(--color-blue);
  margin-top: 0.38rem;
}

.who-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  line-height: 1.65;
}

/* ── Footer ── */
.who-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  width: 100%;
}

.who-footer-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  line-height: 1.7;
  max-width: 560px;
  margin: 0;
}

/* ── CTA final ── */
.who-cta {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .who-body {
    padding: 2rem 1.2rem;
  }

  .who-card {
    padding: 1.6rem 1.2rem 1.6rem 1.2rem;
  }
}
</style>