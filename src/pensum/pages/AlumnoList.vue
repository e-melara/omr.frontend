<template>
  <div>
    <BreadCumbs title="Estudiantes" :button="true" />
    <div class="file-content">
      <div class="card">
        <div class="card-header">
          <Search @search="searchStudent" @add-student="agregarEstudiante" />
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
      <b-modal
        hide-footer
        no-close-on-esc
        no-close-on-backdrop
        size="xll"
        scrollable
        v-model="open"
        title="Crear estudiante"
      >
        <div class="container-fluid">
          <div class="row">
            <form @submit="submit" autocomplete="off" class="theme-form">
              <div class="form-group mb-2">
                <label for="password" class="col-form-label"> Nombres </label>
                <Field name="nombres" v-slot="{ meta, field }" type="text">
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control"
                    placeholder="Nombres"
                    :class="{
                      'is-valid': meta.valid && meta.touched,
                      'is-invalid in-valid': !meta.valid && meta.touched,
                    }"
                  />
                </Field>
                <ErrorMessage name="nombres" class="invalid-feedback" />
              </div>
              <div class="form-group mb-2">
                <label for="password" class="col-form-label"> Apellidos </label>
                <Field name="apellidos" v-slot="{ meta, field }" type="text">
                  <input
                    v-bind="field"
                    type="text"
                    class="form-control"
                    placeholder="Apellidos"
                    :class="{
                      'is-valid': meta.valid && meta.touched,
                      'is-invalid in-valid': !meta.valid && meta.touched,
                    }"
                  />
                </Field>
                <ErrorMessage name="apellidos" class="invalid-feedback" />
              </div>
              <hr />
              <div class="form-group mb-2">
                <label for="password" class="col-form-label">
                  Contraseña
                </label>
                <Field name="password" v-slot="{ meta, field }">
                  <input
                    v-bind="field"
                    type="password"
                    :class="{
                      'is-valid': meta.valid && meta.touched,
                      'is-invalid in-valid': !meta.valid && meta.touched,
                    }"
                    class="form-control"
                    placeholder="*********"
                  />
                </Field>
                <ErrorMessage name="password" class="invalid-feedback" />
              </div>
              <div class="form-group mb-0 mt-4">
                <button
                  class="btn btn-primary active"
                  :disabled="!meta.valid"
                  type="submit"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import Search from "../components/Asesoria/Admin/Search.vue";

import * as zod from "zod";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useForm, Field, ErrorMessage } from "vee-validate";

import { useEstudiante } from "../../stores/useEstudiante";
import { toFormValidator } from "@vee-validate/zod";

const store = useEstudiante();
const { getData } = storeToRefs(store);

const open = ref<boolean>(false);

const headers = [
  { key: "nombres", label: "Nombres", sortable: false },
  { key: "apellidos", label: "Apellidos", sortable: false },
  { key: "documento", label: "Documento", sortable: false },
];

const searchStudent = ({ q }: any) => {
  if (q) {
    store.searchEstudiantes(q);
  } else {
    store.getListadoEstudiantes();
  }
};

const agregarEstudiante = () => {
  open.value = true;
};

const validationSchema = toFormValidator(
  zod.object({
    nombres: zod
      .string({
        required_error: "El campo nombres es requerido",
      })
      .min(3, "El  minimo debe ser de 3  caracteres"),
    apellidos: zod
      .string({
        required_error: "El campo apellidos es requerido",
      })
      .min(3, "El  minimo debe ser de 3  caracteres"),
    password: zod
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(6, "El minimo debe ser de 6 caracteres"),
  })
);

const { meta, handleSubmit } = useForm({
  validationSchema,
});

const submit = handleSubmit(async (values) => {
  const numeroAleatorio = Math.round(Math.random() * 100);
  const arrayApellidos = values.apellidos.toUpperCase().replace(/\s/, "").split("")
  const documento = `${arrayApellidos[0]}${
    arrayApellidos[1]
  }${numeroAleatorio}${new Date().getFullYear()}`;

  const params: any = {
    documento,
    password: values.password,
    nombres: values.nombres,
    apellidos: values.apellidos,
    type: "STUDENT",
  };
  store.crearUsuario(params).then( async () => {
    await store.getListadoEstudiantes();
    open.value = false;
  })
});

onMounted(() => {
  store.getListadoEstudiantes();
});
</script>
