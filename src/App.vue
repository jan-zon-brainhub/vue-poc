<script setup lang="ts">
import { RouterView } from 'vue-router'
import SnackbarQueue from '@/components/SnackbarQueue.vue'
</script>

<template>
  <v-app class="v-application">
    <v-main>
      <v-container fluid> <RouterView /> </v-container>
    </v-main>
    <SnackbarQueue />
  </v-app>
</template>

<style scoped>
.v-application {
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
}
</style>
