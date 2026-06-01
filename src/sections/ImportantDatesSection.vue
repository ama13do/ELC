<template>
  <section class="w-full bg-black py-20">
    <!-- Header con imagen y stickers -->
    <div class="relative w-full h-[400px] mb-16 overflow-hidden">
      <img src="../assets/images/foto 6.jpg" alt="Participantes" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40" />
      
      <!-- Stickers -->
      <img src="../assets/images/energia justa.png" class="absolute top-4 right-4 w-32" />
      <img src="../assets/images/solecito.png" class="absolute top-20 right-20 w-16" />
      <img src="../assets/images/agua.png" class="absolute bottom-4 left-4 w-20" />
      
      <h2 class="absolute bottom-10 left-10 text-white text-4xl md:text-5xl font-heading font-bold">
        ¿Quién puede participar?
      </h2>
    </div>

    <!-- Lista de requisitos -->
    <div class="max-w-4xl mx-auto px-6">
      <div class="border-2 border-blue p-8 md:p-12 rounded-3xl mb-12">
        <ul class="space-y-6">
          <li v-for="(item, index) in requirements" :key="index" class="flex items-start gap-4 text-white/90 font-body text-lg">
            <span class="mt-2 w-2 h-2 rounded-full bg-blue flex-shrink-0" />
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Footer de sección -->
      <div class="text-center space-y-8">
        <p class="text-white/80 font-body text-lg max-w-2xl mx-auto">
          ¿No eres estudiante universitario pero quieres sumarte al cambio? Los capítulos consolidados en los estados son tu espacio. Escríbenos y encuentra tu capítulo estatal más cercano.
        </p>
        
        <button class="bg-yellow text-black font-heading font-bold py-3 px-8 rounded-full hover:bg-yellow/90 transition-colors">
          CONTACTO
        </button>

        <h3 class="text-2xl font-heading font-bold text-white mt-12">
          ¡Sé parte del Movimiento Hackers por Nuestro Futuro!
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const requirements = [
  'Jóvenes de entre 18 y 26 años que vivan en México.',
  'Estudiantes universitarixs activos en modalidad presencial, en cualquier carrera y de cualquier universidad mexicana, pública o privada.',
  'Con acceso a un dispositivo electrónico e internet para participar en videollamadas y crear documentos de texto.',
  'Manejo básico de programas como Word, PowerPoint y Drive.',
  'Sin afiliación o militancia a algún partido político.',
  'Con disponibilidad para atender de forma virtual a las sesiones de la ELC del 6 al 31 de julio de 2026, de 7:00 a 9:00 pm (hora CDMX).',
  'Con interés o conocimientos en temas de medio ambiente, crisis climática y/o energías renovables, e intención de ampliarlos.',
  'Con interés por aprender organización colectiva para formar un capítulo universitario y/o integrarse a un capítulo estatal de Hackers por Nuestro Futuro al terminar la capacitación.'
]
</script>