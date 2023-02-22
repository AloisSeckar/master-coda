<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <p>
        Dovolte mi, abych vám představil <a href="https://nuxt.com/">Nuxt</a>. Nástroj, díky kterému je tvorba webů hračka.
        Stačí jen velmi málo a máte připravenou aplikaci, kterou dalšími několika kliknutími zvládnete i nasadit.
        Zejména menší projekty, které nepotřebují příliš mnoho funkcionality a v podstatě jde o statické stránky,
        se v něm píší úplně hladce. Zároveň ale nabízí spoustu možností, jak jít hlouběji a vytvářet i vcelku
        sofistikované webové aplikace.
      </p>
      <h2>O co jde?</h2>
      <p>
        <strong>Nuxt</strong> je framework pro tvorbu webových aplikací v (převážně) JavaScriptu, resp. TypeScriptu.
        Je postaven nad základem <a href="https://vuejs.org/">Vue.js</a>, což je "ten třetí vzadu" v rodině velkých a populárních
        JavaScriptových nástrojů na weby (spolu s frameworky React a Angular).
      </p>
      <p>
        Tak jako jiné nástroje podobného typu abstrahuje vývojáře od nutnosti
      </p>
      <h2>Co je potřeba?</h2>
      <p>
        Potřeba je pouze nejnovější LTS verze <a href="https://nodejs.org/">Node.js</a> v počítači, na kterém chcete vyvíjet.
        Výsledná aplikace může rovněž běžet na Node.js prostředí, ale není to nezbytně nutné, Nuxt umožňuje vytvořit
        výstup i jako statický JavaScript, který lze spustit v jakémkoliv modernějším prohlížeči. Sice tím přijdete
        o některé funkce, ale na provoz pak stačí obyčejný statický webhosting. Na druhou stranu v dnešní době
        cloudových služeb není velkým problémem ani "dynamická" varianta.
      </p>
      <p>
        Mezi další prerekvizity patří nějaké povědomí o HTML, CSS a JavaScriptu, ideálně též TypeScriptu. Sami vývojáři
        Vue.js a Nuxtu sice všude opakují, že nikoho do TS nenutí, ale z vlastní zkušenosti říkám, že to je velký posun
        kupředu a vyplatí se obětovat nějaký čas učení a prošlapávání slepých uliček. Aby se člověku příjemně programovalo,
        je dobré mít nějaké IDE a pro vývoj JavaScriptu je zřejmě nejlepší volbou <a href="https://code.visualstudio.com/">VS Code</a>
        - je na to učrené, je dobré, je zdarma, má hodně, pluginů a lidé z Vue.js světa také pracují nejčastěji v něm.
        A pro instalaci JavaScriptových závislostí v Node.js prostředí se hodí nějaký package manager - tak jako JS frameworky
        exisutjí především tři možnosti - npm, pnpm a yarn. Já si vcelku vystačím s npm, byť souhlasím, že pokročilejší
        pnpm má některé výhody. Nikdy jsem nezkusil yarn, ačkoliv vím, že ho leckdo preferuje a doporučuje. Volba je na vás,
        obecné principy mají všechny stejné a de-facto jde jen o to, jaká bude syntaxe příkazu.
      </p>
      <h2>Jak na něj?</h2>
      <p>Návody, tipy a triky zde budou přibývat.</p>
      <p>Zatím se můžete podívat na mé postupně se rozrůstající úložiště s demo projekty (v angličtině):</p>
      <NuxtLink to="https://github.com/AloisSeckar/demos-nuxt" :external="true">
        demos-nuxt @ GitHub
      </NuxtLink>
      <p>Pak jsou tu samozřejmě oficiální zdroje:</p>
      <ul class="list-disc">
        <li><a href="https://nuxt.com/docs">Nuxt dokumentace</a></li>
        <li><a href="https://github.com/nuxt/nuxt/discussions">Nuxt fórum</a></li>
        <ul>
          <p>V češtině jsem zatím nic moc nenašel. Uvidíme.</p>
        </ul>
      </ul>
    </div>
    <ArticleFooter />
  </div>
</template>
