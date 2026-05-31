<template>
  <section class="relative w-full overflow-hidden min-h-[55vh] flex items-end">
    <!-- Foto de evento de fondo -->
    <div class="absolute inset-0 z-0">
      <img :src="bgPhoto" alt="" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black/60" />
    </div>

    <!-- Sticker SOLUCIONES COLECTIVAS (top-right) -->
    <img
      :src="solucionesImg"
      alt="Soluciones colectivas impacto real"
      class="absolute top-6 right-6 z-20 w-28 h-28 object-contain pointer-events-none select-none"
    />

    <!-- Sticker Leaf (right, centro) -->
    <img
      :src="leafImg"
      alt=""
      class="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-16 h-16 object-contain pointer-events-none select-none"
    />

    <!-- Texto (bottom-left) -->
    <div class="relative z-10 mx-auto max-w-6xl w-full px-6 md:px-12 lg:px-20 py-16">
      <p class="text-white text-base md:text-lg leading-relaxed max-w-xl">
        Las sesiones de la ELC se realizarán de manera virtual del
        <span class="font-semibold">6 al 31 de julio</span>,
        de 7:00 a 9:00 pm (hora CDMX) entre las cuales se revisarán
        los siguientes temas en 2 fases.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import bgPhoto from '../assets/images/foto 2.jpg'
import solucionesImg from '../assets/images/Soluciones.png'
import leafImg from '../assets/images/Leaf.png'
</script>
