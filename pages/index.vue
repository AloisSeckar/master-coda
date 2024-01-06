<template>
  <div>
    <h1>Master Coda</h1>
    <p class="my-2">
      Jmenuji se Alois Sečkár, živí (a&nbsp;baví) mě programování a&nbsp; věci, které jsem se přitom naučil,
      si nechci nechávat jen pro sebe.
    </p>
    <p class="my-2">
      Na tomto blogu naleznete články o&nbsp;nejrůznějších IT tématech. Snad mé texty někomu pomohou. Budu rád
      i&nbsp;za zpětnou vazbu. Pokud v&nbsp;nich uvidíte chybu nebo znáte způsob, jak danou věc řešit lépe, napište
      mi na <a href="mailto:alois-seckar@gmail.com">alois-seckar@gmail.com</a>. Vždycky je kam se zlepšovat.
    </p>
    <NavigationArticleList
      title="Co nového na master-coda.cz?"
      :local-data="codaNews"
    />
    <NavigationArticleList
      title="Co nového v Nuxt/Vue světě?"
      external-source="https://alois-seckar.cz/nuxt-news"
      more-articles="https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md"
    />
    <NavigationArticleList
      title="Co nového v Java světě?"
      external-source="https://alois-seckar.cz/java-news"
      more-articles="https://github.com/AloisSeckar/demos-java/blob/master/JavaNews.md"
    />
  </div>
</template>

<script setup lang="ts">
usePageMeta(CODA_PAGE_META)

useArticleStore().fillIfNeeded()
const codaNews = useArticleStore().getLast5()
</script>
