<template>
  <section class="bg-surface py-20 px-6 md:px-12 lg:px-20">
    <div class="mx-auto max-w-3xl flex flex-col gap-8">

      <!-- Encabezado de fase -->
      <div class="flex items-center gap-4 flex-wrap">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
          <span
            class="font-bold text-white text-xl tracking-wide"
            style="font-family: 'Parkinsans', sans-serif;"
          >FASE 1</span>
        </span>
        <span
          class="text-accent text-xl font-semibold underline underline-offset-4"
          style="font-family: 'Parkinsans', sans-serif;"
        >Identidad, valores y diagnóstico sistémico</span>
      </div>

      <!-- Intro -->
      <p class="text-white/85 text-base leading-relaxed">
        La primera fase busca que lxs integrantes comprendan a fondo la misión del movimiento,
        compartan un lenguaje común y exploren el origen del problema público y estructural
        que queremos resolver.
      </p>

      <!-- Temas -->
      <ul class="flex flex-col gap-6">
        <li v-for="topic in topics" :key="topic.title" class="flex items-start gap-4">
          <span class="mt-1.5 w-3 h-3 rounded-full bg-accent flex-shrink-0" />
          <div>
            <p class="text-white font-bold text-sm mb-1">{{ topic.title }}</p>
            <p class="text-white/70 text-sm leading-relaxed">{{ topic.body }}</p>
          </div>
        </li>
      </ul>

    </div>
  </section>
</template>

<script setup lang="ts">
const topics = [
  {
    title: 'Fundamentos del movimiento y teoría del cambio.',
    body: 'Misión, visión, metas y estrategia de HxNF: cómo buscamos generar impacto sistémico y cuáles son los mecanismos internos que dan vida a nuestro movimiento.',
  },
  {
    title: 'Contexto global y movimientos sociales.',
    body: 'El dilema democrático frente a la crisis civilizatoria contemporánea y la historia de las movilizaciones actuales, para ubicar el rol de HxNF en el tablero político.',
  },
  {
    title: 'Justicia climática.',
    body: 'Qué es la justicia climática, cómo impacta a las poblaciones más vulnerables y qué caminos existen para alcanzarla.',
  },
  {
    title: 'El núcleo del problema: TEJ, descarbonización y pobreza energética.',
    body: 'La diferencia entre una simple descarbonización corporativa y una Transición Energética Justa que no deje a nadie atrás.',
  },
  {
    title: 'Ecofeminismos y redes de apoyo.',
    body: 'La relevancia de los ecofeminismos y la economía del cuidado como herramientas para tejer redes horizontales frente al extractivismo sistémico y la brecha de género.',
  },
]
</script>
