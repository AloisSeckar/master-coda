<template>
  <div class="m-1 h-36">
    <NuxtLink :to="{ path: '/' }">
      <NuxtImg
        class="mt-2 w-[119px] h-auto float-left border-2 border-coda-green hover:border-coda-yellow"
        src="/img/master-coda.webp"
        alt="Master Coda - Logo"
      />
    </NuxtLink>

    <div id="large-screens" class="hidden lg:block">
      <div :class="header">
        <div :class="headerH1">
          <span class="text-3xl font-bold text-wrap">Master Coda</span> - The light side of the code
        </div>
        <div :class="headerH2">
          Nepravidelný blog o programování
        </div>
        <ul class="flex">
          <li :class="menuButton">
            <NuxtLink to="/category/java">
              <div :class="menuFont">
                JAVA
              </div>
            </NuxtLink>
          </li>
          <li :class="menuButton">
            <NuxtLink to="/category/web">
              <div :class="menuFont">
                WEB
              </div>
            </NuxtLink>
          </li>
          <li :class="menuButton">
            <NuxtLink to="/category/debugging">
              <div :class="menuFont">
                DEBUGGING
              </div>
            </NuxtLink>
          </li>
          <li :class="menuButton">
            <NuxtLink to="/category/misc">
              <div :class="menuFont">
                OSTATNÍ
              </div>
            </NuxtLink>
          </li>
          <li :class="menuButton">
            <NuxtLink to="/fun">
              <div :class="menuFont">
                HUMOR
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div id="small-screens" class="block lg:hidden">
      <div :class="header">
        <div :class="headerH1">
          <span class="text-3xl font-bold">Master Coda</span>
        </div>
        <div :class="headerH2">
          Nepravidelný blog o&nbsp;programování
        </div>
        <div class="absolute top-14 min-[450px]:top-4 right-4 md:right-[10%] mr-1">
          <button id="menuBtn" class="block hamburger focus:outline-none cursor-pointer" @click="menu = true">
            <div class="space-y-2">
              <span class="block w-8 h-[3px] bg-coda-green" />
              <span class="block w-8 h-[3px] bg-coda-green" />
              <span class="block w-8 h-[3px] bg-coda-green" />
            </div>
          </button>
        </div>
        <div v-show="menu" ref="el" class="absolute top-12 right-4 md:right-[10%] mr-1 border-2 border-coda-green bg-slate-400" @click="menu = false">
          <ul>
            <li :class="menuButtonFloat">
              <NuxtLink :to="{ path: '/category/java' }">
                <div :class="menuFont">
                  JAVA
                </div>
              </NuxtLink>
            </li>
            <li :class="menuButtonFloat">
              <NuxtLink :to="{ path: '/category/web' }">
                <div :class="menuFont">
                  WEB
                </div>
              </NuxtLink>
            </li>
            <li :class="menuButtonFloat">
              <NuxtLink :to="{ path: '/category/debugging' }">
                <div :class="menuFont">
                  DEBUGGING
                </div>
              </NuxtLink>
            </li>
            <li :class="menuButtonFloat">
              <NuxtLink :to="{ path: '/category/misc' }">
                <div :class="menuFont">
                  OSTATNÍ
                </div>
              </NuxtLink>
            </li>
            <li :class="menuButtonFloat">
              <NuxtLink :to="{ path: '/fun' }">
                <div :class="menuFont">
                  HUMOR
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const header = 'ml-32 h-32 pt-2 border-b-2 border-coda-green'
const headerH1 = 'ml-1 font-header text-coda-yellow! text-xl'
const headerH2 = 'ml-1 font-header text-coda-yellow! text-sm min-[450px]:text-lg max-[386px]:hidden'
const menuButton = 'actionButton p-1 w-1/5'
const menuButtonFloat = 'actionButton p-1 w-36 text-center'
const menuFont = 'actionButtonText font-bold'

// hamburger menu state (mobile screens)
const menu = ref(false)

// hide hamburger menu on click
const el = useTemplateRef<HTMLDivElement>('el')
useMousePressed({
  target: el,
  onReleased: () => {
    if (menu.value) {
      menu.value = false
    }
  },
})
</script>
