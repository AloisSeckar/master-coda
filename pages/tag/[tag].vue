<template>
    <div>
        <h2>{{ tag }}</h2>
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
const tag = useRoute().params.tag.toString()
const articles = computed(() => useArticleStore().getByTag(tag))
</script>