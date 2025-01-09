import { useFetchData } from '@/queries/useFetchData.ts'
import { buildUrl } from '@/components/shared/url-builder.ts'
import { API_ENDPOINTS } from '@/shared/endpoints.ts'
import { z } from 'zod'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

export const useFavouritesCount = ({ recipeId }: { recipeId: number }) => {
  const url = buildUrl(API_ENDPOINTS.FAVORITES)
    .addQueryParams({
      recipeId,
      _limit: 0,
    })
    .toString()

  const { headers, fetchData } = useFetchData(url, {
    schema: z.any(),
  })

  const count = computed(() => headers.value?.get('x-total-count') ?? 0)

  return {
    count,
    fetchData,
  }
}

export const useIsLikeByCurrentUser = ({ recipeId }: { recipeId: number }) => {
  const authStore = useAuthStore()
  const url = buildUrl(API_ENDPOINTS.FAVORITES)
    .addQueryParams({
      recipeId,
      userId: authStore.user?.user.id,
      _limit: 1,
    })
    .toString()

  const { data, fetchData } = useFetchData(url, {
    schema: z.array(z.any()),
  })

  return {
    isLiked: computed(() => data.value?.length > 0),
    likeId: computed(() => data.value?.[0]?.id),
    fetchData,
  }
}

export const useFavoriteMutation = ({ recipeId }: { recipeId: number }) => {
  const authStore = useAuthStore()

  const { fetchData } = useFetchData('', {
    schema: z.any(),
    method: 'POST',
    mutation: true,
  })

  const like = async () => {
    await fetchData({
      method: 'POST',
      url: API_ENDPOINTS.FAVORITES,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authStore.user?.user.id,
        recipeId,
      }),
    })
  }

  const dislike = async (favoriteId: number) => {
    await fetchData({
      method: 'DELETE',
      url: buildUrl(API_ENDPOINTS.FAVORITES).addPath(favoriteId).toString(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authStore.user?.user.id,
      }),
    })
  }

  return {
    like,
    dislike,
  }
}
