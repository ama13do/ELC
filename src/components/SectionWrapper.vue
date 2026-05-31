<template>
  <section :class="['relative w-full px-6 py-20 md:px-12 lg:px-20', props.class]">
    <div class="mx-auto max-w-6xl">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>
