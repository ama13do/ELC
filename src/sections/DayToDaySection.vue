<template>
  <section class="elc-section" ref="sectionRef">
    <img loading="lazy" src="../assets/images/ELC.webp" alt="" class="elc-bg" />

    <div class="elc-content">
      <h2 class="elc-title">¿De qué se trata<br />la ELC?</h2>
      <p class="elc-body">
        La ELC busca formar y conectar juventudes capaces de impulsar la
        transición hacia energías renovables en México mediante formación
        especializada y organización colectiva.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    gsap.from('.elc-title', { y: 40, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' }
    })
    gsap.from('.elc-body', { y: 25, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 72%', toggleActions: 'play none none none' }
    })
  }, sectionRef.value ?? undefined)
})
</script>

<style scoped>
.elc-section {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.elc-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.elc-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 560px;
  margin-right: clamp(1.5rem, 8vw, 8rem);
  padding: 0 0 clamp(3.5rem, 8vh, 6rem);
  text-align: right;
}

.elc-title {
  font-family: var(--font-parkinsans);
  font-weight: 800;
  color: var(--color-white);
  font-size: clamp(2.3rem, 5.5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
}

.elc-body {
  font-family: var(--font-parkinsans);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(1.5rem, 1.5vw, 1.15rem);
  line-height: 1.75;
  margin: 0;
}

@media (max-width: 768px) {
  .elc-section {
    justify-content: flex-end;
  }

  .elc-content {
    margin-right: 0;
    padding: 0 1.5rem 3rem;
    max-width: 100%;
  }
}
</style>