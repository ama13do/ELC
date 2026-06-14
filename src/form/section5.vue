<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 5 — Video de presentación</h2>
    <div class="form-section__subtitle">
      <p>El video de presentación es una parte obligatoria del registro. Tiene un peso significativo en la evaluación porque es la forma principal en que podemos conocerte más allá de lo escrito: tu voz, tu energía y tu forma de pensar.</p>
      
      <h4 style="margin-top: 1rem; color: #fff; font-family: var(--font-parkinsans);">Instrucciones para el video:</h4>
      <p>Graba un video de máximo 6 minutos en el que respondas las siguientes 6 preguntas. No necesitas producción profesional: basta con que se te vea y escuche con claridad.</p>
      
      <ol style="text-align: left; margin-bottom: 1.5rem; margin-top: 1rem; padding-left: 1.5rem;">
        <li>Cuéntanos quién eres, cuál es tu historia y qué momento consideras determinante en ella para decidir integrarte al activismo climático y de transición energética justa.</li>
        <li>¿Por qué quieres participar en la Escuela de Liderazgo Climático 2026?</li>
        <li>¿Cuál crees que es el papel de las juventudes en transitar de energías fósiles a energías renovables en México?</li>
        <li>¿Por qué quieres pertenecer al Movimiento Hackers x Nuestro Futuro?</li>
        <li>¿Cuál es tu principal motivación para crear un capítulo universitario de Hackers x Nuestro Futuro o integrarte a un capítulo estatal del Movimiento?</li>
        <li>Cuéntanos si tienes alguna experiencia en iniciativas comunitarias, universitarias o proyectos con organizaciones de la sociedad civil y cuál ha sido tu rol en éstas. Menciona si han sido en temas relacionados con la transición energética a energías renovables, cambio climático o medio ambiente.</li>
      </ol>
      
      <p>Si aún no tienes tu video listo, puedes guardar el formulario y regresar después. Recuerda que tienes hasta el 26 de junio de 2026 a las 23:59 horas para subirlo. Sin video, tu postulación no estará completa.</p>
      <p>La plataforma guarda automáticamente tus respuestas como borrador, siempre y cuando entres nuevamente al formulario desde el mismo dispositivo y navegador o recuperes tu progreso con tu correo y teléfono celular. ¡No repitas tu registro!</p>
    </div>

    <!-- P36: Compromiso video -->
    <FormField
      label="¿Te comprometes a grabar y subir tu video de presentación (máximo 6 minutos)?"
      type="radio"
      v-model="formData.compromiso_video"
      :options="opcionesVideo"
      required
    />

    <!-- P37: Enlace video -->
    <FormField
      label="Pega aquí el enlace (URL) donde podamos ver y descargar tu video"
      type="url"
      v-model="formData.enlace_video"
      placeholder="https://drive.google.com/... o https://youtu.be/..."
      helpText="Puede ser un enlace de Google Drive, YouTube, Vimeo u otra plataforma"
    />
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'

const { formData } = useFormStore()

const opcionesVideo = [
  { label: 'Sí, acepto grabar el video y lo puedo subir ahora.', value: '1' },
  { label: 'Sí, acepto grabar el video, pero lo subiré después.', value: '2' },
  { label: 'No estoy dispuestx a grabar el video.', value: '3' },
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
