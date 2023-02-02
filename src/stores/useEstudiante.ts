import { computed, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { authApi } from '../api/base';
import { useAuthStore, useUtilsStore } from "./";
import { useLocalStorage } from "@/composables";

const getListadoMateriasEstudiante = async (documento: string) => {
  return await authApi.get(`estudiante/${documento}`)
}

const getListadoEstudiantesAxios = async () => {
  return await authApi.get(`estudiante`)
}

const searchEstudiante = async (q: string) => {
  return await authApi.get(`materias/search?q=${q}`)
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
    },
    async getListadoEstudiantes() {
      util.setLoading(true)
      try {
        const data: any = await getListadoEstudiantesAxios();
        estudiante.value = data.estudiante
      } catch (error) {
        
      }  finally {
        util.setLoading(false);
      }
    },
    async searchEstudiantes(q: string) {
      util.setLoading(true)
      try {
        const { data }: any = await searchEstudiante(q);
        estudiante.value = data
      } catch (error) {
        
      }  finally {
        util.setLoading(false);
      }
    }
  };
});
