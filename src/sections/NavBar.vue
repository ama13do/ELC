<template>
  <nav class="absolute top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-5 md:px-12 lg:px-20">
    <img :src="logo" alt="hxnf" class="hxnf-logo h-10 w-auto" />
  </nav>
</template>

<script setup lang="ts">
import logo from '../assets/images/hxnf.png'
</script>

<style scoped>
.hxnf-logo {
  transform-origin: center;
  animation: inflate 2.8s ease-in-out infinite;
}

@keyframes inflate {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}
</style>
