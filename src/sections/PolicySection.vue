<template>
  <section class="policy-section" ref="sectionRef">

    <!-- Hero edge-to-edge -->
    <div class="policy-hero">
      <img src="../assets/images/POLICY.svg" alt="" class="policy-hero-bg" />
      
      <!-- 🔄 STICKER IZQUIERDO (Renovará) 🔄 -->
      <img 
        :src="renovaraImg" 
        alt="Renovará" 
        class="sticker-renovara" 
      />

      <!-- ☀️ STICKER DERECHO (Solecito) ☀️ -->
      <img 
        :src="solecitoImg" 
        alt="Solecito" 
        class="sticker-solecito" 
      />

      <div class="policy-hero-text">
        <h2 class="policy-title">Política de<br />diversidad e inclusión</h2>
      </div>
    </div>

    <!-- Texto -->
    <div class="policy-body">
      <p class="policy-text">
        Invitamos particularmente a mujeres, personas de comunidades indígenas y
        afrodescendientes, personas de la comunidad LGBTIQ+, personas con discapacidad
        o pertenecientes a otro grupo históricamente excluidos a postular a esta
        convocatoria en ánimos de conformar un grupo que represente la diversidad del
        país e incluir todas las perspectivas posibles, en el marco de respeto de
        derechos humanos, dentro del Movimiento.
      </p>

      <p class="policy-note">
        Comunícate con nosotrxs o pídele a una persona de confianza que lo haga por ti
        si consideras la necesidad de algún ajuste de accesibilidad para tu postulación.
        Escríbenos a
        <a href="mailto:hxnf@practica.lat" class="policy-email">hxnf@practica.lat</a>
        antes del 22 de junio.
      </p>
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
    gsap.from('.policy-title', { y: 35, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none reverse' }
    })
    gsap.from('.policy-body, .policy-text, .policy-note', { y: 25, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none reverse' }
    })
  }, sectionRef.value ?? undefined)
})

import renovaraImg from '../assets/images/renovara.png'
import solecitoImg from '../assets/images/Solecito.png'
</script>

<style scoped>
.policy-section {
  width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

/* ── Hero ── */
.policy-hero {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  /* Quitamos el height para que la imagen dicte la altura, 
     así no hay recortes ni franjas negras */
  overflow: hidden;
}

.policy-hero-bg {
  width: 100%;
  height: auto; /* Mantiene su proporción original perfecta de lado a lado */
  display: block;
}

.policy-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
}

.policy-title {
  font-family: var(--font-parkinsans);
  font-weight: 650;
  color: var(--color-white);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── 🔄 STICKER RENOVARÁ (Izquierda) ── */
.sticker-renovara {
  position: absolute;
  /* Un poco por encima de la mitad */
  top: 15%; 
  /* Separado del margen izquierdo */
  left: 6%; 
  width: clamp(140px, 25vw, 280px); /* Algo grande y responsivo */
  z-index: 15;
  pointer-events: none;
  /* Animación de crecer/decrecer */
  animation: pulse-renovara 4s ease-in-out infinite alternate;
}

@keyframes pulse-renovara {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.08); /* Crece suavemente un 8% */
  }
}

/* ── ☀️ STICKER SOLECITO (Derecha) ── */
.sticker-solecito {
  position: absolute;
  /* Un poquito arriba del borde inferior */
  bottom: 15%; 
  /* Salido ligeramente por el lado derecho */
  right: -1.5rem; 
  width: clamp(100px, 15vw, 170px);
  z-index: 15;
  pointer-events: none;
  /* Animación de giro constante */
  animation: spin-slow-solecito 15s linear infinite;
}

@keyframes spin-slow-solecito {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ── Texto ── */
.policy-body {
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vh, 4.5rem) clamp(1.5rem, 6vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.policy-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.8;
  margin: 0;
}

.policy-note {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  font-size: clamp(0.85rem, 1.2vw, 0.95rem);
  line-height: 1.75;
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.policy-email {
  color: var(--color-accent);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  /* Ajustes para los stickers en pantallas pequeñas */
  .sticker-renovara {
    top: 20%;
    left: 4%;
  }
  
  .sticker-solecito {
    bottom: 25%; /* Lo subimos un poco para que no choque con el texto si la foto es muy alta */
    right: -1rem;
  }
}

@media (max-width: 480px) {
  .policy-body {
    padding: 2rem 1.2rem;
    text-align: left;
  }
}
</style>