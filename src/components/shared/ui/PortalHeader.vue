<script setup lang="ts">
import UnauthorizedOnly from '@/components/shared/auth/UnauthorizedOnly.vue'
import AuthorizedOnly from '@/components/shared/auth/AuthorizedOnly.vue'
import { useAuthStore } from '@/stores/auth.ts'

const authStore = useAuthStore()
</script>

<template>
  <v-toolbar color="rgba(255,255,255,0.6 )" class="px-4 mb-5" rounded>
    <template #title>
      <router-link to="/" class="text-decoration-none">
        <h4 class="text-h6 text-decoration-none text-black">MyRecipes</h4>
      </router-link>
    </template>
    <div class="d-flex ga-4">
      <AuthorizedOnly>
        <router-link to="/add-recipe">
          <v-btn variant="flat" class="text-decoration-none" color="success"> Add recipe </v-btn>
        </router-link>
      </AuthorizedOnly>
      <AuthorizedOnly>
        <router-link to="#" @click="authStore.logout()">
          <v-btn variant="outlined" class="text-decoration-none" color="black"> Logout </v-btn>
        </router-link>
      </AuthorizedOnly>
      <UnauthorizedOnly>
        <router-link to="/login">
          <v-btn variant="outlined" color="grey-darken-2" class="text-decoration-none">
            Login
          </v-btn>
        </router-link>
      </UnauthorizedOnly>
    </div>
  </v-toolbar>
</template>

<style scoped></style>
