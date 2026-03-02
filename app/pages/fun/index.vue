<template>
  <div>
    <h1 class="text-center mt-3">
      {{ imageData.title }}
      <span v-if="imageData.explain" :title="imageData.explain">
        <Icon name="material-symbols:help" color="gold" class="w-8 pb-1" />
      </span>
    </h1>
    <div v-if="initial">
      <div class="w-[200px] mx-auto text-center text-lg font-bold">
        Celkem {{ total }} obrázků
      </div>
      <div class="w-[260px] mx-auto text-center">
        <button :class="buttonClass" @click="init">
          <div class="actionButtonText">
            Prohlédnout si galerii
          </div>
        </button>
      </div>
    </div>
    <div v-else>
      <div class="w-[200px] mx-auto text-center text-lg font-bold">
        {{ current }} / {{ total }}
      </div>
      <div class="w-[546px] mx-auto text-center">
        <div v-if="nextAvailable" :class="buttonClass" @click="next">
          <button class="actionButtonText">
            Novější
          </button>
        </div>
        <div v-else :class="buttonClass" @click="first">
          <button class="actionButtonText">
            Nejstarší
          </button>
        </div>
        <div v-if="prevAvailable" :class="buttonClass" @click="prev">
          <button class="actionButtonText">
            Starší
          </button>
        </div>
        <div v-else :class="buttonClass" @click="last">
          <button class="actionButtonText">
            Nejnovější
          </button>
        </div>
      </div>
    </div>
    <figure class="relative mx-auto my-2 border-2 border-gray-300 dark:border-gray-600 rounded min-h-[350px]">
      <div
        v-if="imageLoading"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
      >
        <Icon name="material-symbols:image-outline" class="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
      <a :href="imagePath" target="_blank">
        <NuxtImg
          :key="imagePath"
          class="mx-auto my-4 h-auto w-[500px] cursor-zoom-in transition-opacity duration-300"
          :class="imageLoading ? 'opacity-0' : 'opacity-100'"
          :src="imagePath"
          :alt="imageData.title"
          title="Kliknutím zobrazíte plnou velikost"
          :placeholder="[25, 25]"
          @load="imageLoading = false"
        />
      </a>
    </figure>
    <div v-if="!initial">
      <div class="w-[260px] mx-auto text-center">
        <button :class="buttonClass" @click="reset">
          <div class="actionButtonText">
            Zpět
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const buttonClass = 'actionButton w-48 hover:cursor-pointer inline-block'

const initial = ref(true)
const imageLoading = ref(false)

const funStore = useFunStore()
if (!funStore.loaded) {
  funStore.fill()
}

const current = computed(() => funStore.index + 1)
const total = computed(() => funStore.items.length)

const imageData: Ref<Fun> = ref({
  id: '_zoidberg',
  title: 'Haha?',
  added: '',
})
const imagePath = computed(() => `/img/fun/${imageData.value.id}.jpg`)

const reset = () => {
  initial.value = true
  imageData.value.id = '_zoidberg'
  imageData.value.title = 'Haha?'
  imageData.value.explain = undefined
  imageData.value.added = ''
}

const init = () => {
  initial.value = false
  last()
  reloadImge()
}

const first = () => funStore.index = 0
const last = () => funStore.index = funStore.items.length - 1
const next = () => funStore.nextImage()
const prev = () => funStore.prevImage()

const nextAvailable = computed(() => funStore.index < funStore.items.length - 1)
const prevAvailable = computed(() => funStore.index > 0)

watch(() => funStore.index, () => reloadImge())

function reloadImge() {
  imageLoading.value = true
  const newImage = funStore.items[funStore.index]
  imageData.value.id = newImage?.id || '_zoidberg'
  imageData.value.title = newImage?.title || 'Haha?'
  imageData.value.explain = newImage?.explain
}

onBeforeRouteLeave(() => {
  initial.value = true
})

usePageMeta(CODA_PAGE_META)
</script>
