<template>
  <section class="criteria-section">
    <div class="criteria-inner">

      <h2 class="criteria-title">Criterios de selección</h2>

      <div class="criteria-card">
        <span class="criteria-dot" />

        <p class="criteria-text criteria-bold">
          El equipo organizador evaluará la información compartida sobre motivaciones,
          conocimientos, experiencia y reflexiones proporcionadas a través del cuestionario
          y video de presentación.
        </p>

        <p class="criteria-text criteria-bold">
          Adicionalmente, se respetarán las siguientes directrices para obtener una
          selección incluyente y representativa de la diversidad de México. Se buscará:
        </p>

        <ul class="criteria-list">
          <li v-for="(item, index) in criteria" :key="index" class="criteria-item">
            <span class="item-dot" />
            <span class="item-text">{{ item }}</span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const criteria = [
  'Maximizar la representatividad geográfica y socioeconómica.',
  'Maximizar la diversidad de grupos históricamente excluidos.',
  'Maximizar la diversidad de carreras y áreas de profesionalización.',
  'Maximizar las experiencias en torno a temas energéticos, climáticos y de activismo u organización comunitaria.',
]
</script>

<style scoped>
.criteria-section {
  width: 100%;
  background-color: var(--color-surface);
  padding: clamp(3rem, 7vh, 5.5rem) clamp(1.5rem, 6vw, 4rem);
}

.criteria-inner {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 3rem);
}

/* ── Título ── */
.criteria-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Card: C abierta a la derecha (sin borde derecho) ── */
.criteria-card {
  position: relative;
  background-color: var(--color-black);
  border-top:    1.5px solid var(--color-blue);
  border-left:   1.5px solid var(--color-blue);
  border-bottom: 1.5px solid var(--color-blue);
  border-right:  none;
  border-radius: 0.9rem 0 0 0.9rem;
  padding: 2rem 2rem 2rem 1.8rem;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

/* Círculo arriba-derecha (donde termina el borde superior) */
.criteria-dot {
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: var(--color-blue);
}

/* ── Textos ── */
.criteria-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.88);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  line-height: 1.75;
  margin: 0;
}

.criteria-bold {
  font-weight: 600;
}

/* ── Lista ── */
.criteria-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.criteria-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.item-dot {
  flex-shrink: 0;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background-color: var(--color-blue);
  margin-top: 0.38rem;
}

.item-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  line-height: 1.65;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .criteria-card {
    padding: 1.6rem 1.2rem;
  }
}
</style>