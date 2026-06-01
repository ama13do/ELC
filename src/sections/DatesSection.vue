<template>
  <section class="dates-section">
    <div class="dates-inner">
      <h2 class="dates-title">Fechas importantes</h2>

      <div class="dates-list">
        <div
          v-for="(date, index) in timeline"
          :key="index"
          class="date-row"
          :class="{
            'row-outlined': index % 2 === 0,
            'row-filled':   index % 2 === 1,
            'row-past':     isPast(date.isoDate),
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
const timeline = [
  { event: 'Apertura de convocatoria',            date: '1 de junio',                          isoDate: '2026-06-01' },
  { event: 'Cierre de convocatoria',              date: '26 de junio',                         isoDate: '2026-06-26' },
  { event: 'Anuncio de seleccionadxs',            date: '1 al 3 de julio',                     isoDate: '2026-07-03' },
  { event: 'Sesión informativa',                  date: '4 de julio',                          isoDate: '2026-07-04' },
  { event: 'Periodo de conferencias y talleres',  date: '6 al 31 de julio',                    isoDate: '2026-07-31' },
  { event: 'Apertura de capítulos universitarios',date: '10 al 31 de agosto',                  isoDate: '2026-08-31' },
  { event: 'Activaciones y/o propuesta de proyectos', date: '1 de septiembre al 30 de noviembre', isoDate: '2026-11-30' },
]

function isPast(isoDate: string): boolean {
  return new Date(isoDate) < new Date()
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
  gap: 0.75rem;
}

/* ── Fila base ── */
.date-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.8rem;
  border-radius: 0.6rem;
  transition: background-color 0.2s ease;
}

/* Variante 1: solo borde */
.row-outlined {
  background-color: transparent;
  border: 1.5px solid var(--color-accent);
}

/* Variante 2: fondo oscuro leve */
.row-filled {
  background-color: transparent;
  border: 1.5px solid var(--color-yellow);
}

/* ── Pasadas: brillo tenue verde ── */
.row-past {
  background-color: rgba(11, 227, 64, 0.07);
}

.row-past .date-event {
  color: var(--color-accent);
}

.row-past .date-date {
  color: var(--color-accent);
}

/* ── Textos ── */
.date-event {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  color: var(--color-white);
  font-size: clamp(0.82rem, 1.2vw, 1rem);
  line-height: 1.4;
  flex: 1;
}

.date-date {
  font-family: var(--font-parkinsans);
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  white-space: nowrap;
  text-align: right;
}

/* Fechas pasadas: texto verde en el evento */
.row-past .date-event {
  color: var(--color-accent);
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .date-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 0.9rem 1.2rem;
  }

  .date-date {
    text-align: left;
    color: var(--color-accent);
    font-size: 0.8rem;
  }
}
</style>