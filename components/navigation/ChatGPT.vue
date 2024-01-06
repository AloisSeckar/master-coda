<template>
  <div class="mx-2 my-6 px-4 pt-2 py-4 border border-coda-yellow bg-slate-800">
    <div class="text-coda-yellow text-2xl font-header font-bold">
      ChatGPT
    </div>
    <div>
      Série článků o mých interakcích s
      <NuxtLink to="https://chat.openai.com/" :external="true">
        ChatGPT
      </NuxtLink>
    </div>
    <NavigationArticleList :local-data="gptArticles" :current="'/article/' + currentArticle" />
  </div>
</template>

<script setup lang="ts">
const gptArticles = useArticleStore().getByTitle('rande s ChatGPT')
const currentArticle = useRoute().params.article
</script>
