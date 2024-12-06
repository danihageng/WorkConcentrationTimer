import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import CountDownTimer from "../views/CountDownTimer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: {
        name: "home",
      },
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/timer",
      name: "timer",
      component: CountDownTimer,
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: LoginPage,
    // },
    // {
    //   path: "/Chat",
    //   name: "chat",
    //   component: ChatPage,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
