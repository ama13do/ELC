<template>
  <div ref="target" class="lazy-wrapper">
    <slot v-if="isIntersecting" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const target = ref<HTMLElement | null>(null)
const isIntersecting = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isIntersecting.value = true
        // Una vez que se cruza la línea y se carga, ya no necesitamos observar
        if (target.value && observer) {
          observer.unobserve(target.value)
          observer.disconnect()
        }
      }
    },
    {
      rootMargin: '300px' // Cargar 300px antes de que entre a la pantalla para que sea fluido
    }
  )

  if (target.value) {
    observer.observe(target.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.lazy-wrapper {
  /* Le damos una altura mínima para evitar que todo colapse y no haya scroll */
  min-height: 300px; 
  width: 100%;
}
</style>
