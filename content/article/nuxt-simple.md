V prvním z chystané série výukových článků o&nbsp;[JS frameworku Nuxt](https://nuxt.com/) vám chci ukázat, jak snadno v&nbsp;něm jde rozběhnout funkční projekt.

## Nuxt Simple

[nuxt-simple @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-simple)

Na výše uvedeném odkazu naleznete zdrojový kód pro jednoduchý starter-projekt pro Nuxt. Obsahově vychází z&nbsp;podoby [Nuxt Starter na cloudové platformě StackBlitz](https://stackblitz.com/github/nuxt/starter/tree/v3-stackblitz), který si můžete rovnou v&nbsp;prohlížeči i&nbsp;spustit a&nbsp;vyzkoušet.

Pokud budete chtít Nuxt zprovoznit lokálně, budete potřebovat:

- Nainstalovat si běhové prostředí [Node.js](https://nodejs.org/) - doporučena je aktuální LTS verze, alespoň 18.*
- Stáhnout projekt pomocí verzovacího nástroje [Git](https://git-scm.com/)
- Otevřít jej ve vývojovém prostředí [VS Code](https://code.visualstudio.com/)
- Přepnout se do složky `nuxt-simple`
- Zadat v&nbsp;terminálu příkaz `pnpm install`
- Spustit aplikaci pomocí příkazu `pnpm run dev`
- Zobrazit v&nbsp;prohlížeči URL `http://localhost:3000`
 
 Uvidíte jednoduchou stránku, která toho sama o&nbsp;sobě moc neumí, ale je to důkaz, že Nuxt běží. Na tom můžeme začít stavět dál. Pojďme si ještě předtím projít jednotlivé součásti:
 
 - **`public/favicon.ico`** - ve skutečnosti nepovinný soubor obrázku, který přidá ikonu do tabu v&nbsp;internetovém prohlížeči. Aplikace by fungovala i&nbsp;bez toho, ale vypadá to lépe. Navíc to demonstruje, jak málo v&nbsp;tomto případě stačí, aby to fungovalo - prostě jen nakopírujete do této cesty váš obrázek a&nbsp;bez jakékoliv další úpravy máte hotovo.
 - **`.eslintrc.json`** - tento konfigurační soubor řídí chování nástroje [ESLint](https://eslint.org/), který jsem se rozhodl do projektu přidat (ačkoliv v oficiálním **nuxt-starter** není), protože za vás hlídá pravidla syntaxe a&nbsp;pomáhá vám tak udržovat váš zdrojový kód hezčí. Vyžaduje drobné nastavení prostředí, o&nbsp;kterém více v&nbsp;(budoucím) samostatném článku. Dokud nastaveno nemáte, ničemu to nevadí, pouze zatím nevyužijete pomoc při údržbě kvality vašeho kódu.
 - **`README.md`** - je popisný soubor Gitu, který vám při pohledu do [GitHub](https://github.com/) úložiště předloží základní informace o&nbsp;projektu. Není povinný, ale je obvyklou praxí ho v&nbsp;projektech mít a&nbsp;informovat skrze něj návštěvníky a&nbsp;potenciální uživatele vašeho kódu.
 - **`app.vue`** - základní vstupní bod s&nbsp;jednoduchou šablonou uvnitř `<template>`. Oproti oficiálnímu **nuxt-starter** jsem nahradil jejich uvítací komponentu `<NuxtWelcome>` vlastním HTML kódem. Ten uvidíte vykreslený na stránce poté, co projekt úspěšně spustíte.
 - **`nuxt.config.ts`** - konfigurační soubor pro Nuxt. Ve výchozím nastavení může být takto „prázdný“, veškerá budoucí nastavení se provádí dovnitř těla objektu, který je parametrem vestavěné (a&nbsp;tudíž zde rovnou automaticky importované) metody `defineNuxtConfig`.
 - **`pnpm-lock.yaml`** - soubor, který automaticky generuje manažer balíčků `pnpm` během příkazu `pnpm install`, ve kterém si drží vyčerpávající definici všech projektových závislostí. Panují názory, že tyto „lock“ soubory je možné z&nbsp;Gitu vynechat, protože se často mění a&nbsp;stejně si ho každý vývojář projektu generuje sám lokálně. Držím se ovšem [doporučení](https://stackoverflow.com/a/44210813/3204544), že do repozitáře také patří.
 - **`package.json`** - klíčový soubor, který obsahuje zejména definice závislostí na externích projektech. V&nbsp;našem případě samozřejmě na balíčku `nuxt` a&nbsp;dále na dvou balíčcích pro ESLint, a&nbsp;také definice základních příkazů v&nbsp;sekci `script` - definované aliasy se pak volají za `pnpm run *`. <span style="color: gray">Tyto definice nejsou povinné, ale díky ním je ovládaní pohodlnější.</span>
 - **`tsconfig.json`** - možnost customizace pro jinak generovaný soubor nastavení chování TypeScriptu. Více o&nbsp;tématu v&nbsp;(budoucím) samostatném článku.

## Nuxt Starter

 Pokud budete někdy v&nbsp;budoucnu chtít začít se svým vlastním malým Nuxt projektem, naleznete výše uvedené také ve variantě samostatného GitHub repozitáře, odkud se vám bude zdrojový kód o&nbsp;něco lépe kopírovat:

 [nuxt-starter @ GitHub](https://github.com/AloisSeckar/nuxt-starter)
 
 ## Nuxt Minimal

[nuxt-minimal @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-minimal)

Tento sub-projekt ukazuje, že ve skutečnosti jde Nuxt rozběhnout ještě mnohem jednodušeji. Přestože to asi není nejlepší nápad, web se nastartuje a zobrazí, pokud budou k&nbsp;dispozici pouze následující dva soubory:

- **`app.vue`** - základní vstupní bod s&nbsp;jednoduchou šablonou uvnitř `<template>`
- **`package.json`** - ve kterém bude v&nbsp;`devDependencies`</span> deklarovaná závislost na balíčku `nuxt`

Místo `pnpm run dev` (který by vyžadoval dodatečnou konfiguraci v&nbsp;souboru `package.json`) se v&nbsp;tomto případě aplikace spouští pomocí externího příkazu `npx nuxi dev` (`npx` je nadstavba nad `npm`, která umožňuje spouštět npm balíčky „on the fly“ bez jejich lokální instalace, a&nbsp;`nuxi` CLI nástroj od tvůrců frameworku Nuxt).

Zbylé dva soubory v&nbsp;úložišti - `README.md` a&nbsp;`pnpm-lock.yaml` - už byly popsány výše a&nbsp;jsou v&nbsp;úložišti de-facto navíc.

**UPOZORNĚNÍ:** Berte však toto pouze jako legrácku k&nbsp;demonstračním účelům. Absence běžně očekávaných součástí systému by se mohla ukázat problematická při pokusu o&nbsp;jakékoliv větší využití. Držte se raději varianty `nuxt-simple`.

V druhém díle tutoriálu si ukážeme základní stavební prvky Nuxt aplikací - [komponenty a stránky](/article/nuxt-pages).
