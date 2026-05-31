<template>
  <section class="bg-surface py-20 px-6 md:px-12 lg:px-20">
    <div class="mx-auto max-w-4xl flex flex-col items-center gap-12">

      <!-- Intro -->
      <p class="text-white text-center text-lg md:text-xl leading-relaxed max-w-2xl">
        Más que un programa académico o un curso de verano, la Escuela de Liderazgo
        Climático es la puerta de entrada al movimiento HxNF.
      </p>

      <!-- Tarjetas comparativas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

        <!-- Izquierda: otros programas -->
        <div class="rounded-2xl border border-white/20 bg-white/5 p-8 flex flex-col gap-6">
          <h3
            class="font-bold text-white text-xl leading-snug"
            style="font-family: 'Parkinsans', sans-serif;"
          >
            Lo que ofrecen<br />otros programas
          </h3>
          <div v-for="item in others" :key="item.lead" class="flex flex-col gap-1">
            <p class="text-white font-semibold text-sm">{{ item.lead }}</p>
            <p class="text-white/65 text-sm leading-relaxed">{{ item.body }}</p>
          </div>
        </div>

        <!-- Derecha: ELC -->
        <div class="rounded-2xl border-2 border-accent bg-white/5 p-8 flex flex-col gap-6">
          <h3
            class="font-bold text-accent text-xl leading-snug"
            style="font-family: 'Parkinsans', sans-serif;"
          >
            Lo que ofrece<br />la ELC 2026
          </h3>
          <div v-for="item in elc" :key="item.lead" class="flex flex-col gap-1">
            <p class="text-white font-semibold text-sm">{{ item.lead }}</p>
            <p class="text-white/65 text-sm leading-relaxed">{{ item.body }}</p>
          </div>
        </div>

      </div>

      <!-- Pie -->
      <p class="text-white/40 text-xs tracking-widest uppercase text-center">
        Espacio libre de partidos políticos
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
const others = [
  {
    lead: 'Conocimiento sin poder:',
    body: 'Talleres que explican el sistema pero no organizan para cambiarlo.',
  },
  {
    lead: 'Comunidad sin raíz:',
    body: 'Colectivos que se arman con energía y se deshacen en seis meses.',
  },
]

const elc = [
  {
    lead: 'Conocimiento + organización:',
    body: 'Entiendes el sistema y te organizas con metodología para cambiarlo.',
  },
  {
    lead: 'Liderazgo que dura:',
    body: 'Estructura basada en la metodología probada de organización comunitaria para que el poder colectivo no dependa de una sola persona.',
  },
]
</script>
