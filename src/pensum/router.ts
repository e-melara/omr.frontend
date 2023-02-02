import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/";

export const PensumRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: () => import("@/shared/LayoutComponent.vue"),
  children: [
    {
      path: "materias",
      name: "materias-student-list",
      component: () => import("./pages/Pensum.vue"),
    },
    {
      path: "administrador/materias",
      name: "materias-administrador",
      component: () => import("./pages/Admin/Pensum.vue"),
    },
    {
      path: "administrador/estudiantes",
      name: "estudiantes",
      component: () => import("./pages/AlumnoList.vue"),
    },
    /* {
      path: "asesoria",
      name: "pensum-asesoria",
      component: () => import("./pages/Asesoria.vue"),
    }, */
  ],
};
