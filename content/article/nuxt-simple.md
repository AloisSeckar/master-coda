V prvním z chystané série výukových článků o [JS frameworku Nuxt](https://nuxt.com/) vám chci ukázat, jak snadno v něm jde rozběhnout funkční projekt.

## Nuxt Simple

[nuxt-simple @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-simple)

Na výše uvedeném odkazu naleznete zdrojový kód pro jednoduchý starter-projekt pro Nuxt. Obsahově vychází z podoby [Nuxt Starter na cloudové platformě StackBlitz](https://stackblitz.com/github/nuxt/starter/tree/v3-stackblitz), který si můžete rovnou v prohlížeči i spustit a vyzkoušet.

Pokud budete chtít Nuxt zprovoznit lokálně, budete potřebovat:

- Nainstalovat si běhové prostředí [Node.js](https://nodejs.org/) - doporučena je aktuální LTS verze 18.*
- Stáhnout projekt pomocí verzovacího nástroje [Git](https://git-scm.com/)
- Otevřít jej ve vývojovém prostředí [VS Code](https://code.visualstudio.com/)
- Přepnout se do složky `nuxt-simple`
- Zadat v terminálu příkaz `npm install`
- Spustit aplikaci pomocí příkazu `npm run dev`
- Zobrazit v prohlížeči URL `http://localhost:3000`
 
 Uvidíte jednoduchou stránku, která toho sama o sobě moc neumí, ale je to důkaz, že Nuxt běží, a můžeme na tom začít stavět dál. Pojďme si ještě předtím projít jednotlivé součásti:
 
 - **public/favicon.ico** - ve skutečnosti nepovinný soubor obrázku, který přidá ikonu do tabu v internetovém prohlížeči. Aplikace by fungovala i bez toho, ale vypadá to lépe, a navíc to demonstruje, jak málo v tomto případě stačí, aby to fungovalo - prostě jen nakopírujete do této cesty váš obrázek a bez jakékoliv další úpravy máte hotovo.
 - **.eslintrc.json** - tento konfigurační soubor řídí chování nástroje [`ESLint`](https://eslint.org/), který jsem se rozhodl do projektu přidat (ačkoliv v oficiálním nuxt-starteru není), protože za vás hlídá pravidla syntaxe a pomáhá vám tak udržovat váš zdrojový kód hezčí. Vyžaduje drobné nastavení prostředí, o kterém více v (budoucím) samostatném článku. Dokud nastaveno nemáte, ničemu to nevadí, pouze zatím nevyužijete pomoc při údržbě kvality vašeho kódu.
 - **README.md** - je popisný soubor Gitu, který vám při pohledu do [`GitHub`](https://github.com/) úložiště předloží základní informace o projektu. Není povinný, ale je obvyklou praxí ho v projektech mít a informovat skrze něj návštěvníky a potenciální uživatele vašeho kódu.
 - **app.vue** - základní vstupní bod s jednoduchou šablonou uvnitř `<template>`. Oproti oficiálnímu nuxt-starteru jsem nahradil jejich uvítací komponentu `<NuxtWelcome>` vlastním HTML kódem. Ten uvidíte vykreslený na stránce poté, co projekt úspěšně spustíte.
 - **nuxt.config.ts** - konfigurační soubor pro Nuxt. Ve výchozím nastavení může být takto "prázdný", veškerá budoucí nastavení, se provádí dovnitř těla objektu, který je parametrem vestavěné (a tudíž zde rovnou automaticky importované) metody `defineNuxtConfig`.
 - **package-lock.json** - soubor, který automaticky generuje manažer balíčků `npm` během příkazu `npm install`, ve kterém si drží vyčerpávající definici všech projektových závislostí. Panují názory, že je možné jej z Gitu vynechat, protože se často mění a stejně si ho každý vývojář projektu generuje sám lokálně, držím se ovšem [doporučení](https://stackoverflow.com/a/44210813/3204544), že do repozitáře také patří.
 - **package.json** - klíčový soubor, který obsahuje zejména definice závislostí na externích projektech. V našem případě samozřejmě na balíčku `nuxt` a dále na dvou balíčcích pro ESLint, a také definice základních příkazů v sekci `script` - definované aliasy se pak volají za "npm run *". <span style="color: gray">Tyto definice nejsou povinné, ale díky ním je ovládaní pohodlnější.</span>
 - **tsconfig.json** - možnost customizace pro jinak generovaný soubor nastavení chování TypeScriptu. Více o tématu v (budoucím) samostatném článku.
 
 ## Nuxt Minimal

[nuxt-minimal @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-minimal)

Tento subprojekt ukazuje, že ve skutečnosti jde Nuxt rozběhnout ještě jednodušeji. Přestože to asi není nejlepší nápad, web se nastartuje a zobrazí, pokud budou k dispozici pouze následující dva soubory:

- **app.vue** - základní vstupní bod s jednoduchou šablonou uvnitř `<template>` + v tomto případě (prázdným) tagem `<script>` (bez něj to při absenci `nuxt.config.ts` souboru nějak nefunguje)
- **package.json** - ve kterém bude v `devDependencies`</span> deklarovaná závislost na balíčku `nuxt`. <span style="color: gray">Definice npm skriptů tam nezbytně být nemusí.</span>

Zbylé dva soubory v úložišti - `README.md` a `package-lock.json` - už byly popsány výše a jsou v úložišti de-facto navíc.

UPOZORNĚNÍ: Berte však toto pouze jako "legrácku" k demonstračním účelům. Absence běžně očekávaných součástí systémů by se mohla ukázat problematická při pokusu o jakékoliv větší využití. Držte se raději varianty `nuxt-simple`.

V druhém díle tutoriálu si ukážeme základní stavební prvky Nuxt aplikací - [komponenty a stránky](/article/nuxt-pages).
