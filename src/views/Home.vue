<template>
  <div class="min-h-screen bg-black text-white">
    <NavBar />
    <main>
      <HeroSection />
      <LazyWrapper><WhyParticipateSection /></LazyWrapper>
      <LazyWrapper><WhatIsSection /></LazyWrapper>
      <LazyWrapper><EventPhotoSection /></LazyWrapper>
      <LazyWrapper><BasesSection /></LazyWrapper>
      <div class="relative w-full h-0 z-50 pointer-events-none">
        <img 
          :src="florAmarilla" 
          alt="Somos Cambio" 
          class="absolute top-5 -left-4 md:-left-6 w-42 sm:w-80 md:w-100 lg:w-112 animate-breathe"
          style="transform: translateY(-50%);"
          loading="lazy"
        />
      </div>
      <LazyWrapper><DayToDaySection /></LazyWrapper>
      <div class="relative w-full h-0 z-50 pointer-events-none">
        <div 
          class="absolute top-0 -left-2 md:-left-4 w-24 md:w-32 lg:w-40"
          style="transform: translateY(-50%);"
        >
          <img 
            :src="solecito" 
            alt="Solecito" 
            class="w-full h-full animate-spin-slow"
            loading="lazy"
          />
        </div>
      </div>
      <LazyWrapper><WhenHowSection /></LazyWrapper>
      <LazyWrapper><BenefitsSection /></LazyWrapper>
      <LazyWrapper><QuoteSection /></LazyWrapper>
      <LazyWrapper><DiversitySection /></LazyWrapper>
      <div class="relative w-full h-0 z-50 pointer-events-none">
        <img 
          :src="juntosImg" 
          alt="Juntos" 
          class="absolute top-0 md:top-35 -right-4 md:-right-8 w-48 md:w-92 lg:w-150 animate-breathe"
          style="transform: translateY(-50%);"
          loading="lazy"
        />
      </div>
      <LazyWrapper><ImportantDatesSection /></LazyWrapper>
      <LazyWrapper><accion/></LazyWrapper>
      <LazyWrapper><ExperienceSection /></LazyWrapper>
      <LazyWrapper><ReelSection /></LazyWrapper>
      <LazyWrapper><policySection /></LazyWrapper>
      <LazyWrapper><datesSection /></LazyWrapper>
      <LazyWrapper><SelectionCriteriaSection /></LazyWrapper>
      <LazyWrapper><PartnersSection /></LazyWrapper>
    </main>
    <LazyWrapper><FooterSection /></LazyWrapper>
    <Pet />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LazyWrapper from '@/components/LazyWrapper.vue'

import juntosImg from '@/assets/images/juntos.webp'
import solecito from '@/assets/images/Solecito.webp'
import florAmarilla from '@/assets/images/floramarilla.webp'
import NavBar from '@/sections/NavBar.vue'
import HeroSection from '@/sections/HeroSection.vue'
// Lazy loaded components (everything except NavBar and HeroSection)
const WhyParticipateSection = defineAsyncComponent(() => import('@/sections/WhyParticipateSection.vue'))
const WhatIsSection = defineAsyncComponent(() => import('@/sections/WhatIsSection.vue'))
const EventPhotoSection = defineAsyncComponent(() => import('@/sections/EventPhotoSection.vue'))
const BasesSection = defineAsyncComponent(() => import('@/sections/BasesSection.vue'))
const DayToDaySection = defineAsyncComponent(() => import('@/sections/DayToDaySection.vue'))
const WhenHowSection = defineAsyncComponent(() => import('@/sections/WhenHowSection.vue'))
const BenefitsSection = defineAsyncComponent(() => import('@/sections/BenefitsSection.vue'))
const QuoteSection = defineAsyncComponent(() => import('@/sections/QuoteSection.vue'))
const DiversitySection = defineAsyncComponent(() => import('@/sections/DiversitySection.vue'))
const ImportantDatesSection = defineAsyncComponent(() => import('@/sections/ImportantDatesSection.vue'))
const SelectionCriteriaSection = defineAsyncComponent(() => import('@/sections/SelectionCriteriaSection.vue'))
const accion = defineAsyncComponent(() => import('@/sections/AccionSection.vue'))
const PartnersSection = defineAsyncComponent(() => import('@/sections/PartnersSection.vue'))
const FooterSection = defineAsyncComponent(() => import('@/sections/FooterSection.vue'))
const Pet = defineAsyncComponent(() => import('@/components/Pet.vue'))
const ExperienceSection = defineAsyncComponent(() => import('@/sections/ExperienceSection.vue'))
const ReelSection = defineAsyncComponent(() => import('@/sections/ReelSection.vue'))
const policySection = defineAsyncComponent(() => import('@/sections/PolicySection.vue'))
const datesSection = defineAsyncComponent(() => import('@/sections/DatesSection.vue'))


</script>

<style scoped>
/* Animación de "Respiración" */
@keyframes breathe {
  0% {
    scale: 1;
  }
  50% {
    scale: 1.12; /* Crece un 12% suavemente */
  }
  100% {
    scale: 1;
  }
}

.animate-breathe {
  animation: breathe 5s ease-in-out infinite;
  transform-origin: center; /* Crece desde el centro */
}

/* Animación de giro lento para la estrellita / solecito */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  /* 8s hace que gire despacio, 'linear' mantiene una velocidad constante y 'infinite' hace que nunca se detenga */
  animation: spin-slow 10s linear infinite; 
  transform-origin: center;
}

</style>