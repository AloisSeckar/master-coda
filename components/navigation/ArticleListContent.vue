<template>
  <div>
    <NavigationArticleList :title :articles="articleList" :current />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
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
