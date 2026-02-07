<template>
  <div>
    <NavigationArticleSeries v-if="isVueNews" :config="vueNewsConfig" />
    <NavigationArticleSeries v-if="isNuxtTutorial" :config="nuxtTutorialConfig" />
    <NavigationArticleSeries v-if="isChatGPTArticle" :config="chatGPTConfig" />
    <NavigationArticleSeries v-if="isCopilotArticle" :config="copilotConfig" />
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  article?: ArticlesCollectionItem
}>()

const isVueNews = props.article?.file.startsWith('new-in-vue')
const vueNewsConfig: ArticleSeries = {
  title: 'New in Vue',
  dscr: 'Přehled novinek ze světa',
  linkTitle: 'Vue.js',
  linkURL: 'https://vuejs.org/',
  match: 'new-in-vue-',
}

const isNuxtTutorial = props.article?.file.startsWith('nuxt')
const nuxtTutorialConfig: ArticleSeries = {
  title: 'Nuxt Tutorial',
  dscr: 'Série výukových článků o JS frameworku',
  linkTitle: 'Nuxt',
  linkURL: 'https://nuxt.com/',
  match: 'nuxt-',
}

const isChatGPTArticle = props.article?.file.includes('hello-chatgpt')
const chatGPTConfig: ArticleSeries = {
  title: 'ChatGPT',
  dscr: 'Série článků o mých interakcích s',
  linkTitle: 'ChatGPT',
  linkURL: 'https://chat.openai.com/',
  match: 'hello-chatgpt-',
}

const isCopilotArticle = props.article?.tags.includes('Copilot')
const copilotConfig: ArticleSeries = {
  title: 'How to pilot with Copilot?',
  dscr: 'Série článků o mých interakcích s',
  linkTitle: 'GitHub Copilot',
  linkURL: 'https://github.com/features/copilot',
  match: 'copilot',
}
</script>
