<script setup lang="ts">
import { onMounted, reactive, ref, toValue } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { BadRequestError, HttpError } from '@/shared/request-utils.ts'
import type { SubmitEventPromise } from 'vuetify'
import { email, required } from '@/shared/form-validation/validators.ts'
import { useRouter } from 'vue-router'
import { useToastsStore } from '@/stores/toasts.ts'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastsStore()

onMounted(() => {
  if (authStore.user) {
    void router.push('/')
  }
})

const credentials = reactive({
  email: '',
  password: '',
})

const validationRules = {
  email: [required(), email()],
  password: [required()],
}

const errorMessage = ref('')
const loggingIn = ref(false)

const submit = async (validation: SubmitEventPromise) => {
  if (!(await validation).valid) {
    return
  }
  errorMessage.value = ''
  loggingIn.value = true
  try {
    await authStore.login(toValue(credentials))
    void router.push(authStore.returnUrl || '/')
    toastStore.addToast({
      text: 'Login successful',
      type: 'success',
    })
  } catch (error) {
    if (error instanceof BadRequestError) {
      errorMessage.value = 'Invalid email or password'
    }
    throw error
  } finally {
    loggingIn.value = false
  }
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-card class="mx-auto" width="400">
      <v-card-title class="font-weight-black"> Login </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="credentials.email"
          :rules="validationRules.email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :rules="validationRules.password"
          label="Password"
          type="password"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="mb-5 flex-column">
        <v-btn
          type="submit"
          class="align-self-center"
          variant="elevated"
          width="180"
          color="primary"
          >Login</v-btn
        >
        <v-alert
          variant="outlined"
          v-if="errorMessage"
          class="text-center mt-5"
          :style="{ gridTemplateAreas: 'none' }"
          type="error"
          outlined
          >{{ errorMessage }}</v-alert
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style scoped></style>
