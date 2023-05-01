<template>
  <div class="mx-2 p-2 border border-amber-300 bg-slate-800">
    <div class="text-amber-300 text-2xl font-header font-bold">
      Nuxt Tutorial
    </div>
    <div>
      Série výukových článků o JS frameworku
      <NuxtLink to="https://nuxt.com/" :external="true">
        Nuxt
      </NuxtLink>
    </div>
    <ul class="mt-2">
      <li v-for="article in nuxtArticles" :key="article.id">
        <div v-if="article.id === currentArticle" class="text-fuchsia-600 font-bold">
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
const nuxtArticles = useArticleStore().getByTitle('Nuxt')
const currentArticle = useRoute().params.article
</script>
