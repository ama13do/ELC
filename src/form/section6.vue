<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 6 — Compromisos y aceptación</h2>
    <p class="form-section__subtitle">La ELC es solo el inicio. En esta sección confirmamos tu disposición a asumir los compromisos que implica participar en el Movimiento HxNF más allá del programa de julio.</p>

    <!-- P38: Matriz de compromisos -->
    <div class="compromisos-section">
      <p class="compromisos-label">
        <span class="form-field__bullet"></span>
        A continuación encontrarás los compromisos fundamentales para participar en la ELC. Lee con atención y elige entre las opciones "Acepto" o "No acepto" para cada punto.
      </p>

      <div
        v-for="compromiso in compromisosList"
        :key="compromiso.key"
        class="compromiso-row"
      >
        <p class="compromiso-text">{{ compromiso.label }}</p>
        <div class="compromiso-options">
          <label class="compromiso-option compromiso-option--accept" :class="{ 'compromiso-option--active-accept': formData[compromiso.key] === true }">
            <input type="radio" :name="compromiso.key" :checked="formData[compromiso.key] === true" @change="formData[compromiso.key] = true" />
            <span class="compromiso-dot compromiso-dot--accept"></span>
            Acepto
          </label>
          <label class="compromiso-option compromiso-option--decline" :class="{ 'compromiso-option--active-decline': formData[compromiso.key] === false }">
            <input type="radio" :name="compromiso.key" :checked="formData[compromiso.key] === false" @change="formData[compromiso.key] = false" />
            <span class="compromiso-dot compromiso-dot--decline"></span>
            No acepto
          </label>
        </div>
      </div>
    </div>

    <!-- P39: Aviso de privacidad -->
    <FormField
      label="¿Aceptas el Aviso de Privacidad de la Escuela de Liderazgo Climático 2026?"
      type="radio"
      v-model="privacidadStr"
      :options="['Sí', 'No']"
      required
      noteText="Disponible en: <a href='https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view' target='_blank' style='color:#2E7DFC; text-decoration:underline;'>Aviso de Privacidad</a>.<br>Te recomendamos revisarlos antes de enviar tu registro."
    />

    <!-- P40: Términos y condiciones -->
    <FormField
      label="¿Aceptas los Términos y Condiciones de la Escuela de Liderazgo Climático 2026?"
      type="radio"
      v-model="terminosStr"
      :options="[{label: 'Sí, acepto los Términos y Condiciones', value: 'Sí'}, {label: 'No acepto', value: 'No'}]"
      required
      noteText="Disponibles en: <a href='https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view' target='_blank' style='color:#2E7DFC; text-decoration:underline;'>Términos y Condiciones</a> y en <a href='https://elc.nuestrofuturo.mx' target='_blank' style='color:#2E7DFC; text-decoration:underline;'>elc.nuestrofuturo.mx</a>.<br>Te recomendamos revisarlos antes de enviar tu registro."
    />

    <div class="final-message">
      <h3 class="final-message__title">¡Da clic en Enviar y tu postulación estará en camino!</h3>
      <p>Revisaremos tu postulación con atención. Los resultados de la selección se publicarán entre el <strong style="color: #E0FA49;">1 y el 3 de julio de 2026</strong>.</p>
      <p>Si resultas seleccionadx, nos pondremos en contacto contigo por <strong style="color: #0BE340;">correo electrónico y/o WhatsApp</strong> para los siguientes pasos.</p>
      
      <p class="final-message__contact">Si tienes dudas, escríbenos a <strong style="color: #FC3169;">hxnf@practica.lat</strong></p>
      <p class="final-salute"><strong>¡Nos vemos en las sesiones virtuales!</strong></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'

const { formData } = useFormStore()

const privacidadStr = computed({
  get: () => formData.acepta_privacidad ? 'Sí' : 'No',
  set: (v: string) => { formData.acepta_privacidad = v === 'Sí' }
})

const terminosStr = computed({
  get: () => formData.acepta_terminos ? 'Sí' : 'No',
  set: (v: string) => { formData.acepta_terminos = v === 'Sí' }
})

interface CompromisoItem {
  key: 'compromiso_asistencia' | 'compromiso_grabaciones' | 'compromiso_capitulo_hxnf' | 'autorizacion_imagen' | 'declaracion_veracidad'
  label: string
}

const compromisosList: CompromisoItem[] = [
  {
    key: 'compromiso_asistencia',
    label: 'Asistiré de forma virtual a las sesiones de la ELC del 6 al 31 de julio de 2026, de 7:00 a 9:00 pm (hora CDMX), con disponibilidad para al menos el 70% de las sesiones en vivo.',
  },
  {
    key: 'compromiso_grabaciones',
    label: 'En caso de no poder asistir a una sesión, avisaré con anticipación al equipo organizador y me comprometo a revisar la grabación en los plazos indicados.',
  },
  {
    key: 'compromiso_capitulo_hxnf',
    label: 'Me comprometo, en caso de resultar seleccionadx, a trabajar activamente en la fundación o fortalecimiento de un capítulo universitario o estatal de HxNF tras concluir la ELC.',
  },
  {
    key: 'autorizacion_imagen',
    label: 'Autorizo el uso de mi imagen (fotos, video o audio) con fines de comunicación de la ELC, del Movimiento HxNF y de las organizaciones convocantes, en los términos descritos en los Términos y Condiciones.',
  },
  {
    key: 'declaracion_veracidad',
    label: 'Declaro que toda la información proporcionada en este formulario es verídica y me comprometo a entregar la documentación que lo compruebe si resulto seleccionadx.',
  },
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
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 2rem;
  line-height: 1.6;
}

/* ── Compromisos matrix ── */
.compromisos-section {
  margin-bottom: 2rem;
}

.compromisos-label {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 1.05rem;
  color: #fff;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.compromiso-row {
  padding: 1.25rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 1rem;
}

.compromiso-text {
  font-family: var(--font-myriad);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.compromiso-options {
  display: flex;
  gap: 1.5rem;
}

.compromiso-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  font-family: var(--font-parkinsans);
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s;
  user-select: none;
  flex: 1;
  justify-content: center;
}

.compromiso-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.compromiso-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  position: relative;
  flex-shrink: 0;
}

/* Green for Accept */
.compromiso-option--accept {
  color: rgba(255, 255, 255, 0.7);
}
.compromiso-option--accept:hover {
  border-color: rgba(11, 227, 64, 0.4);
}
.compromiso-option--active-accept {
  border-color: #0BE340;
  background: rgba(11, 227, 64, 0.1);
  color: #0BE340;
}
.compromiso-option--active-accept .compromiso-dot--accept {
  border-color: #0BE340;
}
.compromiso-option--active-accept .compromiso-dot--accept::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0BE340;
}

/* Red for Decline */
.compromiso-option--decline {
  color: rgba(255, 255, 255, 0.7);
}
.compromiso-option--decline:hover {
  border-color: rgba(252, 49, 105, 0.4);
}
.compromiso-option--active-decline {
  border-color: #FC3169;
  background: rgba(252, 49, 105, 0.1);
  color: #FC3169;
}
.compromiso-option--active-decline .compromiso-dot--decline {
  border-color: #FC3169;
}
.compromiso-option--active-decline .compromiso-dot--decline::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #FC3169;
}

/* Final Message Redesign */
.final-message {
  background: transparent;
  border: 1.5px solid rgba(46, 125, 252, 0.6);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 3rem;
  font-family: var(--font-myriad);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-align: center;
  box-shadow: 0 8px 32px rgba(46, 125, 252, 0.1);
}

.final-message__title {
  font-family: var(--font-parkinsans);
  color: #2E7DFC;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.final-message p {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.final-message__contact {
  margin-bottom: 2rem !important;
}

.final-salute {
  color: #E0FA49;
  font-size: 1.3rem !important;
  font-family: var(--font-parkinsans);
  margin-bottom: 0 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 640px) {
  .compromiso-options {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.form-field__bullet {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #E0FA49;
  flex-shrink: 0;
  margin-right: 0.5rem;
}
</style>
