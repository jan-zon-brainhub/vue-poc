<script setup lang="ts">
import RecipeForm from '@/components/recipe/RecipeForm.vue'
import { useAddRecipeMutation } from '@/components/mutations/recipe.ts'
import type { RecipeFormData } from '@/components/recipe/shared.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const addRecipeMutation = useAddRecipeMutation()

const onSubmit = async (value: RecipeFormData) => {
  const recipeId = await addRecipeMutation.addRecipe(value)
  void router.push(`/recipe/${recipeId}`)
  toastStore.addToast({
    type: 'success',
    text: 'Recipe added successfully',
  })
}
</script>

<template>
  <RecipeForm
    @submit="onSubmit"
    @cancel="router.back()"
    :saving="addRecipeMutation.loading.value"
  />
</template>

<style scoped></style>
