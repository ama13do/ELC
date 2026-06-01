<template>
  <footer class="w-full bg-black border-t border-white/10 py-12 px-6 md:px-12">
    <div class="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
      
      <!-- Título -->
      <h3 class="text-white font-heading font-bold text-xl">Contacto</h3>

      <!-- Texto de contacto -->
      <p class="text-white/80 font-body text-center md:text-left max-w-sm">
        Escríbenos a 
        <a href="mailto:hxnf@practica.lat" class="text-accent underline">hxnf@practica.lat</a> 
        o envíanos un mensaje a través de nuestras redes sociales:
      </p>

      <!-- Redes Sociales -->
      <div class="flex items-center gap-8">
        <a href="#" class="flex flex-col items-center gap-2 group">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
            <span class="text-white">IG</span> <!-- Sustituir por icono de Instagram -->
          </div>
          <span class="text-white/60 text-xs font-body">@Hackersxnf</span>
        </a>
        
        <a href="#" class="flex flex-col items-center gap-2 group">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
            <span class="text-white">TT</span> <!-- Sustituir por icono de TikTok -->
          </div>
          <span class="text-white/60 text-xs font-body">@movimientohxnf</span>
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer del Movimiento
</script>