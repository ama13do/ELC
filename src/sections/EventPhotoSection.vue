<template>
  <section class="relative w-full bg-surface py-24 px-6 md:px-12 font-parkinsans">
    <div class="mx-auto max-w-3xl flex flex-col items-center text-center gap-16">

      <div class="relative px-14 py-10 md:px-20 md:py-12">
        <img
          :src="ovalImg"
          alt=""
          class="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
          style="transform: scaleY(1.6);"
        />
        <p class="relative text-white text-lg md:text-xl leading-relaxed">
          Y, aunque en el discurso climático se habla de las juventudes como
          'el futuro del planeta', esto no corresponde con el lugar que nos dan
          en las decisiones reales: ninguno.
        </p>
      </div>

      <h2 class="font-bold text-white text-2xl md:text-3xl leading-snug">
        ¡En Hackers por Nuestro Futuro queremos cambiar esto!
      </h2>

    </div>
  </section>
</template>

<script setup lang="ts">
import ovalImg from '../assets/images/Untitled_Artwork.png'
</script>