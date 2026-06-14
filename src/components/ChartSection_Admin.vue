<template>
  <div class="charts-section">
    <!-- Registros por Estado -->
    <div class="chart-card">
      <h3 class="chart-title">📍 Registros por estado</h3>
      <div class="bar-chart">
        <div
          v-for="(count, estado) in sortedEstados"
          :key="estado"
          class="bar-row"
        >
          <span class="bar-label">{{ estado }}</span>
          <div class="bar-track">
            <div
              class="bar-fill bar-fill--blue"
              :style="{ width: barWidth(count, maxEstado) }"
            ></div>
          </div>
          <span class="bar-value">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Distribución por Género -->
    <div class="chart-card">
      <h3 class="chart-title">👤 Distribución por género</h3>
      <div class="bar-chart">
        <div
          v-for="(count, genero) in sortedGeneros"
          :key="genero"
          class="bar-row"
        >
          <span class="bar-label">{{ genero }}</span>
          <div class="bar-track">
            <div
              class="bar-fill bar-fill--pink"
              :style="{ width: barWidth(count, maxGenero) }"
            ></div>
          </div>
          <span class="bar-value">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Embudo de conversión -->
    <div class="chart-card">
      <h3 class="chart-title">🔽 Embudo de conversión (paso actual)</h3>
      <div class="funnel">
        <div
          v-for="paso in 7"
          :key="paso"
          class="funnel-step"
        >
          <span class="funnel-label">Paso {{ paso }}</span>
          <div class="funnel-track">
            <div
              class="funnel-fill"
              :style="{ width: funnelWidth(paso) }"
            ></div>
          </div>
          <span class="funnel-value">{{ pasoCount(paso) }}</span>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="chart-card">
      <h3 class="chart-title">📅 Registros por día</h3>
      <div class="bar-chart">
        <div
          v-for="(count, dia) in sortedDias"
          :key="dia"
          class="bar-row"
        >
          <span class="bar-label bar-label--date">{{ formatDayLabel(String(dia)) }}</span>
          <div class="bar-track">
            <div
              class="bar-fill bar-fill--green"
              :style="{ width: barWidth(count, maxDia) }"
            ></div>
          </div>
          <span class="bar-value">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Top Universidades -->
    <div class="chart-card">
      <h3 class="chart-title">🎓 Top universidades</h3>
      <div class="bar-chart">
        <div
          v-for="(count, uni) in topUniversidades"
          :key="uni"
          class="bar-row"
        >
          <span class="bar-label">{{ uni }}</span>
          <div class="bar-track">
            <div
              class="bar-fill bar-fill--yellow"
              :style="{ width: barWidth(count, maxUni) }"
            ></div>
          </div>
          <span class="bar-value">{{ count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  porEstado: Record<string, number>
  porGenero: Record<string, number>
  porPaso: Record<number, number>
  porDia: Record<string, number>
  porUniversidad: Record<string, number>
  total: number
}>()

function sortDesc(obj: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) => b - a)
  )
}

const sortedEstados = computed(() => sortDesc(props.porEstado))
const sortedGeneros = computed(() => sortDesc(props.porGenero))
const sortedDias = computed(() => {
  return Object.fromEntries(
    Object.entries(props.porDia).sort(([a], [b]) => a.localeCompare(b))
  )
})
const topUniversidades = computed(() => {
  const sorted = Object.entries(props.porUniversidad).sort(([, a], [, b]) => b - a)
  return Object.fromEntries(sorted.slice(0, 15))
})

const maxEstado = computed(() => Math.max(1, ...Object.values(props.porEstado)))
const maxGenero = computed(() => Math.max(1, ...Object.values(props.porGenero)))
const maxDia = computed(() => Math.max(1, ...Object.values(props.porDia)))
const maxUni = computed(() => Math.max(1, ...Object.values(props.porUniversidad)))

function barWidth(count: number, max: number) {
  return Math.max(2, (count / max) * 100) + '%'
}

function pasoCount(paso: number) {
  return props.porPaso[paso] || 0
}

function funnelWidth(paso: number) {
  const count = pasoCount(paso)
  return Math.max(2, (count / Math.max(1, props.total)) * 100) + '%'
}

function formatDayLabel(dia: string) {
  if (!dia || dia === 'desconocido') return dia
  const d = new Date(dia + 'T12:00:00')
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })
}
</script>

<style scoped>
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.25rem;
}

.chart-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem;
}

.chart-title {
  font-family: var(--font-parkinsans);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
}

/* Bar chart */
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-height: 400px;
  overflow-y: auto;
}

.bar-chart::-webkit-scrollbar {
  width: 3px;
}
.bar-chart::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.bar-row {
  display: grid;
  grid-template-columns: 130px 1fr 40px;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  font-family: var(--font-myriad);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bar-label--date {
  font-size: 0.72rem;
  text-transform: capitalize;
}

.bar-track {
  height: 18px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
  min-width: 3px;
}

.bar-fill--blue { background: linear-gradient(90deg, #2E7DFC, #5B9FFF); }
.bar-fill--pink { background: linear-gradient(90deg, #FC3169, #FD8CBB); }
.bar-fill--green { background: linear-gradient(90deg, #0BE340, #7FFF7F); }
.bar-fill--yellow { background: linear-gradient(90deg, #E0FA49, #F5FFAA); }

.bar-value {
  font-family: var(--font-parkinsans);
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

/* Funnel */
.funnel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.funnel-step {
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  align-items: center;
  gap: 0.5rem;
}

.funnel-label {
  font-family: var(--font-myriad);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
}

.funnel-track {
  height: 22px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  overflow: hidden;
}

.funnel-fill {
  height: 100%;
  background: linear-gradient(90deg, #E0FA49, #0BE340);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.funnel-value {
  font-family: var(--font-parkinsans);
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

@media (max-width: 640px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
  .bar-row {
    grid-template-columns: 100px 1fr 35px;
  }
}
</style>
