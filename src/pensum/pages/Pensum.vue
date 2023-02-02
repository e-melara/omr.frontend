<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
import { useEstudiante } from "../../stores/useEstudiante";

const store = useEstudiante();
const fields = ref(['codigo',  'nombre'])
const { getData } = storeToRefs(store);

onMounted(() => {
  store.getListadoMaterias();
});
</script>

<template>
  <div>
    <BreadCumbs title="Materias" :button="true" />
    <div class="card">
      <div class="card-header">
        <div>
          <div class="header-top" style="flex-direction: column; align-items: start">
            <h5 class="m-0 d-display">
              Estudiante: {{ getData?.nombres  }} {{ getData?.apellidos  }}
            </h5>
            <h6>Documento {{ getData?.documento }}</h6>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <b-table striped hover  bordered small :items="getData?.materias" :fields="fields"></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
