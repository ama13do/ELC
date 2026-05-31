<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200',
      variant === 'primary'
        ? 'bg-[#b5ff4d] text-black hover:brightness-110 px-8 py-3'
        : 'border border-[#b5ff4d] text-[#b5ff4d] hover:bg-[#b5ff4d] hover:text-black px-8 py-3',
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
    variant?: 'primary' | 'outline'
    className?: string
  }>(),
  { variant: 'primary' }
)
</script>
