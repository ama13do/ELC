import { reactive, ref, watch, toRaw } from 'vue'
import { supabase } from '@/lib/supabase'

export function formatPhone(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  return digits.slice(-10)
}

export interface FormData {
  id: string | null
  paso_actual: number
  finalizado: boolean
  nombres: string
  primer_apellido: string
  segundo_apellido: string
  email_principal: string
  telefono_codigo_pais: string
  telefono_numero_local: string
  email_alternativo: string
  telefono_fijo: string
  fecha_nacimiento: string
  estado_residencia: string
  municipio_residencia: string
  comunidad_rural: boolean | null
  genero: string
  identidades: string[]
  identidades_otro: string
  medio_enterado: string
  medio_enterado_otro: string
  red_social_enterado: string
  militancia_politica: boolean | null
  estudiante_activo: boolean | null
  universidad_nombre: string
  universidad_tipo: string
  universidad_estado: string
  carrera_nombre: string
  carrera_periodicidad: string
  carrera_periodo: string
  carrera_periodo_otro: string
  acceso_dispositivo: boolean | null
  manejo_herramientas: string
  disponibilidad_horario: string
  nivel_conocimiento_clima: number | null
  necesidad_transicion_estado: string
  experiencias_activismo: string[]
  experiencias_activismo_otro: string
  experiencia_detalles: string
  experiencia_relevante: string
  pertenece_colectivo: boolean | null
  colectivo_nombre: string
  colectivo_tamano: string
  roles_equipo: string[]
  roles_equipo_otro: string
  quiere_compartir_redes: boolean | null
  enlaces_redes: string
  compromiso_video: string
  enlace_video: string
  compromiso_asistencia: boolean
  compromiso_grabaciones: boolean
  compromiso_capitulo_hxnf: boolean
  autorizacion_imagen: boolean
  declaracion_veracidad: boolean
  acepta_privacidad: boolean
  acepta_terminos: boolean
}

const STORAGE_KEY = 'elc_form_data'
const STORAGE_STEP_KEY = 'elc_form_step'

function createDefaultFormData(): FormData {
  return {
    id: null,
    paso_actual: 1,
    finalizado: false,
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    email_principal: '',
    telefono_codigo_pais: '+52',
    telefono_numero_local: '',
    email_alternativo: '',
    telefono_fijo: '',
    fecha_nacimiento: '',
    estado_residencia: '',
    municipio_residencia: '',
    comunidad_rural: null,
    genero: '',
    identidades: [],
    identidades_otro: '',
    medio_enterado: '',
    medio_enterado_otro: '',
    red_social_enterado: '',
    militancia_politica: null,
    estudiante_activo: null,
    universidad_nombre: '',
    universidad_tipo: '',
    universidad_estado: '',
    carrera_nombre: '',
    carrera_periodicidad: '',
    carrera_periodo: '',
    carrera_periodo_otro: '',
    acceso_dispositivo: null,
    manejo_herramientas: '',
    disponibilidad_horario: '',
    nivel_conocimiento_clima: null,
    necesidad_transicion_estado: '',
    experiencias_activismo: [],
    experiencias_activismo_otro: '',
    experiencia_detalles: '',
    experiencia_relevante: '',
    pertenece_colectivo: null,
    colectivo_nombre: '',
    colectivo_tamano: '',
    roles_equipo: [],
    roles_equipo_otro: '',
    quiere_compartir_redes: null,
    enlaces_redes: '',
    compromiso_video: '',
    enlace_video: '',
    compromiso_asistencia: false,
    compromiso_grabaciones: false,
    compromiso_capitulo_hxnf: false,
    autorizacion_imagen: false,
    declaracion_veracidad: false,
    acepta_privacidad: false,
    acepta_terminos: false,
  }
}

function loadInitialData(): FormData {
  const defaults = createDefaultFormData()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      defaults.email_principal = parsed.email_principal || ''
      defaults.telefono_codigo_pais = parsed.telefono_codigo_pais || '+52'
      defaults.telefono_numero_local = parsed.telefono_numero_local || ''
    }
  } catch { /* ignore */ }
  return defaults
}

const formData = reactive<FormData>(loadInitialData())
const currentStep = ref(0)
const totalSteps = 7
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const isLoading = ref(false)
const validationErrors = ref<string[]>([])
const requiresRestoreConfirm = ref(false)
const isCompleted = ref(false)
let tempLoadedData: Partial<FormData> | null = null

let saveTimeout: ReturnType<typeof setTimeout> | null = null
function saveToLocalStorage() {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toRaw(formData)))
      localStorage.setItem(STORAGE_STEP_KEY, String(currentStep.value))
    } catch { /* storage full */ }
  }, 300)
}
watch(formData, saveToLocalStorage, { deep: true })
watch(currentStep, saveToLocalStorage)

let autoSaveInterval: ReturnType<typeof setInterval> | null = null

function startAutoSave() {
  if (autoSaveInterval) return
  autoSaveInterval = setInterval(() => {
    if (currentStep.value > 0 && formData.id) {
      saveToSupabase()
    }
  }, 30000)
}

function stopAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
    autoSaveInterval = null
  }
}

function formDataToDbRow(data: FormData) {
  const identidades = data.identidades.map(id => id === '6' && data.identidades_otro ? `6-${data.identidades_otro}` : id)
  const medio_enterado = data.medio_enterado === '7' && data.medio_enterado_otro ? `7-${data.medio_enterado_otro}` : data.medio_enterado
  const experiencias = data.experiencias_activismo.map(id => id === '8' && data.experiencias_activismo_otro ? `8-${data.experiencias_activismo_otro}` : id)
  const roles = data.roles_equipo.map(id => id === '7' && data.roles_equipo_otro ? `7-${data.roles_equipo_otro}` : id)
  const periodo = data.carrera_periodo === 'Otro (especifique)' && data.carrera_periodo_otro ? `Otro-${data.carrera_periodo_otro}` : data.carrera_periodo

  const row: Record<string, any> = {
    paso_actual: data.paso_actual,
    finalizado: data.finalizado,
    nombres: data.nombres || null,
    primer_apellido: data.primer_apellido || null,
    segundo_apellido: data.segundo_apellido || null,
    email_principal: data.email_principal,
    telefono_celular: `${data.telefono_codigo_pais} ${data.telefono_numero_local}`.trim() || null,
    email_alternativo: data.email_alternativo || null,
    telefono_fijo: data.telefono_fijo || null,
    fecha_nacimiento: data.fecha_nacimiento || null,
    estado_residencia: data.estado_residencia || null,
    municipio_residencia: data.municipio_residencia || null,
    comunidad_rural: data.comunidad_rural,
    genero: data.genero || null,
    identidades: identidades.length > 0 ? identidades : null,
    medio_enterado: medio_enterado || null,
    red_social_enterado: data.red_social_enterado || null,
    militancia_politica: data.militancia_politica,
    estudiante_activo: data.estudiante_activo,
    universidad_nombre: data.universidad_nombre || null,
    universidad_tipo: data.universidad_tipo || null,
    universidad_estado: data.universidad_estado || null,
    carrera_nombre: data.carrera_nombre || null,
    carrera_periodicidad: data.carrera_periodicidad || null,
    carrera_periodo: periodo || null,
    acceso_dispositivo: data.acceso_dispositivo,
    manejo_herramientas: data.manejo_herramientas || null,
    disponibilidad_horario: data.disponibilidad_horario || null,
    nivel_conocimiento_clima: data.nivel_conocimiento_clima,
    necesidad_transicion_estado: data.necesidad_transicion_estado || null,
    experiencias_activismo: experiencias.length > 0 ? experiencias : null,
    experiencia_detalles: data.experiencia_detalles || null,
    experiencia_relevante: data.experiencia_relevante || null,
    pertenece_colectivo: data.pertenece_colectivo,
    colectivo_nombre: data.colectivo_nombre || null,
    colectivo_tamano: data.colectivo_tamano || null,
    roles_equipo: roles.length > 0 ? roles : null,
    quiere_compartir_redes: data.quiere_compartir_redes,
    enlaces_redes: data.enlaces_redes || null,
    compromiso_video: data.compromiso_video || null,
    enlace_video: data.enlace_video || null,
    compromiso_asistencia: data.compromiso_asistencia ?? false,
    compromiso_grabaciones: data.compromiso_grabaciones ?? false,
    compromiso_capitulo_hxnf: data.compromiso_capitulo_hxnf ?? false,
    autorizacion_imagen: data.autorizacion_imagen ?? false,
    declaracion_veracidad: data.declaracion_veracidad ?? false,
    acepta_privacidad: data.acepta_privacidad ?? false,
    acepta_terminos: data.acepta_terminos ?? false,
  }

  if (data.id) row.id = data.id
  return row
}

function dbRowToFormData(row: Record<string, any>): Partial<FormData> {
  let identidades: string[] = []; let identidades_otro = ''
  if (Array.isArray(row.identidades)) {
    identidades = row.identidades.map((v: string) => {
      if (v.startsWith('6-')) { identidades_otro = v.substring(2); return '6' }
      return v
    })
  }

  let medio_enterado = row.medio_enterado || ''; let medio_enterado_otro = ''
  if (medio_enterado.startsWith('7-')) { medio_enterado_otro = medio_enterado.substring(2); medio_enterado = '7' }

  let experiencias: string[] = []; let experiencias_otro = ''
  if (Array.isArray(row.experiencias_activismo)) {
    experiencias = row.experiencias_activismo.map((v: string) => {
      if (v.startsWith('8-')) { experiencias_otro = v.substring(2); return '8' }
      return v
    })
  }

  let roles: string[] = []; let roles_otro = ''
  if (Array.isArray(row.roles_equipo)) {
    roles = row.roles_equipo.map((v: string) => {
      if (v.startsWith('7-')) { roles_otro = v.substring(2); return '7' }
      return v
    })
  }

  let periodo = row.carrera_periodo || ''; let periodo_otro = ''
  if (periodo.startsWith('Otro-')) {
    periodo_otro = periodo.substring(5)
    periodo = 'Otro (especifique)'
  }

  // Parse phone format (e.g. "+52 6623439461")
  let telCode = '+52'
  let telLocal = ''
  if (row.telefono_celular) {
    const parts = row.telefono_celular.split(' ')
    if (parts.length > 1) {
      telCode = parts[0]
      telLocal = parts.slice(1).join('').replace(/\D/g, '')
    } else {
      telLocal = row.telefono_celular.replace(/\D/g, '')
    }
  }

  return {
    id: row.id || null,
    paso_actual: row.paso_actual || 1,
    finalizado: row.finalizado || false,
    nombres: row.nombres || '',
    primer_apellido: row.primer_apellido || '',
    segundo_apellido: row.segundo_apellido || '',
    email_principal: row.email_principal || '',
    telefono_codigo_pais: telCode,
    telefono_numero_local: telLocal,
    email_alternativo: row.email_alternativo || '',
    telefono_fijo: row.telefono_fijo || '',
    fecha_nacimiento: row.fecha_nacimiento || '',
    estado_residencia: row.estado_residencia || '',
    municipio_residencia: row.municipio_residencia || '',
    comunidad_rural: row.comunidad_rural ?? null,
    genero: row.genero || '',
    identidades, identidades_otro,
    medio_enterado, medio_enterado_otro,
    red_social_enterado: row.red_social_enterado || '',
    militancia_politica: row.militancia_politica ?? null,
    estudiante_activo: row.estudiante_activo ?? null,
    universidad_nombre: row.universidad_nombre || '',
    universidad_tipo: row.universidad_tipo || '',
    universidad_estado: row.universidad_estado || '',
    carrera_nombre: row.carrera_nombre || '',
    carrera_periodicidad: row.carrera_periodicidad || '',
    carrera_periodo: periodo, carrera_periodo_otro: periodo_otro,
    acceso_dispositivo: row.acceso_dispositivo ?? null,
    manejo_herramientas: row.manejo_herramientas || '',
    disponibilidad_horario: row.disponibilidad_horario || '',
    nivel_conocimiento_clima: row.nivel_conocimiento_clima ?? null,
    necesidad_transicion_estado: row.necesidad_transicion_estado || '',
    experiencias_activismo: experiencias, experiencias_activismo_otro: experiencias_otro,
    experiencia_detalles: row.experiencia_detalles || '',
    experiencia_relevante: row.experiencia_relevante || '',
    pertenece_colectivo: row.pertenece_colectivo ?? null,
    colectivo_nombre: row.colectivo_nombre || '',
    colectivo_tamano: row.colectivo_tamano || '',
    roles_equipo: roles, roles_equipo_otro: roles_otro,
    quiere_compartir_redes: row.quiere_compartir_redes ?? null,
    enlaces_redes: row.enlaces_redes || '',
    compromiso_video: row.compromiso_video || '',
    enlace_video: row.enlace_video || '',
    compromiso_asistencia: row.compromiso_asistencia ?? false,
    compromiso_grabaciones: row.compromiso_grabaciones ?? false,
    compromiso_capitulo_hxnf: row.compromiso_capitulo_hxnf ?? false,
    autorizacion_imagen: row.autorizacion_imagen ?? false,
    declaracion_veracidad: row.declaracion_veracidad ?? false,
    acepta_privacidad: row.acepta_privacidad ?? false,
    acepta_terminos: row.acepta_terminos ?? false,
  }
}

function validateSection(step: number): string[] {
  const errors: string[] = []
  const d = formData

  switch (step) {
    case 0:
      if (!d.email_principal.trim()) errors.push('El correo electrónico es obligatorio')
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email_principal)) errors.push('Ingresa un correo electrónico válido')
      const phoneClean = formatPhone(d.telefono_numero_local)
      if (!d.telefono_numero_local.trim()) errors.push('El teléfono celular es obligatorio')
      else if (phoneClean.length !== 10) errors.push('El teléfono celular debe tener exactamente 10 dígitos')
      break

    case 1:
      if (!d.nombres.trim()) errors.push('El nombre es obligatorio')
      if (!d.primer_apellido.trim()) errors.push('El primer apellido es obligatorio')
      if (!d.fecha_nacimiento) errors.push('La fecha de nacimiento es obligatoria')
      if (!d.estado_residencia) errors.push('El estado de residencia es obligatorio')
      if (!d.municipio_residencia.trim()) errors.push('La alcaldía o municipio es obligatoria')
      if (d.comunidad_rural === null) errors.push('Indica si vives en comunidad rural o periférica')
      if (!d.genero) errors.push('El género es obligatorio')
      if (d.identidades.length === 0) errors.push('Selecciona al menos una opción en identidades')
      if (!d.medio_enterado) errors.push('Indica cómo te enteraste de la ELC')
      if (d.medio_enterado === '1' && !d.red_social_enterado) errors.push('Indica en cuál red social te enteraste')
      break

    case 2:
      if (d.militancia_politica === null) errors.push('Indica si tienes afiliación política')
      if (d.estudiante_activo === null) errors.push('Indica si eres estudiante activo')
      if (!d.universidad_nombre.trim()) errors.push('El nombre de la universidad es obligatorio')
      if (!d.universidad_tipo) errors.push('Indica si tu universidad es pública o privada')
      if (!d.universidad_estado) errors.push('El estado de la universidad es obligatorio')
      if (!d.carrera_nombre.trim()) errors.push('El nombre de la carrera es obligatorio')
      if (!d.carrera_periodicidad) errors.push('El formato de periodicidad es obligatorio')
      if (!d.carrera_periodo) errors.push('El periodo actual es obligatorio')
      if (d.carrera_periodo === 'Otro (especifique)' && !d.carrera_periodo_otro.trim()) errors.push('Especifica el periodo de tu carrera')
      if (d.acceso_dispositivo === null) errors.push('Indica si cuentas con dispositivo e internet')
      if (!d.manejo_herramientas) errors.push('Indica tu manejo de herramientas')
      if (!d.disponibilidad_horario) errors.push('Indica tu disponibilidad')
      break

    case 3:
      if (d.nivel_conocimiento_clima === null) errors.push('Selecciona tu nivel de familiaridad')
      if (!d.necesidad_transicion_estado.trim()) errors.push('Esta pregunta es obligatoria')
      break

    case 4:
      if (d.experiencias_activismo.length === 0) errors.push('Selecciona al menos una experiencia')
      if (d.roles_equipo.length === 0) errors.push('Selecciona al menos un rol')
      if (d.pertenece_colectivo && !d.colectivo_tamano) errors.push('Indica la cantidad de integrantes de tu colectivo')
      break

    case 5:
      if (!d.compromiso_video) errors.push('Indica tu compromiso con el video')
      break

    case 6:
      if (d.acepta_privacidad === false) errors.push('Debes aceptar el Aviso de Privacidad')
      if (d.acepta_terminos === false) errors.push('Debes aceptar los Términos y Condiciones')
      break
  }

  return errors
}

async function saveToSupabase(): Promise<boolean> {
  console.log("Datos enviados a Supabase:", JSON.stringify(formData, null, 2));
  if (!formData.email_principal) return false

  try {
    const row = formDataToDbRow(formData)
    row.updated_at = new Date().toISOString()

    if (formData.id) {
      const { error } = await supabase.from('registros_elc_2026').update(row).eq('id', formData.id)
      if (error) { console.error('Error updating Supabase:', error); return false }
    } else {
      delete row.id
      const { data, error } = await supabase.from('registros_elc_2026').insert(row).select('id').single()
      if (error) { console.error('Error inserting Supabase:', error); return false }
      if (data) formData.id = data.id
    }
    return true
  } catch (err) {
    console.error('Supabase save error:', err)
    return false
  }
}

async function lookupByEmailAndPhone(email: string, fullPhone: string): Promise<{ state: 'not_found' | 'completed' | 'in_progress_match' | 'in_progress_mismatch', data?: Partial<FormData> }> {
  isLoading.value = true
  try {
    const cleanPhone = fullPhone.replace(/\s+/g, '')

    const { data, error } = await supabase
      .from('registros_elc_2026')
      .select('*')
      .ilike('email_principal', email.trim())
      .maybeSingle()

    if (error) {
      return { state: 'not_found' }
    }

    if (data) {
      const dbPhoneClean = data.telefono_celular ? data.telefono_celular.replace(/\s+/g, '') : ''

      const parsed = dbRowToFormData(data)

      if (data.finalizado) {
        return { state: 'completed', data: parsed }
      }

      if (dbPhoneClean === cleanPhone) {
        return { state: 'in_progress_match', data: parsed }
      } else {
        return { state: 'in_progress_mismatch', data: parsed }
      }
    }

    return { state: 'not_found' }
  } catch (err) {
    console.error('Lookup exception:', err)
    return { state: 'not_found' }
  } finally {
    isLoading.value = false
  }
}

export function useFormStore() {
  function nextStep(): boolean {
    const errors = validateSection(currentStep.value)
    validationErrors.value = errors
    if (errors.length > 0) return false

    if (currentStep.value < totalSteps - 1) {
      currentStep.value++
      formData.paso_actual = currentStep.value
      saveToSupabase()
      startAutoSave()
    }
    return true
  }

  function prevStep() {
    if (currentStep.value > 0) currentStep.value--
  }

  function goToStep(step: number) {
    if (step >= 0 && step < totalSteps) {
      if (step <= formData.paso_actual) currentStep.value = step
    }
  }

  function resetForm() {
    Object.assign(formData, createDefaultFormData())
    currentStep.value = 0
    validationErrors.value = []
    isCompleted.value = false
    requiresRestoreConfirm.value = false
    tempLoadedData = null
    stopAutoSave()
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_STEP_KEY)
  }

  async function submitForm(): Promise<boolean> {
    const errors = validateSection(currentStep.value)
    validationErrors.value = errors
    if (errors.length > 0) return false

    isSubmitting.value = true
    submitError.value = null

    try {
      formData.finalizado = true
      formData.paso_actual = totalSteps
      const ok = await saveToSupabase()
      if (!ok) {
        submitError.value = 'Error al enviar el formulario. Intenta de nuevo.'
        formData.finalizado = false
        return false
      }
      stopAutoSave()
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_STEP_KEY)
      return true
    } catch (err: any) {
      submitError.value = err.message || 'Error al enviar el formulario'
      formData.finalizado = false
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  async function startForm(): Promise<boolean> {
    formData.telefono_numero_local = formatPhone(formData.telefono_numero_local)

    const errors = validateSection(0)
    validationErrors.value = errors
    if (errors.length > 0) return false

    let localSaved: FormData | null = null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        const localFullPhone = (parsed.telefono_codigo_pais + parsed.telefono_numero_local).replace(/\s+/g, '')
        const inputFullPhone = (formData.telefono_codigo_pais + formData.telefono_numero_local).replace(/\s+/g, '')

        if (parsed.email_principal.toLowerCase() === formData.email_principal.toLowerCase() && localFullPhone === inputFullPhone) {
          localSaved = parsed
        }
      }
    } catch { }

    const fullPhoneStr = formData.telefono_codigo_pais + formData.telefono_numero_local
    const result = await lookupByEmailAndPhone(formData.email_principal, fullPhoneStr)

    const email = formData.email_principal
    const code = formData.telefono_codigo_pais
    const num = formData.telefono_numero_local
    Object.assign(formData, createDefaultFormData())
    formData.email_principal = email
    formData.telefono_codigo_pais = code
    formData.telefono_numero_local = num

    if (result.state === 'completed' && result.data) {
      Object.assign(formData, { ...createDefaultFormData(), ...result.data })
      isCompleted.value = true
      currentStep.value = Math.min(formData.paso_actual, totalSteps - 1)
      startAutoSave()
      return true
    }

    if (result.state === 'in_progress_match' && result.data) {
      if (localSaved) {
        Object.assign(formData, localSaved)
        let stepFromLocal = 1
        try {
          const rawStep = localStorage.getItem(STORAGE_STEP_KEY)
          if (rawStep) stepFromLocal = parseInt(rawStep, 10) || 1
        } catch { }
        currentStep.value = Math.min(stepFromLocal, totalSteps - 1)
      } else {
        Object.assign(formData, { ...createDefaultFormData(), ...result.data })
        currentStep.value = Math.min(formData.paso_actual, totalSteps - 1)
      }
      startAutoSave()
      return true
    }

    if (result.state === 'in_progress_mismatch' && result.data) {
      requiresRestoreConfirm.value = true
      tempLoadedData = result.data
      return false
    }

    if (localSaved) {
      Object.assign(formData, localSaved)
      let stepFromLocal = 1
      try {
        const rawStep = localStorage.getItem(STORAGE_STEP_KEY)
        if (rawStep) stepFromLocal = parseInt(rawStep, 10) || 1
      } catch { }
      currentStep.value = Math.min(stepFromLocal, totalSteps - 1)
    } else {
      currentStep.value = 1
      formData.paso_actual = 1
    }
    await saveToSupabase()
    startAutoSave()
    return true
  }

  function confirmRestore(accept: boolean) {
    requiresRestoreConfirm.value = false
    if (accept && tempLoadedData) {
      Object.assign(formData, { ...createDefaultFormData(), ...tempLoadedData })
      currentStep.value = Math.min(formData.paso_actual, totalSteps - 1)
    } else {
      currentStep.value = 1
      formData.paso_actual = 1
      formData.telefono_numero_local = formatPhone(formData.telefono_numero_local)
      if (tempLoadedData?.id) {
        formData.id = tempLoadedData.id
      }
    }
    tempLoadedData = null
    startAutoSave()
    saveToSupabase()
  }

  return {
    formData,
    currentStep,
    totalSteps,
    isSubmitting,
    isLoading,
    submitError,
    validationErrors,
    requiresRestoreConfirm,
    isCompleted,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    submitForm,
    startForm,
    confirmRestore,
    saveToSupabase,
  }
}

export const sectionNames = [
  'Inicio',
  'Datos Personales',
  'Elegibilidad',
  'Motivación',
  'Experiencia',
  'Video',
  'Compromisos',
]
