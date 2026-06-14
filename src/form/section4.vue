<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 4 — Experiencia, Liderazgo y Trabajo en Equipo</h2>
    <p class="form-section__subtitle">Cuéntanos sobre tus experiencias previas en activismo, liderazgo o trabajo comunitario. No importa si son pocas o muchas: queremos conocer tu trayectoria y cómo te relacionas con el trabajo colectivo.</p>

    <!-- P27: Experiencias de activismo -->
    <FormField
      label="¿Qué tipo de experiencias de activismo o liderazgo has tenido?"
      type="checkbox"
      v-model="formData.experiencias_activismo"
      :options="opcionesActivismo"
      required
      helpText="Puedes elegir más de una opción"
    />
    <FormField
      v-if="formData.experiencias_activismo.includes('8')"
      label="Especifica tu experiencia"
      type="text"
      v-model="formData.experiencias_activismo_otro"
      placeholder="Escribe aquí..."
      required
    />

    <!-- P28: Detalle experiencia (opcional) -->
    <FormField
      label="Si quisieras contarnos más sobre alguna de tus experiencias, te dejamos este espacio para que lo redactes en un párrafo"
      type="textarea"
      v-model="formData.experiencia_detalles"
      placeholder="Comparte lo que quieras..."
      noteText="Puedes usar estas preguntas como guía: ¿Qué hiciste y en qué consistía el proyecto o actividad? ¿Cuál fue tu rol específico? ¿Qué lograste o aprendiste? ¿A qué te dedicas actualmente?"
    />

    <!-- P29: Experiencia relevante -->
    <FormField
      label="Si respondiste la pregunta anterior, cuéntanos brevemente sobre la experiencia que consideres más relevante"
      type="textarea"
      v-model="formData.experiencia_relevante"
      placeholder="Describe brevemente tu experiencia más relevante..."
    />

    <!-- P30: Pertenece a colectivo -->
    <FormField
      label="¿Perteneces a algún grupo, colectivo u organización de la sociedad civil?"
      type="radio"
      v-model="perteneceStr"
      :options="['Sí', 'No']"
    />

    <!-- P31: Nombre colectivo (condicional) -->
    <FormField
      v-if="formData.pertenece_colectivo === true"
      label="En caso afirmativo, ¿cómo se llama?"
      type="text"
      v-model="formData.colectivo_nombre"
      placeholder="Nombre del grupo, colectivo u organización"
      required
    />

    <!-- P32: Tamaño colectivo (condicional) -->
    <FormField
      v-if="formData.pertenece_colectivo === true"
      label="En relación al par de preguntas anteriores, ¿cuántas personas integran este grupo?"
      type="select"
      v-model="formData.colectivo_tamano"
      :options="opcionesIntegrantes"
      required
    />

    <!-- P33: Roles en equipo -->
    <FormField
      label="¿Qué roles sueles asumir cuando trabajas en equipo?"
      type="checkbox"
      v-model="formData.roles_equipo"
      :options="opcionesRoles"
      required
      helpText="Puedes elegir más de una opción"
    />
    <FormField
      v-if="formData.roles_equipo.includes('7')"
      label="Especifica tu rol"
      type="text"
      v-model="formData.roles_equipo_otro"
      placeholder="Escribe aquí..."
      required
    />

    <!-- P34: Compartir redes -->
    <FormField
      label="¿Quieres compartir tus redes sociales?"
      type="radio"
      v-model="redesStr"
      :options="['Sí', 'No']"
    />

    <!-- P35: Enlaces redes (condicional) -->
    <FormField
      v-if="formData.quiere_compartir_redes === true"
      label="Comparte los enlaces o usuarios de las redes que quieras"
      type="textarea"
      v-model="formData.enlaces_redes"
      placeholder="Ej: Instagram: @tuusuario, Twitter: @tuusuario..."
      helpText="Puedes incluir varias redes, una por línea"
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
const perteneceStr = computed({
  get: () => formData.pertenece_colectivo === true ? 'Sí' : formData.pertenece_colectivo === false ? 'No' : '',
  set: (v: string) => { formData.pertenece_colectivo = v === 'Sí' }
})

const redesStr = computed({
  get: () => formData.quiere_compartir_redes === true ? 'Sí' : formData.quiere_compartir_redes === false ? 'No' : '',
  set: (v: string) => { formData.quiere_compartir_redes = v === 'Sí' }
})

const opcionesActivismo = [
  { label: 'He participado en movimientos estudiantiles o juveniles (consejos escolares, sociedades de alumnos, brigadas universitarias, marchas, etc.)', value: '1' },
  { label: 'He realizado voluntariados o servicio social en causas sociales (no necesariamente ambientales)', value: '2' },
  { label: 'He colaborado con organizaciones, colectivos o campañas ambientalistas o climáticas (ONGs, Fridays for Future, etc.)', value: '3' },
  { label: 'He liderado u organizado proyectos comunitarios o acciones locales (reforestaciones, talleres, auditorías energéticas, etc.)', value: '4' },
  { label: 'He participado en iniciativas directamente relacionadas con energías renovables o transición energética justa', value: '5' },
  { label: 'He tenido algún tipo de participación en medios de comunicación, artivismo o campañas digitales sobre clima o energía', value: '6' },
  { label: 'Ninguna experiencia previa en activismo o liderazgo (¡Pero tengo muchas ganas de empezar!)', value: '7' },
  { label: 'Otro (especifique)', value: '8' },
]

const opcionesIntegrantes = [
  'Menos de 5', '6 a 10', '11 a 50', '51 a 100', 'Más de 100',
]

const opcionesRoles = [
  { label: 'Me gusta facilitar que todxs participen y se escuchen', value: '1' },
  { label: 'Me encargo de aspectos logísticos o de organización', value: '2' },
  { label: 'Suelo proponer ideas nuevas o creativas', value: '3' },
  { label: 'Me enfoco en aterrizar las ideas y llevarlas a la acción', value: '4' },
  { label: 'Apoyo en lo que haga falta para que el equipo avance', value: '5' },
  { label: 'Aún no tengo claro cuál de estos roles suelo asumir', value: '6' },
  { label: 'Otro (especifique)', value: '7' },
]
</script>

<style scoped>
.form-section__title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  color: #FC3169;
  margin: 0 0 0.35rem;
}

.form-section__subtitle {
  font-family: var(--font-myriad);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 2rem;
  line-height: 1.6;
}
</style>
