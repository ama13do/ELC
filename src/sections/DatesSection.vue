<template>
  <section class="dates-section" ref="sectionRef">
    <div class="dates-inner">
      <h2 class="dates-title">Fechas importantes</h2>

      <div class="dates-list">
        <div
          v-for="(date, index) in timeline"
          :key="index"
          class="date-row"
          :class="{
            'row-filled': index % 2 === 0,
            'row-outlined':   index % 2 === 1,
            'row-active':   isActive(index)
          }"
        >
          <span class="date-event">{{ date.event }}</span>
          <span class="date-date">{{ date.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.dates-title', { y: 35, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.date-row', { y: 20, duration: 0.5, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})

const timeline = [
  { event: 'Apertura de convocatoria',            date: '1 de junio',                           isoDate: '2026-06-01' },
  { event: 'Cierre de convocatoria',              date: '26 de junio',                          isoDate: '2026-06-26' },
  { event: 'Anuncio de seleccionadxs',            date: '1 al 3 de julio',                      isoDate: '2026-07-03' },
  { event: 'Sesión informativa',                  date: '4 de julio',                           isoDate: '2026-07-04' },
  { event: 'Periodo de conferencias y talleres',  date: '6 al 31 de julio',                     isoDate: '2026-07-31' },
  { event: 'Apertura de capítulos universitarios',date: '10 al 31 de agosto',                   isoDate: '2026-08-31' },
  { event: 'Activaciones y/o propuesta de proyectos', date: '1 de septiembre al 30 de noviembre', isoDate: '2026-11-30' },
]

// Función que detecta automáticamente en qué etapa estamos hoy
function isActive(index: number): boolean {
  const now = new Date();
  
  // Busca el primer evento cuya fecha (hasta el final de ese día) sea mayor o igual a hoy
  const activeIndex = timeline.findIndex(d => new Date(d.isoDate + 'T23:59:59') >= now);
  
  return index === activeIndex;
}
</script>

<style scoped>
.dates-section {
  width: 100%;
  background-color: var(--color-black);
  padding: clamp(3rem, 7vh, 5.5rem) clamp(1.5rem, 6vw, 4rem);
}

.dates-inner {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 3rem);
}

/* ── Título ── */
.dates-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ── Lista ── */
.dates-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem; /* Separamos un poco más las filas entre sí */
}

/* ── Fila base ── */
.date-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  /* MÁS AMPLIAS: Aumentamos el padding para que no quede pegado al texto */
  padding: 1.4rem 2.2rem; 
  /* MÁS REDONDEADAS */
  border-radius: 1.2rem; 
  transition: all 0.3s ease;
}

/* Variante 1: Bordes y texto Verde */
.row-outlined {
  background-color: transparent;
  border: 1.5px solid var(--color-accent);
}
.row-outlined .date-event {
  color: var(--color-accent); /* Título verde */
}

/* Variante 2: Bordes y texto Amarillo */
.row-filled {
  background-color: transparent;
  border: 1.5px solid var(--color-yellow);
}
.row-filled .date-event {
  color: var(--color-yellow); /* Título amarillo */
}

/* ── ✨ ESTADO ACTIVO (Brillo según la etapa actual) ✨ ── */
.row-outlined.row-active {
  background-color: rgba(11, 227, 64, 0.08); /* Fondo verde muy tenue */
  box-shadow: 0 0 15px rgba(11, 227, 64, 0.6), inset 0 0 10px rgba(11, 227, 64, 0.2);
  transform: scale(1.02); /* Lo hace resaltar un poquito hacia adelante */
  border-width: 2px;
}

.row-filled.row-active {
  background-color: rgba(224, 250, 73, 0.08); /* Fondo amarillo muy tenue */
  box-shadow: 0 0 15px rgba(224, 250, 73, 0.6), inset 0 0 10px rgba(224, 250, 73, 0.2);
  transform: scale(1.02);
  border-width: 2px;
}

/* ── Textos ── */
.date-event {
  font-family: var(--font-parkinsans);
  font-weight: 600; /* Lo subí a 700 para que resalte más con el color */
  font-size: clamp(0.85rem, 1.2vw, 1.05rem);
  line-height: 1.4;
  flex: 1;
}

/* FECHAS SIEMPRE EN BLANCO */
.date-date {
  font-family: var(--font-parkinsans);
  font-weight: 500;
  color: var(--color-white); /* Forzadas a blanco */
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  white-space: nowrap;
  text-align: right;
}

/* ── Responsive ── */
@media (max-width: 540px) {
  .date-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 1.2rem 1.5rem; /* Padding amplio también en móviles */
  }

  .date-date {
    text-align: left;
    font-size: 0.85rem;
    /* En móvil, la fecha toma un tono más suave para que el título destaque */
    color: rgba(255,255,255,0.85); 
  }
}
</style>