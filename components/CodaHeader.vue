<template>
    <div class="m-1 h-36">
        <NuxtLink :to="{ path: '/' }">
            <img style="width: 115px; float: left;" src="~/assets/master-coda.webp" alt="Master Coda" />
        </NuxtLink>
        <div class="ml-32 h-32 pt-2 border-b-2 border-amber-400">
            <div class="ml-1 font-header text-amber-400 text-2xl"><span class="text-3xl font-bold">Master Coda</span> - The light side of the code</div>
            <div class="ml-1 font-header text-amber-400 text-xl">Nepravidelný blog o programování</div>
            <ul class="flex">
                <li :class="menuButton">
                    <NuxtLink :to="{ path: '/' }">
                        <div :class="menuFont">JAVA</div>
                    </NuxtLink>
                </li>
                <li :class="menuButton">
                    <NuxtLink :to="{ path: '/' }">
                        <div :class="menuFont">WEB</div>
                    </NuxtLink>
                </li>
                <li :class="menuButton">
                    <NuxtLink :to="{ path: '/' }">
                        <div :class="menuFont">DEBUGGING</div>
                    </NuxtLink>
                </li>
                <li :class="menuButton">
                    <NuxtLink :to="{ path: '/' }">
                        <div :class="menuFont">OSTATNÍ</div>
                    </NuxtLink>
                </li>
                <li :class="menuButton">
                    <NuxtLink :to="{ path: '/' }">
                        <div :class="menuFont">HUMOR</div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const menuButton = "ml-1 mt-2 p-1 w-1/5 bg-amber-50 hover:bg-amber-400 border border-amber-400 shadow rounded text-center"
const menuFont = "text-zinc-900 hover:text-teal-700 font-bold"
</script>
