<template>
  <div>
    <h1>Master Coda</h1>
    <p class="my-2 sm:text-justify">
      Jmenuji se Alois Sečkár, živí (a&nbsp;baví) mě programování a&nbsp; věci, které jsem se přitom naučil,
      si nechci nechávat jen pro sebe.
    </p>
    <p class="my-2 mb-6 sm:text-justify">
      Na tomto blogu naleznete články o&nbsp;nejrůznějších IT tématech. Snad mé texty někomu pomohou. Budu rád
      i&nbsp;za zpětnou vazbu. Pokud v&nbsp;nich uvidíte chybu nebo znáte způsob, jak danou věc řešit lépe, napište
      mi na <a href="mailto:alois-seckar@gmail.com">alois-seckar@gmail.com</a>. Vždycky je kam se zlepšovat.
    </p>
    <NavigationArticleListContent
      title="Co nového na master-coda.cz?"
      dscr="Moje články vydané na tomto blogu:"
      :articles="codaNews"
    />
    <NavigationArticleListExternal
      title="Co nového v&nbsp;Nuxt/Vue.js světě?"
      dscr="Novinky o frameworku Nuxt a&nbsp;Vue.js (anglicky):"
      external-source="https://alois-seckar.cz/nuxt-news"
      more-articles="https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md"
    />
    <NavigationArticleListExternal
      title="Co nového v&nbsp;Java světě?"
      dscr="Novinky o programovacím jazyce Java (anglicky):"
      external-source="https://alois-seckar.cz/java-news"
      more-articles="https://github.com/AloisSeckar/demos-java/blob/master/JavaNews.md"
    />
    <NavigationArticleListExternal
      title="Co nového v&nbsp;IT světě?"
      dscr="Výběr zajímavých a&nbsp;přínosných článků na libovolné téma (anglicky):"
      external-source="https://alois-seckar.cz/coda-digest"
      more-articles="https://github.com/AloisSeckar/master-coda/blob/master/CodaDigest.md"
    />
  </div>
</template>

<script setup lang="ts">
usePageMeta(CODA_PAGE_META)

const { data: codaNews } = await useAsyncData(() => queryCollection('articles').order('date', 'DESC').limit(5).all())
</script>
