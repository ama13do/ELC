<template>
  <section ref="sectionRef" class="relative w-full bg-surface py-10 md:py-24 px-6 md:px-12 font-parkinsans">
    <div class="mx-auto max-w-3xl flex flex-col items-center text-center gap-8 md:gap-16">

      <div class="relative px-14 py-10 md:px-20 md:py-12 oval-wrapper">
        <img
          :src="ovalImg"
          alt=""
          class="absolute inset-0 w-full h-full object-fill pointer-events-none select-none oval-img"
          style="transform: scaleY(1.6);"
        />
        <p class="relative text-white text-lg md:text-xl leading-relaxed quote-text">
          Y, aunque en el discurso climático se habla de las juventudes como
          'el futuro del planeta', esto no corresponde con el lugar que nos dan
          en las decisiones reales: ninguno.
        </p>
      </div>

      <h2 ref="h2Ref" class="font-bold text-white text-2xl md:text-3xl leading-snug h2-title">
        ¡En Hackers por Nuestro Futuro queremos cambiar esto!
      </h2>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ovalImg from '../assets/images/Untitled_Artwork.webp'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const h2Ref = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!h2Ref.value || !sectionRef.value) return

  // Dividir texto en spans por caracter
  const raw = h2Ref.value.textContent ?? ''
  h2Ref.value.innerHTML = raw
    .split('')
    .map(c => `<span class="tw-char">${c}</span>`)
    .join('')

  const chars = h2Ref.value.querySelectorAll<HTMLElement>('.tw-char')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
      end: 'bottom top',
      scrub: 1.5,
    },
  })

  // Fase 1: aparición typewriter
  tl.fromTo(chars,
    { opacity: 0 },
    { opacity: 1, stagger: 0.04, ease: 'none', duration: 2 }
  )

  // Fase 2: hold visible
  tl.to({}, { duration: 1 })

  // Fase 3: desaparición
  tl.to(chars,
    { opacity: 0, stagger: 0.02, ease: 'none', duration: 1.5 }
  )
})
</script>

<style scoped>
.tw-char {
  display: inline;
  opacity: 0;
}

@media (max-width: 640px) {
  .h2-title {
    font-size: 1.2rem;
  }

  .quote-text {
    font-size: 0.66rem;
    line-height: 1.6;
  }

  .oval-img {
    object-fit: contain;
    transform: scaleY(1.2) !important;
  }

  .oval-wrapper {
    padding: 2rem 3rem !important;
  }
}
</style>
