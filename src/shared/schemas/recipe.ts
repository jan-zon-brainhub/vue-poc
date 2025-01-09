import { z } from 'zod'

export const MEASURE_UNITS = ['', 'grams', 'teaspoon', 'tablespoon', 'item'] as const

export const measuresSchema = z.enum(MEASURE_UNITS)
export type Measure = z.infer<typeof measuresSchema>

const idSchema = z.union([z.number(), z.string()]).transform((v) => Number(v))

export const ingredientSchema = z.object({
  id: idSchema,
  name: z.string(),
  quantity: z.number(),
  measure: measuresSchema,
  recipeId: idSchema,
})

export type Ingredient = z.infer<typeof ingredientSchema>

export const recipeStep = z.object({
  stepNumber: z.number(),
  stepDescription: z.string(),
  recipeId: idSchema,
})

export type RecipeStep = z.infer<typeof recipeStep>

export const recipeSchema = z.object({
  id: idSchema,
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  userId: idSchema,
  steps: z.array(recipeStep),
  ingredients: z.array(ingredientSchema),
})

export type Recipe = z.infer<typeof recipeSchema>
