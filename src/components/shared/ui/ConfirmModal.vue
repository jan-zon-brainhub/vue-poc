<script setup lang="ts">
const modelOpen = defineModel('open')

const {
  text,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = 'primary',
  title,
} = defineProps<{
  title?: string
  text: string
  confirmLabel?: string
  confirmColor?: string
  cancelLabel?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <v-dialog max-width="500" v-model="modelOpen">
    <v-card>
      <v-card-title v-if="title" class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="secondary" @click="emit('cancel')">
          {{ cancelLabel }}
        </v-btn>
        <v-btn variant="elevated" :color="confirmColor" @click="emit('confirm')">
          {{ confirmLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
