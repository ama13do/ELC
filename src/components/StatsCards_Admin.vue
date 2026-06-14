<template>
  <div class="stats-grid">
    <div class="stat-card stat-card--total">
      <div class="stat-icon">📋</div>
      <div class="stat-info">
        <span class="stat-number">{{ stats.total }}</span>
        <span class="stat-label">Total registros</span>
      </div>
    </div>

    <div class="stat-card stat-card--done">
      <div class="stat-icon">✅</div>
      <div class="stat-info">
        <span class="stat-number">{{ stats.finalizados }}</span>
        <span class="stat-label">Finalizados</span>
      </div>
    </div>

    <div class="stat-card stat-card--progress">
      <div class="stat-icon">⏳</div>
      <div class="stat-info">
        <span class="stat-number">{{ stats.enProgreso }}</span>
        <span class="stat-label">En progreso</span>
      </div>
      <div class="stat-breakdown" v-if="Object.keys(stats.porPaso).length">
        <span v-for="(count, paso) in stats.porPaso" :key="paso" class="paso-badge">
          Paso {{ paso }}: {{ count }}
        </span>
      </div>
    </div>

    <div class="stat-card stat-card--rate">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <span class="stat-number">{{ stats.tasaFinalizacion }}%</span>
        <span class="stat-label">Tasa de finalización</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" :style="{ width: stats.tasaFinalizacion + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: {
    total: number
    finalizados: number
    enProgreso: number
    tasaFinalizacion: number
    porPaso: Record<number, number>
  }
}>()
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card--total { border-color: rgba(46, 125, 252, 0.3); }
.stat-card--total:hover { border-color: #2E7DFC; }

.stat-card--done { border-color: rgba(11, 227, 64, 0.3); }
.stat-card--done:hover { border-color: #0BE340; }

.stat-card--progress { border-color: rgba(224, 250, 73, 0.3); }
.stat-card--progress:hover { border-color: #E0FA49; }

.stat-card--rate { border-color: rgba(253, 140, 187, 0.3); }
.stat-card--rate:hover { border-color: #FD8CBB; }

.stat-icon {
  font-size: 1.6rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-number {
  font-family: var(--font-parkinsans);
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.stat-label {
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.stat-breakdown {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.paso-badge {
  font-family: var(--font-myriad);
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.progress-bar-wrap {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.25rem;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0BE340, #E0FA49);
  border-radius: 3px;
  transition: width 0.6s ease;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
