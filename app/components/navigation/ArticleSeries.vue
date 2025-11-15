<template>
  <div class="mx-2 my-6 px-4 py-2 border border-coda-yellow bg-slate-800">
    <div class="text-coda-yellow! text-2xl font-header font-bold">
      {{ config.title }}
    </div>
    <div>
      {{ config.dscr }}
      <NuxtLink :to="config.linkURL" :external="true">
        {{ config.linkTitle }}
      </NuxtLink>
    </div>
    <NavigationArticleListContent :articles :current="'/article/' + currentArticle" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  config: { type: Object as PropType<ArticleSeries>, required: true },
})

const store = useArticleLinkStore()
const articles = computed(() => store.getBySeries(props.config.match))

const currentArticle = useRoute().params.article
</script>
