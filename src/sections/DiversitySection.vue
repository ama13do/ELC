<template>
  <section class="relative w-full bg-surface py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
    <!-- Lado Derecho: Imagen y Stickers (Referencia a image_5e60a1.jpg) -->
      <div class="relative w-full min-h-[500px]">
      <img 
        src="../assets/images/foto-2.jpg" 
        alt="Participantes ELC" 
        class="rounded-3xl object-cover w-full h-[600px] shadow-2xl"
      />
      
      <!-- Stickers -->
      <img src="../assets/images/StickerHXNF.png" class="absolute -top-6 -left-6 w-24 h-24 z-20" alt="Sticker 1" />
      <img src="../assets/images/Sun-Blue.png" class="absolute top-10 -right-8 w-20 h-20 z-20" alt="Sticker 2" />
      <img src="../assets/images/Hackerin1.png" class="absolute -bottom-8 -right-6 w-28 h-28 z-20" alt="Sticker 3" />
    </div>
    <!-- Contenedor Principal -->
    <div class="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <!-- Lado Izquierdo: Contenido -->
      <div class="flex flex-col gap-8 z-10">
        <h2 class="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
          ¿Qué esperar al final de la Escuela de Liderazgo Climático?
        </h2>

        <div class="space-y-6">
          <p class="text-lg font-body text-white/90">
            <span class="text-accent font-bold">El entregable real de la ELC no es un diploma: es un capítulo vivo.</span> 
            Quienes egresan asumen la responsabilidad de fundar o fortalecer un capítulo en su universidad o estado: 
            una célula local con capacidad de propuesta, articulación territorial e incidencia en la política energética de su región. 
            Eso es lo que el movimiento necesita de ti.
          </p>

          <p class="text-base font-body text-white/80 leading-relaxed">
            No lo harás solx. Contarás con el acompañamiento del equipo de coordinación de HxNF, acceso a la red de capítulos en 10 estados, 
            y la posibilidad de conectar tu trabajo local con plataformas nacionales de incidencia climática.
          </p>

          <p class="text-base font-body text-white/80 leading-relaxed">
            Una vez que tu capítulo esté en pie, podrás proponer proyectos propios (desde proyectos energéticos, auditorías energéticas comunitarias, 
            hasta intervenciones culturales y procesos participativos) con el respaldo de mentorxs especializadxs y una comunidad con experiencia 
            construyendo la transición energética justa en México.
          </p>
        </div>
      </div>

      
    </div>
  </section>
</template>

<script setup lang="ts">
// Sección de Diversidad / ELC Final
</script>