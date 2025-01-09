<script setup lang="ts">
import PortalHeader from '@/components/shared/ui/PortalHeader.vue'
import { useRecipesQuery } from '@/queries/recipe.ts'
import RecipeCard from '@/components/recipe/RecipeCard.vue'

const { data: recipes } = useRecipesQuery({
  limit: 20,
})
</script>

<template>
  <main>
    <PortalHeader />
    <div>
      <v-row class="pt-5">
        <v-col v-for="recipe in recipes" :key="recipe.id" :lg="3" :md="4" :sm="6">
          <RecipeCard :recipe="recipe" />
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<style scoped></style>
