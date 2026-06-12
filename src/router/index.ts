import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Gracias from "@/views/success.vue";
import { registroCompletado } from "@/composables/useRegistro";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/success",
      component: Gracias,
      beforeEnter: () => {
        if (!registroCompletado.value) return "/";
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

export default router;
