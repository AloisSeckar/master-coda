<template>
  <div class="mx-2 my-6 px-4 pt-2 py-4 border border-coda-yellow bg-slate-800">
    <div class="text-coda-yellow! text-2xl font-header font-bold">
      {{ config.title }}
    </div>
    <div>
      {{ config.dscr }}
      <NuxtLink :to="config.linkURL" :external="true">
        {{ config.linkTitle }}
      </NuxtLink>
    </div>
    <NavigationArticleListContent :articles="series" :current="'/article/' + currentArticle" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  config: { type: Object as PropType<ArticleSeries>, required: true },
})

const { data: series } = await useAsyncData(() => queryCollection('articles').where('file', 'LIKE', props.config.match + '%').order('date', 'DESC').all())

const currentArticle = useRoute().params.article
</script>
