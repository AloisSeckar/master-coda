Dalším krokem na cestě k&nbsp;funkční a&nbsp;užitečné aplikaci jsou formáláře použitelné jak na strukturovanou prezentaci dat, tak hlavně na obsluhu uživatelských vstupů. Abychom si je nemuseli psát pomocí nativních HTML elementů úplně sami, existují různé nástroje, které můžeme využít.

Hezky stylované formulářové prvky nabízí například [Nuxt&nbsp;UI](/article/nuxt-ui), jehož integraci jsme si ukázali v&nbsp;minulém díle tutoriálu. Nyní se podíváme na ještě trochu jiný nástroj, který kromě UI prvků nabízí i&nbsp;pohodlnou abstrakci celého formuláře.

## FormKit

[FormKit](https://formkit.com/) je formulářová knihovna, která se stále ještě vyvíjí a&nbsp;usazuje, nicméně je dělaná přímo pro Vue.js, je lightweight a&nbsp;celkově se mi moc líbí. Hlavní filosofií je, že `každý prvek formuláře může být komponenta <FormKit>` a&nbsp;pouze vlastnosti (props), které instancím předáváme, řídí to, jak bude vypadat HTML výsledek. Pomocí vlastností lze nastavovat typ inputu, popisky, nápovědy a&nbsp;dokonce i&nbsp;validace, vše v&nbsp;jednom.

Celé to obaluje speciální `<FormKit>` nejvyšší úrovně definovaný atributem `type="form"`, ve kterém stačí naslouchat jeho emitované události `@submit`, abychom dostali kompletní aktuální obsah:

```vue-html
<template>
  <FormKit type="form" @submit="odeslat">
    <!-- definice polí formuláře -->
  </FormKit>
<template>

<script setup>
const odeslat = (hodnoty) => {
  // práce s hodnotami formuláře
}
</script>
```

S takto sestavovanými formuláři se po chvilce nácviku pracuje jedna báseň.

V základní sadě je nyní k&nbsp;dispozici 25 zabudovaných UI prvků zdarma a&nbsp;dalších 14 pokročilejších lze připoupit v&nbsp;placené verzi Pro. Kromě toho nabízí FormKit [hromadu zabudovaných validací](https://formkit.com/essentials/validation), [šablony pro stylování](https://formkit.com/essentials/styling), [podporu více jazyků](https://formkit.com/essentials/internationalization) a&nbsp;další skvělé vychytávky jako třeba generování formulářů z&nbsp;[JSON schématu](https://formkit.com/essentials/schema).

## Případová studie

Jedním z projektů, kde FormKit s&nbsp;úspěchem používám, je web [Stará Krč](https://krc-historie.cz/), resp. jeho back-endová adminstrace, přes kterou můžeme s&nbsp;tátou editovat údaje obrázků a&nbsp;psát články.

Přikládám screen jako důkaz, že formuláře se dají s&nbsp;pomocí CSS flexibilně stylovat, nejste odkázáni na předem pevně daný vzhled:

:article-image{src="nuxt-forms/stara-krc.webp" alt="FormKit administrace na webu 'Stará Krč'" width="w-[600px]"}

Koho by implementace zajímala blíž, stránky pohání můj [proprietární CMS ELRHistory](https://github.com/AloisSeckar/ELRHistory). Definice formulářů pro administraci naleznete v&nbsp;`/components/admin/form`.

## Demo projekt

Zdrojový kód ukázkové implementace FormKit formuláře naleznete zde:
[nuxt-formkit @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-formkit)

Je to velmi jednoduché - prostě se přidá závislost na `@formkit/nuxt` a&nbsp;zaregistruje se příslušný modul. Pak už jen vesele využíváme komponentu `<FormKit>` a&nbsp;stavíme si formuláře podle pořeby.

Ukázkový formulář obsahuje několik polí nejběžnějších datových typů a&nbsp;tlačítko pro odeslání. Většina polí je povinná a&nbsp;na poli pro věk je navíc nastavena validace od 18 do 99 let. Hodnoty se průběžně vypisují nad formulářem v&nbsp;surové podobě datového objektu, což demonstruje možnost okamžitého reaktivního propojení formulářových polí s&nbsp;dalším použitím v&nbsp;aplikaci. V&nbsp;případě úspěšného odeslání (po splnění validací) se aktualizuje datum a&nbsp;čas posledního odeslání.

## Shrnutí

FormKit možná není tak robustní jako jiné starší a&nbsp;propracovanější formulářové frameworky, ale do ekosystému Vue.js a&nbsp;Nuxtu se podle mě perfektně hodí, pročež je pro mě aktuálně jasná volba číslo jedna do mých aplikací.

V příštím již [10. díle Nuxt tutoriálu](/article/nuxt-content) posuneme o&nbsp;krok dál tvorbu obsahu - &nbsp;ukážeme si modul **Nuxt Content**, který nám umožní psát v&nbsp;Markdown syntaxi, což je mnohem jednodušší než stylovat vše v&nbsp;HTML.
