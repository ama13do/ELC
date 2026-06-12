import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { usePostHog } from './composables/usePostHog'

usePostHog()

createApp(App).use(router).mount('#app')