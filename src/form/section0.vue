<template>
  <div class="section-welcome">
    <h2 class="section-title">Cuestionario de Registro - Escuela de Liderazgo Climático 2026</h2>
    <h3 class="section-subtitle">¡Bienvenidx, futurx Hacker!</h3>
    
    <div class="welcome-text">
      <p>Gracias por tu interés en participar en la Escuela de Liderazgo Climático 2026. Este cuestionario es el primer paso para integrarte a un movimiento nacional de juventudes que disputa el modelo energético de México con conocimiento, organización y acción colectiva.</p>
      
      <p>Queremos conocerte: tu historia, tus motivaciones y lo que puedes aportar. Cada postulación será leída con atención por integrantes del equipo organizador de HxNF y sus organizaciones aliadas, así que te pedimos que respondas con sinceridad y reflexión. No hay respuestas "correctas": lo que buscamos es tu perspectiva genuina.</p>
      
      <div class="welcome-rules">
        <h4>Recuerda:</h4>
        <ul>
          <li>El cuestionario debe llenarse por completo, incluyendo el enlace a tu video de presentación. Las postulaciones incompletas serán rechazadas automáticamente.</li>
          <li>La plataforma guarda automáticamente tus respuestas como borrador cada 30 segundos. Puedes recuperar tu progreso desde cualquier dispositivo ingresando nuevamente tu correo electrónico y número de celular. ¡No repitas tu registro!</li>
          <li>El video de presentación (máximo 6 minutos) tiene un peso alto en la evaluación: es la forma principal en que podemos conocerte más allá de las palabras escritas.</li>
          <li>La convocatoria cierra el <strong>viernes 26 de junio de 2026 a las 23:59 horas</strong> (hora CDMX). Pasada esa fecha no se recibirán más postulaciones.</li>
        </ul>
      </div>

      <p class="welcome-contact">Si tienes dudas o necesitas ajustes de accesibilidad para postularte, escríbenos a <strong>hxnf@practica.lat</strong> antes del 22 de junio.</p>
      
      <p class="welcome-closing">¡Gracias por querer hackear el futuro con nosotrxs!</p>
    </div>

    <div class="email-section">
      <p class="email-label">Ingresa tu correo electrónico y teléfono celular para comenzar o continuar tu registro:</p>
      
      <!-- Correo Electrónico -->
      <FormField
        type="email"
        label="Correo electrónico principal"
        v-model="formData.email_principal"
        placeholder="tu.correo@ejemplo.com"
        required
        helpText="A este correo te contactaremos con información del proceso de selección"
        fieldId="email-principal"
      />
      
      <!-- Teléfono Custom -->
      <div class="form-field-custom">
        <label class="form-field__label">Teléfono celular <span class="form-field__required">*</span></label>
        <p class="form-field__help">Incluye un número con WhatsApp activo a 10 dígitos</p>
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

    </div>
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/FormField.vue'
import { useFormStore } from '@/composables/useFormStore'
import { opcionesCodigoPais } from '@/constants/countryCodes'

const { formData } = useFormStore()
</script>

<style scoped>
.section-welcome {
  text-align: center;
}

.welcome-badge {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.section-title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.15;
}

.welcome-text {
  font-family: var(--font-myriad);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.welcome-text strong {
  color: #E0FA49;
}

.welcome-info {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
  min-width: 200px;
}

.info-icon {
  font-size: 1.5rem;
}

.info-card strong {
  display: block;
  font-family: var(--font-parkinsans);
  font-size: 0.85rem;
  color: #fff;
  margin-bottom: 0.15rem;
}

.info-card p {
  margin: 0;
  font-family: var(--font-myriad);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.email-section {
  text-align: left;
  max-width: 680px;
  margin: 0 auto;
}

.email-label {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.75rem;
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
.phone-code-select:focus,
.phone-local-input:focus {
  border-color: #E0FA49;
  background: rgba(224, 250, 73, 0.05);
  box-shadow: 0 0 0 3px rgba(224, 250, 73, 0.1);
}

@media (max-width: 640px) {
  .welcome-info {
    flex-direction: column;
    align-items: center;
  }
  .info-card {
    width: 100%;
    max-width: 320px;
  }
  .phone-code-select {
    width: 120px;
    font-size: 0.85rem;
  }
}
</style>
