<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import {
  useFavoriteMutation,
  useFavouritesCount,
  useIsLikeByCurrentUser,
} from '@/queries/favourites.ts'

const { recipeId } = defineProps<{
  recipeId: number
}>()

const authStore = useAuthStore()

const { count, fetchData: fetchFavouritesCount } = useFavouritesCount({
  recipeId,
})

const {
  isLiked,
  likeId,
  fetchData: fetchIsLikeByCurrentUser,
} = useIsLikeByCurrentUser({
  recipeId,
})
const { like: triggerLike, dislike: triggerDislike } = useFavoriteMutation({
  recipeId,
})

const iconProps = computed(() => {
  if (isLiked) {
    return {
      icon: 'mdi-heart',
      color: 'red',
    }
  }
  return {
    icon: 'mdi-heart-outline',
    color: authStore.user?.user ? 'red' : 'tertiary',
  }
})

const toggleLike = async () => {
  if (isLiked.value) {
    await triggerDislike(likeId.value)
  } else {
    await triggerLike()
  }
  void fetchFavouritesCount()
  void fetchIsLikeByCurrentUser()
}
</script>

<template>
  <v-btn variant="plain" @click="toggleLike" icon :disabled="!authStore.user">
    <v-icon v-bind="iconProps" size="large" />
    {{ count }}
  </v-btn>
</template>

<style scoped></style>
