<script setup lang="ts">
import { RouterLink } from "vue-router";
import LogoLight from "@/assets/images/logo/logo.png";
</script>

<template>
  <RouterLink to="/">
    <img
      style="width: 40px"
      :src="LogoLight"
      class="img-fluid for-light"
      alt="image ligth"
    />
    <img
      style="width: 40px"
      :src="LogoLight"
      class="img-fluid for-dark"
      alt="image ligth"
    />
  </RouterLink>
</template>

<style lang="scss" scoped></style>
