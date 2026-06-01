<template>
  <div class="sessions-wrapper">
    
    <div class="sessions-banner">
      <h2 class="sessions-title">ESPACIO LIBRE DE<br />PARTIDOS POLÍTICOS</h2>
    </div>

    <section class="sessions-section">
      <img src="../assets/images/sesiones.svg" alt="" class="sessions-bg" />

      <img 
        :src="hojasImg" 
        alt="Hojas al viento" 
        class="hojas-viento"
      />

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

<script setup lang="ts">
// Importamos la imagen para que Vite/Webpack la procese correctamente
import hojasImg from '../assets/images/hojas.png'
</script>

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
  background-color: var(--color-black);
  width: 100%;
  padding: 3rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sessions-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
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
  min-height: 80vh; 
  overflow: hidden;
  display: flex;
  align-items: flex-end; 
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

/* ── 🍃 HOJAS Y ANIMACIÓN DE VIENTO 🍃 ── */
.hojas-viento {
  position: absolute;
  /* Porcentaje separado de arriba, como lo pediste */
  top: 15%; 
  right: -2%; /* Ligeramente salidas para que se vea natural */
  width: 200px; /* Tamaño base en móviles */
  z-index: 15;
  pointer-events: none; /* Para que no estorben si hay botones abajo */
  
  /* El eje de rotación lo ponemos arriba a la derecha para que cuelguen */
  transform-origin: top right;
  /* Animación infinita y suave */
  animation: viento 5s ease-in-out infinite alternate;
}

@keyframes viento {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-6deg); /* Se mecen hacia un lado */
  }
  70% {
    transform: rotate(3deg); /* Se mecen hacia el otro */
  }
  100% {
    transform: rotate(0deg); /* Vuelven a su lugar */
  }
}

/* ── Contenido de Sesiones ── */
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
@media (min-width: 768px) {
  /* Hacemos las hojas más grandes en PC y tablet */
  .hojas-viento {
    width: 380px;
    top: 10%;
    right: 2%;
  }
}

@media (max-width: 640px) {
  .sessions-banner {
    padding: 2.5rem 1rem;
  }
  
  .sessions-title {
    font-size: 1.25rem; 
  }

  .sessions-body {
    font-size: 0.9rem;
    max-width: 100%;
  }
}
</style>