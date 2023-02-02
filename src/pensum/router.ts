import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/pensum";

export const PensumRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: () => import("@/shared/LayoutComponent.vue"),
  children: [
    {
      path: "list",
      name: "pensum-list",
      component: () => import("./pages/Pensum.vue"),
    },
    {
      path: "asesor",
      name: "pensum-asesor",
      component: () => import("./pages/Admin/Pensum.vue"),
    },
    {
      path: "student",
      name: "pensum-student",
      component: () => import("./pages/PensumList.vue"),
    },
    {
      path: "asesoria",
      name: "pensum-asesoria",
      component: () => import("./pages/Asesoria.vue"),
    },
  ],
};
