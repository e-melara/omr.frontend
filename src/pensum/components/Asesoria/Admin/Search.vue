<script setup lang="ts">
import { ref } from "vue-demi";

const emits = defineEmits(['search'])

const carnet = ref()
const onSubmitEvent = () => {
  emits('search',  { q: carnet.value })
};
</script>

<template>
  <div class="d-flex">
    <div class="col-9">
    </div>
    <div class="col-3">
      <form
        action="#"
        method="get"
        class="row g-3"
        @submit.prevent="onSubmitEvent"
      >
        <div class="col-12">
          <input
            type="text"
            class="form-control"
            id="inputPassword2"
            placeholder="Buscar"
            v-model="carnet"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
