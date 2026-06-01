<script setup lang="ts">
// Importa las imágenes de los stickers aquí arriba
import stickerTrans from '../assets/images/trans.png'
import stickerHxnf from '../assets/images/StickerHXNF.png'
</script>

<template>
  <section class="esperar-section">

    <!-- Bloque superior: imagen hero edge-to-edge con título abajo-izquierda -->
    <div class="esperar-hero">
      <img src="../assets/images/esperar.svg" alt="" class="esperar-hero-bg" />
      <img 
        :src="stickerTrans" 
        alt="" 
        class="sticker-left"
      />
      <img 
        :src="stickerHxnf" 
        alt="" 
        class="sticker-right"
      />
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

      
      <div class="esperar-img-wrapper">
        <img src="../assets/images/resultado.png" alt="" class="esperar-img" />
      </div>

    </div>
  </section>
</template>


<style scoped>
@keyframes sticker-shine {
  0%, 100% {
    /* Estado normal con una sombrita base */
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)) brightness(1);
  }
  50% {
    /* Aumenta el brillo y crea un resplandor blanco a su alrededor */
    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.8)) brightness(1.25);
  }
}
.sticker-left {
  position: absolute;
  /* "Un poquito abajo de la esquina superior" */
  top: 20%; 
  /* "Salida del marco izquierdo" (valor negativo) */
  left: -5rem; 
  /* "Algo grande" y responsiva */
  width: clamp(200px, 30vw, 290px);
  z-index: 15;
  pointer-events: none;
  animation: sticker-shine 4s ease-in-out infinite;
}

/* ── 🔵 STICKER DERECHO (StickerHXNF.png) ── */
.sticker-right {
  position: absolute;
  /* "Un poco separada del top" */
  top: 20%; 
  /* "Esquina superior derecha" (ligeramente salida) */
  right: 1rem; 
  width: clamp(140px, 20vw, 200px);
  z-index: 15;
  pointer-events: none;
  /* "Con inclinación hacia la izquierda" */
  transform: rotate(-1deg);
  animation: sticker-shine 4s ease-in-out infinite;
  animation-delay: 2s;
}

/* ── Ajustes Responsivos para los Stickers ── */
@media (max-width: 640px) {
  .sticker-left {
    left: -1rem;
    top: 1%; /* Lo subimos un poco en móviles para que no tape las caras */
  }
  
  .sticker-right {
    right: -1rem;
    top: 2%;
    transform: rotate(-8deg); /* Menos inclinación en móvil para ahorrar espacio */
  }
}
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
  display: flex;
  align-items: flex-end; /* Alinea los elementos pegados hasta abajo */
  justify-content: space-between; /* Manda la imagen hasta la derecha */
  max-width: 1200px;
  margin: 0 auto;
  /* Padding: quitamos el de abajo y el de la derecha para que la imagen toque los bordes */
  padding: clamp(2.5rem, 5vh, 4rem) 0 0 clamp(1.5rem, 6vw, 5rem);
}

/* ── Copy ── */
.esperar-copy {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex: 1; /* Ocupa el espacio restante izquierdo */
  max-width: 620px;
  /* Le devolvemos el padding de abajo solo al texto para que no quede pegado al piso */
  padding-bottom: clamp(3rem, 6vh, 5rem);
  padding-right: 2rem; /* Separación con la imagen */
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
  /* "Algo grandecita y responsiva" */
  width: clamp(260px, 42vw, 500px);
  flex-shrink: 0;
  /* Sin bordes redondeados */
  border-radius: 0;
  
  /* Para que sea un poco más alta que el div de a lado, la estiramos desde arriba */
  margin-top: -3rem; 
  
  /* Truco para que pegue completamente a la derecha de la pantalla en PC grandes */
  margin-right: calc(50% - 50vw); 
  
  display: flex;
}

.esperar-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: bottom left; /* La anclamos abajo para que no flote */
  display: block;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .esperar-bottom {
    flex-direction: column;
    align-items: flex-end; /* En móvil, también se pega a la derecha */
    padding-right: 0;
    padding-bottom: 0;
  }

  .esperar-copy {
    padding-left: 0;
    padding-bottom: 2rem;
    padding-right: clamp(1.5rem, 6vw, 5rem); /* Devolvemos el padding derecho al texto */
  }

  .esperar-img-wrapper {
    margin-top: 0;
    width: 85%; /* Ocupa buena parte en móvil pero no todo, pegada a la derecha */
    margin-right: 0;
  }
}
</style>