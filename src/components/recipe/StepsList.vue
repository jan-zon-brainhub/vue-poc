<script setup lang="ts">
import type { RecipeStep } from '@/shared/schemas/recipe.ts'

const stepsModel = defineModel<Pick<RecipeStep, 'stepDescription'>[]>({
  required: true,
})

const addStep = () => {
  stepsModel.value.push({
    stepDescription: '',
  })
}
</script>

<template>
  <div :style="{ minWidth: '400px' }">
    <h4 class="text-h5">Steps</h4>
    <v-list v-for="(step, stepIndex) in stepsModel">
      <v-list-item class="step-list-item a b c">
        <template #prepend>
          <div>{{ stepIndex + 1 }}.</div>
        </template>
        <v-list-item-title>
          <v-textarea v-model="step.stepDescription" label="Step description" />
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-btn variant="flat" @click="addStep"> Add step </v-btn>
  </div>
</template>

<style>
.step-list-item > .v-list-item__prepend {
  align-self: flex-start;
  padding-top: 8px;
  margin-right: 8px;
}
</style>
