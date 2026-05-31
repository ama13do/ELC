<template>
  <section class="relative w-full bg-surface py-20 px-6 md:px-12 lg:px-20 overflow-hidden">

    <!-- Sticker Sun Orange top-right -->
    <img
      :src="sunOrangeImg"
      alt=""
      class="absolute top-6 right-6 w-20 h-20 object-contain pointer-events-none select-none z-10"
    />

    <div class="mx-auto max-w-6xl">
      <!-- Título -->
      <h2
        class="font-bold text-white text-4xl md:text-5xl leading-tight mb-14"
        style="font-family: 'Parkinsans', sans-serif;"
      >
        ¿Por qué participar<br />en la ELC?
      </h2>

      <!-- Lista de razones -->
      <ul class="flex flex-col gap-8 max-w-2xl">
        <li
          v-for="reason in reasons"
          :key="reason.id"
          class="flex items-start gap-4"
        >
          <span
            class="mt-1 flex-shrink-0 w-4 h-4 rounded-full"
            :style="{ backgroundColor: reason.color }"
          />
          <p class="text-white/85 text-base leading-relaxed">
            <span class="font-semibold text-white">{{ reason.lead }}</span>
            {{ reason.body }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import sunOrangeImg from '../assets/images/Sun Orange.png'

interface Reason {
  id: number
  color: string
  lead: string
  body: string
}

const reasons: Reason[] = [
  {
    id: 1,
    color: '#0ce23f',
    lead: 'Obtendrás conciencia técnica real,',
    body: 'formándote como una investigadorx del sistema energético actual y los retos meta climáticos para cuestionar el modelo actual más allá de los discursos emitidos.',
  },
  {
    id: 2,
    color: '#f4727b',
    lead: 'Formarás parte de una comunidad que sostiene,',
    body: 'jóvenes que comprenden la transición energética al ámbito nacional y no se han conformado con lo que dicen.',
  },
  {
    id: 3,
    color: '#00d4c8',
    lead: 'Entenderás y aplicarás la transición energética desde (TE) hasta la raíz:',
    body: 'Aprenderás a nombrar y comprender las dinámicas de una verdadera Justicia Climática.',
  },
  {
    id: 4,
    color: '#f5a623',
    lead: 'Aprenderás a transformar tu indignación ante la crisis climática y energética',
    body: 'en conocimiento mediante el análisis narrativa política y diseño de campañas de impacto.',
  },
  {
    id: 5,
    color: '#b5ff4d',
    lead: 'Podrás construir acción colectiva poderosa,',
    body: 'jóvenes comprometidxs y gestores organizados, con metas claras de impacto y capacidad de crear movimientos.',
  },
]
</script>
