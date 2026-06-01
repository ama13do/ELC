<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white">
    <NavBar />
    <main>
      <HeroSection />
      <WhyParticipateSection />
      <WhatIsSection />
      <EventPhotoSection />
      <BasesSection />
      <DayToDaySection />
      <WhenHowSection />
      <BenefitsSection />
      <QuoteSection />
      <DiversitySection />
      
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
