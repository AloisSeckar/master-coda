<template>
  <h2>Co nového v Java světě?</h2>
  <ul class="list-disc articleList">
    <li v-for="news in javaNews" :key="news.link">
      <span class="mr-2 text-coda-purple">{{ news.date }}</span>
      <NuxtLink :to="news.link" :external="true" noprefetch>
        <strong>{{ news.title }}</strong>
      </NuxtLink>
      - {{ news.dscr }}
    </li>
  </ul>
  <div>
    <NuxtLink to="https://github.com/AloisSeckar/demos-java/blob/master/JavaNews.md" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </div>
</template>

<script setup>
const javaNews = []
const { data } = await useFetch('https://alois-seckar.cz/java-news')
if (data.value) {
  javaNews.push(data.value.item1)
  javaNews.push(data.value.item2)
  javaNews.push(data.value.item3)
  javaNews.push(data.value.item4)
  javaNews.push(data.value.item5)
}
</script>
