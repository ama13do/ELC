<template>
  <section class="bg-surface py-20 px-6">
    <div class="mx-auto max-w-4xl">
      
      <!-- Título -->
      <h2 class="text-4xl md:text-5xl font-bold font-heading text-white mb-12">
        Criterios de selección
      </h2>

      <!-- Contenedor con borde -->
      <div class="border-2 border-blue p-8 md:p-12 rounded-3xl relative">
        <!-- Punto decorativo de la línea -->
        <div class="absolute -left-3 -top-3 w-6 h-6 bg-blue rounded-full" />
        
        <div class="space-y-6">
          <p class="text-white/90 font-body text-lg leading-relaxed">
            El equipo organizador evaluará la información compartida sobre motivaciones, conocimientos, 
            experiencia y reflexiones proporcionadas a través del cuestionario y video de presentación.
          </p>

          <p class="text-white/90 font-body text-lg leading-relaxed">
            Adicionalmente, se respetarán las siguientes directrices para obtener una selección 
            incluyente y representativa de la diversidad de México. Se buscará:
          </p>

          <ul class="space-y-4 mt-6">
            <li v-for="(item, index) in criteria" :key="index" class="flex items-start gap-4 text-white/90 font-body">
              <span class="mt-2 w-2.5 h-2.5 rounded-full bg-blue flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
const criteria = [
  'Maximizar la representatividad geográfica y socioeconómica.',
  'Maximizar la diversidad de grupos históricamente excluidos.',
  'Maximizar la diversidad de carreras y áreas de profesionalización.',
  'Maximizar las experiencias en torno a temas energéticos, climáticos y de activismo u organización comunitaria.'
]
</script>