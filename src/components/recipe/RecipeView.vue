<script setup lang="ts">
import type { Recipe } from '@/shared/schemas/recipe.ts'
import RecipeFullCard from '@/components/recipe/RecipeFullCard.vue'
import RecipeList from '@/components/recipe/RecipeList.vue'

defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <div class="d-flex ga-12 ma-auto" :style="{ maxWidth: '1200px' }">
    <div class="flex-grow-1">
      <RecipeFullCard :recipe="recipe" />
    </div>
    <div :style="{ width: '300px' }">
      <RecipeList :limit="5" />
    </div>
  </div>
</template>

<style scoped>
.title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
