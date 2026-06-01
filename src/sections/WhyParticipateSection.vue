<template>
  <section class="stats-section">
    <div class="stats-inner">
      <div class="stats-grid">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="stat-card"
          :style="{ '--c': stat.color }"
        >
          <!-- Círculo en la esquina superior-izquierda, donde nace el borde -->
          <span class="stat-dot" />
          <p class="stat-text" v-html="stat.text" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  id: number
  color: string
  text: string
}

const stats: Stat[] = [
  {
    id: 1,
    color: '#FC3169',
    text: 'Actualmente, <strong>solo el 23.5% de la energía</strong> en México proviene de fuentes limpias. Aunque existe el compromiso de alcanzar un 45% para 2030, <strong>el objetivo todavía parece lejano.</strong>',
  },
  {
    id: 2,
    color: '#2E7DFC',
    text: 'Los hogares del quintil más pobre (el 20% de la población) <strong>destinan arriba del 30% de su ingreso total a pagar energía.</strong>',
  },
  {
    id: 3,
    color: '#FF8636',
    text: 'México <strong>tiene que importar el 80% de la gasolina y el diésel</strong> que se consumen internamente.',
  },
  {
    id: 4,
    color: '#E0FA49',
    text: '<strong>Dependemos de Estados Unidos para el 75% del gas</strong> que se quema para generar electricidad y para consumo doméstico.',
  },
]
</script>

<style scoped>
.stats-section {
  width: 100%;
  background-color: var(--color-surface);
  padding: 5rem 1.5rem 6rem;
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  align-items: strech;
}

/* ── Card ──
   Borde: derecho + abajo + superior (desde el círculo hacia la derecha)
   Sin borde izquierdo. El truco: usamos outline/box-shadow NO,
   usamos border-right + border-bottom + border-top, con border-left: none
   y border-radius solo en esquinas derecha
*/
.stat-card {
  position: relative;
  background-color: var(--color-black);
  padding: 1.8rem 1.4rem 2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 0.6rem; /* espacio para el círculo que sobresale arriba */

  border-top:    1.5px solid var(--c);
  border-right:  1.5px solid var(--c);
  border-bottom: 1.5px solid var(--c);
  border-left:   none;

  /* Curva solo en las esquinas que tienen borde */
  border-radius: 0 0.9rem 0.9rem 0;
}

/* ── Círculo en la esquina superior-izquierda ──
   Está donde el borde superior "empieza" */
.stat-dot {
  position: absolute;
  top: -0.65rem;   /* sobresale por encima del borde superior */
  left: -0.65rem;  /* cuelga hacia la izquierda, donde no hay borde */
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: var(--c);
}

/* ── Texto ── */
.stat-text {
  font-family: var(--font-myriad);
  font-size: clamp(1em, 1vw, 1.15rem);
  color: var(--color-white);
  line-height: 1.75;
  margin: 0;
}

.stat-text :deep(strong) {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
}

/* ── Responsive: tablet ── */
@media (max-width: 960px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.5rem;
  }
}

/* ── Responsive: mobile ── */
@media (max-width: 540px) {
  .stats-section {
    padding: 3rem 1.2rem 4rem;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .stat-text {
    font-size: 0.92rem;
  }
}
</style>