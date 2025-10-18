<template>
  <h2>
    {{ title }}
  </h2>
  <p class="flex items-center gap-2">
    <NuxtImg
      src="/img/en-flag.webp" alt="English flag"
      title="Články v AJ" class="inline-block"
      :width="25" :height="15"
    />
    {{ dscr }}
  </p>
  <NavigationArticleList :articles="articleList" />
  <div v-if="moreArticles" class="mb-4">
    <NuxtLink :to="moreArticles" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  dscr: string
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
