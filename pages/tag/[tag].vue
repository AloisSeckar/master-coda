<template>
  <div>
    <div>Všechny články podle tagu</div>
    <NavigationArticleList :title="tag" :local-data="articles" />
  </div>
</template>

<script setup lang="ts">
useArticleStore().fillIfNeeded()

const tag = useRoute().params.tag?.toString() || '_x'
const articles = computed(() => useArticleStore().getByTag(tag))

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/tag/${tag}`,
  title: `Master Coda - ${tag}`,
  dscr: `Články podle tagu: ${tag}`,
})
</script>
