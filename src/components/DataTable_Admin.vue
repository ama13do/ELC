<template>
  <div class="table-section">
    <!-- Toolbar -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <input
          v-model="searchModel"
          type="text"
          placeholder="Buscar por nombre, email, teléfono..."
          class="search-input"
        />
        <select v-model="finalizadoModel" class="filter-select">
          <option value="all">Todos</option>
          <option value="true">Finalizados</option>
          <option value="false">En progreso</option>
        </select>
        <select v-model="estadoModel" class="filter-select">
          <option value="">Todos los estados</option>
          <option v-for="est in estados" :key="est" :value="est">{{ est }}</option>
        </select>
        <select v-model="pasoModel" class="filter-select">
          <option value="all">Todos los pasos</option>
          <option v-for="p in 7" :key="p" :value="String(p)">Paso {{ p }}</option>
        </select>
      </div>
      <div class="toolbar-right">
        <span class="result-count">{{ data.length }} registros</span>
        <button class="export-btn" @click="$emit('export')">
          📥 Descargar CSV
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th class="th-sticky" @click="toggleSort('nombres')">
              Nombre {{ sortIcon('nombres') }}
            </th>
            <th @click="toggleSort('email_principal')">Email {{ sortIcon('email_principal') }}</th>
            <th @click="toggleSort('telefono_celular')">Teléfono</th>
            <th @click="toggleSort('estado_residencia')">Estado {{ sortIcon('estado_residencia') }}</th>
            <th @click="toggleSort('universidad_nombre')">Universidad</th>
            <th @click="toggleSort('paso_actual')">Paso {{ sortIcon('paso_actual') }}</th>
            <th @click="toggleSort('finalizado')">Status {{ sortIcon('finalizado') }}</th>
            <th @click="toggleSort('created_at')">Fecha {{ sortIcon('created_at') }}</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.id" :class="{ 'row--done': row.finalizado }">
            <td class="td-name">{{ row.nombres }} {{ row.primer_apellido }} {{ row.segundo_apellido || '' }}</td>
            <td>{{ row.email_principal }}</td>
            <td>{{ row.telefono_celular || '—' }}</td>
            <td>{{ row.estado_residencia || '—' }}</td>
            <td class="td-uni">{{ row.universidad_nombre || '—' }}</td>
            <td>
              <span class="paso-pill" :class="'paso-pill--' + row.paso_actual">{{ row.paso_actual }}/7</span>
            </td>
            <td>
              <span class="status-badge" :class="row.finalizado ? 'status--done' : 'status--pending'">
                {{ row.finalizado ? 'Completo' : 'Pendiente' }}
              </span>
            </td>
            <td class="td-date">{{ formatDate(row.created_at) }}</td>
            <td>
              <button class="detail-btn" @click="toggleExpand(row.id)">
                {{ expandedId === row.id ? '▲' : '▼' }}
              </button>
            </td>
          </tr>
          <!-- Expanded detail row -->
          <tr v-for="row in paginatedData" :key="'exp-' + row.id" v-show="expandedId === row.id" class="expanded-row">
            <td :colspan="9">
              <div class="detail-grid">
                <div class="detail-group">
                  <h4>📋 Sección 1 — Datos personales</h4>
                  <p><strong>Nombre:</strong> {{ row.nombres }} {{ row.primer_apellido }} {{ row.segundo_apellido || '' }}</p>
                  <p><strong>Email:</strong> {{ row.email_principal }}</p>
                  <p><strong>Email alt:</strong> {{ row.email_alternativo || '—' }}</p>
                  <p><strong>Teléfono:</strong> {{ row.telefono_celular || '—' }}</p>
                  <p><strong>Tel fijo:</strong> {{ row.telefono_fijo || '—' }}</p>
                  <p><strong>Nacimiento:</strong> {{ row.fecha_nacimiento || '—' }}</p>
                  <p><strong>Estado:</strong> {{ row.estado_residencia || '—' }}</p>
                  <p><strong>Municipio:</strong> {{ row.municipio_residencia || '—' }}</p>
                  <p><strong>Comunidad rural:</strong> {{ row.comunidad_rural === true ? 'Sí' : row.comunidad_rural === false ? 'No' : '—' }}</p>
                  <p><strong>Género:</strong> {{ row.genero || '—' }}</p>
                  <p><strong>Identidades:</strong> {{ row.identidades?.join(', ') || '—' }}</p>
                  <p><strong>Medio enterado:</strong> {{ row.medio_enterado || '—' }}</p>
                  <p><strong>Red social:</strong> {{ row.red_social_enterado || '—' }}</p>
                </div>
                <div class="detail-group">
                  <h4>🎓 Sección 2 — Elegibilidad</h4>
                  <p><strong>Militancia política:</strong> {{ row.militancia_politica === true ? 'Sí' : row.militancia_politica === false ? 'No' : '—' }}</p>
                  <p><strong>Estudiante activo:</strong> {{ row.estudiante_activo === true ? 'Sí' : row.estudiante_activo === false ? 'No' : '—' }}</p>
                  <p><strong>Universidad:</strong> {{ row.universidad_nombre || '—' }}</p>
                  <p><strong>Tipo uni:</strong> {{ row.universidad_tipo || '—' }}</p>
                  <p><strong>Estado uni:</strong> {{ row.universidad_estado || '—' }}</p>
                  <p><strong>Carrera:</strong> {{ row.carrera_nombre || '—' }}</p>
                  <p><strong>Periodicidad:</strong> {{ row.carrera_periodicidad || '—' }}</p>
                  <p><strong>Periodo:</strong> {{ row.carrera_periodo || '—' }}</p>
                  <p><strong>Dispositivo:</strong> {{ row.acceso_dispositivo === true ? 'Sí' : row.acceso_dispositivo === false ? 'No' : '—' }}</p>
                  <p><strong>Herramientas:</strong> {{ row.manejo_herramientas || '—' }}</p>
                  <p><strong>Disponibilidad:</strong> {{ row.disponibilidad_horario || '—' }}</p>
                </div>
                <div class="detail-group">
                  <h4>🔥 Sección 3 — Motivación</h4>
                  <p><strong>Nivel conocimiento:</strong> {{ row.nivel_conocimiento_clima ?? '—' }}/5</p>
                  <p><strong>Transición estado:</strong> {{ row.necesidad_transicion_estado || '—' }}</p>
                </div>
                <div class="detail-group">
                  <h4>🌱 Sección 4 — Liderazgo</h4>
                  <p><strong>Experiencias:</strong> {{ row.experiencias_activismo?.join(', ') || '—' }}</p>
                  <p><strong>Detalles exp:</strong> {{ row.experiencia_detalles || '—' }}</p>
                  <p><strong>Exp relevante:</strong> {{ row.experiencia_relevante || '—' }}</p>
                  <p><strong>Colectivo:</strong> {{ row.pertenece_colectivo === true ? 'Sí' : row.pertenece_colectivo === false ? 'No' : '—' }}</p>
                  <p><strong>Nombre col:</strong> {{ row.colectivo_nombre || '—' }}</p>
                  <p><strong>Tamaño col:</strong> {{ row.colectivo_tamano || '—' }}</p>
                  <p><strong>Roles:</strong> {{ row.roles_equipo?.join(', ') || '—' }}</p>
                  <p><strong>Redes:</strong> {{ row.enlaces_redes || '—' }}</p>
                </div>
                <div class="detail-group">
                  <h4>🎬 Sección 5 — Video</h4>
                  <p><strong>Compromiso video:</strong> {{ row.compromiso_video || '—' }}</p>
                  <p><strong>Enlace:</strong>
                    <a v-if="row.enlace_video" :href="row.enlace_video" target="_blank" class="video-link">{{ row.enlace_video }}</a>
                    <span v-else>—</span>
                  </p>
                </div>
                <div class="detail-group">
                  <h4>✅ Sección 6 — Compromisos</h4>
                  <p><strong>Asistencia:</strong> {{ row.compromiso_asistencia ? '✅' : '❌' }}</p>
                  <p><strong>Grabaciones:</strong> {{ row.compromiso_grabaciones ? '✅' : '❌' }}</p>
                  <p><strong>Capítulo HxNF:</strong> {{ row.compromiso_capitulo_hxnf ? '✅' : '❌' }}</p>
                  <p><strong>Imagen:</strong> {{ row.autorizacion_imagen ? '✅' : '❌' }}</p>
                  <p><strong>Veracidad:</strong> {{ row.declaracion_veracidad ? '✅' : '❌' }}</p>
                  <p><strong>Privacidad:</strong> {{ row.acepta_privacidad ? '✅' : '❌' }}</p>
                  <p><strong>T&C:</strong> {{ row.acepta_terminos ? '✅' : '❌' }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">← Anterior</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">Siguiente →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { RegistroELC } from '@/composables/useAdmin_Store'

const props = defineProps<{
  data: RegistroELC[]
  estados: string[]
  searchModel: string
  finalizadoModel: string
  estadoModel: string
  pasoModel: string
}>()

const emit = defineEmits<{
  (e: 'export'): void
  (e: 'update:searchModel', v: string): void
  (e: 'update:finalizadoModel', v: string): void
  (e: 'update:estadoModel', v: string): void
  (e: 'update:pasoModel', v: string): void
}>()

const searchModel = computed({
  get: () => props.searchModel,
  set: (v) => emit('update:searchModel', v),
})
const finalizadoModel = computed({
  get: () => props.finalizadoModel,
  set: (v) => emit('update:finalizadoModel', v),
})
const estadoModel = computed({
  get: () => props.estadoModel,
  set: (v) => emit('update:estadoModel', v),
})
const pasoModel = computed({
  get: () => props.pasoModel,
  set: (v) => emit('update:pasoModel', v),
})

// Sort
const sortKey = ref<string>('created_at')
const sortAsc = ref(false)

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

function sortIcon(key: string) {
  if (sortKey.value !== key) return ''
  return sortAsc.value ? '↑' : '↓'
}

const sortedData = computed(() => {
  const arr = [...props.data]
  const key = sortKey.value as keyof RegistroELC
  arr.sort((a, b) => {
    const va = a[key]
    const vb = b[key]
    if (va == null && vb == null) return 0
    if (va == null) return 1
    if (vb == null) return -1
    if (va < vb) return sortAsc.value ? -1 : 1
    if (va > vb) return sortAsc.value ? 1 : -1
    return 0
  })
  return arr
})

// Pagination
const PAGE_SIZE = 25
const currentPage = ref(1)

watch(() => props.data.length, () => { currentPage.value = 1 })

const totalPages = computed(() => Math.max(1, Math.ceil(sortedData.value.length / PAGE_SIZE)))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return sortedData.value.slice(start, start + PAGE_SIZE)
})

// Expand
const expandedId = ref<string | null>(null)

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.table-section {
  width: 100%;
}

.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.toolbar-left {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  min-width: 240px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #0BE340;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.filter-select {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  padding: 0.6rem 0.75rem;
  outline: none;
  cursor: pointer;
}

.filter-select option {
  background: #1a1a1a;
  color: #fff;
}

.result-count {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
}

.export-btn {
  background: rgba(11, 227, 64, 0.12);
  border: 1.5px solid rgba(11, 227, 64, 0.3);
  border-radius: 10px;
  color: #0BE340;
  font-family: var(--font-parkinsans);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.export-btn:hover {
  background: rgba(11, 227, 64, 0.2);
  border-color: #0BE340;
  transform: translateY(-1px);
}

/* Table */
.table-scroll {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.data-table th {
  font-family: var(--font-parkinsans);
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.75rem 0.75rem;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: color 0.2s;
  text-align: left;
}

.data-table th:hover {
  color: #E0FA49;
}

.data-table td {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  vertical-align: top;
}

.data-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.row--done {
  background: rgba(11, 227, 64, 0.02);
}

.td-name {
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.td-uni {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.td-date {
  white-space: nowrap;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
}

.paso-pill {
  display: inline-block;
  font-family: var(--font-parkinsans);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.paso-pill--7 {
  background: rgba(11, 227, 64, 0.1);
  color: #0BE340;
  border-color: rgba(11, 227, 64, 0.3);
}

.status-badge {
  display: inline-block;
  font-family: var(--font-parkinsans);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}

.status--done {
  background: rgba(11, 227, 64, 0.12);
  color: #0BE340;
  border: 1px solid rgba(11, 227, 64, 0.3);
}

.status--pending {
  background: rgba(224, 250, 73, 0.1);
  color: #E0FA49;
  border: 1px solid rgba(224, 250, 73, 0.25);
}

.detail-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.detail-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Expanded row */
.expanded-row td {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 2px solid rgba(11, 227, 64, 0.15);
  padding: 1rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.detail-group h4 {
  font-family: var(--font-parkinsans);
  font-size: 0.85rem;
  font-weight: 700;
  color: #E0FA49;
  margin: 0 0 0.5rem;
}

.detail-group p {
  font-family: var(--font-myriad);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.25rem;
  line-height: 1.5;
  word-break: break-word;
}

.detail-group strong {
  color: rgba(255, 255, 255, 0.5);
}

.video-link {
  color: #2E7DFC;
  text-decoration: underline;
  word-break: break-all;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.75rem 0;
}

.page-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-parkinsans);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #0BE340;
  color: #0BE340;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .toolbar-left {
    flex-direction: column;
  }
  .search-input {
    min-width: 100%;
  }
}
</style>
