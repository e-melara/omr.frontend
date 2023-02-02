import { storeToRefs } from "pinia";

import { useUtilsStore } from "@/stores";
import type { INotify, ISideBarMenu } from "@/interfaces";

export const useUtil = () => {
  const store = useUtilsStore();
  const { loading, notify, menuItems, activeOverrlay, toggleSideBar, menu } =
    storeToRefs(store);

  return {
    // state
    loading,
    notify,
    menu,
    menuItems,
    activeOverrlay,
    toggleSideBar,
    // getters

    // actions
    setLoading(value: boolean) {
      store.setLoading(value);
    },
    showAlert(notify: INotify) {
      store.showAlert(notify);
    },
    // menu
    setMenu(item: ISideBarMenu) {
      store.setNavActive(item);
    },
    openSideBar() {
      store.openSideBar();
    },
  };
};
