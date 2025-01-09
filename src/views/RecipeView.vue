<script setup lang="ts">
import { useRecipe } from '@/queries/recipe.ts'
import { useRoute } from 'vue-router'
import RecipeView from '@/components/recipe/RecipeView.vue'
import PortalHeader from '@/components/shared/ui/PortalHeader.vue'

const route = useRoute()

const { data, loading } = useRecipe(route.params.id as string)
</script>

<template>
  <PortalHeader />
  <div v-if="loading || !data">Loading...</div>
  <div v-else-if="data">
    <RecipeView :recipe="data" />
  </div>
</template>

<style scoped></style>
