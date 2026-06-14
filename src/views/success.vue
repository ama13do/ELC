<template>
  <div class="min-h-screen bg-black text-white overflow-x-hidden">
    <NavBar />

    <main class="relative min-h-screen pt-20 pb-16 flex flex-col items-center justify-center">

      <!-- ── FLOR AMARILLA — arriba izquierda ── -->
      <div class="deco deco-left pointer-events-none select-none">
        <img :src="florAmarilla" alt="Somos Cambio" class="animate-breathe" />
      </div>

      <!-- ── HOJAS — abajo derecha ── -->
      <div class="deco deco-right pointer-events-none select-none">
        <img :src="hojas" alt="Soluciones Colectivas" class="animate-breathe-alt" />
      </div>

      <!-- ── CONTENIDO CENTRAL ── -->
      <div class="relative z-20 w-full max-w-xl px-6 md:px-8 flex flex-col items-center gap-7 text-center">

        <!-- Título -->
        <h1 class="hxnf-heading">
          ¡Gracias por registrarte a la
          <span class="text-accent">Escuela de Liderazgo&nbsp;Climático&nbsp;2026</span>!
        </h1>

        <!-- Mensaje -->
        <div class="msg-card">
          <p class="hxnf-body">
            Hemos recibido tu información y entraste al periodo de selección.
            Pronto te avisaremos si fuiste
            <strong class="text-white">seleccionadx</strong>
            para participar del
            <strong class="text-accent">6&nbsp;al&nbsp;31&nbsp;de&nbsp;julio.</strong>
          </p>
        </div>

        <!-- CTA texto -->
        <p class="hxnf-sub">
          Mientras tanto, síguenos en nuestras redes para no perderte ningún detalle.
          <span class="text-accent">¡Nos vemos pronto!</span>
        </p>

        <!-- ── REDES — logos sin contenedor ── -->
        <div class="w-full mt-2">
          <p class="section-label">Síguenos en nuestras redes</p>
          <div class="logos-row">
            <a
              v-for="org in orgs"
              :key="org.name"
              :href="org.url"
              target="_blank"
              rel="noopener noreferrer"
              class="org-link"
              :aria-label="org.name"
            >
              <img :src="org.logo" :alt="org.name" class="org-logo" />
            </a>
          </div>
        </div>

        <!-- ── BOTÓN VOLVER ── -->
        <router-link to="/" class="back-btn">
          ← Volver al inicio
        </router-link>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import logoHXNF     from '@/assets/logos/HXNF.webp'
import logoNF       from '@/assets/logos/NF.webp'
import logoPractica from '@/assets/logos/PRACTICA.webp'
import logoICM      from '@/assets/logos/ICM.webp'
import logoIDEA     from '@/assets/logos/IDEA.webp'
import logoFUND     from '@/assets/logos/FUND.webp'
import florAmarilla from '@/assets/images/floramarilla.webp'
import hojas        from '@/assets/images/hojas.webp'
import NavBar       from '@/sections/NavBar.vue'

const orgs = [
  { name: 'HXNF',     logo: logoHXNF,     url: 'https://www.instagram.com/hackersxnf/' },
  { name: 'NF',       logo: logoNF,        url: 'https://www.instagram.com/nuestrofuturoac/' },
  { name: 'Práctica', logo: logoPractica,  url: 'https://www.instagram.com/practica_lab/' },
  { name: 'ICM',      logo: logoICM,       url: 'https://www.instagram.com/iniciativaclima/' },
  { name: 'IDEA',     logo: logoIDEA,      url: 'https://www.instagram.com/ideathinktankmx/' },
  { name: 'FUND',     logo: logoFUND,      url: 'https://umifund.org/' },
]
</script>

<style scoped>
/* ─────────────────────────────────────────
   TIPOGRAFÍA
───────────────────────────────────────── */
* { font-family: 'Parkinsans', sans-serif; }

.text-accent { color: #D4FF00; }

.hxnf-heading {
  font-weight: 900;
  font-size: clamp(1.45rem, 3.5vw, 2.1rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.hxnf-body {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  color: rgba(255,255,255,0.78);
  line-height: 1.65;
}

.hxnf-sub {
  font-weight: 800;
  font-size: clamp(1rem, 2.2vw, 1.3rem);
  line-height: 1.35;
}

/* ─────────────────────────────────────────
   MENSAJE CARD
───────────────────────────────────────── */
.msg-card {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.09);
  background: rgba(255,255,255,0.045);
  backdrop-filter: blur(10px);
  padding: 1.4rem 1.8rem;
  text-align: center;
}

/* ─────────────────────────────────────────
   IMÁGENES DECORATIVAS
───────────────────────────────────────── */
.deco {
  position: absolute;
  z-index: 10;
}

/* Flor: esquina superior izquierda, ligeramente fuera */
.deco-left {
  top: 5%;
  left: -2%;
}
.deco-left img {
  width: clamp(100px, 14vw, 200px);
  height: auto;
}

/* Hojas: esquina inferior derecha */
.deco-right {
  bottom: 6%;
  right: -2%;
}
.deco-right img {
  width: clamp(110px, 15vw, 210px);
  height: auto;
}

/* ─────────────────────────────────────────
   ANIMACIONES BREATHE
───────────────────────────────────────── */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.11); }
}
@keyframes breathe-alt {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.09); }
}

.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
  transform-origin: center;
}
.animate-breathe-alt {
  animation: breathe-alt 5s ease-in-out infinite;
  animation-delay: -2.5s;
  transform-origin: center;
}

/* ─────────────────────────────────────────
   SECCIÓN LABEL
───────────────────────────────────────── */
.section-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1.1rem;
}

/* ─────────────────────────────────────────
   LOGOS SIN CONTENEDOR
───────────────────────────────────────── */
.logos-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
}

.org-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.22s ease;
}

.org-link:hover {
  transform: scale(1.1);
}

.org-logo {
  /* altura fija para todos los logos */
  height: clamp(18px, 2.4vw, 26px);
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.6;
  transition: opacity 0.22s ease, filter 0.22s ease;
}

.org-link:hover .org-logo {
  opacity: 1;
  filter:
    brightness(0) invert(1)
    drop-shadow(0 0 7px rgba(212, 255, 0, 0.55))
    drop-shadow(0 0 18px rgba(212, 255, 0, 0.25));
}

/* ─────────────────────────────────────────
   BOTÓN VOLVER
───────────────────────────────────────── */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 999px;
  padding: 0.5rem 1.3rem;
  transition:
    color       0.22s ease,
    border-color 0.22s ease,
    box-shadow   0.22s ease,
    transform   0.22s ease;
}

.back-btn:hover {
  color: #D4FF00;
  border-color: rgba(212, 255, 0, 0.5);
  box-shadow: 0 0 16px rgba(212, 255, 0, 0.2);
  transform: translateY(-1px);
}

/* ─────────────────────────────────────────
   REDUCED MOTION
───────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .animate-breathe,
  .animate-breathe-alt { animation: none; }
}
</style>