import { createRouter, createWebHistory } from "vue-router";
import { registroCompletado } from "@/composables/useRegistro";

const Home = () => import("@/views/Home.vue");
const Gracias = () => import("@/views/success.vue");
const FormView = () => import("@/views/form.vue");
const DashboardAdmin = () => import("@/views/Dashboard_Admin.vue");

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
