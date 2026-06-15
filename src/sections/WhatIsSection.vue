<template>
  <section class="fracking-section" ref="sectionRef">

    <img loading="lazy" 
      :src="frackingImg"
      alt=""
      class="fracking-bg"
    />

    <div class="fracking-overlay" />

    <div class="fracking-content">

      <div class="fracking-block block-left">
        <h2 class="fracking-title">
          El gobierno quiere apostar por el fracking
        </h2>
        <p class="fracking-body">
          que contamina el agua y el suelo y destruye comunidades enteras, cuando
          la verdadera soberanía energética está en desarrollar las fuentes de
          energía renovable.
        </p>
      </div>

      <div class="fracking-block block-right">
        <h2 class="fracking-title">
          El sistema energético de México se está rediseñando en este momento
        </h2>
        <p class="fracking-body">
          y las decisiones que pueden mejorar o empeorar estos datos –y nuestro
          futuro– las están tomando un puñado de personas en oficinas que no conoces.
        </p>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import frackingImg from '../assets/images/fracking.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {

    // Entrada: desde sus lados, reverse al subir
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })
    enterTl
      .from('.block-left',  { x: -70, duration: 0.75, ease: 'power3.out' }, 0)
      .from('.block-right', { x: 70, duration: 0.75, ease: 'power3.out' }, 0.15)

  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
.fracking-section {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.fracking-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.fracking-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      rgba(0,0,0,0.25) 0%,
      rgba(0,0,0,0.45) 50%,
      rgba(0,0,0,0.65) 100%
    );
}

.fracking-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0;
  align-items: end;
  min-height: 100vh;
}

.block-left {
  grid-column: 1;
  grid-row: 1 / 3;
  align-self: center;
  padding-right: 2rem;
}

.block-right {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  padding-bottom: 2rem;
}

.fracking-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  line-height: 1.2;
  margin: 0 0 0.9rem;
  letter-spacing: -0.01em;
}

.fracking-body {
  font-family: var(--font-parkinsans);
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  line-height: 1.7;
  margin: 0;
  max-width: 38ch;
}

/* ── Responsive: tablet/mobile ── */
@media (max-width: 768px) {
  .fracking-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5rem 1.5rem 3.5rem;
    min-height: auto;
    gap: 2rem;
  }

  .block-left {
    padding-right: 0;
    max-width: 78%;
    align-self: flex-start;
    margin-top: 7rem;
  }

  .block-right {
    margin-left: auto;
    max-width: 78%;
    text-align: right;
    padding-bottom: 0;
    align-self: flex-end;
  }

  .fracking-body {
    max-width: 100%;
  }
}
</style>
