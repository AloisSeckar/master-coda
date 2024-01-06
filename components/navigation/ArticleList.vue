<template>
  <h2 v-if="title">
    {{ title }}
  </h2>
  <ul class="list-disc articleList">
    <li v-for="article in articleList" :key="article.link">
      <NavigationArticleLink :article="article" />
    </li>
  </ul>
  <div v-if="moreArticles">
    <NuxtLink :to="moreArticles" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string,
  localData?: ArticleLink[],
  externalSource?: string,
  moreArticles?: string
}>()

const articleList: ArticleLink[] = []
if (props.localData && props.localData.length > 0) {
  props.localData?.forEach(d => articleList.push(d))
}
if (props.externalSource) {
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
}
</script>
