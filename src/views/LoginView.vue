<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="login-container">
    <LoginForm />
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
