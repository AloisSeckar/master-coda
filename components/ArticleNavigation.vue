<template>
  <div>
    <NavigationArticleSeries v-if="isNuxtTutorial" :config="nuxtTutorialConfig" />
    <NavigationArticleSeries v-if="isChatGPTArticle" :config="chatGPTConfig" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  articleId: { type: String, required: true },
})

const isNuxtTutorial = props.articleId.startsWith('nuxt')
const nuxtTutorialConfig: ArticleSeries = {
  title: 'Nuxt Tutorial',
  dscr: 'Série výukových článků o JS frameworku',
  linkTitle: 'Nuxt',
  linkURL: 'https://nuxt.com/',
  match: 'nuxt-',
}

const isChatGPTArticle = props.articleId.includes('hello-chatgpt')
const chatGPTConfig: ArticleSeries = {
  title: 'ChatGPT',
  dscr: 'Série článků o mých interakcích s',
  linkTitle: 'ChatGPT',
  linkURL: 'https://chat.openai.com/',
  match: 'hello-chatgpt-',
}
</script>
