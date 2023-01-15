<template>
    <div class="m-1 h-36">
        <NuxtLink :to="{ path: '/' }">
            <img class="border-2 border-green-800 hover:border-amber-300" style="width: 115px; float: left;" src="~/assets/master-coda.webp" alt="Master Coda" />
        </NuxtLink>

        <div id="large-screens" class="hidden lg:block">
            <div :class="header">
                <div :class="headerH1"><span class="text-3xl font-bold">Master Coda</span> - The light side of the code</div>
                <div :class="headerH2">Nepravidelný blog o programování</div>
                <ul class="flex">
                    <li :class="menuButton">
                        <NuxtLink :to="{ path: '/category/java' }">
                            <div :class="menuFont">JAVA</div>
                        </NuxtLink>
                    </li>
                    <li :class="menuButton">
                        <NuxtLink :to="{ path: '/category/web' }">
                            <div :class="menuFont">WEB</div>
                        </NuxtLink>
                    </li>
                    <li :class="menuButton">
                        <NuxtLink :to="{ path: '/category/debugging' }">
                            <div :class="menuFont">DEBUGGING</div>
                        </NuxtLink>
                    </li>
                    <li :class="menuButton">
                        <NuxtLink :to="{ path: '/category/misc' }">
                            <div :class="menuFont">OSTATNÍ</div>
                        </NuxtLink>
                    </li>
                    <li :class="menuButton">
                        <NuxtLink :to="{ path: '/fun' }">
                            <div :class="menuFont">HUMOR</div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <div id="small-screens" class="block lg:hidden">
            
            <div :class="header">
                <div :class="headerH1"><span class="text-3xl font-bold">Master Coda</span></div>
                <div :class="headerH2">Nepravidelný blog o&nbsp;programování</div>
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const header = "ml-32 h-32 pt-2 border-b-2 border-green-800"
const headerH1 = "ml-1 font-header text-amber-300 text-2xl"
const headerH2 = "ml-1 font-header text-amber-300 text-xl"
const menuButton = "actionButton p-1 w-1/5"
const menuFont = "actionButtonText font-bold"
</script>
