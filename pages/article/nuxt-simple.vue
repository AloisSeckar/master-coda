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
        Na výše uvedeném odkazu naleznete zdrojový kód pro jednoduchý starter-projekt pro Nuxt. Obsahově vychází
        z podoby <a href="https://stackblitz.com/github/nuxt/starter/tree/v3-stackblitz">Nuxt Starter na
          cloudové platformě StackBlitz</a>, který si můžete rovnou v prohlížeči i spustit a vyzkoušet.
      </p>
      <p>
        Pokud budete chtít Nuxt rozjet lokálně, budete potřebovat:
      </p>
      <ol class="list-decimal">
        <li>Nainstalovat Node.js</li>
        <li>Stáhnout projekt pomocí Gitu</li>
        <li>Otevřít jej ve VS Code</li>
        <li>Přepnout se do složky nuxt-simple</li>
        <li>Zadat v terminálu příkaz npm install</li>
        <li>Spustit pomocí příkazu npm run dev</li>
      </ol>
      <p>
        Pojďme si nyní projít jednotlivé součásti:
      </p>
      <ul class="list-disc">
        <li>
          <strong>public/favicon.ico</strong> - ve skutečnosti nepovinný soubor obrázku, který přidá ikonu do tabu
          v internetovém prohlížeči. Aplikace by fungovala i bez toho, ale vypadá to lépe, a navíc to demonstruje, jak málo
          v tomto případě stačí, aby to fungovalo - prostě jen nakopírujete do této cesty váš obrázek a bez jakékoliv další
          úpravy máte hotovo.
        </li>
        <li>
          <strong>.eslintrc.json</strong> - tento konfigurační soubor řídí chování nástroje ESLint, který jsem se rozhodl
          do projektu přidat (ačkoliv v oficiálním nuxt-starteru není), protože za vás hlídá pravidla syntaxe a pomáhá vám
          tak udržovat váš zdrojový kód hezčí. Více o tématu v (budoucím) samostatném článku.
        </li>
        <li>
          <strong>README.md</strong> - je popisný soubor Gitu, který vám při pohledu do GitHub úložiště předloží základní
          informace o projektu. Není povinný, ale je obvyklou praxí ho v projektech mít a informovat skrze něj návštěvníky
          a potenciální uživatele vašeho kódu.
        </li>
        <li>
          <strong>app.vue</strong> - základní vstupní bod s jednoduchou šablonou uvnitř <span class="code">&lt;template&gt;</span>.
          Oproti oficiálnímu nuxt-starteru jsem nahradil jejich uvítací komponentu <span class="code">&lt;NuxtWelcome&gt;</span>
          vlastním HTML kódem. Ten uvidíte vykreslený na stránce poté, co projekt úspěšně spustíte.
        </li>
        <li>
          <strong>nuxt.config.ts</strong> - konfigurační soubor pro Nuxt. Ve výchozím nastavení může být takto "prázdný", veškerá
          budoucí nastavení, se provádí dovnitř těla objektu, který je parametrem vestavěné (a tudíž zde rovnou automaticky
          importované) metody <span class="code">defineNuxtConfig</span>.
        </li>
        <li>
          <strong>package-lock.json</strong> - soubor, který automaticky generuje manažer balíčků npm během příkazu npm install,
          ve kterém si drží vyčerpávající definici všech projektových závislostí. Panují názory, že je možné jej z Gitu
          vynechat, protože se často mění a stejně si ho každý vývojář projektu generuje sám lokálně, držím se ovšem
          <a href="https://stackoverflow.com/a/44210813/3204544">doporučení</a>, že do repozitáře také patří.
        </li>
        <li>
          <strong>package.json</strong> - klíčový soubor, který obsahuje zejména definice závislostí na externích projektech
          (v našem případě samozřejmě na balíčku <span class="code">nuxt</span> a dále na dvou balíčících pro ESLint, a také
          definice základních příkazů v sekci <span class="code">script</span> - definované aliasy se pak volají za "npm run *".
          <span style="color: gray">Tyto definice nejsou povinné, ale díky ním je ovládaní pohodlnější</span>
        </li>
        <li>
          <strong>pnpm-lock.yaml</strong> - obdoba package-lock.json, ale pro alternativní manažer pnpm.
        </li>
        <li>
          <strong>tsconfig.json</strong> - možnost customizace pro jinak generovaný soubor nastavení chování TypeScriptu.
          Více o tématu v (budoucím) samostatném článku.
        </li>
      </ul>

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
          + v tomto případě (prázdným) tagem <span class="code">&lt;script&gt;</span> (bez něj to při absenci nuxt.config.ts
          souboru nějak nefunguje)
        </li>
        <li>
          <strong>package.json</strong> - ve kterém bude v <span class="code">devDependencies</span> deklarovaná závislost
          na balíčku <span class="code">nuxt</span>. <span style="color: gray">Definice npm skriptů tam nezbytně být nemusí</span>
        </li>
      </ul>
      <p>
        Zbylé tři soubory v úložišti jsou de-facto navíc - README.md, package-lock.json a pnpm-lock.yaml už jsme probíralí výše.
      </p>
      <p>
        UPOZORNĚNÍ: Berte však toto pouze jako "legrácku" k demonstračním účelům. Absence běžně očekávaných součástí systémů
        by se mohla ukázat problematická při pokusu o jakékoliv větší využití. Držte se raději varianty "nuxt-simple".
      </p>
    </div>
    <ArticleFooter />
  </div>
</template>
