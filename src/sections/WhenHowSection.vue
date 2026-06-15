<template>
  <section class="compare-section" ref="sectionRef">

    <p class="compare-intro">
      Más que un programa académico o un curso de verano, la Escuela de
      Liderazgo Climático es la puerta de entrada al movimiento HxNF.
    </p>

    <div class="compare-grid">

      <!-- Card izquierda: azul -->
      <div class="compare-card card-blue">
        <h3 class="card-title title-blue">Lo que ofrecen<br />otros programas</h3>
        <div class="card-item">
          <strong>Conocimiento sin poder:</strong>
          Talleres que explican el sistema pero no organizan para cambiarlo.
        </div>
        <div class="card-item">
          <strong>Comunidad sin raíz:</strong>
          Colectivos que se arman con energía y se deshacen en seis meses.
        </div>
      </div>

      <!-- Card derecha: amarilla -->
      <div class="compare-card card-yellow">
        <h3 class="card-title title-yellow">Lo que ofrece la<br />ELC 2026</h3>
        <div class="card-item">
          <strong>Conocimiento + organización:</strong>
          Entiendes el sistema y te organizas con metodología para cambiarlo.
        </div>
        <div class="card-item">
          <strong>Liderazgo que dura:</strong>
          Estructura basada en la metodología probada de organización comunitaria
          para que el poder colectivo no dependa de una sola persona.
        </div>
      </div>

    </div>

    <div class="cta-container">
      <BaseButton variant="primary" href="/formulario">REGÍSTRATE AQUÍ</BaseButton>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.compare-intro', { y: 35, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.compare-card', { y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
.compare-section {
  width: 100%;
  background-color: var(--color-black);
  padding: clamp(3rem, 7vh, 6rem) clamp(1.5rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2.5rem, 5vh, 4rem);
}

/* ── Intro ── */
.compare-intro {
  font-family: var(--font-parkinsans);
  font-weight: 500;
  color: var(--color-white);
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  line-height: 1.65;
  text-align: center;
  max-width: 680px;
  margin: 0;
}

/* ── Grid ── */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 780px;
  align-items: stretch;
}

/* ── Card base ── */
.compare-card {
  border-radius: 1.2rem;
  padding: clamp(1.8rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  background-color: var(--color-black);
}

.card-blue {
  border: 1.5px solid var(--color-blue);
}

.card-yellow {
  border: 1.5px solid var(--color-yellow);
}

/* ── Títulos ── */
.card-title {
  font-family: var(--font-parkinsans);
  font-weight: 500;
  text-align: center;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.25;
  margin: 0;
}

.title-blue {
  color: var(--color-blue);
}

.title-yellow {
  color: var(--color-yellow);
}

/* ── Items ── */
.card-item {
  font-family: var(--font-parkinsans);
  font-weight: 300;
  text-align: center;
  color: var(--color-white);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  line-height: 1.7;
}

.card-item strong {
  font-weight: 700;
  display: block;
  margin-bottom: 0.2rem;
}

/* ── Responsive ── */
@media (max-width: 580px) {
  .compare-grid {
    grid-template-columns: 1fr;
  }
}

.cta-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>