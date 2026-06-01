<template>
  <section class="experience-section">

    <!-- Hero edge-to-edge con título abajo-izquierda -->
    <div class="experience-hero">
      <img src="../assets/images/EXPERIENCE.svg" alt="" class="experience-hero-bg" />
      <div class="experience-hero-text">
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
  height: clamp(300px, 52vw, 560px);
  overflow: hidden;
}

.experience-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.experience-hero-text {
  position: absolute;
  bottom: clamp(1.5rem, 5%, 3rem);
  left: clamp(1.5rem, 6vw, 5rem);
  z-index: 10;
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
</style>