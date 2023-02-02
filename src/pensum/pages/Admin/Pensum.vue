<script setup lang="ts">
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import Search from "../../components/Asesoria/Admin/Search.vue";

import { storeToRefs } from "pinia";
import type { BvEvent } from "bootstrap-vue-3";
import { computed, onBeforeMount, ref, watch } from "vue";

// @ts-ignore
import { usePensumStore } from "@/stores/usePensum";

const pensum = usePensumStore();

const modalRefs = ref(null);
const currentPage = ref<number>(1);
const { enrolleds, total, perPage,  open,  studentList } = storeToRefs(pensum);

const headers = [
  { key: "codigo", label: "Codigo", sortable: false },
  { key: "nombre", label: "Nombres", sortable: false },
  { key: "actions", label: "" },
];

const headersStudent = [
  { key: "documento", label: "Documento", sortable: false },
  { key: "nombres", label: "Nombres", sortable: false },
  { key: "apellidos", label: "Apellidos", sortable: false },
];

interface Props {
  estado?: string;
  paginate?: number;
  per_page?: number;
}

const paginateFn = (params: Props) => {
  const values = {
    page: params.paginate || 1,
    per_page: params.per_page || 3,
  };
  pensum.getPagination(values);
};

const changePage = (event: BvEvent, page: number) => {
  paginateFn({ paginate: page });
};

const onOpen = ({ id }:any) => {
  pensum.getStudent(id)
}

const closeOpen = () => {
  pensum.closeOpen()
}

onBeforeMount(() => {
  paginateFn({});
});
</script>

<template>
  <div>
    <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
    <div class="file-content">
      <div class="card">
        <!-- <div class="card-header">
          <Search />
        </div> -->
        <b-table
          :items="enrolleds"
          :fields="headers"
          striped
          bordered
          :per-page="perPage"
          class="b-table asesoria"
        >
          <template #cell(actions)="row">
            <b-button variant="success" @click="onOpen(row.item)" size="sm" class="mr-1"> Ver </b-button>
          </template>
          <template #table-caption>
            <b-pagination
              align="center"
              @page-click="changePage"
              v-model="currentPage"
              :total-rows="total"
              :per-page="perPage"
              aria-controls="my-table"
            />
          </template>
        </b-table>
      </div>
    </div>
    <b-modal
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      size="xll"
      v-model="open"
      scrollable
      @close="closeOpen"
      title="Estudiante por materia"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h3>Materia: {{  studentList.nombre  }}</h3>
            <h5>{{ studentList.codigo }}</h5>
          </div>
        </div>
        <div class="row">
          <b-table
          caption="Listado de estudiantes"
          :items="studentList.personas"
          :fields="headersStudent"
          striped
          bordered
          class="b-table asesoria"
        >
        </b-table>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<style>
.modal-dialog.modal-xll {
  max-width: 95%;
}
</style>
