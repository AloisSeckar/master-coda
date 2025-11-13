<template>
  <div class="flex justify-center">
    <div class="flex flex-col h-screen w-full md:w-4/5">
      <TheCodaHeader />
      <main class="mb-auto p-2 md:px-0">
        <TheEnglishVersion />
        <NuxtPage />
      </main>
      <TheCodaFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
await useArticleLinkStore().fetchArticles()
</script>
