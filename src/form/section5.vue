<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 5 — Video de presentación</h2>
    <div class="form-section__subtitle">
      <p class="intro-text">El video de presentación es una <strong>parte obligatoria</strong> del registro. Tiene un peso significativo en la evaluación porque es la forma principal en que podemos conocerte más allá de lo escrito: <strong style="color: #E0FA49;">tu voz, tu energía y tu forma de pensar.</strong></p>
    </div>

    <div class="instructions-box">
      <h4 class="instructions-title">Instrucciones para el video</h4>
      <p class="instructions-intro">Graba un video de <strong style="color: #0BE340;">máximo 6 minutos</strong> en el que respondas las siguientes <strong style="color: #0BE340;">6 preguntas</strong>. No necesitas producción profesional: basta con que se te vea y escuche con claridad.</p>
      
      <ol class="instructions-list">
        <li><span class="list-num">1</span> Cuéntanos quién eres, cuál es tu historia y qué momento consideras determinante en ella para decidir integrarte al activismo climático y de transición energética justa.</li>
        <li><span class="list-num">2</span> ¿Por qué quieres participar en la Escuela de Liderazgo Climático 2026?</li>
        <li><span class="list-num">3</span> ¿Cuál crees que es el papel de las juventudes en transitar de energías fósiles a energías renovables en México?</li>
        <li><span class="list-num">4</span> ¿Por qué quieres pertenecer al Movimiento Hackers x Nuestro Futuro?</li>
        <li><span class="list-num">5</span> ¿Cuál es tu principal motivación para crear un capítulo universitario de Hackers x Nuestro Futuro o integrarte a un capítulo estatal del Movimiento?</li>
        <li><span class="list-num">6</span> Cuéntanos si tienes alguna experiencia en iniciativas comunitarias, universitarias o proyectos con organizaciones de la sociedad civil y cuál ha sido tu rol en éstas.</li>
      </ol>

      <div class="save-info">
        <p><strong style="color: #0BE340;">Puedes retomar tu progreso</strong> desde cualquier dispositivo con tu correo y teléfono. Los cambios se guardan automáticamente cada 30 segundos.</p>
        <p><strong style="color: #2E7DFC;">Puedes guardar y enviar el formulario y regresar después a añadir el video</strong> desde cualquier dispositivo solo poniendo tu correo y teléfono al inicio.</p>
        <p>Recuerda que tienes hasta el <strong style="color: #E0FA49;">26 de junio de 2026 a las 23:59 horas</strong> para subir tu video. Sin video, tu postulación no estará completa.</p>
      </div>
    </div>

    <!-- P36: Compromiso video -->
    <FormField
      label="¿Te comprometes a grabar y subir tu video de presentación (máximo 6 minutos)?"
      type="radio"
      v-model="formData.compromiso_video"
      :options="opcionesVideo"
      required
      noteText="⚠️ Si eliges no grabar el video, tu postulación se dará por concluida y quedarás descartadx automáticamente. Revisa los términos y condiciones de la aplicación."
      noteColor="#FC3169"
    />

    <!-- P37: Enlace video -->
    <FormField
      label="Pega aquí el enlace (URL) donde podamos ver y descargar tu video"
      type="url"
      v-model="formData.enlace_video"
      placeholder="https://drive.google.com/... o https://youtu.be/..."
      helpText="Puede ser un enlace de Google Drive, Dropbox, OneDrive o YouTube (preferencia: video público en YouTube) que permanezca vigente hasta el 3 de julio"
      noteText="Asegúrate de que el enlace tenga permisos de visualización adecuados antes de enviarlo.<br><br><strong style='color:#FC3169'>⚠️ Importante: sin tu video, tu postulación no estará completa. Verifica que el enlace funcione correctamente antes de enviar el formulario.</strong>"
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
  color: #FC3169;
  margin: 0 0 0.35rem;
}

.form-section__subtitle {
  margin: 0 0 1.5rem;
}

.intro-text {
  font-family: var(--font-myriad);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.instructions-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.instructions-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin: 0 0 0.75rem;
}

.instructions-intro {
  font-family: var(--font-myriad);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0 0 1rem;
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  counter-reset: none;
}

.instructions-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-myriad);
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.instructions-list li:last-child {
  border-bottom: none;
}

.list-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(224, 250, 73, 0.15);
  color: #E0FA49;
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.save-info {
  background: rgba(11, 227, 64, 0.04);
  border: 1px solid rgba(11, 227, 64, 0.15);
  border-radius: 12px;
  padding: 1rem;
}

.save-info p {
  font-family: var(--font-myriad);
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0 0 0.5rem;
}

.save-info p:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .instructions-box {
    padding: 1rem;
  }
  .instructions-list li {
    font-size: 0.85rem;
  }
}
</style>
