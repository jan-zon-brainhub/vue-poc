<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
</script>

<template>
  <slot v-if="authStore.user" />
</template>
