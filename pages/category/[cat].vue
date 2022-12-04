<template>
    <div>
        <h2>{{ cat }}</h2>
        <div v-for="article in articles">
            <NuxtLink :to="{ path: '/article/' + article.id }" >
                <strong>{{ article.title }}</strong>
            </NuxtLink>
            - {{ article.dscr }}
        </div>
        <div v-if="(articles.length === 0)">No articles here</div>
    </div>
</template>

<script setup lang="ts">
const cat = useRoute().params.cat.toString()
const articles = computed(() => useArticleStore().getByCategory(cat))
</script>