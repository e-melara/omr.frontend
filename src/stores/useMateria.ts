import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useUtilsStore } from "./";
import { authApi } from '../api/base';

const getListadoMateriasAdministrador = async () => {
  return await authApi.get(`materias`)
}

export const useMateria = defineStore("useMateria", () => {
  const util = useUtilsStore();
  const materias = ref<any>()

  return {
    // state
    // getters
    getData: computed(() => materias.value),
    //  actions
    async getListadoMaterias() {
      util.setLoading(true)
      try {
        const {data} = await getListadoMateriasAdministrador();
        console.log(data)
        materias.value = data;
      } catch (error) {
        console.log(error)  
      }  finally {
        util.setLoading(false);
      }
    }
  };
});
