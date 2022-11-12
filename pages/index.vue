<script setup>
  const { data: content } = await useFetch('/api/articles');
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold underline">Home page?</h2>
    <p>Text shall there be, think you?</p>
    <h3>Articles</h3>
    <div v-for="category in content" :key="category.cat">
      <h4>{{ category.cat }}</h4>
      <p>{{ category.dscr }}</p>
      <ul>
        <li v-for="article in category.articles" :key="article.id">
          <NuxtLink :to="{ path: '/' + category.cat + '/' + article.id}">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>