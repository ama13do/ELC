<script setup lang="ts">
import { onMounted, ref } from 'vue'
import stickerTrans from '../assets/images/trans.png'
import stickerHxnf from '../assets/images/StickerHXNF.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {

    gsap.from('.esperar-title', {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-hero',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.esperar-lead', {
      y: 35, opacity: 0, duration: 0.75, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.esperar-body', {
      y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.esperar-img-wrapper', {
      x: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.esperar-bottom',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

  }, sectionRef.value ?? undefined)
})
</script>

<template>
  <section class="esperar-section" ref="sectionRef">

    <!-- Bloque superior: imagen hero edge-to-edge con título abajo-izquierda -->
    <div class="esperar-hero">
      <img src="../assets/images/esperar.svg" alt="" class="esperar-hero-bg" />
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
      <div class="esperar-hero-text">
        <h2 class="esperar-title">¿Qué esperar al final<br />de la ELC?</h2>
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
        <img src="../assets/images/resultado.png" alt="" class="esperar-img" />
      </div>

    </div>
  </section>
</template>


<style scoped>
@keyframes sticker-shine {
  0%, 100% {
    /* Estado normal con una sombrita base */
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)) brightness(1);
  }
  50% {
    /* Aumenta el brillo y crea un resplandor blanco a su alrededor */
    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.8)) brightness(1.25);
  }
}
.sticker-left {
  position: absolute;
  top: -2rem;
  left: auto;
  right: -6rem;
  width: clamp(160px, 22vw, 220px);
  z-index: 5;
  pointer-events: none;
  animation: sticker-shine 4s ease-in-out infinite;
}

.sticker-right {
  position: absolute;
  top: 35%;
  right: -5rem;
  width: clamp(120px, 16vw, 170px);
  z-index: 5;
  pointer-events: none;
  transform: rotate(-8deg);
  animation: sticker-shine 4s ease-in-out infinite;
  animation-delay: 2s;
}

/* ── Ajustes Responsivos para los Stickers ── */
@media (max-width: 640px) {
  .sticker-left {
    width: clamp(100px, 28vw, 140px);
    right: -3.5rem;
    top: -1rem;
  }

  .sticker-right {
    width: clamp(80px, 20vw, 110px);
    right: -2.5rem;
    top: 40%;
  }
}
.esperar-section {
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

/* ── Hero: edge-to-edge, título abajo-izquierda ── */
.esperar-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: clamp(320px, 55vw, 600px);
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

/* ── Bloque inferior ── */
.esperar-bottom {
  display: flex;
  align-items: flex-end; /* Alinea los elementos pegados hasta abajo */
  justify-content: space-between; /* Manda la imagen hasta la derecha */
  max-width: 1200px;
  margin: 0 auto;
  /* Padding: quitamos el de abajo y el de la derecha para que la imagen toque los bordes */
  padding: clamp(2.5rem, 5vh, 4rem) 0 0 clamp(1.5rem, 6vw, 5rem);
}

/* ── Copy ── */
.esperar-copy {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1; /* Ocupa el espacio restante izquierdo */
  max-width: 620px;
  /* Le devolvemos el padding de abajo solo al texto para que no quede pegado al piso */
  padding-bottom: clamp(3rem, 6vh, 5rem);
  padding-right: 2rem; /* Separación con la imagen */
}

.esperar-lead {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: var(--color-white);
  font-size: clamp(1rem, 1.8vw, 1.25rem);
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
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  line-height: 1.75;
  margin: 0;
}

.esperar-body strong {
  color: var(--color-white);
  font-weight: 700;
}

/* ── Imagen derecha ── */
.esperar-img-wrapper {
  /* "Algo grandecita y responsiva" */
  width: clamp(260px, 42vw, 500px);
  flex-shrink: 0;
  /* Sin bordes redondeados */
  border-radius: 0;
  
  /* Para que sea un poco más alta que el div de a lado, la estiramos desde arriba */
  margin-top: -3rem; 
  
  /* Truco para que pegue completamente a la derecha de la pantalla en PC grandes */
  margin-right: calc(50% - 50vw); 
  
  display: flex;
}

.esperar-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: bottom left; /* La anclamos abajo para que no flote */
  display: block;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .esperar-bottom {
    flex-direction: row;
    align-items: center;
    padding-right: 0;
    padding-bottom: 0;
    gap: 0;
  }

  .esperar-copy {
    flex: 1;
    min-width: 0;
    padding-left: 1.2rem;
    padding-bottom: 1.5rem;
    padding-right: 0.75rem;
  }

  .esperar-lead {
    font-size: 0.82rem;
  }

  .esperar-body {
    font-size: 0.75rem;
  }

  .esperar-bottom {
    align-items: stretch;
  }

  .esperar-img-wrapper {
    margin-top: 0;
    width: clamp(80px, 26vw, 130px);
    flex-shrink: 0;
    margin-right: -0.5rem;
    align-self: stretch;
  }

  .esperar-img-wrapper .esperar-img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>