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
          <span class="stat-dot" />
          <p class="stat-text" v-html="stat.text" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

onMounted(() => {
  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 82%',
    },
    y: 50,
    stagger: 0.14,
    duration: 0.65,
    ease: 'power3.out',
  })
})
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
  align-items: stretch;
}

.stat-card {
  position: relative;
  background-color: var(--color-black);
  padding: 1.8rem 1.4rem 2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 0.6rem;

  border-top:    1.5px solid var(--c);
  border-right:  1.5px solid var(--c);
  border-bottom: 1.5px solid var(--c);
  border-left:   none;
  border-radius: 0 0.9rem 0.9rem 0;
}

.stat-dot {
  position: absolute;
  top: -0.65rem;
  left: -0.65rem;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: var(--c);
}

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
    padding: 2.5rem 1.2rem 3.5rem;
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
