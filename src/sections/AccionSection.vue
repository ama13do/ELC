<template>
  <section class="register-section" ref="sectionRef">
    <div class="register-inner">

      <p class="register-text">
        El cuestionario de registro estará disponible
        <span class="register-highlight">desde el lunes 1 hasta el domingo 26 de junio a las 23:59 horas.</span>
        Además de responder el cuestionario, deberás grabar un video de máximo 6 minutos
        donde respondas algunas preguntas para que podamos conocerte mejor.
      </p>

      <div class="register-buttons">
        <BaseButton variant="primary" href="https://forms.gle/5Kc73ytz17qZWT1AA">REGÍSTRATE AQUÍ</BaseButton>
        <BaseButton variant="secondary" href="https://nuestrofuturo.mx/hxnf/">CONOCE MÁS</BaseButton>
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
    gsap.from('.register-text', { y: 35, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.register-buttons', { y: 25, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 72%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
.register-section {
  width: 100%;
  background-color: var(--color-surface);
  padding: clamp(3rem, 7vh, 5rem) clamp(1.5rem, 6vw, 3rem);
}

.register-inner {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2rem, 4vh, 3rem);
  text-align: center;
}

.register-text {
  font-family: var(--font-parkinsans);
  font-weight: 400;
  color: var(--color-white);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.75;
  margin: 0;
}

.register-highlight {
  color: var(--color-accent);
  font-weight: 700;
}

.register-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
}

@media (max-width: 420px) {
  .register-buttons {
    flex-direction: column;
    width: 100%;
  }
}
</style>