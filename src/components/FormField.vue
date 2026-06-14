<template>
  <div class="form-field" :class="{ 'form-field--error': errorMessage }">
    <!-- Label with Bullet -->
    <label v-if="label" :for="fieldId" class="form-field__label">
      <span class="form-field__bullet" :class="required ? 'form-field__bullet--required' : 'form-field__bullet--optional'"></span>
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </label>

    <!-- Help text -->
    <p v-if="helpText" class="form-field__help">{{ helpText }}</p>

    <!-- Note -->
    <p v-if="noteText" class="form-field__note" :style="noteColor ? { color: noteColor } : {}"><span v-html="noteText"></span></p>

    <!-- TEXT / EMAIL / TEL / URL -->
    <input
      v-if="isInputType"
      :id="fieldId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="form-field__input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <!-- DATE -->
    <input
      v-else-if="type === 'date'"
      :id="fieldId"
      type="date"
      :value="modelValue"
      :required="required"
      class="form-field__input form-field__input--date"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <!-- TEXTAREA -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="fieldId"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      rows="4"
      class="form-field__textarea"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <!-- SELECT -->
    <div v-else-if="type === 'select'" class="form-field__select-wrapper">
      <select
        :id="fieldId"
        :value="modelValue"
        :required="required"
        class="form-field__select"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled>{{ placeholder || 'Selecciona una opción' }}</option>
        <option v-for="opt in normalizedOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <span class="form-field__select-arrow">▾</span>
    </div>

    <!-- RADIO -->
    <div v-else-if="type === 'radio'" class="form-field__options">
      <label
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="form-field__option"
        :class="{ 'form-field__option--active': modelValue === opt.value }"
      >
        <input
          type="radio"
          :name="fieldId"
          :value="opt.value"
          :checked="modelValue === opt.value"
          class="form-field__radio"
          @change="$emit('update:modelValue', opt.value)"
        />
        <span class="form-field__option-check"></span>
        <span class="form-field__option-text">{{ opt.label }}</span>
      </label>
    </div>

    <!-- CHECKBOX (multiple) -->
    <div v-else-if="type === 'checkbox'" class="form-field__options">
      <label
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="form-field__option"
        :class="{ 'form-field__option--active': isChecked(opt.value) }"
      >
        <input
          type="checkbox"
          :value="opt.value"
          :checked="isChecked(opt.value)"
          class="form-field__checkbox"
          @change="toggleCheckbox(opt.value)"
        />
        <span class="form-field__option-check form-field__option-check--box"></span>
        <span class="form-field__option-text">{{ opt.label }}</span>
      </label>
    </div>

    <!-- SCALE (1-5) -->
    <div v-else-if="type === 'scale'" class="form-field__scale">
      <button
        v-for="n in (scaleMax || 5)"
        :key="n"
        type="button"
        class="form-field__scale-btn"
        :class="{ 'form-field__scale-btn--active': modelValue === n }"
        @click="$emit('update:modelValue', n)"
      >
        {{ n }}
      </button>
      <div class="form-field__scale-labels">
        <span>{{ scaleMinLabel || 'Nada' }}</span>
        <span>{{ scaleMaxLabel || 'Mucho' }}</span>
      </div>
    </div>

    <!-- MATRIX (commitment checkboxes) -->
    <div v-else-if="type === 'matrix'" class="form-field__matrix">
      <label
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="form-field__matrix-row"
        :class="{ 'form-field__matrix-row--active': isMatrixChecked(opt.value) }"
      >
        <input
          type="checkbox"
          :checked="isMatrixChecked(opt.value)"
          class="form-field__checkbox"
          @change="toggleMatrix(opt.value)"
        />
        <span class="form-field__option-check form-field__option-check--box"></span>
        <span class="form-field__option-text">{{ opt.label }}</span>
      </label>
    </div>

    <!-- SINGLE CHECKBOX (boolean toggle) -->
    <label v-else-if="type === 'toggle'" class="form-field__toggle">
      <input
        type="checkbox"
        :checked="modelValue"
        class="form-field__checkbox"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span class="form-field__option-check form-field__option-check--box"></span>
      <span class="form-field__option-text">{{ placeholder || 'Sí, acepto' }}</span>
    </label>

    <!-- Error -->
    <p v-if="errorMessage" class="form-field__error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface FieldOption {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    label?: string
    type?: 'text' | 'email' | 'tel' | 'url' | 'date' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'scale' | 'matrix' | 'toggle'
    modelValue?: any
    options?: (string | FieldOption)[]
    required?: boolean
    placeholder?: string
    helpText?: string
    errorMessage?: string
    noteText?: string
    noteColor?: string
    scaleMax?: number
    scaleMinLabel?: string
    scaleMaxLabel?: string
    fieldId?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
    required: false,
    disabled: false,
    fieldId: () => `field-${Math.random().toString(36).substring(2, 9)}`,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const isInputType = computed(() =>
  ['text', 'email', 'tel', 'url'].includes(props.type)
)

const normalizedOptions = computed<FieldOption[]>(() => {
  if (!props.options) return []
  return props.options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )
})

function isChecked(val: string): boolean {
  if (!Array.isArray(props.modelValue)) return false
  return props.modelValue.includes(val)
}

function toggleCheckbox(val: string) {
  const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const idx = arr.indexOf(val)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(val)
  emit('update:modelValue', arr)
}

function isMatrixChecked(key: string): boolean {
  if (typeof props.modelValue !== 'object' || props.modelValue === null) return false
  return !!props.modelValue[key]
}

function toggleMatrix(key: string) {
  const obj = typeof props.modelValue === 'object' && props.modelValue !== null
    ? { ...props.modelValue }
    : {}
  obj[key] = !obj[key]
  emit('update:modelValue', obj)
}
</script>

<style scoped>
/* ═══════════════════════════════════════════
   FORM FIELD — Diseño unificado HXNF/ELC
   ═══════════════════════════════════════════ */

.form-field {
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

.form-field__bullet--optional {
  background-color: #E0FA49; /* Yellow-green for optional too, user requested all same color */
}

.form-field__required {
  color: #E0FA49;
  margin-left: 0.1rem;
}

/* ── Help text ── */
.form-field__help {
  font-family: var(--font-myriad);
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  margin: -0.2rem 0 0.6rem;
  line-height: 1.4;
}

/* ── Input base ── */
.form-field__input,
.form-field__textarea,
.form-field__select {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #fff;
  font-family: var(--font-myriad);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.form-field__input::placeholder,
.form-field__textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-field__input:focus,
.form-field__textarea:focus,
.form-field__select:focus {
  border-color: #E0FA49;
  background: rgba(224, 250, 73, 0.05);
  box-shadow: 0 0 0 3px rgba(224, 250, 73, 0.1);
}

/* ── Date input ── */
.form-field__input--date {
  cursor: pointer;
}

.form-field__input--date::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

/* ── Textarea ── */
.form-field__textarea {
  resize: vertical;
  min-height: 100px;
}

/* ── Select ── */
.form-field__select-wrapper {
  position: relative;
}

.form-field__select {
  appearance: none;
  padding-right: 2.5rem;
  cursor: pointer;
}

.form-field__select option {
  background: #1a1a1a;
  color: #fff;
}

.form-field__select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  font-size: 1.1rem;
}

/* ── Radio / Checkbox options ── */
.form-field__options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field__option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.form-field__option:hover {
  border-color: rgba(224, 250, 73, 0.3);
  background: rgba(224, 250, 73, 0.04);
}

.form-field__option--active {
  border-color: #E0FA49;
  background: rgba(224, 250, 73, 0.08);
}

.form-field__radio,
.form-field__checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* ── Custom radio circle ── */
.form-field__option-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.2s ease;
}

.form-field__option--active .form-field__option-check {
  border-color: #E0FA49;
}

.form-field__option--active .form-field__option-check::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #E0FA49;
}

/* ── Custom checkbox square ── */
.form-field__option-check--box {
  border-radius: 6px;
}

.form-field__option--active .form-field__option-check--box::after,
.form-field__matrix-row--active .form-field__option-check--box::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  border-radius: 0;
  background: none;
  color: #E0FA49;
  font-size: 0.75rem;
  font-weight: 700;
}

.form-field__option-text {
  font-family: var(--font-myriad);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.35;
}

/* ── Scale ── */
.form-field__scale {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-start;
}

.form-field__scale-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-parkinsans);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-field__scale-btn:hover {
  border-color: rgba(224, 250, 73, 0.4);
  background: rgba(224, 250, 73, 0.06);
}

.form-field__scale-btn--active {
  border-color: #E0FA49;
  background: #E0FA49;
  color: #000;
}

.form-field__scale-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: calc(48px * 5 + 0.5rem * 4);
  margin-top: 0.25rem;
  font-family: var(--font-myriad);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
}

/* ── Matrix ── */
.form-field__matrix {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field__matrix-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.form-field__matrix-row:hover {
  border-color: rgba(11, 227, 64, 0.3);
  background: rgba(11, 227, 64, 0.04);
}

.form-field__matrix-row--active {
  border-color: #0BE340;
  background: rgba(11, 227, 64, 0.08);
}

.form-field__matrix-row--active .form-field__option-check--box {
  border-color: #0BE340;
}

.form-field__matrix-row--active .form-field__option-check--box::after {
  color: #0BE340;
}

/* ── Toggle ── */
.form-field__toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.form-field__toggle:hover {
  border-color: rgba(11, 227, 64, 0.3);
}

/* ── Error ── */
.form-field--error .form-field__input,
.form-field--error .form-field__textarea,
.form-field--error .form-field__select {
  border-color: #FC3169;
}

.form-field__error {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: #FC3169;
  font-family: var(--font-myriad);
}

.form-field__note {
  margin: -0.2rem 0 0.8rem;
  font-family: var(--font-myriad);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
}

.form-field__input:disabled,
.form-field__textarea:disabled,
.form-field__select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .form-field__label {
    font-size: 0.88rem;
  }

  .form-field__input,
  .form-field__textarea,
  .form-field__select {
    font-size: 0.9rem;
    padding: 0.75rem 0.85rem;
  }

  .form-field__scale-btn {
    width: 42px;
    height: 42px;
    font-size: 1rem;
  }
}
</style>
