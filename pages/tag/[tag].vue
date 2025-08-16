<template>
  <div>
    <div class="mb-2">
      Všechny články podle tagu:
    </div>
    <NavigationArticleListContent :title="tag" :articles />
  </div>
</template>

<script setup lang="ts">
const tag = computed(() => useRoute().params.tag?.toString() || '_x')

const { data: articles } = await useAsyncData(
  'articles',
  () => queryCollection('articles').where('tags', 'LIKE', '%' + tag.value + '%').order('date', 'DESC').all(),
  { watch: [tag] },
)

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/tag/${tag.value}`,
  title: `Master Coda - ${tag.value}`,
  dscr: `Články podle tagu: ${tag.value}`,
})
</script>
