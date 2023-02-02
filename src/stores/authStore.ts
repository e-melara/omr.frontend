import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { IUser, IRoles } from "@/interfaces";

export const useAuthStore = defineStore("useAuthStore", () => {
  const token = ref<string>();
  const configuration = ref<IRoles>({ modulos: [], perfil: '', roles: [] });
  const persona = ref<IUser | undefined>(undefined);
  const isAuthenticated = ref<boolean>(false);

  return {
    // state
    token,
    persona,
    isAuthenticated,
    configuration,
    // getters
    //  actions
    setDataUserLogin(_token: string, IPersona: IUser, IRols: IRoles) {
      token.value = _token;
      persona.value = IPersona;
      configuration.value = IRols;
      isAuthenticated.value = true;
    },
    getLogout() {
      token.value = undefined;
      persona.value = undefined;
      isAuthenticated.value = false;
    },
  };
});
