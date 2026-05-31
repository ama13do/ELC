<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200',
      variant === 'primary'
        ? 'bg-[#0ce23f] text-black hover:brightness-110 px-8 py-3'
        : 'border border-[#0ce23f] text-[#0ce23f] hover:bg-[#0ce23f] hover:text-black px-8 py-3',
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
