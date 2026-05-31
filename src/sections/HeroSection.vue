<template>
  <section class="relative min-h-screen bg-surface overflow-hidden">
    <div class="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20 flex items-center min-h-screen">
      <div class="w-full md:w-7/12 py-32">
        <h1
          class="font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          style="font-family: 'Parkinsans', sans-serif;"
        >
          Escuela de<br />Liderazgo Climático
        </h1>
        <p class="text-white/80 text-lg leading-relaxed mb-10 max-w-md">
          ¿Estás listx para
          <span class="text-accent">formar parte de un movimiento nacional</span>
          que desarrolla propuestas concretas para enfrentar la emergencia climática?
        </p>
        <div class="flex gap-4 flex-wrap">
          <BaseButton href="#registro">REGÍSTRATE AQUÍ</BaseButton>
          <BaseButton variant="outline" href="#quienes">QUIÉNES SOMOS</BaseButton>
        </div>
      </div>
    </div>

    <div class="absolute right-0 top-0 h-full w-5/12 lg:w-1/2 pointer-events-none hidden md:block">
      <img
        :src="heroArtwork"
        alt=""
        class="h-full w-full object-contain object-bottom-right"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
import heroArtwork from '../assets/images/Mas Ideas.png'
</script>
