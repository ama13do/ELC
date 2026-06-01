<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="base-btn"
    :class="[variantClass, className]"
    :style="customStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'secondary' | 'outline'
    /** Color de fondo personalizado (sobreescribe variant) */
    bgColor?: string
    /** Color del texto personalizado */
    textColor?: string
    /** Color del desfase/sombra personalizado */
    shadowColor?: string
    className?: string
  }>(),
  { variant: 'primary' }
)

const variantClass = computed(() => {
  if (props.bgColor) return 'btn-custom'
  return `btn-${props.variant}`
})

const customStyle = computed(() => {
  if (!props.bgColor) return {}
  return {
    '--btn-bg':     props.bgColor,
    '--btn-text':   props.textColor   ?? '#000',
    '--btn-shadow': props.shadowColor ?? '#fff',
  }
})
</script>

<style scoped>
/* ── Base ── */
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  font-family: var(--font-parkinsans);
  font-weight: 650;
  font-size: clamp(0.7rem, 1.5vw, 0.85rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.8rem 2rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  white-space: nowrap;
  position: relative;

  /* Desfase blanco — box-shadow desplazado */
  box-shadow: -4px 4px 0px 0px #fff;

  /* Transición suave */
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}

/* Hover: el botón sube y la sombra crece */
.base-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #fff;
  filter: brightness(1.1);
}

/* Active: presionado, sombra se aplana */
.base-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #fff;
  filter: brightness(0.95);
}

/* ── Variantes ── */
.btn-primary {
  background-color: #E0FA49;   /* yellow */
  color: #000;
}

.btn-secondary {
  background-color: #0BE340;   /* accent green */
  color: #000;
}

.btn-outline {
  background-color: transparent;
  color: #0BE340;
  border: 2px solid #0BE340;
  box-shadow: 4px 4px 0px 0px #0BE340;
}

.btn-outline:hover {
  background-color: #0BE340;
  color: #000;
  box-shadow: 6px 6px 0px 0px #0BE340;
}

/* ── Custom color via props ── */
.btn-custom {
  background-color: var(--btn-bg);
  color:            var(--btn-text);
  box-shadow: 4px 4px 0px 0px var(--btn-shadow);
}

.btn-custom:hover {
  box-shadow: 6px 6px 0px 0px var(--btn-shadow);
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .base-btn {
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-size: 0.75rem;
  }
}
</style>