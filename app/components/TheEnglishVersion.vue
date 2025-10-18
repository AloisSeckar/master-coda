<template>
  <div class="flex gap-2 justify-center items-center border border-coda-purple bg-coda-green px-2 py-1 mb-4">
    <NuxtImg
      src="/img/en-flag.webp" alt="English flag"
      title="English version" aria-hidden="true"
      :width="25" :height="15"
    />
    <span class="text-black mx-0.5">
      This blog is written in Czech. You can read my articles in English at <NuxtLink to="https://dev.to/aloisseckar" class="inline-block text-white!">dev.to</NuxtLink>.
    </span>
    <NuxtImg
      src="/img/en-flag.webp" alt="English flag"
      title="English version" aria-hidden="true"
      :width="25" :height="15"
    />
  </div>
</template>
