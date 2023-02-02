<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div v-if="studentEnrolled">
    <ListEnrolled :items="subjetsEnrolled" :status="status" />
  </div>
  <div class="row" v-else>
    <div class="col-12 col-md-4 col-lg-4">
      <AsesoriaList
        :subjects="subjects"
        @remove="handlerRemoveSubject"
        @send="sendAsesoriaFn"
      />
    </div>
    <div class="col-12 col-md-8 col-lg-8">
      <AsesoriaTable :asesorias="asesoria" @validar="validarAsignacion" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import AsesoriaList from "../components/Asesoria/List.vue";

// @ts-ignore
import ListEnrolled from "../components/Asesoria/ListEnrolled.vue";
// @ts-ignore
import AsesoriaTable from "../components/Asesoria/Table.vue";
import { usePensum } from "@/pensum/composables/usePensum";
import type { IHorarioAsesoria } from "../interfaces";

const pensum = usePensum();
const { validarSubjects, removeSubjects, sendAsesoria } = pensum;
const { asesoria, subjects, studentEnrolled, subjetsEnrolled, status } = toRefs(pensum);

const validarAsignacion = (args: any) => {
  validarSubjects(args.item, args.codmate, args.nommate);
};

const handlerRemoveSubject = (codmate: string) => {
  removeSubjects(codmate);
};
const sendAsesoriaFn = () => {
  sendAsesoria();
};
</script>

<style lang="scss" scoped></style>
