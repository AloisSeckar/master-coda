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
useArticleStore().fill()
</script>
