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

    <!-- P4: Email principal (ya no es editable aquí, se llenó al inicio) -->
    <FormField
      label="Correo electrónico principal (A este correo te contactaremos con información del proceso de selección)"
      type="email"
      v-model="formData.email_principal"
      placeholder="tu.correo@ejemplo.com"
      required
      disabled
      helpText="Este campo se estableció al iniciar."
    />

    <!-- P5: Teléfono celular -->
    <div class="form-field-custom">
      <label class="form-field__label">Teléfono celular (Incluye un número con WhatsApp activo) <span class="form-field__required">*</span></label>
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
          @input="formData.telefono_numero_local = formData.telefono_numero_local.replace(/\D/g, '')"
          required
        />
      </div>
    </div>

    <!-- P6: Email alternativo -->
    <FormField
      label="Correo electrónico alternativo"
      type="email"
      v-model="formData.email_alternativo"
      placeholder="Ej: correo2@gmail.com"
    />

    <!-- P7: Teléfono fijo / alternativo -->
    <FormField
      label="Número de teléfono fijo o alternativo"
      type="tel"
      v-model="formData.telefono_fijo"
      placeholder="A 10 dígitos"
    />

    <!-- P8: Fecha nacimiento -->
    <FormField
      label="Fecha de nacimiento"
      type="date"
      v-model="formData.fecha_nacimiento"
      required
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

    <!-- P12: Género -->
    <FormField
      label="¿Con cuál género te identificas?"
      type="radio"
      v-model="formData.genero"
      :options="opcionesGenero"
      required
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
import { computed } from 'vue'
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'
import { opcionesCodigoPais } from '@/constants/countryCodes'

const { formData } = useFormStore()

// Boolean bridge
const comunidadStr = computed({
  get: () => formData.comunidad_rural === true ? 'Sí' : formData.comunidad_rural === false ? 'No' : '',
  set: (v: string) => { formData.comunidad_rural = v === 'Sí' }
})

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
  { label: 'Ninguna de las anteriores', value: '7' },
  { label: 'Persona LGBTIQ+', value: '1' },
  { label: 'Persona indígena', value: '2' },
  { label: 'Persona afromexicana', value: '3' },
  { label: 'Persona con discapacidad', value: '4' },
  { label: 'Persona migrante o refugiada', value: '5' },
  { label: 'Otro (especifique)', value: '6' }
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
  color: #fff;
  margin: 0 0 0.35rem;
}

.form-section__subtitle {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 2rem;
}

/* Custom Phone Inputs Styles */
.form-field-custom {
  margin-bottom: 1.75rem;
}
.form-field__label {
  display: block;
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.form-field__required {
  color: #E0FA49;
  margin-left: 0.2rem;
}
.form-field__help {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  margin: -0.2rem 0 0.6rem;
  line-height: 1.4;
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
</style>
