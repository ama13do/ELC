<template>
  <div class="form-section">
    <h2 class="form-section__title">SECCIÓN 1 — Datos personales y contacto</h2>
    <p class="form-section__subtitle">En esta sección recopilamos tu información básica. Nos permite confirmar que cumples con los requisitos de elegibilidad y tener medios para contactarte si resultas seleccionadx. Usa tus datos reales. Todas las preguntas son obligatorias salvo que se indique lo contrario.</p>

    <!-- P1: Nombres -->
    <FormField
      label="Nombre/s"
      type="text"
      v-model="formData.nombres"
      placeholder="Escribe tu nombre(s)"
      required
    />

    <!-- P2: Primer Apellido -->
    <FormField
      label="Primer Apellido"
      type="text"
      v-model="formData.primer_apellido"
      placeholder="Escribe tu primer apellido"
      required
    />

    <!-- P3: Segundo Apellido -->
    <FormField
      label="Segundo Apellido"
      type="text"
      v-model="formData.segundo_apellido"
      placeholder="Escribe tu segundo apellido (opcional)"
    />

    <!-- P4: Email principal -->
    <FormField
      label="Correo electrónico principal"
      type="email"
      v-model="formData.email_principal"
      placeholder="tu.correo@ejemplo.com"
      required
      noteText="A este correo te contactaremos con información del proceso de selección y, en caso de resultar seleccionadx"
    />

    <!-- P5: Teléfono celular con validación real-time -->
    <div class="form-field-custom">
      <label class="form-field__label">
        <span class="form-field__bullet form-field__bullet--required"></span>
        Teléfono celular <span class="form-field__required">*</span>
      </label>
      <p class="form-field__help">A 10 dígitos.</p>
      <div class="phone-inputs-group">
          <select v-model="formData.telefono_codigo_pais" class="phone-code-select">
            <option v-for="(country, index) in opcionesCodigoPais" :key="index" :value="country.value">
              {{ country.label }}
            </option>
          </select>
        <input
          type="tel"
          v-model="formData.telefono_numero_local"
          placeholder="10 dígitos"
          maxlength="10"
          class="phone-local-input"
          :class="{ 'input--error': phoneError }"
          @input="onPhoneInput"
          required
        />
      </div>
      <p class="form-field__note">Incluye número con WhatsApp activo. Esto nos permitirá contactarte rápidamente si resultas seleccionadx</p>
      <p v-if="phoneError" class="realtime-error">{{ phoneError }}</p>
    </div>

    <!-- P6: Email alternativo -->
    <FormField
      label="Correo electrónico alternativo"
      type="email"
      v-model="formData.email_alternativo"
      placeholder="Ej: correo2@gmail.com"
    />

    <!-- P7: Teléfono fijo / alternativo -->
    <div class="form-field-custom">
      <label class="form-field__label">
        <span class="form-field__bullet form-field__bullet--optional"></span>
        Número de teléfono fijo o alternativo
      </label>
      <p class="form-field__help">A 10 dígitos.</p>
      <div class="phone-inputs-group">
          <select v-model="fixedPhoneCode" class="phone-code-select">
            <option v-for="(country, index) in opcionesCodigoPais" :key="index" :value="country.value">
              {{ country.label }}
            </option>
          </select>
        <input
          type="tel"
          v-model="fixedPhoneLocal"
          placeholder="10 dígitos"
          maxlength="10"
          class="phone-local-input"
          @input="onFixedPhoneInput"
        />
      </div>
      <p class="form-field__note">Incluye la lada de tu estado si se trata de teléfono fijo</p>
    </div>

    <!-- P8: Fecha nacimiento -->
    <FormField
      label="Fecha de nacimiento"
      type="date"
      v-model="formData.fecha_nacimiento"
      required
      noteText="Debes tener entre 18 y 26 años cumplidos al momento de enviar tu registro para ser elegible"
      noteColor="#E0FA49"
    />

    <!-- P9: Estado residencia -->
    <FormField
      label="Indica el estado de la República Mexicana en el que resides actualmente"
      type="select"
      v-model="formData.estado_residencia"
      :options="estadosMexico"
      required
    />

    <!-- P10: Municipio -->
    <FormField
      label="Alcaldía o municipio en el que vives actualmente"
      type="text"
      v-model="formData.municipio_residencia"
      placeholder="Escribe tu municipio/alcaldía"
      required
    />

    <!-- P11: Comunidad rural -->
    <FormField
      label="¿Vives en una comunidad rural o periférica?"
      type="radio"
      v-model="comunidadStr"
      :options="['Sí', 'No']"
      required
    />

    <!-- P12: Género (ahora select) -->
    <FormField
      label="¿Con cuál género te identificas?"
      type="select"
      v-model="formData.genero"
      :options="opcionesGenero"
      required
      placeholder="Selecciona una opción"
    />

    <!-- P13: Identidades -->
    <FormField
      label="¿Te identificas con alguna de las siguientes identidades/condiciones?"
      type="checkbox"
      v-model="formData.identidades"
      :options="opcionesIdentidad"
      required
      helpText="Esta pregunta es solo para fines estadísticos y no influye en el proceso de selección"
    />
    <!-- Otro: texto libre -->
    <FormField
      v-if="formData.identidades.includes('6')"
      label="Especifica tu identidad/condición"
      type="text"
      v-model="formData.identidades_otro"
      placeholder="Escribe aquí..."
    />

    <!-- P14: Cómo te enteraste -->
    <FormField
      label="¿Cómo te enteraste de la Escuela de Liderazgo Climático 2026?"
      type="radio"
      v-model="formData.medio_enterado"
      :options="opcionesDifusion"
      required
    />
    <!-- Otro: texto libre -->
    <FormField
      v-if="formData.medio_enterado === '7'"
      label="Especifica"
      type="text"
      v-model="formData.medio_enterado_otro"
      placeholder="Escribe aquí..."
    />

    <!-- P15: Red social (condicional) -->
    <FormField
      v-if="formData.medio_enterado === '1'"
      label="En caso de haber sido a través de redes sociales, ¿en cuál red social fue?"
      type="radio"
      v-model="formData.red_social_enterado"
      :options="opcionesRedSocial"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'
import { opcionesCodigoPais } from '@/constants/countryCodes'

const { formData } = useFormStore()

// Fixed phone split logic
const fixedPhoneCode = ref('+52')
const fixedPhoneLocal = ref('')

// Initialize fixed phone refs if data exists
if (formData.telefono_fijo) {
  // Try to find if it starts with +52 or another code
  const codeMatch = opcionesCodigoPais.find(c => formData.telefono_fijo.startsWith(c.value))
  if (codeMatch) {
    fixedPhoneCode.value = codeMatch.value
    fixedPhoneLocal.value = formData.telefono_fijo.slice(codeMatch.value.length)
  } else {
    fixedPhoneLocal.value = formData.telefono_fijo
  }
}

function onFixedPhoneInput(e: Event) {
  const input = e.target as HTMLInputElement
  fixedPhoneLocal.value = input.value.replace(/\D/g, '')
  updateFixedPhone()
}

watch(fixedPhoneCode, () => {
  updateFixedPhone()
})

function updateFixedPhone() {
  if (fixedPhoneLocal.value) {
    formData.telefono_fijo = fixedPhoneCode.value + fixedPhoneLocal.value
  } else {
    formData.telefono_fijo = ''
  }
}

// Boolean bridge
const comunidadStr = computed({
  get: () => formData.comunidad_rural === true ? 'Sí' : formData.comunidad_rural === false ? 'No' : '',
  set: (v: string) => { formData.comunidad_rural = v === 'Sí' }
})

// Real-time phone validation
const phoneError = ref('')

function onPhoneInput(e: Event) {
  const input = e.target as HTMLInputElement
  formData.telefono_numero_local = input.value.replace(/\D/g, '')
  validatePhone()
}

watch(() => formData.telefono_numero_local, () => {
  if (phoneError.value) validatePhone()
})

function validatePhone() {
  const digits = formData.telefono_numero_local.replace(/\D/g, '')
  if (!digits) {
    phoneError.value = 'El teléfono celular es obligatorio'
  } else if (digits.length !== 10) {
    phoneError.value = 'El teléfono debe tener exactamente 10 dígitos'
  } else {
    phoneError.value = ''
  }
}

const estadosMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
]

const opcionesGenero = [
  'Femenino', 'Masculino', 'No binarie', 'Prefiero no responder', 'Otro'
]

const opcionesIdentidad = [
  { label: 'Persona LGBTIQ+', value: '1' },
  { label: 'Persona indígena', value: '2' },
  { label: 'Persona afromexicana', value: '3' },
  { label: 'Persona con discapacidad', value: '4' },
  { label: 'Persona migrante o refugiada', value: '5' },
  { label: 'Otro (especifique)', value: '6' },
  { label: 'Ninguna de las anteriores', value: '7' },
]

const opcionesDifusion = [
  { label: 'Redes sociales (Instagram, Tiktok, Twitter (X), Youtube, Facebook, otra)', value: '1' },
  { label: 'WhatsApp', value: '2' },
  { label: 'Unx amigx o conocidx', value: '3' },
  { label: 'Organizaciones aliadas o colectivos', value: '4' },
  { label: 'Boletines o mailing', value: '5' },
  { label: 'Medios de comunicación (radio, TV, prensa)', value: '6' },
  { label: 'Otro (especifique)', value: '7' },
]

const opcionesRedSocial = [
  'Facebook', 'Instagram', 'Tiktok', 'YouTube', 'Twitter (X)', 'LinkedIn', 'Otro',
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

/* Custom Phone Inputs Styles */
.form-field-custom {
  margin-bottom: 1.75rem;
}
.form-field__label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.form-field__bullet {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 0.35rem; /* Align with first line of text */
  flex-shrink: 0;
}
.form-field__bullet--required {
  background-color: #E0FA49; /* Yellow-green for required */
}
.form-field__required {
  color: #E0FA49;
  margin-left: 0.1rem;
}
.form-field__help {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  margin: -0.2rem 0 0.6rem;
  line-height: 1.4;
}
.form-field__note {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 0.5rem;
  line-height: 1.5;
}
.phone-inputs-group {
  display: flex;
  gap: 0.5rem;
}
.phone-code-select {
  flex-shrink: 0;
  width: 140px;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 0.95rem;
  padding: 0.85rem 0.5rem;
  outline: none;
  cursor: pointer;
}
.phone-code-select option {
  background: #1a1a1a;
  color: #fff;
}
.phone-local-input {
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.phone-local-input:focus {
  border-color: #E0FA49;
  background: rgba(224, 250, 73, 0.05);
  box-shadow: 0 0 0 3px rgba(224, 250, 73, 0.1);
}
.input--error {
  border-color: #FC3169 !important;
  box-shadow: 0 0 0 3px rgba(252, 49, 105, 0.1) !important;
}
.realtime-error {
  font-family: var(--font-myriad);
  font-size: 0.8rem;
  color: #FC3169;
  margin: 0.35rem 0 0;
}
.phone-code-select:disabled,
.phone-local-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .phone-code-select {
    width: 90px;
    font-size: 0.85rem;
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
