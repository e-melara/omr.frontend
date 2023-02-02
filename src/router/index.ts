import json from "jwt-decode";
import { createRouter, createWebHistory } from "vue-router";

import { useLocalStorage } from "@/composables";
import LoginPage from "@/pages/athenticate/LoginPage.vue";

// @ts-ignore
import HomeView from "@/pages/HomeView.vue";

// routes de los modulos
import { PensumRoute } from "@/pensum/router";

const storage = useLocalStorage();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // public pages
    {
      path: "/authenticate/login",
      name: "authenticate-login",
      component: LoginPage,
    },

    // pages private
    {
      path: "/",
      name: "home",
      component: () => import("@/shared/LayoutComponent.vue"),
      children: [
        { path: "/dashboard", name: "dasbhoard", component: HomeView },
      ],
    },
    PensumRoute,

    // default
    {
      path: "/:pathMatch(.*)*",
      redirect: () => ({ name: "home" }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/authenticate/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = storage.getItemFn({ key: "token" });

  if (authRequired) {
    if (loggedIn === undefined) {
      next("/authenticate/login");
    }
    try {
      const jsonDecoded: any = json(JSON.stringify(loggedIn));
      if (!jsonDecoded.id) throw new Error();
      next();
    } catch (error) {
      next("/authenticate/login");
    }
  } else {
    next();
  }
});

export default router;
