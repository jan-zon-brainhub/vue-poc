<script setup lang="ts">
import UnauthorizedOnly from '@/components/shared/auth/UnauthorizedOnly.vue'
import AuthorizedOnly from '@/components/shared/auth/AuthorizedOnly.vue'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
</script>

<template>
  <main>
    <h4>Welcome on MyRecipes XD</h4>
    <UnauthorizedOnly>
      <RouterLink to="/login">Login</RouterLink>
    </UnauthorizedOnly>
    <AuthorizedOnly>
      <RouterLink to="#" @click="authStore.logout()">Logout</RouterLink>
    </AuthorizedOnly>
  </main>
</template>

<style scoped></style>
