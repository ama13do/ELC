<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 6 — Compromisos y aceptación</h2>
    <p class="form-section__subtitle">La ELC es solo el inicio. En esta sección confirmamos tu disposición a asumir los compromisos que implica participar en el Movimiento HxNF más allá del programa de julio.</p>

    <!-- P38: Matriz de compromisos -->
    <div class="compromisos-section">
      <p class="compromisos-label">Compromisos fundamentales para participar en la ELC</p>
      <p class="compromisos-help">Selecciona "Acepto" o "No acepto" para cada compromiso</p>

      <div
        v-for="compromiso in compromisosList"
        :key="compromiso.key"
        class="compromiso-row"
      >
        <p class="compromiso-text">{{ compromiso.label }}</p>
        <div class="compromiso-options">
          <label class="compromiso-option" :class="{ 'compromiso-option--active': formData[compromiso.key] === true }">
            <input type="radio" :name="compromiso.key" :checked="formData[compromiso.key] === true" @change="formData[compromiso.key] = true" />
            <span class="compromiso-dot"></span>
            Acepto
          </label>
          <label class="compromiso-option" :class="{ 'compromiso-option--active': formData[compromiso.key] === false }">
            <input type="radio" :name="compromiso.key" :checked="formData[compromiso.key] === false" @change="formData[compromiso.key] = false" />
            <span class="compromiso-dot"></span>
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
    />

    <!-- P40: Términos y condiciones -->
    <FormField
      label="¿Aceptas los Términos y Condiciones de la Escuela de Liderazgo Climático 2026?"
      type="radio"
      v-model="terminosStr"
      :options="[{label: 'Sí, acepto los Términos y Condiciones', value: 'Sí'}, {label: 'No acepto', value: 'No'}]"
      required
    />

    <div class="final-message">
      <h3>¡Da clic en Enviar y tu postulación estará en camino!</h3>
      <p>Revisaremos tu postulación con atención. Los resultados de la selección se publicarán entre el 1 y el 3 de julio de 2026. Si resultas seleccionadx, nos pondremos en contacto contigo por correo electrónico y/o WhatsApp para los siguientes pasos.</p>
      <p>Mientras tanto, te invitamos a seguir nuestras redes sociales para mantenerte al tanto de las novedades del Movimiento:</p>
      <ul>
        <li>Instagram: @Hackersxnf</li>
        <li>Tiktok: @hackersxnuestrofuturo</li>
      </ul>
      <p>Si tienes dudas, escríbenos a hxnf@practica.lat</p>
      <p><strong>¡Nos vemos en las sesiones virtuales!</strong></p>
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
  color: #fff;
  margin: 0 0 0.35rem;
}

.form-section__subtitle {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 2rem;
}

/* ── Compromisos matrix ── */
.compromisos-section {
  margin-bottom: 2rem;
}

.compromisos-label {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  margin: 0 0 0.3rem;
}

.compromisos-help {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 1rem;
}

.compromiso-row {
  padding: 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: 0.75rem;
}

.compromiso-text {
  font-family: var(--font-myriad);
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.75rem;
  line-height: 1.45;
}

.compromiso-options {
  display: flex;
  gap: 1rem;
}

.compromiso-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
  user-select: none;
}

.compromiso-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.compromiso-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  flex-shrink: 0;
}

.compromiso-option--active {
  border-color: #0BE340;
  background: rgba(11, 227, 64, 0.08);
}

.compromiso-option--active .compromiso-dot {
  border-color: #0BE340;
}

.compromiso-option--active .compromiso-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0BE340;
}

.compromiso-option:hover {
  border-color: rgba(11, 227, 64, 0.3);
}

.final-message {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  font-family: var(--font-myriad);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.final-message h3 {
  font-family: var(--font-parkinsans);
  color: #E0FA49;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.final-message p {
  margin-bottom: 1rem;
}

.final-message ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.final-message strong {
  color: #0BE340;
}
</style>
