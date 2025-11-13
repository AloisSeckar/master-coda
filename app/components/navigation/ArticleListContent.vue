<template>
  <h2 v-if="title">
    {{ title }}
  </h2>
  <p v-if="dscr">
    {{ dscr }}
  </p>
  <NavigationArticleList :articles :current />
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  dscr?: string
  articles: ArticleLink[]
  current?: string
}>()
</script>
