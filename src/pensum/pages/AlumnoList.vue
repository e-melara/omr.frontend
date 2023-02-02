<template>
  <div>
    <BreadCumbs title="Estudiantes" :button="true" />
    <div class="file-content">
      <div class="card">
        <div class="card-header">
          <Search @search="searchStudent" />
        </div>
        <b-table
          striped
          bordered
          :fields="headers"
          :items="getData"
          class="b-table asesoria"
        >
          <template #table-caption>
            <!-- <b-pagination
              align="center"
              @page-click="changePage"
              v-model="currentPage"
              :total-rows="total"
              :per-page="perPage"
              aria-controls="my-table"
            /> -->
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import Search from '../components/Asesoria/Admin/Search.vue'

import { storeToRefs } from "pinia";
import { onMounted } from "vue-demi";

import { useEstudiante } from "../../stores/useEstudiante";

const store = useEstudiante()
const { getData } = storeToRefs(store)

const headers = [
  { key: "nombres", label: "Nombres", sortable: false },
  { key: "apellidos", label: "Apellidos", sortable: false },
  { key: "documento", label: "Documento", sortable: false },
];

const searchStudent = ({  q }: any) => {
  if(q) {
    store.searchEstudiantes(q);
  } else {
    store.getListadoEstudiantes()
  }
}

onMounted(() => {
  store.getListadoEstudiantes()
})

</script>
