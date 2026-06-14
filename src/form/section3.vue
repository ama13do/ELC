<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 3 — Intereses y motivación</h2>
    <p class="form-section__subtitle">Queremos saber qué te impulsa y en qué áreas te gustaría trabajar posterior a la ELC. No hay respuestas incorrectas: tu perspectiva e interés son lo más importante. Responde con honestidad y reflexión.</p>

    <!-- P25: Escala conocimiento -->
    <FormField
      label="En una escala del 1 al 5, ¿qué tan familiarizadx estás con temas de cambio climático y energías renovables?"
      type="radio"
      v-model="nivelConocimientoStr"
      :options="opcionesConocimiento"
      required
    />

    <!-- P26: Propuesta -->
    <FormField
      label="¿Qué crees que necesita tu estado o universidad para impulsar la transición a energías renovables desde lo local?"
      type="textarea"
      v-model="formData.necesidad_transicion_estado"
      placeholder="Comparte tus ideas y reflexiones..."
      required
      noteText="Desarrolla tu respuesta en un párrafo"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'

const { formData } = useFormStore()

const nivelConocimientoStr = computed({
  get: () => formData.nivel_conocimiento_clima ? String(formData.nivel_conocimiento_clima) : '',
  set: (v: string) => { formData.nivel_conocimiento_clima = parseInt(v, 10) }
})

const opcionesConocimiento = [
  { label: '1 - Apenas estoy comenzando a informarme; el tema me genera curiosidad pero tengo poco conocimiento.', value: '1' },
  { label: '2 - Tengo nociones básicas: he leído o escuchado sobre el tema por cuenta propia, pero sin profundidad.', value: '2' },
  { label: '3 - Tengo un conocimiento intermedio: he tomado cursos, asistido a talleres o participado en actividades relacionadas con el tema.', value: '3' },
  { label: '4 - Tengo un conocimiento sólido: he estudiado el tema de forma sistemática o he trabajado en proyectos vinculados a él.', value: '4' },
  { label: '5 - Tengo conocimiento avanzado o especializado: es un área central en mi formación académica o experiencia profesional/activista.', value: '5' },
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
