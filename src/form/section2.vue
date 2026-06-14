<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 2 — Requisitos de elegibilidad</h2>
    <p class="form-section__subtitle">Esta sección verifica que cumples con los requisitos para participar en la ELC 2026. Responde con honestidad: la veracidad de la información será comprobable con documentación si resultas seleccionadx.</p>

    <!-- P14: Militancia política -->
    <FormField
      label="¿Tienes afiliación o militancia activa en algún partido político?"
      type="radio"
      v-model="militanciaStr"
      :options="['Sí', 'No']"
      required
    />

    <!-- P15: Estudiante activo -->
    <FormField
      label="¿Eres estudiante universitarix activo en modalidad presencial en alguna universidad pública o privada de México?"
      type="radio"
      v-model="estudianteStr"
      :options="['Sí', 'No']"
      required
    />

    <!-- P16: Nombre universidad -->
    <FormField
      label="¿Cómo se llama tu universidad o institución de educación superior?"
      type="text"
      v-model="formData.universidad_nombre"
      placeholder="Ej: Universidad Nacional Autónoma de México"
      required
    />

    <!-- P17: Tipo universidad -->
    <FormField
      label="¿Tu universidad es pública o privada?"
      type="radio"
      v-model="formData.universidad_tipo"
      :options="['Pública', 'Privada']"
      required
    />

    <!-- P18: Estado universidad -->
    <FormField
      label="¿En qué estado se encuentra tu universidad?"
      type="select"
      v-model="formData.universidad_estado"
      :options="estadosMexico"
      required
    />

    <!-- P19: Nombre carrera -->
    <FormField
      label="¿Cuál es el nombre de tu carrera, licenciatura o ingeniería?"
      type="text"
      v-model="formData.carrera_nombre"
      placeholder="Ej: Ingeniería Ambiental"
      required
    />

    <!-- P20: Periodicidad -->
    <FormField
      label="Indica el formato de periodicidad de tu carrera"
      type="radio"
      v-model="formData.carrera_periodicidad"
      :options="opcionesPeriodicidad"
      required
    />

    <!-- P21: Periodo actual -->
    <FormField
      label="Elige el periodo en el que te encuentras cursando la carrera"
      type="select"
      v-model="formData.carrera_periodo"
      :options="opcionesPeriodo"
      required
    />
    <FormField
      v-if="formData.carrera_periodo === 'Otro (especifique)'"
      label="Especifica en qué periodo vas"
      type="text"
      v-model="formData.carrera_periodo_otro"
      placeholder="Escribe aquí..."
      required
    />

    <!-- P22: Acceso dispositivo -->
    <FormField
      label="¿Cuentas con acceso a un dispositivo electrónico e internet?"
      type="radio"
      v-model="accesoStr"
      :options="['Sí', 'No']"
      required
    />

    <!-- P23: Manejo herramientas -->
    <FormField
      label="¿Tienes manejo básico de herramientas como Word, PowerPoint y Google Drive?"
      type="radio"
      v-model="formData.manejo_herramientas"
      :options="opcionesHerramientas"
      required
    />

    <!-- P24: Disponibilidad -->
    <FormField
      label="¿Tienes disponibilidad para asistir de forma virtual a las sesiones de la ELC del 6 al 31 de julio de 2026, de 7:00 a 9:00 pm (hora Ciudad de México)?"
      type="radio"
      v-model="formData.disponibilidad_horario"
      :options="opcionesDisponibilidad"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'

const { formData } = useFormStore()

// Boolean bridges
const militanciaStr = computed({
  get: () => formData.militancia_politica === true ? 'Sí' : formData.militancia_politica === false ? 'No' : '',
  set: (v: string) => { formData.militancia_politica = v === 'Sí' }
})

const estudianteStr = computed({
  get: () => formData.estudiante_activo === true ? 'Sí' : formData.estudiante_activo === false ? 'No' : '',
  set: (v: string) => { formData.estudiante_activo = v === 'Sí' }
})

const accesoStr = computed({
  get: () => formData.acceso_dispositivo === true ? 'Sí' : formData.acceso_dispositivo === false ? 'No' : '',
  set: (v: string) => { formData.acceso_dispositivo = v === 'Sí' }
})

const estadosMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
  'Yucatán', 'Zacatecas',
]

const opcionesPeriodicidad = ['Semestre', 'Trimestre', 'Cuatrimestre', 'Otro']

const opcionesPeriodo = [
  'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto',
  'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Onceavo', 'Doceavo',
  'Otro (especifique)',
]

const opcionesHerramientas = [
  { label: 'Sí', value: '1' },
  { label: 'Aún no, pero estoy en proceso de aprenderlas', value: '2' },
  { label: 'No', value: '3' },
]

const opcionesDisponibilidad = [
  { label: 'Sí, tengo disponibilidad completa', value: '1' },
  { label: 'Tengo disponibilidad parcial (podría faltar a algunas sesiones)', value: '2' },
  { label: 'No tengo disponibilidad en ese horario', value: '3' },
]
</script>

<style scoped>
.form-section__title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  color: #fff;
  margin: 0 0 0.35rem;
}

.form-section__subtitle {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 2rem;
}
</style>
