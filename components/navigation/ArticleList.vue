<template>
  <h2 v-if="title">
    {{ title }}
  </h2>
  <ul v-if="articles.length > 0" class="list-disc articleList">
    <li v-for="article in articles" :key="article.link">
      <NavigationArticleLink :article="article" :active="article.link !== current" />
    </li>
  </ul>
  <div v-else>
    Žádné články
  </div>
  <div v-if="moreArticles">
    <NuxtLink :to="moreArticles" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  articles: ArticleLink[]
  current?: string
  moreArticles?: string
}>()
</script>
