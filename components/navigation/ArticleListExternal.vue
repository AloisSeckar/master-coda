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

const articleList: Ref<ArticleLink[]> = ref([])
const { data } = await useFetch<Last5News>(props.externalSource)
if (data.value) {
  articleList.value.push(data.value.item1)
  articleList.value.push(data.value.item2)
  articleList.value.push(data.value.item3)
  articleList.value.push(data.value.item4)
  articleList.value.push(data.value.item5)
}
articleList.value.forEach((a: ArticleLink) => {
  a.external = true
})
</script>
