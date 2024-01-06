<template>
  <div class="mx-2 my-6 px-4 pt-2 py-4 border border-coda-yellow bg-slate-800">
    <div class="text-coda-yellow text-2xl font-header font-bold">
      Nuxt Tutorial
    </div>
    <div>
      Série výukových článků o JS frameworku
      <NuxtLink to="https://nuxt.com/" :external="true">
        Nuxt
      </NuxtLink>
    </div>
    <NavigationArticleList :local-data="nuxtArticles" :current="'/article/' + currentArticle" />
  </div>
</template>

<script setup lang="ts">
const nuxtArticles = useArticleStore().getByTitle('Nuxt')
const currentArticle = useRoute().params.article
</script>
