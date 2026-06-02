<template>
  <div class="sessions-wrapper" ref="sectionRef">
    
    <div class="sessions-banner">
      <h2 class="sessions-title">ESPACIO LIBRE DE<br />PARTIDOS POLÍTICOS</h2>
      <img 
        :src="partidosIcon" 
        alt="" 
        class="sessions-partidos-icon" 
      />
    </div>

    <section class="sessions-section">
      <img src="../assets/images/sesiones.svg" alt="" class="sessions-bg" />

      <img 
        :src="hojasImg" 
        alt="Hojas al viento" 
        class="hojas-viento"
      />

      <div class="sessions-content">
        <p class="sessions-body">
          Las sesiones de la ELC se realizarán de manera virtual del
          <strong>6 al 31 de julio</strong>, de 7:00 a 9:00 pm (hora CDMX) entre
          las cuales se revisarán los siguientes temas en 2 fases.
        </p>
      </div>
    </section>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import hojasImg from '../assets/images/hojas.png'
// 1. Importamos el nuevo icono
import partidosIcon from '../assets/images/partidos.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    
    // 2. Actualizamos la animación para que afecte a todos los hijos del banner con stagger
    gsap.from('.sessions-banner > *', { 
      y: 35, 
      duration: 0.8, 
      ease: 'power3.out',
      stagger: 0.15, // Pequeño retraso entre el título y el icono
      scrollTrigger: { 
        trigger: sectionRef.value, 
        start: 'top 80%', 
        toggleActions: 'play none none none' 
      }
    })

    gsap.from('.sessions-body', { y: 25, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
/* ── 1. Contenedor Principal ── */
.sessions-wrapper {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
}

/* ── 2. Banner Negro Actualizado ── */
.sessions-banner {
  background-color: var(--color-black);
  width: 100%;
  /* Aumentamos un poco el padding vertical para acomodar el icono */
  padding: clamp(2.5rem, 6vh, 4rem) 1.5rem;
  display: flex;
  flex-direction: column; /* Apilamos elementos verticalmente */
  justify-content: center;
  align-items: center;
  gap: 1.5rem; /* Espaciado entre el texto y el icono */
}

.sessions-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(1.5rem, 3vw, 2.5rem); 
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 1.4;
  margin: 0;
}

/* ── Estilos para el nuevo Icono de Partidos ── */
.sessions-partidos-icon {
  height: clamp(80px, 15vw, 160px); /* Tamaño responsivo */
  width: auto;
  object-fit: contain;
  display: block;
  pointer-events: none;
}

/* ── 3. Sección de la Imagen ── */
.sessions-section {
  position: relative;
  width: 100%;
  min-height: 80vh; 
  overflow: hidden;
  display: flex;
  align-items: flex-end; 
}

.sessions-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* ── 🍃 HOJAS Y ANIMACIÓN DE VIENTO 🍃 ── */
.hojas-viento {
  position: absolute;
  top: 15%; 
  right: -2%; 
  width: 200px; 
  z-index: 15;
  pointer-events: none; 
  transform-origin: top right;
  animation: viento 5s ease-in-out infinite alternate;
}

@keyframes viento {
  0% { transform: rotate(0deg); }
  30% { transform: rotate(-6deg); }
  70% { transform: rotate(3deg); }
  100% { transform: rotate(0deg); }
}

/* ── Contenido de Sesiones ── */
.sessions-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.sessions-body {
  font-family: var(--font-parkinsans);
  font-weight: 300;
  color: var(--color-white);
  font-size: clamp(1.5rem, 1.6vw, 1.1rem);
  line-height: 1.75;
  margin: 0;
  max-width: 480px;
}

.sessions-body strong {
  font-weight: 700;
}

/* ── Responsive ── */
@media (min-width: 768px) {
  .hojas-viento {
    width: 380px;
    top: 10%;
    right: 2%;
  }
}

@media (max-width: 640px) {
  .sessions-banner {
    padding: 2.5rem 1rem;
    gap: 1rem; /* Reducimos el espacio en móvil */
  }
  
  .sessions-title {
    font-size: 1.25rem; 
  }

  .sessions-body {
    font-size: 0.9rem;
    max-width: 100%;
  }
}
</style>