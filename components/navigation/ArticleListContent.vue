<template>
  <h2 v-if="title">
    {{ title }}
  </h2>
  <p v-if="dscr">
    {{ dscr }}
  </p>
  <NavigationArticleList :articles="articleList" :current="current" />
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  dscr?: string
  articles: Article[] | null
  current?: string
}>()

const articleList: ArticleLink[] = []
if (props.articles && props.articles.length > 0) {
  props.articles.forEach((a) => {
    if (!a.hidden) {
      articleList.push({
        date: a.created,
        link: '/article/' + a.file,
        title: a.title,
        dscr: a.dscr,
        external: false,
      })
    }
  })
}
</script>
