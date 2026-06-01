<template>
  <section class="fracking-section">

    <!-- Imagen de fondo: ocupa todo, sin bordes, sin márgenes -->
    <img
      :src="frackingImg"
      alt=""
      class="fracking-bg"
    />

    <!-- Overlay oscuro para legibilidad -->
    <div class="fracking-overlay" />

    <!-- Texto sobre la imagen -->
    <div class="fracking-content">

      <!-- Bloque izquierdo: arriba-izquierda -->
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

      <!-- Bloque derecho: abajo-derecha -->
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
import frackingImg from '../assets/images/fracking.svg'
</script>

<style scoped>
/* ── Sección: ocupa 100vw sin importar el padre ── */
.fracking-section {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* rompe cualquier max-width del padre */
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

/* ── Imagen de fondo: edge-to-edge, sin bordes blancos ── */
.fracking-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* ── Overlay: oscurece para leer el texto ── */
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

/* ── Contenedor de texto ── */
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

/* Izquierda: pegada al centro-izquierda verticalmente */
.block-left {
  grid-column: 1;
  grid-row: 1 / 3;
  align-self: center;
  padding-right: 2rem;
}

/* Derecha: pegada abajo */
.block-right {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  padding-bottom: 2rem;
}

/* ── Títulos ── */
.fracking-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  line-height: 1.2;
  margin: 0 0 0.9rem;
  letter-spacing: -0.01em;
}

/* ── Cuerpo ── */
.fracking-body {
  font-family: var(--font-parkinsans);
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  line-height: 1.7;
  margin: 0;
  max-width: 38ch;
}

/* ── Responsive: tablet ── */
@media (max-width: 768px) {
  .fracking-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    align-items: start;
    padding-top: 4rem;
    min-height: 100vh;
  }

  .block-left {
    grid-column: 1;
    grid-row: 1;
    padding-right: 0;
    align-self: start;
  }

  .block-right {
    grid-column: 1;
    grid-row: 2;
    padding-bottom: 3rem;
    align-self: end;
  }

  .fracking-body {
    max-width: 100%;
  }
}
</style>