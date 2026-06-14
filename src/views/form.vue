<template>
  <div class="form-page">
    <NavBar />
    <img src="@/assets/images/bannerf.webp" alt="Banner ELC" class="form-banner" />

    <!-- Alert Modal for Validation Errors -->
    <Transition name="fade">
      <div v-if="validationErrors.length > 0" class="validation-modal-overlay">
        <div class="validation-modal">
          <div class="validation-modal__icon">⚠️</div>
          <h3 class="validation-modal__title">Faltan datos por llenar</h3>
          <p class="validation-modal__desc">Por favor, completa o corrige los siguientes campos para continuar:</p>
          <ul class="validation-modal__list">
            <li v-for="(err, i) in validationErrors" :key="i">{{ err }}</li>
          </ul>
          <button class="validation-modal__btn" @click="validationErrors = []">Entendido</button>
        </div>
      </div>
    </Transition>

    <!-- Alert Modal for Restoring Progress -->
    <Transition name="fade">
      <div v-if="requiresRestoreConfirm" class="restore-modal-overlay">
        <div class="restore-modal">
          <div class="restore-modal__icon">🔄</div>
          <h3 class="restore-modal__title">Registro encontrado</h3>
          <p class="restore-modal__desc">El correo electrónico que ingresaste ya está registrado pero con un teléfono distinto, o no se terminó el registro.</p>
          <p class="restore-modal__question">¿Quieres reestablecer tu progreso anterior?</p>
          <div class="restore-modal__actions">
            <button class="restore-modal__btn restore-modal__btn--primary" @click="confirmRestore(true)">Sí, reestablecer</button>
            <button class="restore-modal__btn restore-modal__btn--secondary" @click="confirmRestore(false)">No, empezar de cero</button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="form-container">

      <!-- Alert for Completed Form -->
      <Transition name="fade">
        <div v-if="showCompletedAlert" class="completed-alert-floating">
          <div class="completed-alert__content">
            <span class="completed-alert__icon">✅</span>
            <p>Ya has enviado tu formulario. Puedes modificarlo hasta el día <strong>26 de junio</strong>.</p>
          </div>
          <button class="completed-alert__close" @click="showCompletedAlert = false">✕</button>
        </div>
      </Transition>

      <!-- Progress bar (only show after section 0) -->
      <div v-if="currentStep > 0" class="progress-bar">
        <div class="progress-bar__header">
          <button type="button" class="progress-bar__home-btn" @click="goToStep(0)">
            ← Inicio
          </button>
        </div>
        <div class="progress-bar__track">
          <div
            class="progress-bar__fill"
            :style="{ width: `${progressPercent}%` }"
          ></div>
        </div>
        <div class="progress-bar__steps">
          <template v-for="(name, idx) in sectionNames" :key="idx">
            <button
              v-if="idx > 0"
              type="button"
              class="progress-bar__step"
              :class="{
                'progress-bar__step--active': currentStep === idx,
                'progress-bar__step--done': currentStep > idx,
              }"
              @click="goToStep(idx)"
              :title="name"
            >
              <span class="progress-bar__dot">
                <span v-if="currentStep > idx" class="progress-bar__check">✓</span>
                <span v-else>{{ idx }}</span>
              </span>
              <span class="progress-bar__name">{{ name }}</span>
            </button>
          </template>
        </div>
      </div>

      <!-- Loading overlay -->
      <div v-if="isLoading" class="form-loading">
        <div class="form-loading__spinner"></div>
        <p>Buscando tu registro...</p>
      </div>

      <!-- Section content -->
      <div v-else class="form-content">
        <Transition :name="transitionName" mode="out-in">
          <component :is="currentSectionComponent" :key="currentStep" />
        </Transition>
      </div>

      <!-- Navigation buttons -->
      <div v-if="!isLoading" class="form-nav">
        <button
          v-if="currentStep > 0"
          type="button"
          class="form-nav__btn form-nav__btn--prev"
          @click="handlePrev"
        >
          ← Anterior
        </button>
        <div v-else></div>

        <!-- Section 0: special "Start" button -->
        <button
          v-if="currentStep === 0"
          type="button"
          class="form-nav__btn form-nav__btn--next"
          :disabled="isLoading"
          @click="handleStart"
        >
          Comenzar →
        </button>
        <!-- Normal next -->
        <button
          v-else-if="currentStep < totalSteps - 1"
          type="button"
          class="form-nav__btn form-nav__btn--next"
          @click="handleNext"
        >
          Siguiente →
        </button>
        <!-- Final submit -->
        <button
          v-else
          type="button"
          class="form-nav__btn form-nav__btn--submit"
          :disabled="isSubmitting"
          @click="handleSubmit"
        >
          <span v-if="isSubmitting">Guardando...</span>
          <span v-else-if="isCompleted">Actualizar datos 🚀</span>
          <span v-else>Enviar registro 🚀</span>
        </button>
      </div>

      <!-- Submit error -->
      <p v-if="submitError" class="form-submit-error">{{ submitError }}</p>

      <!-- Auto-save indicator -->
      <p v-if="currentStep > 0" class="form-autosave">
        💾 Tus respuestas se guardan automáticamente cada 30 segundos
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore, sectionNames } from '@/composables/useFormStore'
import { registroCompletado } from '@/composables/useRegistro'
import NavBar from '@/sections/NavBar.vue'

import Section0 from '@/form/section0.vue'
import Section1 from '@/form/section1.vue'
import Section2 from '@/form/section2.vue'
import Section3 from '@/form/section3.vue'
import Section4 from '@/form/section4.vue'
import Section5 from '@/form/section5.vue'
import Section6 from '@/form/section6.vue'

const router = useRouter()
const {
  formData,
  currentStep,
  totalSteps,
  isSubmitting,
  isLoading,
  submitError,
  validationErrors,
  requiresRestoreConfirm,
  isCompleted,
  nextStep,
  prevStep,
  goToStep,
  startForm,
  submitForm,
  confirmRestore,
} = useFormStore()

const showCompletedAlert = ref(false)

watch(isCompleted, (newVal) => {
  if (newVal) {
    showCompletedAlert.value = true
    setTimeout(() => {
      showCompletedAlert.value = false
    }, 6000)
  }
}, { immediate: true })

const sections = [
  Section0, Section1, Section2, Section3,
  Section4, Section5, Section6,
]

const currentSectionComponent = computed(() => sections[currentStep.value])

const progressPercent = computed(() => {
  if (currentStep.value === 0) return 0
  return ((currentStep.value - 1) / (totalSteps - 2)) * 100
})

// Transition direction tracking
const transitionName = ref('slide-left')

watch(currentStep, (newVal, oldVal) => {
  transitionName.value = newVal > oldVal ? 'slide-left' : 'slide-right'
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

async function handleStart() {
  await startForm()
  // No need to route or do anything, startForm manages steps
}

function handleNext() {
  nextStep()
}

function handlePrev() {
  validationErrors.value = []
  prevStep()
}

async function handleSubmit() {
  const ok = await submitForm()
  if (ok) {
    registroCompletado.value = true
    router.push('/success')
  }
}
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.form-banner {
  width: 100%;
  max-width: 880px;
  display: block;
  margin: 0 auto;
  border-radius: 0 0 20px 20px;
  object-fit: cover;
}

.form-container {
  position: relative;
  z-index: 1;
  max-width: 880px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 3rem;
}



/* ── Completed Alert Floating ── */
.completed-alert-floating {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(11, 227, 64, 0.15);
  border: 1px solid rgba(11, 227, 64, 0.4);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  max-width: 400px;
}

.completed-alert__content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.completed-alert__icon {
  font-size: 1.2rem;
}

.completed-alert__content p {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: #fff;
  line-height: 1.4;
  margin: 0;
}

.completed-alert__content strong {
  color: #0BE340;
}

.completed-alert__close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.completed-alert__close:hover {
  color: #fff;
}

/* ── Modals (Validation & Restore) ── */
.validation-modal-overlay,
.restore-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.validation-modal,
.restore-modal {
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.validation-modal__icon,
.restore-modal__icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.validation-modal__title,
.restore-modal__title {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
  margin: 0 0 0.5rem;
}

.validation-modal__desc,
.restore-modal__desc {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 1.5rem;
  line-height: 1.4;
}

.restore-modal__question {
  font-family: var(--font-parkinsans);
  font-size: 0.95rem;
  color: #E0FA49;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.progress-bar__home-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-family: var(--font-parkinsans);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
}

.validation-modal__list {
  text-align: left;
  background: rgba(252, 49, 105, 0.08);
  border: 1px solid rgba(252, 49, 105, 0.2);
  border-radius: 12px;
  padding: 1rem 1rem 1rem 2rem;
  margin: 0 0 1.5rem;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: #FC3169;
}

.validation-modal__list li {
  margin-bottom: 0.35rem;
}
.validation-modal__list li:last-child {
  margin-bottom: 0;
}

.validation-modal__btn,
.restore-modal__btn {
  font-family: var(--font-parkinsans);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.validation-modal__btn {
  background: #E0FA49;
  color: #000;
}

.validation-modal__btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.restore-modal__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.restore-modal__btn--primary {
  background: #E0FA49;
  color: #000;
}

.restore-modal__btn--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.restore-modal__btn--primary:hover {
  filter: brightness(1.1);
}

.restore-modal__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


/* ── Progress bar ── */
.progress-bar {
  margin-bottom: 2.5rem;
}

.progress-bar__track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #E0FA49, #0BE340);
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-bar__steps {
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
}

.progress-bar__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex: 1;
  min-width: 0;
}

.progress-bar__dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.progress-bar__step--active .progress-bar__dot {
  background: #E0FA49;
  color: #000;
  border-color: #E0FA49;
  box-shadow: 0 0 12px rgba(224, 250, 73, 0.3);
}

.progress-bar__step--done .progress-bar__dot {
  background: rgba(11, 227, 64, 0.15);
  color: #0BE340;
  border-color: #0BE340;
}

.progress-bar__check {
  font-size: 0.65rem;
}

.progress-bar__name {
  font-family: var(--font-myriad);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  transition: color 0.3s;
}

.progress-bar__step--active .progress-bar__name {
  color: #E0FA49;
}

.progress-bar__step--done .progress-bar__name {
  color: rgba(11, 227, 64, 0.6);
}

/* ── Loading ── */
.form-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.form-loading p {
  font-family: var(--font-myriad);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.form-loading__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #E0FA49;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Form content area ── */
.form-content {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2rem 2rem 1rem;
  min-height: 300px;
  backdrop-filter: blur(8px);
}

/* ── Navigation buttons ── */
.form-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.form-nav__btn {
  font-family: var(--font-parkinsans);
  font-weight: 650;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  padding: 0.85rem 2rem;
  border-radius: 9999px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.form-nav__btn--prev {
  background: #E0FA49;
  color: #000;
  box-shadow: -4px 4px 0px 0px #fff;
}

.form-nav__btn--prev:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #fff;
  filter: brightness(1.05);
}

.form-nav__btn--prev:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #fff;
}

.form-nav__btn--next {
  background: #0BE340;
  color: #000;
  box-shadow: -4px 4px 0px 0px #fff;
}

.form-nav__btn--next:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #fff;
  filter: brightness(1.05);
}

.form-nav__btn--next:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #fff;
}

.form-nav__btn--next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-nav__btn--submit {
  background: #0BE340;
  color: #000;
  box-shadow: -4px 4px 0px 0px #fff;
  font-size: 0.9rem;
}

.form-nav__btn--submit:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #fff;
  filter: brightness(1.05);
}

.form-nav__btn--submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: -4px 4px 0px 0px rgba(255, 255, 255, 0.3);
}

.form-submit-error {
  text-align: center;
  color: #FC3169;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  margin-top: 1rem;
}

.form-autosave {
  text-align: center;
  font-family: var(--font-myriad);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 1.5rem;
}

/* ── Transitions ── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .form-container {
    padding: 1rem 1rem 2.5rem;
  }

  .form-content {
    padding: 1.5rem 1.25rem 1rem;
    border-radius: 16px;
  }

  .progress-bar__name {
    display: none;
  }

  .progress-bar__dot {
    width: 24px;
    height: 24px;
    font-size: 0.6rem;
  }

  .form-nav__btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.78rem;
  }

  .form-nav__btn--submit {
    font-size: 0.82rem;
  }

  /* Modals / Floating */
  .completed-alert-floating {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>
