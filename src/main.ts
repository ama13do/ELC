import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { usePostHog } from './composables/usePostHog'

// Inyección segura de Google Tag Manager para evitar errores de parseo en Vite
if (typeof window !== 'undefined') {
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    if (f && f.parentNode) {
      f.parentNode.insertBefore(j, f);
    } else {
      d.head.appendChild(j);
    }
  })(window as any, document, 'script', 'dataLayer', 'GTM-MZX7S53T');
}

usePostHog()

createApp(App).use(router).mount('#app')