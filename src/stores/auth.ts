import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '@/shared/endpoints.ts'
import { assertResponseOk } from '@/shared/request-utils.ts'
import { type AuthResponse, authResponseSchema } from '@/shared/schemas/auth.ts'
import { useToastsStore } from '@/stores/toasts.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getFromLocalStorage('user') as AuthResponse | null,
    returnUrl: null as string | null,
  }),
  actions: {
    async login({ email, password }: Credentials) {
      const response = await fetch(API_ENDPOINTS.SIGN_IN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      assertResponseOk(response)
      this.user = authResponseSchema.parse(await response.json())
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    setReturnUrl(url: string) {
      this.returnUrl = url
    },
    logout() {
      const toastStore = useToastsStore()

      this.user = null
      localStorage.removeItem('user')
      this.$router.push('/')
      toastStore.addToast({
        text: 'Logged out',
        type: 'success',
      })
    },
  },
})

export type Credentials = {
  email: string
  password: string
}

const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}
