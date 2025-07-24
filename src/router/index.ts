import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index.vue";
import Container from "../components/container/src/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/",
        component: Home,
      },
       {
        path: "/menu",
        component: () => import("../views/menu/index.vue"),
      },
       {
        path: "/form",
        component: () => import("../views/form/index.vue"),
      },
        {
        path: "/mForm",
        component: () => import("../views/mForm/index.vue"),
      },
      {
        path: "/chooseIcon",
        component: () => import("../views/chooseIcon/index.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("../views/chooseArea/index.vue"),
      },
      {
        path: "/mars3D",
        component: () => import("../views/mars3D/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

