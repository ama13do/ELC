<template>
  <span
    :class="['absolute pointer-events-none select-none z-10 text-4xl', className]"
    aria-hidden="true"
  >{{ glyph }}</span>
</template>

<script setup lang="ts">
defineProps<{
  glyph: string
  className?: string
}>()
</script>
