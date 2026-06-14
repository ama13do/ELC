import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Gracias from "@/views/success.vue";
import FormView from "@/views/form.vue";
import DashboardAdmin from "@/views/Dashboard_Admin.vue";
import { registroCompletado } from "@/composables/useRegistro";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/formulario", component: FormView },
    {
      path: "/success",
      component: Gracias,
      beforeEnter: (to, from, next) => {
        if (!registroCompletado.value) {
          next('/');
        } else {
          next();
        }
      },
    },
    { path: "/dashboard-882391-internal", component: DashboardAdmin },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

export default router;
