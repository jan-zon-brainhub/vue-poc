<script setup lang="ts">
import { reactive, toValue, watchEffect } from 'vue'
import { minLength, required } from '@/shared/form-validation/validators.ts'
import IngredientList from './IngredientList.vue'
import UploadImage from './UploadImage.vue'
import type { Recipe } from '@/shared/schemas/recipe.ts'
import StepsList from '@/components/recipe/StepsList.vue'
import LoadingOverlay from '@/components/shared/ui/LoadingOverlay.vue'
import type { RecipeFormData } from '@/components/recipe/shared.ts'

const { initialValue, loading } = defineProps<{
  initialValue?: Recipe
  mode?: 'edit' | 'create'
  saving?: boolean
  loading?: boolean
}>()

defineEmits<{
  (eventName: 'submit', submittedRecipe: typeof recipe, event: Event): void
  (eventName: 'cancel'): void
}>()

const recipe = reactive<RecipeFormData>({
  title: '',
  description: '',
  ingredients: [],
  steps: [],
  imageUrl: '',
})

const validationRules = {
  name: [required(), minLength(5)],
  description: [required(), minLength(10)],
}

watchEffect(() => {
  if (!initialValue) return
  recipe.id = initialValue.id
  recipe.title = initialValue.title
  recipe.description = initialValue.description
  recipe.ingredients = initialValue.ingredients
  recipe.steps = initialValue.steps
  recipe.imageUrl = initialValue.imageUrl
})
</script>

<template>
  <LoadingOverlay :loading="loading">
    <v-form @submit.prevent="$emit('submit', toValue(recipe), $event)">
      <v-card>
        <v-card-text>
          <div class="d-flex ga-8">
            <div class="d-flex flex-column flex-grow-1">
              <v-text-field
                label="Recipe name"
                v-model="recipe.title"
                :rules="validationRules.name"
              ></v-text-field>
              <v-textarea
                label="Recipe description"
                v-model="recipe.description"
                :rules="validationRules.description"
              ></v-textarea>
            </div>
            <UploadImage v-model="recipe.imageUrl" />
          </div>

          <div class="d-flex flex-wrap" :style="{ rowGap: '40px', columnGap: '20px' }">
            <div class="flex-grow-1">
              <IngredientList class="flex-grow-1" v-model="recipe.ingredients" />
            </div>
            <div class="flex-grow-1">
              <StepsList v-model="recipe.steps" />
            </div>
          </div>

          <div class="d-flex">
            <div class="ml-auto d-flex ga-4">
              <v-btn variant="outlined" type="button" color="secondary" @click="$emit('cancel')"
                >Cancel</v-btn
              >
              <v-btn type="submit" color="primary">Save recipe</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-form>
  </LoadingOverlay>
</template>

<style scoped></style>
