<script setup lang="ts">
import { useToastsStore } from '@/stores/toasts.ts'

const toastStore = useToastsStore()
</script>

<template>
  <v-snackbar-queue v-model="toastStore.toasts">
    <template #actions="{ props }">
      <v-btn color="pink" variant="text" @click="props.onClick()"> Close </v-btn>
    </template>
  </v-snackbar-queue>
</template>
