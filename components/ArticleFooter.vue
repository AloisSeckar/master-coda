<template>
  <div class="pt-1 text-xs">
    <div class="my-1 text-coda-yellow">
      ----------------------------------------
    </div>
    <div class="font-bold">
      {{ article?.title }} @ Master Coda
    </div>
    <a class="block" :href="link.replace('##','blob')">Zobrazit zdrojový kód článku</a>
    <a class="block" :href="link.replace('##','edit')">Navrhnout úpravu</a>
  </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const github = useRuntimeConfig().public.github
const id = path.substring(path.lastIndexOf('/') + 1)
const link = `${github}/master-coda/##/master/content/article/${id}.md`
const article = computed(() => useArticleStore().getById(id))
</script>
