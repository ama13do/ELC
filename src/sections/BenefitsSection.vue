<template>
  <!-- Contenedor general que rompe márgenes para ocupar toda la pantalla -->
  <div class="sessions-wrapper">
    
    <!-- 1. Banner superior con fondo negro -->
    <div class="sessions-banner">
      <h2 class="sessions-title">ESPACIO LIBRE DE<br />PARTIDOS POLÍTICOS</h2>
    </div>

    <!-- 2. Sección de la imagen (abajo del banner) -->
    <section class="sessions-section">
      <img src="../assets/images/sesiones.svg" alt="" class="sessions-bg" />

      <div class="sessions-content">
        <p class="sessions-body">
          Las sesiones de la ELC se realizarán de manera virtual del
          <strong>6 al 31 de julio</strong>, de 7:00 a 9:00 pm (hora CDMX) entre
          las cuales se revisarán los siguientes temas en 2 fases.
        </p>
      </div>
    </section>
    
  </div>
</template>

<style scoped>
/* ── 1. Contenedor Principal ── */
.sessions-wrapper {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
}

/* ── 2. Banner Negro ── */
.sessions-banner {
  background-color: var(--color-black); /* Fondo negro */
  width: 100%;
  padding: 3rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ── Título (Letra más grande y sin posición absoluta) ── */
.sessions-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  /* Aumentamos significativamente el tamaño con clamp */
  font-size: clamp(1.5rem, 3vw, 2.5rem); 
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 1.4;
  margin: 0;
}

/* ── 3. Sección de la Imagen ── */
.sessions-section {
  position: relative;
  width: 100%;
  min-height: 80vh; /* Puedes ajustar la altura a tu gusto */
  overflow: hidden;
  display: flex;
  align-items: flex-end; /* Mantiene el body en la parte inferior */
}

.sessions-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.sessions-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2rem, 5vh, 4rem) clamp(1.5rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.sessions-body {
  font-family: var(--font-parkinsans);
  font-weight: 300;
  color: var(--color-white);
  font-size: clamp(1.5rem, 1.6vw, 1.1rem);
  line-height: 1.75;
  margin: 0;
  max-width: 480px;
}

.sessions-body strong {
  font-weight: 700;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .sessions-banner {
    padding: 2.5rem 1rem;
  }
  
  .sessions-title {
    /* Tamaño más grande para móviles comparado con el anterior */
    font-size: 1.25rem; 
  }

  .sessions-body {
    font-size: 0.9rem;
    max-width: 100%;
  }
}
</style>