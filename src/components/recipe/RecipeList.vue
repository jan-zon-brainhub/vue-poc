<script setup lang="ts">
import { useRecipesQuery } from '@/queries/recipe.ts'

const { limit } = defineProps<{
  limit: number
}>()

const { data } = useRecipesQuery({
  limit,
})
</script>

<template>
  <v-sheet class="pa-4" rounded>
    <h4 class="text-h6">Latest recipes</h4>
    <v-list>
      <v-list-item v-for="recipe in data" :key="recipe.id">
        <v-list-item-title>
          <router-link :to="`/recipe/${recipe.id}`" class="text-body-1 text-decoration-none">
            {{ recipe.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<style scoped></style>
