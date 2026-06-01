<template>
  <div class="min-h-screen bg-black text-white">
    <NavBar />
    <main>
      <HeroSection />
      <WhyParticipateSection />
      <WhatIsSection />
      <EventPhotoSection />
      <BasesSection />
      <div class="relative w-full h-0 z-50 pointer-events-none">
        
        <!-- 
          -left-4 md:-left-8: la empuja ligeramente fuera de la pantalla (efecto cortado)
          w-40 md:w-56 lg:w-72: hace que la imagen crezca progresivamente según la pantalla
        -->
        <img 
          :src="florAmarilla" 
          alt="Somos Cambio" 
          class="absolute top-0 -left-4 md:-left-6 w-80 md:w-100 lg:w-112 animate-breathe"
          style="transform: translateY(-50%);"
        />
        
      </div>
      <DayToDaySection />
      <div class="relative w-full h-0 z-50 pointer-events-none">
        
        <div 
          class="absolute top-0 -left-2 md:-left-4 w-24 md:w-32 lg:w-40"
          style="transform: translateY(-50%);"
        >
          <img 
            :src="solecito" 
            alt="Solecito" 
            class="w-full h-full animate-spin-slow"
          />
        </div>
        
      </div>
      <WhenHowSection />
      <BenefitsSection />
      <QuoteSection />
      <DiversitySection />
      <div class="relative w-full h-0 z-50 pointer-events-none">
        
        <img 
          :src="juntosImg" 
          alt="Juntos" 
          class="absolute top-25 -right-4 md:-right-8 w-48 md:w-92 lg:w-100 animate-breathe"
          style="transform: translateY(-50%);"
        />
        
      </div>
      <ImportantDatesSection />
      <accion/>
      <ExperienceSection />
      <ReelSection />
      <policySection />
      <datesSection />
      <SelectionCriteriaSection />
      <PartnersSection />
    </main>
    <FooterSection />
    <Pet />
  </div>
</template>

<script setup lang="ts">
import juntosImg from './assets/images/juntos.png'
import solecito from './assets/images/Solecito.png'
import florAmarilla from './assets/images/floramarilla.png'
import NavBar from './sections/NavBar.vue'
import HeroSection from './sections/HeroSection.vue'
import WhyParticipateSection from './sections/WhyParticipateSection.vue'
import WhatIsSection from './sections/WhatIsSection.vue'
import EventPhotoSection from './sections/EventPhotoSection.vue'
import BasesSection from './sections/BasesSection.vue'
import DayToDaySection from './sections/DayToDaySection.vue'
import WhenHowSection from './sections/WhenHowSection.vue'
import BenefitsSection from './sections/BenefitsSection.vue'
import QuoteSection from './sections/QuoteSection.vue'
import DiversitySection from './sections/DiversitySection.vue'
import ImportantDatesSection from './sections/ImportantDatesSection.vue'
import SelectionCriteriaSection from './sections/SelectionCriteriaSection.vue'
import accion from './sections/AccionSection.vue'
import PartnersSection from './sections/PartnersSection.vue'
import FooterSection from './sections/FooterSection.vue'
import Pet from './components/Pet.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ReelSection from './sections/ReelSection.vue'
import policySection from './sections/PolicySection.vue'
import datesSection from './sections/DatesSection.vue'


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



</style>