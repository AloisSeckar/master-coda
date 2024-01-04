<template>
  <div>
    <div>Všechny články v kategorii</div>
    <h1>{{ catName }}</h1>
    <ul class="list-disc articleList">
      <li v-for="article in articles" :key="article.id">
        <span class="mr-2 text-coda-purple">{{ article.created }}</span>
        <NuxtLink :to="{ path: '/article/' + article.id }">
          <strong>{{ article.title }}</strong>
        </NuxtLink>
        - {{ article.dscr }}
      </li>
    </ul>
    <div v-if="(articles.length === 0)">
      Žádné články
    </div>
  </div>
</template>

<script setup lang="ts">
useArticleStore().fillIfNeeded()

const cat = useRoute().params.cat?.toString() || '_x'
const articles = computed(() => useArticleStore().getByCategory(cat))

let catName = cat
if (catName === 'misc') {
  catName = 'ostatní'
}

usePageMeta({
  type: 'website',
  url: `${CODA_URL}/category/${catName}`,
  title: `Master Coda - ${catName}`,
  dscr: `Články podle kategorie: ${catName}`
})
</script>
