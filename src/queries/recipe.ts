import { useFetchData } from '@/queries/useFetchData.ts'
import { API_ENDPOINTS } from '@/shared/endpoints.ts'
import { z } from 'zod'
import { recipeSchema } from '@/shared/schemas/recipe.ts'
import { buildUrl } from '@/components/shared/url-builder.ts'

export const useRecipesQuery = ({ limit = 10 } = {}) => {
  const urlBuilder = buildUrl(API_ENDPOINTS.RECIPES)
  if (limit) {
    urlBuilder.addQueryParams({ _limit: limit })
  }
  return useFetchData(API_ENDPOINTS.RECIPES, {
    schema: z.array(
      recipeSchema.omit({
        ingredients: true,
        steps: true,
      }),
    ),
  })
}
export const useRecipe = (id: string) =>
  useFetchData(API_ENDPOINTS.RECIPE.replace(':id', id), {
    schema: recipeSchema,
  })
