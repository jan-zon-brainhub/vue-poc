<script setup lang="ts">
const { loading } = defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div class="position-relative">
    <div v-if="loading" class="overlay">
      <div class="d-flex flex-column align-center">
        <v-progress-circular indeterminate />
        Loading...
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.overlay {
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;

  & > div {
    row-gap: 20px;
  }
}
</style>
