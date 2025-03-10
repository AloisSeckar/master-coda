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
        <div :class="buttonClass" @click="init">
          <div class="actionButtonText">
            Prohlédnout si galerii
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-[200px] mx-auto text-center text-lg font-bold">
        {{ current }} / {{ total }}
      </div>
      <div class="w-[546px] mx-auto text-center">
        <div v-if="nextAvailable" :class="buttonClass" @click="next">
          <div class="actionButtonText">
            Novější
          </div>
        </div>
        <div v-else :class="buttonClass" @click="first">
          <div class="actionButtonText">
            Nejstarší
          </div>
        </div>
        <div v-if="prevAvailable" :class="buttonClass" @click="prev">
          <div class="actionButtonText">
            Starší
          </div>
        </div>
        <div v-else :class="buttonClass" @click="last">
          <div class="actionButtonText">
            Nejnovější
          </div>
        </div>
      </div>
    </div>
    <a :href="imagePath" target="_blank">
      <NuxtImg
        class="mx-auto my-4 h-[350px] w-auto cursor-zoom-in"
        :src="imagePath"
        :alt="imageData.title"
        title="Kliknutím zobrazíte plnou velikost"
        :placeholder="[25, 25]"
      />
    </a>
    <div v-if="!initial">
      <div class="w-[260px] mx-auto text-center">
        <div :class="buttonClass" @click="reset">
          <div class="actionButtonText">
            Zpět
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const buttonClass = 'actionButton w-48 hover:cursor-pointer inline-block'

const initial = ref(true)

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
