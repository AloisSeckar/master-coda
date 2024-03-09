<template>
  <div class="flex justify-center">
    <div class="flex flex-col h-screen w-full md:w-4/5">
      <TheCodaHeader />
      <main class="mb-auto p-2 md:p-0">
        <NuxtPage />
      </main>
      <TheCodaFooter />
    </div>
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'cs'
  }
})
</script>
