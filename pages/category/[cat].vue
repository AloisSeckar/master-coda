<template>
  <div>
    <div>Všechny články v kategorii</div>
    <NavigationArticleList :title="catName" :local-data="articles" />
  </div>
</template>

<script setup lang="ts">
const cat = useRoute().params.cat?.toString() || '_x'

const { data: articles } = await useAsyncData(() => queryCollection('articles').where('cat', '=', cat).order('date', 'DESC').all())

let catName = cat
if (catName === 'misc') {
  catName = 'ostatní'
}

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/category/${catName}`,
  title: `Master Coda - ${catName}`,
  dscr: `Články podle kategorie: ${catName}`,
})
</script>
