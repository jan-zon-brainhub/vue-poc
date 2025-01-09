<script setup lang="ts">
import type { Recipe } from '@/shared/schemas/recipe.ts'
import LikeButton from '@/components/recipe/RecipeLikeButton.vue'
import AuthorizedOnly from '@/components/shared/auth/AuthorizedOnly.vue'
import { ref } from 'vue'
import ConfirmModal from '@/components/shared/ui/ConfirmModal.vue'
import { useDeleteRecipeMutation } from '@/components/mutations/recipe.ts'
import { useRouter } from 'vue-router'
import { useToastsStore } from '@/stores/toasts.ts'

const { recipe } = defineProps<{
  recipe: Recipe
}>()
const deleteRecipeMutation = useDeleteRecipeMutation()
const router = useRouter()
const toastStore = useToastsStore()

const showDeleteModal = ref(false)

const deleteRecipe = async () => {
  await deleteRecipeMutation.deleteRecipe(recipe.id)
  showDeleteModal.value = false
  toastStore.addToast({
    type: 'success',
    text: 'Recipe deleted successfully',
  })
  void router.push('/')
}
</script>

<template>
  <v-card>
    <v-img class="align-end position-relative" :src="recipe.imageUrl" max-height="300" cover>
      <v-card-title class="title">
        <h1>{{ recipe.title }}</h1>
      </v-card-title>
      <AuthorizedOnly>
        <div class="edit-button d-flex ga-2">
          <router-link :to="`/recipe/${recipe.id}/edit`">
            <v-btn variant="elevated" color="secondary"> Edit recipe </v-btn>
          </router-link>
          <v-tooltip text="Delete recipe" location="top">
            <template #activator="{ props }">
              <v-btn
                @click="showDeleteModal = true"
                v-bind="props"
                variant="flat"
                color="error"
                density="compact"
                size="40"
              >
                <v-icon icon="mdi-trash-can-outline" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </AuthorizedOnly>
    </v-img>
    <v-card-text class="d-flex flex-column ga-4">
      <span class="text-body-1">
        {{ recipe.description }}
      </span>
      <div class="d-flex ga-8 flex-wrap ingredients-steps">
        <div class="min-w-40">
          <h4 class="text-h5">Ingredients</h4>
          <ul class="pl-5">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
              {{ ingredient.quantity }} {{ ingredient.measure }} of
              {{ ingredient.name }}
            </li>
          </ul>
        </div>
        <div class="flex-grow-1 min-w-40">
          <h4 class="text-h5">Steps</h4>
          <ol class="pl-5">
            <li v-for="step in recipe.steps" :key="step.stepNumber">
              {{ step.stepDescription }}
            </li>
          </ol>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <LikeButton :recipe-id="recipe.id" />
    </v-card-actions>
  </v-card>
  <ConfirmModal
    :open="showDeleteModal"
    @confirm="deleteRecipe"
    @cancel="showDeleteModal = false"
    text="Are you sure you want to delete this recipe?"
    confirm-label="Delete"
    confirm-color="error"
  />
</template>

<style scoped>
.title {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.edit-button {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
