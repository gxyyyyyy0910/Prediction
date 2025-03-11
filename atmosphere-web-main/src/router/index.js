import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/overview" },
  // {
  //   path: "/home",
  //   name: "index",
  //   component: () => import("../views/index.vue"),
  // },
  {
    path: "/overview",
    name: "overview",
    component: () => import("../views/CountryContainer/index.vue"),
  },
  {
    path: "/predict",
    name: "predict",
    component: () => import("../views/PredictContainer/index.vue"),
  },
  {
    path: "/wind",
    name: "wind",
    component: () => import("../views/WindContainer/index.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});
export default router;
