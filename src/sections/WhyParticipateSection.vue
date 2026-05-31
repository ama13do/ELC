<template>
  <section class="relative w-full bg-surface py-20 px-6 md:px-12 lg:px-20">
    <div class="mx-auto max-w-6xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4"
        >
          <span
            class="block w-5 h-5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: stat.color }"
          />
          <p class="text-white text-sm leading-relaxed">{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  id: number
  color: string
  text: string
}

const stats: Stat[] = [
  {
    id: 1,
    color: '#f4727b',
    text: 'Actualmente, solo el 23.5% de la energía en México proviene de fuentes limpias. Aunque existe el compromiso de alcanzar un 45% para 2025, el objetivo todavía parece lejano.',
  },
  {
    id: 2,
    color: '#f5c842',
    text: 'Los hogares del quintil más pobre (el 20% de la población) destinan arriba del 30% de su ingreso total a pagar energía.',
  },
  {
    id: 3,
    color: '#0ce23f',
    text: 'México tiene que importar el 80% de la gasolina y el diésel que se consumen internamente.',
  },
  {
    id: 4,
    color: '#9b6dff',
    text: 'Dependemos de Estados Unidos para el 75% del gas que se quema para generar electricidad y para consumo doméstico.',
  },
]
</script>
