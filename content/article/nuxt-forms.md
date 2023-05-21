Dalším krokem na cestě k funkční a užitečné aplikace, jsou formáláře použitelné jak na strukturovanou prezentaci dat, tak hlavně na obsluhu uživatelských vstupů. Abychom si je nemuseli psát pomocí nativních HTML elementů úplně sami, existují různé nástroje, které můžeme využít.

Svou vlastní knihovnu stylovaných formulářových prvků nabízí například [Bootstrap](/article/nuxt-ui#bootstrap), jehož integraci jsme si ukázali v minulém díle tutoriálu. Nyní si ukážeme dvě další integrace technologií, které jsou na formuláře specializované ještě o něco více. 

## FormKit

[FormKit](https://formkit.com/) je formulářová knihovna, která se teprve vyvíjí a usazuje, nicméně je dělaná přímo pro Vue.js, je lightweight a celkově se mi dost líbí. Hlavní filosofií je, že `Každý prvek formuláře může být komponenta <FormKit>` a pouze vlastnosti (props), které instancím předáváme řídí to, jak bude vypadat HTML výsledek. Pomocí vlastností lze nastavovat typ inputu, popisky, nápovědy a dokonce i validace, vše v jednom. 

FormKit není tak robustní jako jiné starší a propracovanější formulářové frameworky, ale do ekosystému Vue.js a Nuxtu se podle mě perfektně hodí, pročež je pro mě aktuálně jasná volba číslo jedna do mých aplikací.

### Integrace do Nuxt 3

Je to velmi jednoduché - prostě se přidá závislost na `@formkit/nuxt` a zaregistruje se příslušný modul. Pak už jen vesele využíváme komponentu `<FormKit>` a stavíme si formuláře podle pořeby.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-formkit @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-formkit)

## DevExtreme

[DevExtreme](https://js.devexpress.com/) je sada UI prvků vyvíjená společností DevExpress. Poskytuje množství widgetů a nástrojů pro vytváření uživatelsky přívětivých a přitom výkonných aplikací. Lze jej využít pro všechny hlavní JS frameworky (Angular, React a Vue.js) a snadno se integruje s různými backendovými technologiemi. Samozřejmostí je silná build-in podpora responzivního designu. Také nabízí podrobnou dokumentaci a komunitní podporu.

Využíváme DevExtreme na projektu v práci a musím říct, že bez něj bych si dostatečně rychlou tvorbu složitých formulářů, se kterými se tam pracuje, moc představit nedovedl. A to ačkoliv průběžně tápeme, jak se ta která věc udělá ve Vue.js světě (kolegové jsou totiž původem Angularisté). Pro menší projekt bych upřednostnil výše zmíněný FormKit. Na velké enterprise aplikace je to však asi lepší volba. Ovšem pozor, DevExtreme má i jednu celkem velkou nevýhodu - není zdarma pro komeční vývoj. Nicméně pokud subskripci máte, lze jej do Nuxt 3 projektu s úspěchem začlenit.

Integrace nebyla úplně přímočará, ale o výsledek se rád podělím, abyste vy už nemuseli tolik bádat.

### Integrace do Nuxt 3

Podstatný je plugin `dx.client.ts`, v němž probíhá import těch Dx komponent, které chcete ve vaší aplikaci používat, a jejich explicitní globální registrace do instance Vue.js, nad kterou běží Nuxt. Pokud byste tento krok obešli a chtěli komponenty importovat až tam, kde je používáte, tak to sice bude fungovat v dev módu, ale [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) produkčního buildu potřebné balíčky vyhází, protože z nějakého důvodu není schopen zjistit, že se používají. Tohle byl zpočátku docela boj, který bych asi sám nevyřešil, proto děkuji za [radu](https://github.com/nuxt/nuxt/discussions/16898#discussioncomment-3562772).

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-dx @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-dx)

**Poznámka:** DevExtreme nefunguje v Nuxt režimu **Server-Side Rendering**. Prvky se sice vykreslí, ale nejsou aktivní, patrně proto, že předkreslení na serveru požere ovládací JavaScript. Zřejmě by bylo nutné pomocí pluginu injektovat `.js` soubory, podobně jako u Bootstrap integrace. Je ale otázkou, zda to je vůbec možné. Zatím jsem tuto otázku nevyřešil. V `nuxt.config.ts` je tedy třeba nastavit `ssr: false` (viz [CSR](https://nuxt.com/docs/guide/concepts/rendering#client-side-rendering)).

## Shrnutí

Ani v případě formulářů nás Nuxt nenechá na holičkách a umožní relativně jednoduché integrace specializovaných nástrojů, které nám pomohou uživatelské rozhraní stavět.
