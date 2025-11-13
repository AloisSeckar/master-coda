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

const store = useArticleLinkStore()
const articles = computed(() => store.getByTag(tag.value))

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/tag/${tag.value}`,
  title: `Master Coda - ${tag.value}`,
  dscr: `Články podle tagu: ${tag.value}`,
})
</script>
