<template>
  <section class="hero-section">

    <!-- Contenido principal -->
    <div class="hero-inner">
      <div class="hero-content">

        <!-- Título + sticker en fila (mobile: flex row, desktop: sticker absolute) -->
        <div class="hero-title-row">
          <h1 class="hero-title">
            Escuela de<br />Liderazgo Climático
          </h1>
          <div class="hero-image-wrapper" aria-hidden="true">
            <img src="../assets/images/PG1.png" alt="" class="hero-image" />
          </div>
        </div>

        <p class="hero-body">
          ¿Estás listx para
          <span class="hero-highlight">formar parte de un movimiento nacional</span>
          que desarrolla propuestas concretas para enfrentar la emergencia climática?
        </p>

        <div class="hero-buttons">
          <BaseButton variant="primary" href="https://forms.gle/5Kc73ytz17qZWT1AA">REGÍSTRATE AQUÍ</BaseButton>
          <BaseButton variant="secondary" href="https://nuestrofuturo.mx/hxnf">QUIÉNES SOMOS</BaseButton>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
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

/* ── Fila título (desktop: solo flujo normal, sticker sale del flujo con absolute) ── */
.hero-title-row {
  position: static;
}

/* ── Imagen derecha ── */
.hero-image-wrapper {
  position: absolute;
  right: clamp(2rem, 8vw, 7rem);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(160px, 28vw, 320px);
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
  0%, 100% { transform: translateY(-50%) rotate(-2deg); }
  50%       { transform: translateY(calc(-50% - 12px)) rotate(1.5deg); }
}

/* ── Hero layout ── */
.hero-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8rem clamp(1.5rem, 6vw, 5rem);
}

.hero-content {
  max-width: 620px;
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
  font-size: clamp(1.5rem, 2.2vw, 1.2rem);
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

/* ── Responsive: tablet ── */
@media (max-width: 900px) {
  .hero-image-wrapper {
    width: clamp(130px, 22vw, 200px);
    right: 1.5rem;
  }
}

/* ── Responsive: mobile ── */
@media (max-width: 640px) {

  .hero-section {
    align-items: flex-start;
    min-height: 100svh;
    padding-top: 0;
    padding-bottom: 0;
  }

  .hero-inner {
    padding: 5.5rem 1.5rem 2.5rem;
  }

  /* En mobile el sticker entra en el flujo junto al h1 */
  .hero-title-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .hero-title {
    flex: 1;
    font-size: clamp(2.2rem, 10.5vw, 3rem);
    margin: 0 0 1.5rem;
    min-width: 0;
  }

  .hero-image-wrapper {
    position: static;
    transform: none;
    width: clamp(90px, 25vw, 120px);
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 0.25rem;
    animation: stickerFloatMobile 5s ease-in-out infinite;
  }

  @keyframes stickerFloatMobile {
    0%, 100% { transform: rotate(-2deg); }
    50%       { transform: translateY(-8px) rotate(1.5deg); }
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
