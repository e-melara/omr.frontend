import { computed, ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";

import jsonDataMenu from "@/api/menu.json";
import type { INotify, IMenu, ISideBarMenu } from "@/interfaces";
import { useAuthStore } from "./authStore";

export const useUtilsStore = defineStore("useUtilsStore", () => {
  const storeAuth = useAuthStore();
  const { configuration } = storeToRefs(storeAuth);
  const notify = ref<INotify>({});
  const loading = ref<boolean>(false);
  const toggleSideBar = ref<boolean>(true);
  const activeOverrlay = ref<boolean>(true);
  const menuItems = ref<ISideBarMenu[]>([]);

  const menu = ref<IMenu>({
    width: 0,
    menuWidth: 0,
    hideLeftArrow: false,
    hideRightArrow: false,
  });

  return {
    // state
    loading,
    notify,
    activeOverrlay,
    toggleSideBar,
    //menuItems,
    menu,
    // getters
    menuItems: computed(() => {
      const { modulos } = configuration.value;
      const namesArray = modulos.map((modulo) => modulo.short_name);
      return jsonDataMenu.data.filter(({ shortName }) => {
        if (shortName) {
          return namesArray.includes(shortName);
        }
      });
    }),
    //  actions
    setLoading(value: boolean) {
      loading.value = value;
    },
    showAlert(inotify: INotify) {
      notify.value = inotify;
    },
    openSideBar() {
      toggleSideBar.value = !toggleSideBar.value;
      if (window.innerWidth < 991) {
        activeOverrlay.value = true;
      } else {
        activeOverrlay.value = false;
      }
    },
    setNavActive(item: ISideBarMenu) {
      if (!item.active) {
        menuItems.value.forEach((menu) => {
          if (menuItems.value.includes(item)) {
            menu.active = false;
          }
          if (!menu.children) {
            return false;
          }
          menu.children.forEach((sub) => {
            if (menu.children?.includes(sub)) {
              sub.active = false;
            }
          });
        });
      }
      item.active = !item.active;
    },
  };
});
