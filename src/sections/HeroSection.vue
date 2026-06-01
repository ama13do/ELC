<template>
  <section class="relative min-h-screen bg-black overflow-hidden">

    <!-- Contenido -->
    <div class="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20 flex items-center min-h-screen">
      <div class="w-full max-w-2xl py-32">

        <h1 class="font-bold text-white leading-tight mb-10 font-parkinsans
                    text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Escuela de<br />Liderazgo Climático
        </h1>

        <p class="text-white text-base md:text-lg leading-relaxed mb-12 max-w-lg font-myriad">
          ¿Estás listx para
          <span class="text-accent">formar parte de un movimiento nacional</span>
          que desarrolla propuestas concretas para enfrentar la emergencia climática?
        </p>

        <div class="flex gap-4 flex-wrap">
          <BaseButton variant="primary" href="#registro">REGÍSTRATE AQUÍ</BaseButton>
          <BaseButton variant="secondary" href="#quienes">QUIÉNES SOMOS</BaseButton>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
</script>