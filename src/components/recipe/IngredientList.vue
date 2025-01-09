<script setup lang="ts">
import { measuresSchema } from '@/shared/schemas/recipe.ts'
import { required } from '@/shared/form-validation/validators.ts'

type Ingredient = {
  id: number
  name: string
  quantity: number
  measure: measuresSchema
}

const ingredientsModel = defineModel<Ingredient[]>({
  required: true,
})

const validationRules = {
  name: [required()],
  quantity: [required()],
}

const addIngredient = () => {
  ingredientsModel.value.push({
    id: Math.random(),
    name: '',
    quantity: 1,
    measure: null,
  })
}

const removeIngredient = (ingredient: Ingredient) => {
  ingredientsModel.value = ingredientsModel.value.filter((i) => i !== ingredient)
}
</script>

<template>
  <div :style="{ minWidth: '400px' }">
    <h4 class="text-h5">Ingredients</h4>
    <v-table density="compact">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Measure</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredientsModel" :key="ingredient.id">
          <td>
            <v-text-field
              variant="plain"
              v-model="ingredient.name"
              min-width="200px"
              :rules="validationRules.name"
            />
          </td>
          <td :style="{ textAlign: 'center', width: '60px' }">
            <span>
              <v-text-field
                variant="plain"
                v-model="ingredient.quantity"
                type="number"
                max-width="60px"
                :rules="validationRules.quantity"
                :style="{ textAlign: 'center' }"
              />
            </span>
          </td>
          <td :style="{ width: '150px' }">
            <v-select
              variant="plain"
              v-model="ingredient.measure"
              :items="measuresSchema.options"
              placeholder="Select unit"
            />
          </td>
          <td>
            <v-btn variant="text" @click="removeIngredient(ingredient)">
              <v-icon icon="mdi-trash-can-outline" color="red" />
            </v-btn>
          </td>
        </tr>
        <tr>
          <td colspan="100">
            <v-btn variant="text" @click="addIngredient">Add ingredient</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped></style>
