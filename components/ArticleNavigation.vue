<template>
  <div>
    <NavigationNuxtTutorial v-if="isNuxtTutorial" />
    <NavigationChatGPT v-if="isChatGPTArticle" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  articleId: { type: String, required: true }
})

const isNuxtTutorial = props.articleId.includes('nuxt')
const isChatGPTArticle = props.articleId.includes('hello-chatgpt')
</script>
