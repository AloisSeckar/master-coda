<template>
  <div>
    <div>Všechny články podle tagu</div>
    <NavigationArticleListContent :title="tag" :articles />
  </div>
</template>

<script setup lang="ts">
const tag = useRoute().params.tag?.toString() || '_x'

const { data: articles } = await useAsyncData(() => queryCollection('articles').where('tags', 'LIKE', '%' + tag + '%').order('date', 'DESC').all())

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/tag/${tag}`,
  title: `Master Coda - ${tag}`,
  dscr: `Články podle tagu: ${tag}`,
})
</script>
