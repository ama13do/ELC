<template>
  <section class="bg-surface py-20 px-6">
    <div class="mx-auto max-w-3xl">
      <h2 class="text-4xl md:text-5xl font-bold font-heading text-white mb-12">
        Fechas importantes
      </h2>

      <div class="flex flex-col gap-6">
        <div 
          v-for="(date, index) in timeline" 
          :key="index"
          class="flex items-center justify-between p-6 rounded-full border-2 border-accent transition-all hover:bg-surface-alt"
        >
          <span class="font-heading font-semibold text-white text-lg">
            {{ date.event }}
          </span>
          <span class="font-body text-accent font-medium">
            {{ date.date }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const timeline = [
  { event: 'Apertura de convocatoria', date: '1 de junio' },
  { event: 'Cierre de convocatoria', date: '26 de junio' },
  { event: 'Anuncio de seleccionadxs', date: '1 al 3 de julio' },
  { event: 'Sesión informativa', date: '4 de julio' },
  { event: 'Periodo de conferencias y talleres', date: '6 al 31 de julio' },
  { event: 'Apertura de capítulos universitarios', date: '10 al 31 de agosto' },
  { event: 'Activaciones y/o propuesta de proyectos', date: '1 de septiembre al 30 de noviembre' }
]
</script>