<template>
  <div>
    <NavigationArticleList :title :articles="articleList" :more-articles />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  externalSource: string
  moreArticles: string
}>()

const articleList: ArticleLink[] = []
const { data } = await useFetch<Last5News>(props.externalSource)
if (data.value) {
  articleList.push(data.value.item1)
  articleList.push(data.value.item2)
  articleList.push(data.value.item3)
  articleList.push(data.value.item4)
  articleList.push(data.value.item5)
}
articleList.forEach((a: ArticleLink) => {
  a.external = true
})
</script>
