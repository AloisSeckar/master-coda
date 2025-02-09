Dalším krokem na cestě k funkční a užitečné aplikaci jsou formuláře použitelné jak na strukturovanou prezentaci dat, tak hlavně na obsluhu uživatelských vstupů. Abychom si je nemuseli psát pomocí nativních HTML elementů úplně sami, existují různé nástroje, které můžeme využít.

Hezky stylované formulářové prvky nabízí například [Nuxt UI](/article/nuxt-ui), jehož integraci jsme si ukázali v minulém díle tutoriálu. Nyní se podíváme na ještě trochu jiný nástroj, který kromě UI prvků nabízí i pohodlnou abstrakci celého formuláře.

## FormKit

[FormKit](https://formkit.com/) je formulářová knihovna, která se stále ještě vyvíjí a usazuje, nicméně je dělaná přímo pro Vue.js, je lightweight a celkově se mi moc líbí. Hlavní filosofií je, že `každý prvek formuláře může být komponenta <FormKit>` a pouze vlastnosti (props), které instancím předáváme, řídí to, jak bude vypadat HTML výsledek. Pomocí vlastností lze nastavovat typ inputu, popisky, nápovědy, a dokonce i validace, vše v jednom.

Celé to obaluje speciální `<FormKit>` nejvyšší úrovně definovaný atributem `type="form"`, ve kterém stačí naslouchat jeho emitované události `@submit`, abychom dostali kompletní aktuální obsah:

```vue
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

V základní sadě je nyní k dispozici 25 zabudovaných UI prvků zdarma a dalších 14 pokročilejších lze přikoupit v placené verzi Pro. Kromě toho nabízí FormKit [hromadu zabudovaných validací](https://formkit.com/essentials/validation), [šablony pro stylování](https://formkit.com/essentials/styling), [podporu více jazyků](https://formkit.com/essentials/internationalization) a další skvělé vychytávky jako třeba generování formulářů z [JSON schématu](https://formkit.com/essentials/schema).

## Případová studie

Jedním z projektů, kde FormKit s úspěchem používám, je web [Stará Krč](https://krc-historie.cz/), resp. jeho back-endová administrace, přes kterou můžeme s tátou editovat údaje obrázků a psát články.

Přikládám screen jako důkaz, že formuláře se dají s pomocí CSS flexibilně stylovat, nejste odkázáni na předem pevně daný vzhled:

:article-image{src="nuxt-forms/stara-krc.webp" alt="FormKit administrace na webu 'Stará Krč'" width="w-[600px]"}

Koho by implementace zajímala blíž, stránky pohání můj [proprietární CMS ELRHistory](https://github.com/AloisSeckar/ELRHistory). Definice formulářů pro administraci naleznete v `/components/admin/form`.

## Demo projekt

Zdrojový kód ukázkové implementace FormKit formuláře naleznete zde:
[nuxt-formkit @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-formkit)

Je to velmi jednoduché - prostě se přidá závislost na `@formkit/nuxt` a zaregistruje se příslušný modul. Pak už jen vesele využíváme komponentu `<FormKit>` a stavíme si formuláře podle potřeby.

Ukázkový formulář obsahuje několik polí nejběžnějších datových typů a tlačítko pro odeslání. Většina polí je povinná a na poli pro věk je navíc nastavena validace od 18 do 99 let. Hodnoty se průběžně vypisují nad formulářem v surové podobě datového objektu, což demonstruje možnost okamžitého reaktivního propojení formulářových polí s dalším použitím v aplikaci. V případě úspěšného odeslání (po splnění validací) se aktualizuje datum a čas posledního odeslání.

## Shrnutí

FormKit možná není tak robustní jako jiné starší a propracovanější formulářové frameworky, ale do ekosystému Vue.js a Nuxtu se podle mě perfektně hodí, pročež je pro mě aktuálně jasná volba číslo jedna do mých aplikací.

V příštím již [10. díle Nuxt tutoriálu](/article/nuxt-content) posuneme o krok dál tvorbu obsahu -  ukážeme si modul **Nuxt Content**, který nám umožní psát v Markdown syntaxi, což je mnohem jednodušší než stylovat vše v HTML.
