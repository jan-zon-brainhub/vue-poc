<script setup lang="ts">
import type { Recipe } from '@/shared/schemas/recipe.ts'

defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <v-card @click="$router.push(`/recipe/${recipe.id}`)">
    <v-img class="recipe-img align-end" :src="recipe.imageUrl" max-height="250" cover sizes="200">
      <v-card-title class="title">
        <h2 class="text-h6">{{ recipe.title }}</h2>
      </v-card-title>
    </v-img>
    <v-card-text class="d-flex flex-column ga-4">
      <span class="text-body-1">
        {{ recipe.description }}
      </span>
    </v-card-text>
  </v-card>
</template>

<style>
.recipe-img img {
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.2);
  }
}
</style>

<style scoped>
.title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
