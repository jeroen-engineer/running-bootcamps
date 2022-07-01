import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import CreateTraining from "@/views/CreateTrainingView.vue";
import SingleTraining from "@/views/SingleTrainingView.vue";
import UpdateTraining from "@/views/UpdateTrainingView.vue";

import { useAuthStore } from "@/stores";

const requireAuth = (to, from, next) => {
  const auth = useAuthStore();
  if (!auth.user.isAdmin) {
    next({ name: "Home" });
  } else {
    next();
  }
};

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
    },
    {
      path: "/register",
      component: Register,
      name: "Register",
    },
    {
      path: "/create-training",
      component: CreateTraining,
      name: "CreateTraining",
      beforeEnter: requireAuth,
    },
    {
      path: "/update-training",
      component: UpdateTraining,
      name: "UpdateTraining",
      beforeEnter: requireAuth,
    },
    {
      path: "/training/:id",
      component: SingleTraining,
      name: "SingleTraining",
    },
  ],
});
