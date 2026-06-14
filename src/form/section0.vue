<template>
  <div class="section-welcome">
    <h2 class="section-title">Cuestionario de Registro</h2>
    <h3 class="section-subtitle">¡Bienvenidx, futurx Hacker!</h3>
    
    <div class="welcome-text">
      <p>Gracias por tu interés en participar en la <strong>Escuela de Liderazgo Climático 2026</strong>. Este cuestionario es el primer paso para integrarte a un movimiento nacional de juventudes que disputa el modelo energético de México con conocimiento, organización y acción colectiva.</p>
      
      <p>Queremos conocerte: tu historia, tus motivaciones y lo que puedes aportar. Cada postulación será leída con atención por integrantes del equipo organizador de HxNF y sus organizaciones aliadas, así que te pedimos que respondas con sinceridad y reflexión. No hay respuestas "correctas": lo que buscamos es tu perspectiva genuina.</p>
      
      <div class="welcome-rules">
        <h4>Recuerda:</h4>
        <ul>
          <li>El cuestionario debe llenarse por completo, incluyendo el <strong>enlace a tu video de presentación</strong>. Las postulaciones incompletas serán rechazadas automáticamente.</li>
          <li>La plataforma guarda automáticamente tus respuestas como borrador cada 30 segundos.</li>
          <li>Puedes recuperar tu progreso desde cualquier dispositivo ingresando nuevamente tu <strong>correo electrónico y número de celular</strong>. ¡No repitas tu registro!</li>
          <li>El video de presentación (máximo 6 minutos) tiene un peso alto en la evaluación: <strong>es la forma principal en que podemos conocerte más allá de las palabras escritas</strong>.</li>
          <li>La convocatoria cierra el <strong>viernes 26 de junio de 2026 a las 23:59 horas</strong> (hora CDMX). Pasada esa fecha no se recibirán más postulaciones.</li>
        </ul>
      </div>

      <p class="welcome-contact">
        Si tienes dudas o necesitas ajustes de accesibilidad para postularte, escríbenos a 
        <a href="mailto:hxnf@practica.lat" class="contact-link">hxnf@practica.lat</a> 
        antes del 22 de junio.
      </p>
    </div>

    <hr class="section-divider" />

    <div class="email-section">
      <p class="email-label">Ingresa tu correo electrónico y teléfono celular para comenzar o continuar tu registro:</p>
      
      <FormField
        type="email"
        label="Correo electrónico principal"
        v-model="formData.email_principal"
        placeholder="tu.correo@ejemplo.com"
        required
        helpText="A este correo te contactaremos con información del proceso de selección"
        fieldId="email-principal"
      />
      
      <div class="form-field-custom">
        <label class="form-field__label">
          <span class="form-field__bullet"></span>
          Teléfono celular <span class="form-field__required">*</span>
        </label>
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
  /* Alineación a la izquierda para mejorar radicalmente la lectura de textos largos */
  text-align: left;
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem 0;
}

.section-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  /* clamp: mínimo 1.8rem, preferido 4vw, máximo 2.4rem */
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--color-pink-dark);
  margin: 0 0 0.5rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  color: var(--color-foreground);
  margin: 0 0 2rem;
}

.welcome-text {
  font-family: var(--font-myriad);
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--color-beige); /* El beige suaviza el contraste en fondo oscuro */
  line-height: 1.65;
}

.welcome-text p {
  margin-bottom: 1.25rem;
}

.welcome-text strong {
  color: var(--color-yellow);
  font-weight: 600;
}

/* Caja para resaltar las reglas y viñetas */
.welcome-rules {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem 1.5rem 1.5rem 2.5rem;
  margin: 2.5rem 0;
}

.welcome-rules h4 {
  font-family: var(--font-parkinsans);
  font-size: 1.15rem;
  color: var(--color-pink-dark);
  margin: 0 0 1rem -1rem; /* Ajuste para compensar el padding del contenedor */
}

.welcome-rules ul {
  margin: 0;
  padding-left: 1.25rem;
  list-style-type: disc;
  list-style-position: outside;
  color: var(--color-beige);
}

.welcome-rules li {
  margin-bottom: 0.85rem;
  line-height: 1.6;
}

.welcome-rules li:last-child {
  margin-bottom: 0;
}

/* Enlace de contacto */
.contact-link {
  color: var(--color-blue);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.contact-link:hover {
  color: var(--color-yellow);
  text-decoration-color: var(--color-yellow);
}

/* Línea separatoria responsiva y limpia */
.section-divider {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
  margin: 3.5rem 0;
}

/* Sección del Formulario */
.email-section {
  text-align: left;
  max-width: 680px;
  margin: 0 auto;
}

.email-label {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--color-foreground);
  margin-bottom: 1.25rem;
}

/* Custom Phone Inputs Styles (Ajustados para heredar la limpieza visual) */
.form-field-custom {
  margin-bottom: 1.75rem;
}
.form-field__label {
  display: block;
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-foreground);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.form-field__required {
  color: var(--color-yellow);
  margin-left: 0.2rem;
}
.form-field__help {
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  margin: -0.25rem 0 0.8rem;
}

.form-field__bullet {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #E0FA49; /* Yellow-green for required */
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.phone-inputs-group {
  display: flex;
  gap: 0.75rem;
}
.phone-code-select {
  flex-shrink: 0;
  width: 140px;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: var(--color-foreground);
  font-family: var(--font-myriad);
  font-size: 1rem;
  padding: 0.85rem 0.5rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.phone-code-select option {
  background: var(--color-surface);
  color: var(--color-foreground);
}
.phone-local-input {
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: var(--color-foreground);
  font-family: var(--font-myriad);
  font-size: 1rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: all 0.2s ease;
}
.phone-code-select:focus,
.phone-local-input:focus {
  border-color: var(--color-yellow);
  background: rgba(224, 250, 73, 0.05);
  box-shadow: 0 0 0 3px rgba(224, 250, 73, 0.1);
}

/* Ajustes adicionales para móviles */
@media (max-width: 640px) {
  .welcome-rules {
    padding: 1.25rem 1rem 1.25rem 2rem;
  }
  
  .phone-inputs-group {
    flex-direction: column;
  }
  
  .phone-code-select {
    width: 100%;
  }
}
</style>