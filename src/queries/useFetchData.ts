import { z } from 'zod'
import { ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { assertResponseOk, UnauthorizedError } from '@/shared/request-utils.ts'

type UseFetchDataOptions<T extends z.ZodSchema> = {
  schema: z.ZodSchema
  mutation?: boolean
  customFetch?: () => Promise<T>
}

export const useFetchData = <T extends z.ZodSchema>(
  url: string,
  options: RequestInit & UseFetchDataOptions<T>,
) => {
  const authStore = useAuthStore()

  const data = ref<T | undefined>()
  const responseHeaders = ref<Headers | undefined>()
  const loading = ref(false)
  const fetchingError = ref<Error | unknown>(undefined)

  const fetchData = async (optionsOverride?: RequestInit & { url?: string }) => {
    loading.value = true
    try {
      const response = await fetch(optionsOverride?.url ?? url, { ...options, ...optionsOverride })
      assertResponseOk(response)
      const json = await response.json()
      data.value = options?.schema.parse(json)
      responseHeaders.value = response.headers
      fetchingError.value = undefined
    } catch (error) {
      console.error(error)
      fetchingError.value = error
      if (error instanceof UnauthorizedError) {
        authStore.logout()
        return
      }
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!options.mutation) {
      void fetchData()
    }
  })

  return {
    data,
    headers: responseHeaders,
    loading,
    error: fetchingError,
    fetchData,
  }
}
