import { computed, ref } from 'vue'
import { API_ENDPOINTS } from '@/shared/endpoints.ts'
import { assertResponseOk, UnauthorizedError } from '@/shared/request-utils.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { z } from 'zod'
import type { RecipeFormData } from '@/components/recipe/shared.ts'

export const useAddRecipeMutation = () => {
  const authStore = useAuthStore()
  const loading = ref(false)

  const addRecipe = async (recipe: RecipeFormData) => {
    loading.value = true

    try {
      const response = await fetch(API_ENDPOINTS.RECIPES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: recipe.title,
          description: recipe.description,
          imageUrl: recipe.imageUrl,
          userId: authStore.user?.user.id,
        }),
      })

      const { id: recipeId } = z
        .object({
          id: z.number(),
        })
        .parse(await response.json())

      await Promise.all([
        ...(recipe.steps?.map(async (step, stepIndex) => {
          return fetch(API_ENDPOINTS.RECIPE_STEPS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              stepNumber: stepIndex,
              stepDescription: step.stepDescription,
              recipeId,
            }),
          }).then(assertResponseOk)
        }) ?? []),
        ...(recipe.ingredients?.map(async (ingredient) => {
          return fetch(API_ENDPOINTS.RECIPE_INGREDIENTS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: ingredient.name,
              quantity: ingredient.quantity,
              measure: ingredient.measure,
              recipeId,
            }),
          }).then(assertResponseOk)
        }) ?? []),
      ])

      return recipeId
    } catch (error) {
      console.log(error)
      if (error instanceof UnauthorizedError) {
        authStore.logout()
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    addRecipe,
  }
}

export const useDeleteRecipeMutation = () => {
  const authStore = useAuthStore()
  const loading = ref(false)

  const deleteRecipe = async (recipeId: number) => {
    loading.value = true
    try {
      const response = await fetch(API_ENDPOINTS.RECIPE.replace(':id', recipeId.toString()), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      assertResponseOk(response)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        authStore.logout()
      }
    }
  }

  return {
    deleteRecipe,
    loading,
  }
}

export const useEditRecipeMutation = () => {
  const authStore = useAuthStore()
  const deleteRecipeMutation = useDeleteRecipeMutation()
  const addRecipeMutation = useAddRecipeMutation()

  const loading = ref(false)

  const editRecipe = async (recipe: RecipeFormData) => {
    if (!recipe.id) {
      throw new Error('Recipe ID is required')
    }
    loading.value = true
    try {
      await deleteRecipeMutation.deleteRecipe(recipe.id)
      return await addRecipeMutation.addRecipe(recipe)
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        authStore.logout()
      }
    } finally {
      loading.value = false
    }
  }

  return {
    editRecipe,
    loading: computed(
      () => deleteRecipeMutation.loading.value || addRecipeMutation.loading.value || loading.value,
    ),
  }
}
