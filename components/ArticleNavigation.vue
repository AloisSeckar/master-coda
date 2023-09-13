<template>
  <div>
    <NavigationNuxtTutorial v-if="isNuxtTutorial" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  articleId: { type: String, required: true }
})

const isNuxtTutorial = props.articleId.includes('nuxt')
</script>
