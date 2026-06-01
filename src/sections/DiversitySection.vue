<template>
  <section class="esperar-section">

    <!-- Bloque superior: imagen hero edge-to-edge con título abajo-izquierda -->
    <div class="esperar-hero">
      <img src="../assets/images/esperar.svg" alt="" class="esperar-hero-bg" />
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

      <!-- Imagen derecha: resultado.svg, misma altura que el copy -->
      <div class="esperar-img-wrapper">
        <img src="../assets/images/resultado.svg" alt="" class="esperar-img" />
      </div>

    </div>
  </section>
</template>

<style scoped>
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
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 6vw, 5rem);
}

/* ── Copy ── */
.esperar-copy {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
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
  width: clamp(140px, 22vw, 280px);
  flex-shrink: 0;
  /* recortar desde arriba si la imagen es más alta que el copy */
  align-self: stretch;
  overflow: hidden;
  border-radius: 0.75rem;
}

.esperar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom center;
  display: block;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .esperar-bottom {
    grid-template-columns: 1fr;
  }

  .esperar-img-wrapper {
    width: 100%;
    height: 220px;
  }

  .esperar-img {
    object-position: top center;
  }
}
</style>