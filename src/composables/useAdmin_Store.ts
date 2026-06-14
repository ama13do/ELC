import { ref, computed, reactive } from 'vue'
import { supabase } from '@/lib/supabase'

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
export interface RegistroELC {
  id: string
  paso_actual: number
  finalizado: boolean
  created_at: string
  updated_at: string
  // S1
  nombres: string
  primer_apellido: string
  segundo_apellido: string | null
  email_principal: string
  telefono_celular: string | null
  email_alternativo: string | null
  telefono_fijo: string | null
  fecha_nacimiento: string | null
  estado_residencia: string | null
  municipio_residencia: string | null
  comunidad_rural: boolean | null
  genero: string | null
  identidades: string[] | null
  medio_enterado: string | null
  red_social_enterado: string | null
  // S2
  militancia_politica: boolean | null
  estudiante_activo: boolean | null
  universidad_nombre: string | null
  universidad_tipo: string | null
  universidad_estado: string | null
  carrera_nombre: string | null
  carrera_periodicidad: string | null
  carrera_periodo: string | null
  acceso_dispositivo: boolean | null
  manejo_herramientas: string | null
  disponibilidad_horario: string | null
  // S3
  nivel_conocimiento_clima: number | null
  necesidad_transicion_estado: string | null
  // S4
  experiencias_activismo: string[] | null
  experiencia_detalles: string | null
  experiencia_relevante: string | null
  pertenece_colectivo: boolean | null
  colectivo_nombre: string | null
  colectivo_tamano: string | null
  roles_equipo: string[] | null
  quiere_compartir_redes: boolean | null
  enlaces_redes: string | null
  // S5
  compromiso_video: string | null
  enlace_video: string | null
  // S6
  compromiso_asistencia: boolean
  compromiso_grabaciones: boolean
  compromiso_capitulo_hxnf: boolean
  autorizacion_imagen: boolean
  declaracion_veracidad: boolean
  acepta_privacidad: boolean
  acepta_terminos: boolean
}

// ─────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────
const registros = ref<RegistroELC[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const isAuthenticated = ref(false)

const ADMIN_PASSWORD = 'hxnf-admin-2026'

const filters = reactive({
  search: '',
  finalizado: 'all' as 'all' | 'true' | 'false',
  estado: '',
  pasoActual: 'all' as string,
})

// ─────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────
function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    isAuthenticated.value = true
    sessionStorage.setItem('admin_auth', 'true')
    return true
  }
  return false
}

function checkSession(): boolean {
  if (sessionStorage.getItem('admin_auth') === 'true') {
    isAuthenticated.value = true
    return true
  }
  return false
}

function logout() {
  isAuthenticated.value = false
  sessionStorage.removeItem('admin_auth')
}

// ─────────────────────────────────────────────────────────────
//  FETCH
// ─────────────────────────────────────────────────────────────
async function fetchAllRegistros() {
  isLoading.value = true
  error.value = null
  try {
    const { data, error: err } = await supabase
      .from('registros_elc_2026')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) throw err
    registros.value = (data || []) as RegistroELC[]
  } catch (e: any) {
    error.value = e.message || 'Error al cargar datos'
    console.error('Admin fetch error:', e)
  } finally {
    isLoading.value = false
  }
}

// ─────────────────────────────────────────────────────────────
//  COMPUTED STATS
// ─────────────────────────────────────────────────────────────
const stats = computed(() => {
  const all = registros.value
  const total = all.length
  const finalizados = all.filter(r => r.finalizado).length
  const enProgreso = all.filter(r => !r.finalizado).length
  const tasaFinalizacion = total > 0 ? Math.round((finalizados / total) * 100) : 0

  // Desglose por paso
  const porPaso: Record<number, number> = {}
  all.forEach(r => {
    if (!r.finalizado) {
      porPaso[r.paso_actual] = (porPaso[r.paso_actual] || 0) + 1
    }
  })

  // Por estado
  const porEstado: Record<string, number> = {}
  all.forEach(r => {
    const estado = r.estado_residencia || 'Sin especificar'
    porEstado[estado] = (porEstado[estado] || 0) + 1
  })

  // Por género
  const porGenero: Record<string, number> = {}
  all.forEach(r => {
    const genero = r.genero || 'Sin especificar'
    porGenero[genero] = (porGenero[genero] || 0) + 1
  })

  // Por día
  const porDia: Record<string, number> = {}
  all.forEach(r => {
    const dia = r.created_at ? r.created_at.split('T')[0] : 'desconocido'
    porDia[dia] = (porDia[dia] || 0) + 1
  })

  // Universidades top
  const porUniversidad: Record<string, number> = {}
  all.forEach(r => {
    if (r.universidad_nombre) {
      porUniversidad[r.universidad_nombre] = (porUniversidad[r.universidad_nombre] || 0) + 1
    }
  })

  return {
    total,
    finalizados,
    enProgreso,
    tasaFinalizacion,
    porPaso,
    porEstado,
    porGenero,
    porDia,
    porUniversidad,
  }
})

// ─────────────────────────────────────────────────────────────
//  FILTERED DATA
// ─────────────────────────────────────────────────────────────
const filteredRegistros = computed(() => {
  let result = registros.value

  // Filtro: finalizado
  if (filters.finalizado === 'true') {
    result = result.filter(r => r.finalizado)
  } else if (filters.finalizado === 'false') {
    result = result.filter(r => !r.finalizado)
  }

  // Filtro: estado
  if (filters.estado) {
    result = result.filter(r => r.estado_residencia === filters.estado)
  }

  // Filtro: paso actual
  if (filters.pasoActual !== 'all') {
    const paso = parseInt(filters.pasoActual)
    result = result.filter(r => r.paso_actual === paso)
  }

  // Filtro: búsqueda
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(r =>
      (r.nombres?.toLowerCase().includes(q)) ||
      (r.primer_apellido?.toLowerCase().includes(q)) ||
      (r.segundo_apellido?.toLowerCase().includes(q)) ||
      (r.email_principal?.toLowerCase().includes(q)) ||
      (r.telefono_celular?.toLowerCase().includes(q)) ||
      (r.universidad_nombre?.toLowerCase().includes(q))
    )
  }

  return result
})

// ─────────────────────────────────────────────────────────────
//  UNIQUE STATES (for filter dropdown)
// ─────────────────────────────────────────────────────────────
const uniqueEstados = computed(() => {
  const estados = new Set<string>()
  registros.value.forEach(r => {
    if (r.estado_residencia) estados.add(r.estado_residencia)
  })
  return Array.from(estados).sort()
})

// ─────────────────────────────────────────────────────────────
//  CSV EXPORT
// ─────────────────────────────────────────────────────────────
function exportToCSV() {
  const data = filteredRegistros.value
  if (data.length === 0) return

  const headers = Object.keys(data[0]) as (keyof RegistroELC)[]

  const csvRows: string[] = []
  // Header row
  csvRows.push(headers.join(','))

  // Data rows
  for (const row of data) {
    const values = headers.map(h => {
      let val = row[h]
      if (val === null || val === undefined) return ''
      if (Array.isArray(val)) val = val.join('; ')
      const str = String(val).replace(/"/g, '""')
      return `"${str}"`
    })
    csvRows.push(values.join(','))
  }

  const csvString = csvRows.join('\n')
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `registros_elc_2026_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────────────────────
//  INCOMPLETE REGISTROS (for reminders)
// ─────────────────────────────────────────────────────────────
const incompleteRegistros = computed(() => {
  return registros.value
    .filter(r => !r.finalizado)
    .sort((a, b) => a.paso_actual - b.paso_actual)
})

// ─────────────────────────────────────────────────────────────
//  EXPORT
// ─────────────────────────────────────────────────────────────
export function useAdminStore() {
  return {
    registros,
    isLoading,
    error,
    isAuthenticated,
    filters,
    stats,
    filteredRegistros,
    uniqueEstados,
    incompleteRegistros,
    login,
    checkSession,
    logout,
    fetchAllRegistros,
    exportToCSV,
  }
}
