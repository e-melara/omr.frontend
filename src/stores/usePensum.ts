import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { groupBy, toPairs } from "lodash";

import type {
  Pensum,
  Subject,
  Enrolled,
  IMateria,
  PensumItem,
  PensumEnrolled,
  SubjectEnrolled,
} from "@/pensum/interfaces";
import { authApi } from "@/api/base";

import { useUtil } from "@/composables";

const getPaginationAxios = async (params = {}): Promise<Enrolled> => {
  // @ts-ignore
  return await authApi.get<any>("/materias", { params });
};

const getStudentMateria = async (id: any): Promise<any> => {
  // @ts-ignore
  return await authApi.get<any>(`/materias/${id}`);
};

const updateStatusEnrolled = async (id: number, params = {}) => {
  // @ts-ignore
  return await authApi.put(`/pensum/${id}`, params);
};

export const usePensumStore = defineStore("usePensumStore", () => {
  const util = useUtil();

  const total = ref<number>(0);
  const enrolleds = ref<any>();
  const perPage = ref<number>(0);
  const open = ref<boolean>(false)
  const studentList = ref<any>([])

  return {
    // state
    // getters
    open: computed(() => open.value),
    total: computed(() => total.value),
    perPage: computed(() => perPage.value),
    enrolleds: computed(() => enrolleds.value),
    studentList:computed(() => studentList.value),
    //  actions
    closeOpen() {
      open.value = false;
    },
    async getPagination(params = {}) {
      try {
        util.setLoading(true);
        const {
          data,
          total: $total,
          per_page: $perPage,
        }: any = await getPaginationAxios(params);
        enrolleds.value = data;
        total.value = $total;
        perPage.value = $perPage;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },
    async getStudent(id: any) {
      try {
        util.setLoading(true);
        const { data }: any = await getStudentMateria(id);
        open.value = true;
        studentList.value = data;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },
  };
});
