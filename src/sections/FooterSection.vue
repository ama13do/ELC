<template>
  <footer class="w-full bg-black border-t border-white/10 py-12 px-6 md:px-12">
    <div class="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
      
      <h3 class="font-heading font-bold text-2xl" style="color: var(--color-pink, #FF1493);">
        Contacto
      </h3>

      <p class="text-white/80 font-body text-center md:text-left max-w-sm">
        Escríbenos a 
        <a 
          href="mailto:hxnf@practica.lat" 
          class="font-bold underline text-accent" 
          style="color: var(--color-accent, #0BE340); text-underline-offset: 3px;"
        >
          hxnf@practica.lat
        </a> 
        o envíanos un mensaje a través de nuestras redes sociales:
      </p>

      <div class="flex items-center gap-8">
        
        <a 
          href="https://www.instagram.com/hackersxnf/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex flex-col items-center gap-2 group"
        >
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#0BE340]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white group-hover:text-black transition-colors">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <span class="text-white/60 text-xs font-body group-hover:text-white transition-colors">@Hackersxnf</span>
        </a>
        
        <a 
          href="https://www.tiktok.com/@movimientohxnf" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex flex-col items-center gap-2 group"
        >
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#0BE340]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white group-hover:text-black transition-colors">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </div>
          <span class="text-white/60 text-xs font-body group-hover:text-white transition-colors">@movimientohxnf</span>
        </a>

      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer del Movimiento
</script>