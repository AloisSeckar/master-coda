---
file: 'nuxt-simple'
cat: 'web'
title: 'Nuxt Tutorial 1 - První kroky'
dscr: 'Jak málo dnes stačí na funkční web'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial']
date: '2024-03-26'
created: '26.03.2024'
edited: '19.08.2025'
---

V prvním z chystané série výukových článků o [JS frameworku Nuxt](https://nuxt.com/) vám chci ukázat, jak snadno v něm jde rozběhnout funkční projekt.

## Nuxt Simple

[nuxt-simple @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-simple)

Na výše uvedeném odkazu naleznete zdrojový kód pro jednoduchý starter-projekt pro Nuxt. Obsahově vychází z podoby [Nuxt Starter na cloudové platformě StackBlitz](https://stackblitz.com/github/nuxt/starter/tree/v3-stackblitz), který si můžete rovnou v prohlížeči i spustit a vyzkoušet.

Pokud budete chtít Nuxt zprovoznit lokálně, budete potřebovat:

- Nainstalovat si běhové prostředí [Node.js](https://nodejs.org/) - doporučena je aktuální LTS verze, alespoň 18.*
- Stáhnout projekt pomocí verzovacího nástroje [Git](https://git-scm.com/)
- Otevřít jej ve vývojovém prostředí [VS Code](https://code.visualstudio.com/)
- Přepnout se do složky `nuxt-simple`
- Zadat v terminálu příkaz `pnpm install`
- Spustit aplikaci pomocí příkazu `pnpm dev`
- Zobrazit v prohlížeči URL `http://localhost:3000`
 
 Uvidíte jednoduchou stránku, která toho sama o sobě moc neumí, ale je to důkaz, že Nuxt běží. Na tom můžeme začít stavět dál. Pojďme si ještě předtím projít jednotlivé součásti:
 
 - **`app/app.vue`** - základní vstupní bod s jednoduchou šablonou uvnitř `<template>` (od Nuxt v4 je ve složce `/app` a nikoliv přímo v hlavním adresáři projektu). Oproti oficiálnímu **nuxt-starter** jsem nahradil jejich uvítací komponentu `<NuxtWelcome>` vlastním HTML kódem. Ten uvidíte vykreslený na stránce poté, co projekt úspěšně spustíte.
 - **`public/favicon.ico`** - ve skutečnosti nepovinný soubor obrázku, který přidá ikonu do tabu v internetovém prohlížeči. Aplikace by fungovala i bez toho, ale vypadá to lépe. Navíc to demonstruje, jak málo v tomto případě stačí, aby to fungovalo - prostě jen nakopírujete do této cesty váš obrázek a bez jakékoliv další úpravy máte hotovo.
 - **`README.md`** - je popisný soubor Gitu, který vám při pohledu do [GitHub](https://github.com/) úložiště předloží základní informace o projektu. Není povinný, ale je obvyklou praxí ho v projektech mít a informovat skrze něj návštěvníky a potenciální uživatele vašeho kódu.
 - **`eslint.config.mjs`** - tento konfigurační soubor pro modul [@nuxt/eslint](https://eslint.nuxt.com/) řídí chování nástroje [ESLint](https://eslint.org/), který jsem se rozhodl do projektu přidat (ačkoliv v oficiálním **nuxt-starter** není), protože za vás hlídá pravidla syntaxe a pomáhá vám tak udržovat váš zdrojový kód hezčí. Vyžaduje drobné nastavení prostředí, o kterém více v (budoucím) samostatném článku. Dokud nastaveno nemáte, ničemu to nevadí, pouze zatím nevyužijete pomoc při údržbě kvality vašeho kódu.
 - **`nuxt.config.ts`** - konfigurační soubor pro Nuxt. Ve výchozím nastavení může být třeba i úplně „prázdný“, veškerá budoucí nastavení se provádí dovnitř těla objektu, který je parametrem vestavěné (a tudíž zde rovnou automaticky importované) metody `defineNuxtConfig`. V tuto chvíli je v něm vložená konfigurace modulu [@nuxt/eslint](https://eslint.nuxt.com/), který ve spolupráci se souborem `eslint.config.mjs` zajišťuje jednoduchou implementaci ESLint pravidel.
 - **`pnpm-lock.yaml`** - soubor, který automaticky generuje manažer balíčků `pnpm` během příkazu `pnpm install`, ve kterém si drží vyčerpávající definici všech projektových závislostí. Panují názory, že tyto „lock“ soubory je možné z Gitu vynechat, protože se často mění a stejně si ho každý vývojář projektu generuje sám lokálně. Držím se ovšem [doporučení](https://stackoverflow.com/a/44210813/3204544), že do repozitáře také patří.
 - **`package.json`** - klíčový soubor, který obsahuje zejména definice závislostí na externích projektech. V našem případě jde o balíček `nuxt`, modul pro ESLint `@nuxt/eslint` a kvůli tomu potřebný `typescript`. Dále jsou zde meta-informace o projektu a ještě definice základních příkazů v sekci `script` - definované aliasy se pak volají jako `pnpm *`. <span style="color: gray">Tyto definice nejsou povinné, ale díky ním je ovládaní pohodlnější.</span>
 - **`tsconfig.json`** - možnost customizace pro jinak generovaný soubor nastavení chování TypeScriptu. Více o tématu v (budoucím) samostatném článku.

## Nuxt Starter

 Pokud budete někdy v budoucnu chtít začít se svým vlastním malým Nuxt projektem, naleznete výše uvedené také ve variantě samostatného GitHub repozitáře, odkud se vám bude zdrojový kód o něco lépe kopírovat:

 [nuxt-v4-starter @ GitHub](https://github.com/AloisSeckar/nuxt-v4-starter)
 
 ## Nuxt Minimal

[nuxt-minimal @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-minimal)

Tento sub-projekt ukazuje, že ve skutečnosti jde Nuxt rozběhnout ještě mnohem jednodušeji. Přestože to asi není nejlepší nápad, web se nastartuje a zobrazí, pokud budou k dispozici pouze následující dva soubory:

- **`app.vue`** - základní vstupní bod s jednoduchou šablonou uvnitř `<template>`
- **`package.json`** - ve kterém bude v `devDependencies`</span> deklarovaná závislost na balíčku `nuxt`

Místo `pnpm dev` (který by vyžadoval dodatečnou konfiguraci v souboru `package.json`) se v tomto případě aplikace spouští pomocí externího příkazu `npx nuxi dev` (`npx` je nadstavba nad `npm`, která umožňuje spouštět npm balíčky „on the fly“ bez jejich lokální instalace, a `nuxi` CLI nástroj od tvůrců frameworku Nuxt).

Zbylé dva soubory v úložišti - `README.md` a `pnpm-lock.yaml` - už byly popsány výše a jsou v úložišti de-facto navíc.

**UPOZORNĚNÍ:** Berte však toto pouze jako legrácku k demonstračním účelům. Absence běžně očekávaných součástí systému by se mohla ukázat problematická při pokusu o jakékoliv větší využití. Držte se raději varianty `nuxt-simple`.

V druhém díle tutoriálu si ukážeme základní stavební prvky Nuxt aplikací - [komponenty a stránky](/article/nuxt-pages).
