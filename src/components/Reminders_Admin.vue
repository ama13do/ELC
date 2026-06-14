<template>
  <div class="reminders-section">
    <div class="reminders-header">
      <h3 class="reminders-title">📬 Registros incompletos</h3>
      <p class="reminders-subtitle">Personas que iniciaron su registro pero no lo han finalizado. En el futuro podrás enviarles recordatorios automáticos.</p>
    </div>

    <!-- Summary cards -->
    <div class="reminder-stats">
      <div class="reminder-stat" v-for="paso in 7" :key="paso">
        <span class="reminder-stat__number">{{ countByPaso(paso) }}</span>
        <span class="reminder-stat__label">Paso {{ paso }}</span>
      </div>
    </div>

    <!-- Config placeholder -->
    <div class="config-card">
      <div class="config-header">
        <span class="config-icon">⚙️</span>
        <div>
          <h4 class="config-title">Configuración de automatización</h4>
          <p class="config-desc">Conecta Bird API y Supabase Edge Functions para enviar correos y mensajes de WhatsApp automáticos.</p>
        </div>
      </div>
      <div class="config-fields">
        <div class="config-field">
          <label>Bird API Key</label>
          <input type="password" placeholder="Próximamente..." disabled class="config-input" />
        </div>
        <div class="config-field">
          <label>Workspace ID</label>
          <input type="text" placeholder="Próximamente..." disabled class="config-input" />
        </div>
      </div>
      <div class="config-actions">
        <button class="action-btn action-btn--email" disabled>
          📧 Enviar recordatorio por email
        </button>
        <button class="action-btn action-btn--whatsapp" disabled>
          💬 Enviar por WhatsApp
        </button>
      </div>
      <p class="config-note">🔒 La automatización requiere configuración del servidor. Contacta al equipo técnico.</p>
    </div>

    <!-- Incomplete registros list -->
    <div class="incomplete-list">
      <h4 class="list-title">Listado de registros pendientes ({{ data.length }})</h4>
      <div class="list-scroll">
        <table class="incomplete-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Paso</th>
              <th>Último update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.id">
              <td class="td-name">{{ row.nombres }} {{ row.primer_apellido }}</td>
              <td>{{ row.email_principal }}</td>
              <td>{{ row.telefono_celular || '—' }}</td>
              <td>
                <span class="paso-mini" :class="'paso-mini--' + row.paso_actual">{{ row.paso_actual }}/7</span>
              </td>
              <td class="td-date">{{ formatDate(row.updated_at) }}</td>
            </tr>
            <tr v-if="data.length === 0">
              <td colspan="5" class="empty-msg">🎉 ¡Todos los registros están completos!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegistroELC } from '@/composables/useAdmin_Store'

const props = defineProps<{
  data: RegistroELC[]
  porPaso: Record<number, number>
}>()

function countByPaso(paso: number) {
  return props.porPaso[paso] || 0
}

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.reminders-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reminders-title {
  font-family: var(--font-parkinsans);
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.reminders-subtitle {
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0.25rem 0 0;
}

.reminder-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.reminder-stat {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 80px;
}

.reminder-stat__number {
  font-family: var(--font-parkinsans);
  font-size: 1.4rem;
  font-weight: 800;
  color: #E0FA49;
}

.reminder-stat__label {
  font-family: var(--font-myriad);
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
}

/* Config card */
.config-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
}

.config-header {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.config-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.config-title {
  font-family: var(--font-parkinsans);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.config-desc {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0.15rem 0 0;
}

.config-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.config-field label {
  display: block;
  font-family: var(--font-parkinsans);
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.3rem;
}

.config-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  padding: 0.5rem 0.75rem;
  cursor: not-allowed;
}

.config-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.action-btn {
  font-family: var(--font-parkinsans);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  border: 1.5px solid;
  cursor: not-allowed;
  opacity: 0.4;
  transition: all 0.2s;
}

.action-btn--email {
  background: rgba(46, 125, 252, 0.1);
  border-color: rgba(46, 125, 252, 0.3);
  color: #2E7DFC;
}

.action-btn--whatsapp {
  background: rgba(11, 227, 64, 0.1);
  border-color: rgba(11, 227, 64, 0.3);
  color: #0BE340;
}

.config-note {
  font-family: var(--font-myriad);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
}

/* Incomplete list */
.incomplete-list {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  overflow: hidden;
}

.list-title {
  font-family: var(--font-parkinsans);
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  padding: 1rem 1.25rem 0.5rem;
}

.list-scroll {
  overflow-x: auto;
}

.incomplete-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.incomplete-table th {
  font-family: var(--font-parkinsans);
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.5rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.incomplete-table td {
  font-family: var(--font-myriad);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.incomplete-table .td-name {
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.incomplete-table .td-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
}

.paso-mini {
  font-family: var(--font-parkinsans);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(224, 250, 73, 0.1);
  color: #E0FA49;
  border: 1px solid rgba(224, 250, 73, 0.25);
}

.empty-msg {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
  padding: 2rem !important;
}

@media (max-width: 640px) {
  .config-fields {
    grid-template-columns: 1fr;
  }
  .config-actions {
    flex-direction: column;
  }
}
</style>
