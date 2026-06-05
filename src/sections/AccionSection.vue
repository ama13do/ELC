<template>
  <!-- En Vue 3 podemos tener múltiples elementos raíz, así que el modal va junto a la sección -->
  <section class="register-section" ref="sectionRef">
    <div class="register-inner">

      <p class="register-text">
        El cuestionario de registro estará disponible
        <span class="register-highlight">desde el lunes 1 hasta el domingo 26 de junio a las 23:59 horas.</span>
        Además de responder el cuestionario, deberás grabar un video de máximo 6 minutos
        donde respondas algunas preguntas para que podamos conocerte mejor.
      </p>

      <div class="register-buttons">
        <!-- Quitamos el href y agregamos el @click para abrir el modal -->
        <BaseButton variant="primary" @click="isModalOpen = true">REGÍSTRATE AQUÍ</BaseButton>
        <BaseButton variant="secondary" href="https://nuestrofuturo.mx/hxnf/">CONOCE MÁS</BaseButton>
      </div>

    </div>
  </section>

  <!-- Estructura del Modal con el Iframe -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
    <div class="modal-content">
      <button class="modal-close" @click="isModalOpen = false">✕</button>
      <iframe src="https://es.surveymonkey.com/r/hxnf2026" title="Registro a la Escuela de Liderazgo Climático"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
// Variable reactiva para controlar si el modal está abierto o cerrado
const isModalOpen = ref(false)

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
/* ── Estilos Originales de la Sección ── */
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

/* ── Nuevos Estilos para el Modal y el Iframe ── */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Asegura que esté por encima de cualquier otro elemento */
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 800px;
  height: 85vh;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: modalFadeIn 0.3s ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  background: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.modal-close:hover {
  background: #e0e0e0;
  transform: scale(1.1);
}

.modal-content iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Pequeña animación para que el modal entre suavemente */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>