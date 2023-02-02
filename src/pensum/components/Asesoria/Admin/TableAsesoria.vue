<template>
  <b-table
    :fields="headers"
    class="b-table asesoria"
    bordered
    :items="enrolled.cargas"
    caption-top
  >
    <template #table-caption>
      <div class="d-flex">
        <div class="flex-shrink-0">
          <img :src="imgProfile" width="80" alt="image profile" />
        </div>
        <div class="flex-grow-1 ms-3">
          <h4>{{ student.nombres }} {{ student.apellidos }}</h4>
          <p>
            Carnet: {{ student.carnet }} <br />
            Plan: {{ student.plan }}
          </p>
          <strong>Materias solicitadas</strong>
        </div>
      </div>
    </template>
  </b-table>
  <div class="row my-3">
    <div class="col-12 d-flex justify-content-between">
      <b-button variant="primary" @click="() => clickBtns('V')"
        >Validar</b-button
      >
      <b-button variant="danger" @click="() => clickBtns('D')"
        >Denegar</b-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import imgProfile from "@/assets/images/profile.png";
import { toRefs } from "vue";
import type { Student, SubjectEnrolled } from "@/pensum/interfaces";

interface Props {
  student: Student;
  enrolled: SubjectEnrolled;
}

const headers = [
  { key: "codmate", align: "center", label: "Codigo", sortable: false },
  { key: "nommate", label: "Nombre de la materia", sortable: false },
];

const props = defineProps<Props>();
const { student, enrolled } = toRefs(props);

const emits = defineEmits(["validar"]);

const clickBtns = (status: string) => {
  emits("validar", { estado: status, id: +enrolled.value.id });
};
</script>

<style scoped></style>
