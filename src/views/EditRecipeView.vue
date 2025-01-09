<script setup lang="ts">
import RecipeForm from '@/components/recipe/RecipeForm.vue'
import { useRecipe } from '@/queries/recipe.ts'
import { useRoute, useRouter } from 'vue-router'
import type { RecipeFormData } from '@/components/recipe/shared.ts'
import { useEditRecipeMutation } from '@/components/mutations/recipe.ts'
import { useToastsStore } from '@/stores/toasts.ts'

const toastStore = useToastsStore()

const route = useRoute()
const router = useRouter()
const recipeApi = useRecipe(route.params.id as string)
const editRecipeMutation = useEditRecipeMutation()

const onSubmit = async (value: RecipeFormData) => {
  const recipeId = await editRecipeMutation.editRecipe(value)
  void router.push(`/recipe/${recipeId}`)
  toastStore.addToast({
    type: 'success',
    text: 'Recipe updated successfully',
  })
}
</script>

<template>
  <RecipeForm
    :initial-value="recipeApi.data.value"
    :loading="recipeApi.loading.value"
    :saving="editRecipeMutation.loading.value"
    @submit="onSubmit"
    @cancel="router.push(`/recipe/${recipeApi.data.value.id}`)"
  />
</template>

<style scoped></style>
