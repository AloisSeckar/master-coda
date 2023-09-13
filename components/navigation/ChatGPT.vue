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
    <ul class="mt-2">
      <li v-for="article in gptArticles" :key="article.id">
        <div v-if="article.id === currentArticle" class="text-coda-purple font-bold">
          &#9654; {{ article.title }}
        </div>
        <div v-else>
          <NuxtLink :to="'/article/' + article.id">
            {{ article.title }}
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const gptArticles = useArticleStore().getByTitle('rande s ChatGPT')
const currentArticle = useRoute().params.article
</script>
