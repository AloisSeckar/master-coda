<template>
  <div>
    <div class="mb-2">
      Všechny články v kategorii:
    </div>
    <NavigationArticleListContent :title="catName" :articles />
  </div>
</template>

<script setup lang="ts">
const cat = computed(() => useRoute().params.cat?.toString() || '_x')

const store = useArticleLinkStore()
const articles = computed(() => store.getByCategory(cat.value))

const catName = computed(() => {
  let catName = cat.value
  if (catName === 'misc') {
    catName = 'ostatní'
  }
  return catName
})

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/category/${catName.value}`,
  title: `Master Coda - ${catName.value}`,
  dscr: `Články podle kategorie: ${catName.value}`,
})
</script>
