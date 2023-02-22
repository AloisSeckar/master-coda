<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <p>
        V prvním z chystané série výukových článků o <NuxtLink to="https://nuxt.com/" :external="true">
          JS frameworku Nuxt
        </NuxtLink> vám chci ukázat, jak málo stačí k rozběhnutí funkčního projektu.
      </p>

      <h2>
        Nuxt Simple
      </h2>
      <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-simple" :external="true">
        nuxt-simple @ GitHub
      </NuxtLink>
      <p>
        TODO -Představení struktury-
      </p>

      <h2 id="minimal">
        Nuxt Minimal
      </h2>
      <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-minimal" :external="true">
        nuxt-minimal @ GitHub
      </NuxtLink>
      <p>
        Tento subprojekt ukazuje, že ve skutečnosti jde Nuxt rozběhnout ještě jednodušeji. Přestože to asi není nejlepší nápad,
        web se nastartuje a zobrazí, pokud budou k dispozici pouze následující dva soubory:
      </p>
      <ul class="list-disc">
        <li>
          <strong>app.vue</strong> - základní vstupní bod s jednoduchou šablonou uvnitř <span class="code">&lt;template&gt;</span>
          + (prázdným) tagem <span class="code">&lt;script&gt;</span> (bez něj to nefunguje)
        </li>
        <li>
          <strong>package.json</strong> - ve kterém bude v <span class="code">devDependencies</span> deklarovaná závislost
          na balíčku <span class="code">nuxt</span>. <span style="color: gray">Definice npm skriptů tam nezbytně být nemusí</span>
        </li>
      </ul>
      <p>
        Zbylé tři soubory v úložišti jsou de-facto navíc - readme je pouze informace o git projektu, a soubory
        package-lock.json a pnpm-lock.yaml vám generují package managery při instalaci závislostí (držím se ovšem
        <NuxtLink to="https://stackoverflow.com/a/44210813/3204544" :external="true">
          doporučení
        </NuxtLink>, že do repozitáře také patří).
      </p>
    </div>
    <ArticleFooter />
  </div>
</template>
