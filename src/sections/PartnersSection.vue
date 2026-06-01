<template>
  <section class="footer-section" ref="sectionRef">
    <div class="footer-inner">

      <!-- Términos y condiciones -->
      <div class="footer-block">
        <h3 class="footer-heading">Términos y condiciones</h3>
        <p class="footer-text">
          En el siguiente enlace de descarga podrás consultar los términos y condiciones de
          tu participación en la Escuela de Liderazgo Climático 2026. Revisa con cuidado los
          compromisos que asumirás y parámetros a los que estarás sujetx, en caso de resultar
          seleccionadx.
        </p>
        <BaseButton variant="secondary" href="https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view?usp=sharing">Términos y condiciones</BaseButton>
      </div>

      <!-- Organizaciones convocantes -->
      <div class="footer-block">
        <h3 class="footer-heading">Organizaciones convocantes</h3>
        <div class="logos-grid">
          <a
            v-for="org in orgs"
            :key="org.name"
            :href="org.url"
            target="_blank"
            rel="noopener noreferrer"
            class="logo-link"
          >
            <img :src="org.logo" :alt="org.name" class="logo-img" />
          </a>
        </div>
      </div>

      <!-- Aviso de privacidad -->
      <div class="footer-block footer-block--center">
        <BaseButton variant="outline-blue" href="https://drive.google.com/file/d/1bJ4sEeZNQkh_s4PplfGhr9GNNxxloTx7/view?usp=sharing">Aviso de privacidad</BaseButton>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.footer-block', { y: 35, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none reverse' }
    })
    gsap.from('.logo-img', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%', toggleActions: 'play none none reverse' }
    })
  }, sectionRef.value ?? undefined)
})

import logoHXNF from '../assets/logos/HXNF.png'
import logoNF from '../assets/logos/NF.svg'
import logoPractica from '../assets/logos/PRACTICA.png'
import logoICM from '../assets/logos/ICM.svg'
import logoIDEA from '../assets/logos/IDEA.svg'
import logoFUND from '../assets/logos/FUND.svg'

// 2. USA LAS VARIABLES IMPORTADAS EN TU ARREGLO (sin comillas)
const orgs = [
  { name: 'HXNF',     logo: logoHXNF,     url: 'https://www.instagram.com/hackersxnf/' },
  { name: 'NF',       logo: logoNF,       url: 'https://www.instagram.com/nuestrofuturoac/' },
  { name: 'Practica', logo: logoPractica, url: 'https://www.instagram.com/practica_lab/' },
  { name: 'ICM',      logo: logoICM,      url: 'https://www.instagram.com/iniciativaclima/' },
  { name: 'IDEA',     logo: logoIDEA,     url: 'https://www.instagram.com/ideathinktankmx/' },
  { name: 'FUND',     logo: logoFUND,     url: 'https://umifund.org/' },
]
</script>

<style scoped>
.footer-section {
  width: 100%;
  background-color: var(--color-surface);
  padding: clamp(3rem, 7vh, 5.5rem) clamp(1.5rem, 6vw, 4rem);
}

.footer-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(3rem, 6vh, 5rem);
}

/* ── Bloques ── */
.footer-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  width: 100%;
}

.footer-block--center {
  align-items: center;
}

/* ── Heading ── */
.footer-heading {
  font-family: var(--font-parkinsans);
  font-weight: 700;
  color: var(--color-white);
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  margin: 0;
}

/* ── Texto ── */
.footer-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: rgba(255,255,255,0.78);
  font-size: clamp(0.85rem, 1.2vw, 0.98rem);
  line-height: 1.75;
  max-width: 560px;
  margin: 0;
}

/* ── Grid de logos ── */
.logos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 3rem;
  align-items: center;
  justify-items: center;
  width: 100%;
}

/* ── Logo link ── */
.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease;
}

.logo-link:hover {
  opacity: 2.5;
  filter: brightness(2);
  transform: scale(1.5);
}

.logo-img {
  height: clamp(28px, 4vw, 44px);
  width: auto;
  object-fit: contain;
  display: block;
  /* logos en blanco/color según el fondo oscuro */
  filter: brightness(0) invert(1);
  transition: filter 0.2s ease;
}

.logo-link:hover .logo-img {
  filter: brightness(0) invert(1) drop-shadow(0 0 6px rgba(11,227,64,0.5));
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .logos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 2rem;
  }
}
</style>