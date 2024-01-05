<template>
  <h2>Co nového v Nuxt/Vue světě?</h2>
  <ul class="list-disc articleList">
    <li v-for="news in nuxtNews" :key="news.link">
      <span class="mr-2 text-coda-purple">{{ news.date }}</span>
      <NuxtLink :to="news.link" :external="true" noprefetch>
        <strong>{{ news.title }}</strong>
      </NuxtLink>
      - {{ news.dscr }}
    </li>
  </ul>
  <div>
    <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </div>
</template>

<script setup>
const nuxtNews = []
const { data } = await useAsyncData('nuxtNews', () => $fetch('https://alois-seckar.cz/nuxt-news'))
if (data.value) {
  nuxtNews.push(data.value.item1)
  nuxtNews.push(data.value.item2)
  nuxtNews.push(data.value.item3)
  nuxtNews.push(data.value.item4)
  nuxtNews.push(data.value.item5)
}
</script>
