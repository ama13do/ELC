<template>
  <section class="relative w-full bg-surface overflow-hidden min-h-[70vh] flex items-center">
    <!-- Imagen de fondo con gradiente lateral -->
    <div class="absolute inset-0 z-0">
      <img :src="frackingImg" alt="" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-gradient-to-r from-surface via-surface/30 to-surface" />
    </div>

   

    <!-- Badge "JUNTXS X UNA ENERGÍA JUSTA" -->
    <img
      :src="energiaJustaImg"
      alt="Juntxs x una energía justa"
      class="absolute top-6 right-6 z-20 w-32 h-32 object-contain pointer-events-none"
    />

    <!-- Grid de texto -->
    <div
      class="relative z-20 mx-auto max-w-6xl w-full px-6 md:px-12 lg:px-20 py-24
             grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32"
    >
      <!-- Bloque izquierdo -->
      <div>
        <h2
          class="font-bold text-white text-2xl md:text-3xl leading-snug mb-4"
          style="font-family: 'Parkinsans', sans-serif;"
        >
          El gobierno quiere apostar por el fracking
        </h2>
        <p class="text-white/70 text-base leading-relaxed">
          que contamina el agua y el suelo y destruye comunidades enteras, cuando la verdadera
          soberanía energética está en descartar las fuentes de energía renovable.
        </p>
      </div>

      <!-- Bloque derecho -->
      <div class="md:self-end">
        <h2
          class="font-bold text-white text-2xl md:text-3xl leading-snug mb-4"
          style="font-family: 'Parkinsans', sans-serif;"
        >
          El sistema energético de México se está rediseñando en este momento
        </h2>
        <p class="text-white/70 text-base leading-relaxed">
          y las decisiones que pueden mejorarlo o empeorarlo están tomándolas un puñado de
          personas en México que no conoces.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import frackingImg from '../assets/images/fracking.avif'
import energiaJustaImg from '../assets/images/Energia Justa.png'
</script>
