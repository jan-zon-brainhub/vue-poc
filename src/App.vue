<script setup lang="ts">
import { RouterView } from 'vue-router'
import SnackbarQueue from '@/components/SnackbarQueue.vue'
</script>

<template>
  <v-app class="v-application">
    <RouterView />
    <SnackbarQueue />
  </v-app>
</template>

<style scoped>
body {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
.v-application {
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
</style>
