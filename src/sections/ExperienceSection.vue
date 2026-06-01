<template>
  <section class="bg-surface py-20 px-6">
    <!-- Header con imagen y stickers -->
    <div class="relative w-full h-[400px] mb-16 overflow-hidden rounded-3xl">
      <img src="../assets/images/foto 4.png" alt="Experiencia ELC" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40" />
      
      <!-- Stickers -->
      <img src="../assets/images/stickerhxnf.png" class="absolute top-4 left-4 w-24" />
      <img src="../assets/images/mas ideas.png" class="absolute top-4 right-4 w-32" />
      
      <h2 class="absolute bottom-10 left-10 text-white text-4xl md:text-5xl font-heading font-bold">
        ¿Qué obtengo de esta experiencia?
      </h2>
    </div>

    <!-- Contenido de puntos -->
    <div class="max-w-4xl mx-auto border-2 border-orange p-8 md:p-12 rounded-3xl">
      <ul class="space-y-6">
        <li v-for="(item, index) in benefits" :key="index" class="flex items-start gap-4 text-white/90 font-body text-lg">
          <span class="mt-2 w-2 h-2 rounded-full bg-orange flex-shrink-0" />
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const benefits = [
  'Conocer a personas jóvenes de tu estado y de todo el país interesadas en acelerar la adopción de energías renovables en el país de forma creativa e interdisciplinaria.',
  'Pláticas con personas líderes de la transición energética justa en México.',
  'Un reconocimiento de participación en la Escuela de Liderazgo Climático.',
  'Incorporarse al Movimiento Hackers por Nuestro Futuro, a través de la creación de tu propio capítulo universitario.',
  'Contar con orientación del equipo de coordinación del Movimiento y el apoyo de la red ampliada de alianzas para impulsar iniciativas desde tu capítulo.',
  'La posibilidad de convertirse en vocerx de las propuestas y actividades de tu capítulo frente a tu universidad, medios de comunicación, líderes de opinión y tomadores de decisiones para impulsar la adopción de una transición energética justa a nivel local y nacional.'
]
</script>