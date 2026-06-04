<script setup lang="ts">
import { onMounted, ref } from 'vue'
import stickerTrans from '../assets/images/trans.webp'
import stickerHxnf from '../assets/images/StickerHXNF.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {

    gsap.from('.esperar-title', {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-hero',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.esperar-lead', {
      y: 35, duration: 0.75, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.esperar-body', {
      y: 30, duration: 0.65, ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.esperar-img-wrapper', {
      x: 40, duration: 0.85, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })

  }, sectionRef.value ?? undefined)
})
</script>

<template>
  <section class="esperar-section" ref="sectionRef">

    <!-- Bloque superior: imagen hero edge-to-edge con título abajo-izquierda -->
    <div class="esperar-hero">
      <img src="../assets/images/esperar.webp" alt="" class="esperar-hero-bg" />
      <img 
        :src="stickerTrans" 
        alt="" 
        class="sticker-left"
      />
      <img 
        :src="stickerHxnf" 
        alt="" 
        class="sticker-right"
      />
      
      <div class="esperar-hero-inner">
        <div class="esperar-hero-text">
          <h2 class="esperar-title">¿Qué esperar al final<br />de la ELC?</h2>
        </div>
      </div>
    </div>

    <!-- Bloque inferior: texto izquierda + imagen derecha -->
    <div class="esperar-bottom">

      <div class="esperar-copy">
        <p class="esperar-lead">
          <strong>El verdadero resultado de la ELC no es un diploma,</strong>
          sino la creación o fortalecimiento de un capítulo universitario con capacidad de
          propuesta, articulación territorial e incidencia en la política energética de su región.
        </p>

        <p class="esperar-body">
          <strong>No lo harás solx.</strong> Contarás con el acompañamiento del equipo de
          coordinación de HxNF, acceso a la red de capítulos en 10 estados, y la posibilidad
          de conectar tu trabajo local con plataformas nacionales de incidencia climática.
        </p>

        <p class="esperar-body">
          Una vez que tu capítulo esté en pie, podrás proponer proyectos propios (desde
          proyectos energéticos, auditorías energéticas comunitarias, hasta intervenciones
          culturales y procesos participativos) con el respaldo de mentorxs especializadxs y
          una comunidad con experiencia construyendo la transición energética justa en México.
        </p>
      </div>

      
      <div class="esperar-img-wrapper">
        <img src="../assets/images/resultado.webp" alt="" class="esperar-img" />
      </div>

    </div>
  </section>
</template>


<style scoped>
@keyframes sticker-shine {
  0%, 100% {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)) brightness(1);
  }
  50% {
    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.8)) brightness(1.25);
  }
}

/* ── Stickers corregidos: más grandes y reposicionados ── */
.sticker-left {
  position: absolute;
  /* Más abajo y pegado a la izquierda */
  top: clamp(2rem, 8vw, 6rem);
  left: clamp(-1rem, 2vw, 2rem);
  /* Mucho más grande */
  width: clamp(145px, 28vw, 300px);
  z-index: 5;
  pointer-events: none;
  animation: sticker-shine 4s ease-in-out infinite;
}

.sticker-right {
  position: absolute;
  top: 3%;
  right: -2rem;
  /* Mucho más grande */
  width: clamp(150px, 32vw, 350px);
  z-index: 5;
  pointer-events: none;
  transform: rotate(-8deg);
  animation: sticker-shine 4s ease-in-out infinite;
  animation-delay: 2s;
}

.esperar-section {
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

/* ── Hero: edge-to-edge ── */
.esperar-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: clamp(320px, 55vw, 750px);
  overflow: hidden;
}

.esperar-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.esperar-hero-inner {
  position: absolute;
  inset: 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.esperar-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
}

.esperar-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Bloque inferior corregido ── */
.esperar-bottom {
  display: flex;
  /* CLAVE: Obliga a la columna de la foto a medir exactamente lo mismo que el texto */
  align-items: stretch; 
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 0 0 clamp(1.5rem, 6vw, 5rem);
}

/* ── Copy ── */
.esperar-copy {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1;
  max-width: 620px;
  padding-bottom: clamp(2rem, 5vh, 4rem);
  padding-right: 2rem;
}

.esperar-lead {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: var(--color-white);
  font-size: clamp(1rem, 2.2vw, 3rem);
  line-height: 1.65;
  margin: 0;
}

.esperar-lead strong {
  color: #0BE340;
  font-weight: 700;
}

.esperar-body {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.8);
  font-size: clamp(0.85rem, 1.5vw, 2rem);
  line-height: 1.75;
  margin: 0;
}

.esperar-body strong {
  color: var(--color-white);
  font-weight: 700;
}

/* ── Imagen derecha corregida ── */
.esperar-img-wrapper {
  /* Le damos buen ancho para que al hacer 'cover' no recorte tanto los lados */
  width: clamp(280px, 40vw, 550px);
  flex-shrink: 0;
  margin-right: calc(50% - 50vw); 
  display: block;
}

.esperar-img {
  width: 100%;
  /* CLAVE: Toma el 100% de la altura de la sección */
  height: 100%; 
  /* CLAVE: Llena todo sin dejar huecos negros */
  object-fit: cover; 
  /* CLAVE: Protege a las personas anclando la foto abajo a la izquierda */
  object-position: left bottom; 
  display: block;
}

/* ── Responsive ── */
/* ── Responsive ── */
@media (max-width: 768px) {

  /* NUEVO: Ajuste de stickers solo para móvil */
  .sticker-left {
    /* Lo empujamos más a la izquierda */
    left: -3.5rem; 
  }

  .sticker-right {
    /* Lo subimos bastante (antes estaba en 35%) */
    top: 10%; 
    right: -1rem;
  }
  .esperar-bottom {
    flex-direction: row;
    /* CLAVE en móvil: Ambas columnas se estiran a la misma altura */
    align-items: stretch; 
    padding-right: 0;
    padding-bottom: 0;
    gap: 0;
  }

  .esperar-copy {
    flex: 1;
    min-width: 0;
    padding-left: 1.2rem;
    padding-bottom: 1.5rem;
    padding-right: 0.5rem;
  }

  .esperar-lead {
    font-size: 0.82rem;
  }

  .esperar-body {
    font-size: 0.75rem;
  }

  .esperar-img-wrapper {
    margin-top: 0;
    /* Le damos casi la mitad de la pantalla (45vw) para que no sea un hilo delgado */
    width: 45vw; 
    flex-shrink: 0;
    margin-right: -0.5rem;
  }

  .esperar-img-wrapper .esperar-img {
    width: 100%;
    /* Altura total obligatoria */
    height: 100%; 
    /* Cubre el espacio y salva a la gente de ser recortada */
    object-fit: cover;
    object-position: left bottom;
  }
}
</style>