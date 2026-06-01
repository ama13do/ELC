<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 px-8 py-3 text-sm tracking-wide',
      variant === 'primary'
        ? 'bg-yellow text-black hover:brightness-110'
        : variant === 'secondary'
          ? 'bg-accent text-black hover:brightness-110'
          : 'border border-accent text-accent hover:bg-accent hover:text-black',
      className,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
  }>(),
  { variant: 'primary' }
)
</script>