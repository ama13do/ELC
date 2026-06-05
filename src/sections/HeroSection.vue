<template>
  <section class="hero-section">

    <div class="hero-inner">

      <!-- Columna izquierda: texto -->
      <div class="hero-content">
        <h1 class="hero-title">
          Escuela de<br />Liderazgo Climático
        </h1>

        <p class="hero-body">
          ¿Estás listx para
          <span class="hero-highlight">formar parte de un movimiento nacional</span>
          que desarrolla propuestas concretas para enfrentar la crisis climática?
        </p>

        <div class="hero-buttons">
          <BaseButton variant="primary" href="https://es.surveymonkey.com/r/hxnf2026">REGÍSTRATE AQUÍ</BaseButton>
          <BaseButton variant="secondary" href="https://nuestrofuturo.mx/hxnf">QUIÉNES SOMOS</BaseButton>
        </div>
      </div>

      <!-- Columna derecha: sticker -->
      <div class="hero-image-wrapper" aria-hidden="true">
        <img src="../assets/images/PG1.webp" alt="" class="hero-image" />
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero-title',         { y: 60, duration: 0.9 })
    .from('.hero-body',          { y: 40, duration: 0.7 }, '-=0.5')
    .from('.hero-buttons > *',   { y: 30, stagger: 0.15, duration: 0.6 }, '-=0.4')
    .from('.hero-image-wrapper', { scale: 0.75, rotation: -18, duration: 1.2, ease: 'back.out(1.7)' }, 0.15)

  const mm = gsap.matchMedia()

  mm.add('(min-width: 641px)', () => {
    gsap.to('.hero-image-wrapper', {
      y: -80, rotation: 10,
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 2 },
    })
    gsap.to('.hero-buttons', {
      y: -20,
      scrollTrigger: { trigger: '.hero-section', start: '25% top', end: '65% top', scrub: 1.2 },
    })
    gsap.to('.hero-content', {
      y: -50,
      scrollTrigger: { trigger: '.hero-section', start: '40% top', end: 'bottom top', scrub: 1.5 },
    })
  })

  mm.add('(max-width: 640px)', () => {
    gsap.to('.hero-image-wrapper', {
      opacity: 0,
      scrollTrigger: { trigger: '.hero-section', start: '20% top', end: '60% top', scrub: 1 },
    })
    gsap.to('.hero-buttons', {
      y: -10,
      scrollTrigger: { trigger: '.hero-section', start: '30% top', end: '72% top', scrub: 1 },
    })
  })
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  background-color: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* ── Hero layout — dos columnas en desktop ── */
.hero-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8rem clamp(1.5rem, 6vw, 5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

/* ── Columna izquierda ── */
.hero-content {
  flex: 1;
  max-width: 580px;
  min-width: 0;
}

/* ── Columna derecha: sticker ── */
.hero-image-wrapper {
  flex-shrink: 0;
  width: clamp(160px, 22vw, 300px);
  z-index: 5;
  pointer-events: none;
  animation: stickerFloat 5s ease-in-out infinite;
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

@keyframes stickerFloat {
  0%, 100% { transform: rotate(-2deg); }
  50%       { transform: translateY(-14px) rotate(1.5deg); }
}

/* ── Título ── */
.hero-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: #fff;
  line-height: 1.05;
  margin: 0 0 2.5rem;
  font-size: clamp(2.1rem, 7vw, 5.3rem);
  letter-spacing: -0.02em;
}

/* ── Cuerpo ── */
.hero-body {
  font-family: var(--font-parkinsans);
  font-weight: 300;
  color: #fff;
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  line-height: 1.65;
  margin: 0 0 3rem;
  max-width: 500px;
}

.hero-highlight {
  color: #0BE340;
  font-weight: 600;
}

/* ── Botones ── */
.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── Responsive: mobile ── */
@media (max-width: 640px) {
  .hero-section {
    align-items: flex-start;
    min-height: auto;
  }

  .hero-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 5.5rem 1.5rem 2.5rem;
  }

  .hero-content {
    width: 100%;
    max-width: 100%;
  }

  .hero-image-wrapper {
    position: absolute;
    top: 7rem;
    right: 1rem;
    width: clamp(80px, 22vw, 110px);
    animation: stickerFloatMobile 5s ease-in-out infinite;
  }

  @keyframes stickerFloatMobile {
    0%, 100% { transform: rotate(-2deg); }
    50%       { transform: translateY(-8px) rotate(1.5deg); }
  }

  .hero-title {
    font-size: clamp(2.2rem, 10.5vw, 3rem);
    margin: 0 0 1.5rem;
    padding-right: clamp(90px, 24vw, 120px);
  }

  .hero-body {
    font-size: 0.95rem;
    margin: 0 0 2rem;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }
}
</style>
