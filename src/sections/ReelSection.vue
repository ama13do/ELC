<template>
  <section class="bg-black py-20 w-full">
    <div class="mx-auto max-w-5xl text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-heading font-bold text-white">
        Participar en la Escuela de Liderazgo Climático es solo el inicio
      </h2>
    </div>

    <!-- Carrusel de fotos -->
    <div class="flex overflow-x-auto gap-6 px-6 pb-8 snap-x scrollbar-hide">
      <div 
        v-for="(photo, index) in photoGallery" 
        :key="index" 
        class="min-w-[300px] md:min-w-[400px] h-[300px] snap-center"
      >
        <img 
          :src="photo" 
          alt="Experiencia ELC" 
          class="w-full h-full object-cover rounded-3xl shadow-lg border border-white/10"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Importación de las rutas de las fotos que hemos usado
import foto2 from '../assets/images/foto-2.jpg';
import foto4 from '../assets/images/foto 4.jpg';
import foto6 from '../assets/images/foto 6.jpg';

const photoGallery = [foto2, foto4, foto6];
</script>

<style scoped>
/* Ocultar barra de desplazamiento pero permitir scroll */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>