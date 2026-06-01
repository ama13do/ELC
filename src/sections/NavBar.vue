<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out bg-black/90 backdrop-blur-sm border-b border-white/10',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <!-- Contenedor: Links a la izquierda, Logo a la derecha -->
    <div class="flex items-center justify-between w-full px-4 py-2 md:px-12 md:py-3">
      
      <!-- 1. Logos de Organizaciones (Izquierda) -->
      <div class="flex items-center justify-start gap-4 md:gap-7">
        <!-- Ocultamos en móvil los que tengan hideOnMobile en true -->
        <a
          v-for="org in orgs"
          :key="org.name"
          :href="org.url"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'nav-logo-link flex-shrink-0',
            org.hideOnMobile ? 'hidden md:flex' : 'flex'
          ]"
        >
          <img :src="org.logo" :alt="org.name" class="nav-logo-img" />
        </a>
      </div>

      <!-- 2. Logo principal de HXNF (Derecha) con botón para subir -->
      <a href="#" @click.prevent="scrollToTop" class="flex-shrink-0 cursor-pointer" aria-label="Volver al inicio">
        <img :src="mainLogo" alt="hxnf" class="hxnf-logo h-7 md:h-9 w-auto" />
      </a>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Importamos el logo principal
import mainLogo from '../assets/images/hxnf.png'

// Importamos los logos de las orgs
import logoHXNF from '../assets/logos/HXNF.png'
import logoNF from '../assets/logos/NF.svg'
import logoPractica from '../assets/logos/PRACTICA.png'
import logoICM from '../assets/logos/ICM.svg'
import logoIDEA from '../assets/logos/IDEA.svg'
import logoFUND from '../assets/logos/FUND.svg'

// Arreglo de organizaciones
const orgs = [
  { name: 'HXNF',     logo: logoHXNF,     url: 'https://www.instagram.com/hackersxnf/',      hideOnMobile: false },
  { name: 'NF',       logo: logoNF,       url: 'https://www.instagram.com/nuestrofuturoac/', hideOnMobile: false },
  { name: 'Practica', logo: logoPractica, url: 'https://www.instagram.com/practica_lab/',    hideOnMobile: true },
  { name: 'ICM',      logo: logoICM,      url: 'https://www.instagram.com/iniciativaclima/', hideOnMobile: true },
  { name: 'IDEA',     logo: logoIDEA,     url: 'https://www.instagram.com/ideathinktankmx/', hideOnMobile: true },
  { name: 'FUND',     logo: logoFUND,     url: 'https://umifund.org/',                       hideOnMobile: true },
]

// ── Lógica para subir al inicio suavemente ──
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// ── Lógica para ocultar/mostrar la barra al hacer scroll ──
const isVisible = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    isVisible.value = false // Oculta al bajar
  } else {
    isVisible.value = true  // Muestra al subir
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ── Animación de tu logo principal original ── */
.hxnf-logo {
  transform-origin: center;
  animation: inflate 2.8s ease-in-out infinite;
}

@keyframes inflate {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

/* ── Estilos unificados para los logos de las orgs ── */
.nav-logo-link {
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
  align-items: center;
  justify-content: center;
}

.nav-logo-link:hover {
  opacity: 1;
  transform: scale(1.1);
}

.nav-logo-img {
  /* Más chicos en móvil (20px) y normales en web (26px) */
  height: clamp(20px, 3vw, 26px);
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
}

.nav-logo-link:hover .nav-logo-img {
  filter: brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.4));
}
</style>