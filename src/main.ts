import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { usePostHog } from './composables/usePostHog'

usePostHog()

createApp(App).mount('#app')
