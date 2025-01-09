import type { Ingredient, RecipeStep } from '@/shared/schemas/recipe.ts'

export type RecipeFormData = {
  id?: number
  title: string
  description: string
  ingredients: Ingredient[]
  steps: Pick<RecipeStep, 'stepDescription'>[]
  imageUrl: string
}
