<template>
    <div class="pt-1 text-xs">
        <div class="text-amber-300">----------------------------------</div>
        <div class="font-bold">Master Coda by Alois Sečkár</div>
        <a class="block" :href="link.replace('##','blob')">Zobrazit zdrojový kód článku</a>
        <a class="block" :href="link.replace('##','edit')">Navrhnout úpravu</a>
    </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
const link = `https://github.com/AloisSeckar/master-coda/##/master/pages/article/${id}.vue`
</script>
