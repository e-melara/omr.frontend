import { computed, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { authApi } from '../api/base';
import { useAuthStore, useUtilsStore } from "./";
import { useLocalStorage } from "@/composables";

const getListadoMateriasEstudiante = async (documento: string) => {
  return await authApi.get(`estudiante/${documento}`)
}

export const useEstudiante = defineStore("useEstudiante", () => {
  const util = useUtilsStore();
  const localStorages = useLocalStorage();

  const estudiante = ref<any>()

  return {
    // state
    // getters
    getData: computed(() => estudiante.value),
    //  actions
    async getListadoMaterias() {
      util.setLoading(true)
      try {
        const {username} = localStorages.getItemFn({ key: 'persona' })
        const data: any = await getListadoMateriasEstudiante(username);
        estudiante.value = data.estudiante;
      } catch (error) {
        
      }  finally {
        util.setLoading(false);
      }
    }
  };
});
