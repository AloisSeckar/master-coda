---
file: 'click-prevent'
cat: 'debugging'
title: 'Nechtěný reload stránky'
dscr: 'Kliknutí na HTML odkaz dělá víc, než se na první pohled může zdát'
tags: ['debugging', 'JavaScript', 'HTML']
date: '2023-05-15'
created: '15.05.2023'
edited: '15.05.2023'
---

Dnes jsem v práci řešil jednu "reklamaci", jež měla vcelku zajímavý důvod a řešení. Náš program je psaný v JS frameworku [Nuxt](https://nuxt.com/) postaveném nad [Vue.js](https://vuejs.org/). Tester do ticketu zapsal, že při práci s formulářem dochází k neustálému ukládání datového objektu. To by se dít nemělo, chceme, aby se změny do databáze automaticky ukládaly pouze při vstupu na formulář a při odchodu z něj.

Na první pohled nebylo jasné, proč se děje. Procházel jsem logiku formuláře a marně hledal místo, odkud by se metoda pro ukládání volala. Protože jsme ve Vue.js, tak mě napadlo hledat nějaký [watcher](https://vuejs.org/guide/essentials/watchers.html) nebo [computed proměnnou](https://vuejs.org/api/reactivity-core.html#computed), která by z nějakého důvodu vyvolávala na pozadí změnu a nutila hlavní datový objekt ukládat se. Taky žádný výsledek. Mezitím jsem zjistil, že neumím ve VS Code správně spustit debugger, ale to je téma na jinou diskusi.

Každopádně uběhlo docela dost času a já se nikam moc nepohnul. Pak mě naštěstí napadlo logovat si všechna místa, odkud se dá ukládací metoda spustit. Což brzy odhalilo, že se spouští [middleware funkce](/article/nuxt-middleware) při změně navigace na stránku s formulářem. To bylo zajímavé, protože k žádnému přesměrování zdánlivě nedocházelo.

Záhadou to ovšem zůstalo už jen chviličku. Došlo mi vzápětí, že v tabulce s hodnotami používáme klikatelné odkazy jako `<a href="#" @click="funkceOnClick()">`. Hash jako cíl odkazu způsobí, že nedojde k (viditelnému) překreslení stránky a `funkceOnClick` se odchycením události kliknutí myší vykoná správně. Jenže nativní chování `onClick` na odkaz je takové, že se vystřelí událost navigace. A ta spustí ansámbl funkcí Nuxtu a Vue.js, jejímž výsledkem je _routing_, ačkoliv se jde ze stejné stránky na stejnou. Stačí to ale k tomu, aby se provedlo middleware relevantní pro aktuální stránku (tj. všechny globální + ty, co jsou asociované pomocí [definePageMeta](https://nuxt.com/docs/api/utils/define-page-meta)). A odtud pramenila naše chyba.

## Řešení:
Bylo v tomto případě vcelku jednoduché. Vue.js nabízí [modifikátory událostí](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers), kterými lze chování nativních DOM eventů různě ovlivňovat. Pro nás je relevantní modifikátor `.prevent`, který výchozí chování `onClick` potlačí, a provede se tak pouze JS kód v metodě `funkceOnClick`. 

Opraveno za minutu, hledání příčiny zabralo přes hodinu.

::wise-words
Často je potřeba lépe rozumět tomu, co přesně se vlivem našeho kódu děje, protože pak se mohou vynořit souvislosti, které na první pohled nejsou vidět. Povědomí o tom, jak funguje ten který programovací jazyk či technologie, je dobré neustále postupně prohlubovat.
::
