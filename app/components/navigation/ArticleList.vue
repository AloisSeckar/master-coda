<template>
  <ul v-if="articles.length > 0" class="list-disc articleList">
    <li v-for="article in articles" :key="article.link">
      <NavigationArticleLink :article="article" :active="article.link !== current" />
    </li>
  </ul>
  <div v-else>
    Žádné články
  </div>
</template>

<script setup lang="ts">
const { articles, current } = defineProps<{
  articles: ArticleLink[]
  current?: string
}>()
</script>
