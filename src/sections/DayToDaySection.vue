<template>
  <section class="relative w-full overflow-hidden min-h-[60vh] flex items-center">
    <!-- Foto de evento de fondo -->
    <div class="absolute inset-0 z-0">
      <img :src="bgPhoto" alt="" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black/55" />
    </div>

    <!-- Sticker izquierdo -->
    <img
      :src="colectivoImg"
      alt=""
      class="absolute left-6 bottom-8 z-20 w-28 h-28 object-contain pointer-events-none select-none"
    />

    <!-- Sticker estrella amarilla (top-right) -->
    <img
      :src="solecitoImg"
      alt=""
      class="absolute top-6 right-8 z-20 w-16 h-16 object-contain pointer-events-none select-none"
    />

    <!-- Contenido -->
    <div class="relative z-10 mx-auto max-w-6xl w-full px-6 md:px-12 lg:px-20 py-20">
      <div class="max-w-xl md:ml-auto">
        <h2
          class="font-bold text-white text-4xl md:text-5xl leading-tight mb-6"
          style="font-family: 'Parkinsans', sans-serif;"
        >
          ¿De qué se trata<br />la ELC?
        </h2>
        <p class="text-white/85 text-base md:text-lg leading-relaxed">
          La ELC busca formar y conectar juventudes capaces de impulsar la
          transición hacia energías renovables en México mediante formación
          especializada y organización colectiva.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import bgPhoto from '../assets/images/FOTO 7.jpg'
import colectivoImg from '../assets/images/Colectivo.png'
import solecitoImg from '../assets/images/Solecito.png'
</script>
