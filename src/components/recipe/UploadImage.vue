<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'
import { fileToBase64 } from '@/components/shared/file-utils/fileToBase64.ts'
import { computed } from 'vue'

const imageModel = defineModel<string>()

const onDrop = async ([fileToUpload]: File[]) => {
  const base64 = await fileToBase64(fileToUpload)
  imageModel.value = base64
  console.log(base64)
}

const removeImage = () => {
  imageModel.value = ''
}

const { getRootProps, getInputProps, isDragAccept } = useDropzone({
  onDrop,
})

const mainText = computed(() => {
  if (imageModel.value) {
    return 'Change image'
  }
  return 'Upload image'
})
</script>

<template>
  <div :class="['wrapper', { dragActive: isDragAccept }]" v-bind="getRootProps()">
    <div
      class="dropzone position-relative"
      :style="{ background: `url(${imageModel}) center center / cover` }"
    >
      <input type="file" v-bind="getInputProps()" />
      <div class="dropzone-text">
        <span v-if="isDragAccept" class="text-body-1">Drop file here</span>
        <span v-else>
          <div class="text-body-1">{{ mainText }}</div>
          <div class="text-body-2">or drag and drop it here</div>
        </span>
      </div>
      <v-btn
        v-if="imageModel"
        @click.stop="removeImage"
        class="remove-button"
        width="20px"
        variant="flat"
        title="Remove image"
      >
        <v-icon icon="mdi-trash-can-outline" color="red" />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 300px;
  height: auto;
  border: 4px dashed black;
  border-radius: 8px;
  transition: 0.2s;

  &:hover,
  &.dragActive {
    background: lightblue;
    border-color: dodgerblue;
  }
}

img {
  max-width: 100%;
}
.dropzone {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: flex-end center;
  padding: 8px;

  &:hover .remove-button {
    opacity: 1;
  }
}

.dropzone-text {
  background: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
  text-align: center;
}

.remove-button {
  opacity: 0;
  transition: 0.2s;
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
