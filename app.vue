<template>
  <div class="flex justify-center">
    <div class="w-full md:w-4/5">
      <CodaHeader />
      <main>
        <NuxtPage />
      </main>
      <CodaFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Master Coda - The Light Side of the Code'
})
useSeoMeta({
  ogTitle: () => 'Master Coda',
  description: () => 'Nepravidelný blog o programování',
  ogDescription: () => 'Nepravidelný blog o programování',
  ogImage: () => 'https://master-coda.netlify.app/master-coda.webp',
  twitterCard: () => 'summary_large_image'
})
useArticleStore().fill()
</script>
