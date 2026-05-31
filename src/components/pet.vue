<template>
  <div class="pet-container">
    <div class="speech-bubble">
      {{ currentMessage }}
    </div>

    <img
      :src="panelin"
      alt="Panelín"
      class="pet-image"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import panelin from '../assets/pets/Panelin.png'

const messages = [
  '¡Hola! 👋',
  '¿Ya revisaste toda la información?',
  'Recuerda consultar las fechas importantes.',
  'Estoy aquí para ayudarte.',
  '¡No olvides leer las bases!',
  '¿Tienes alguna duda?',
  '¡Mucha suerte!'
]

const currentMessage = ref(messages[0])

onMounted(() => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    currentMessage.value = messages[randomIndex]
  }, 5000)
})
</script>

<style scoped>
.pet-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;

  animation: float 3s ease-in-out infinite;
}

.pet-image {
  width: 140px;
  height: auto;
  cursor: pointer;
  user-select: none;
}

.speech-bubble {
  background: white;
  color: #111;
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 220px;
  margin-bottom: 12px;

  font-size: 14px;
  font-weight: 500;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.speech-bubble::after {
  content: '';
  position: absolute;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>