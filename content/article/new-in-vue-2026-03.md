---
file: 'new-in-vue-2026-03'
cat: 'web'
title: 'New in Vue - Březen 2026'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za březen 2026'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2026-03-28'
created: '28.03.2026'
english: 'https://dev.to/aloisseckar/new-in-vue-march-2025-2g74'
unchecked: true
---

[Slíbil jsem](/article/new-in-vue-2026-02) nové shrnutí, až skončí [VueJS Amsterdam](https://vuejs.amsterdam/). Trvalo mi to o dva týdny déle, ale jsme tady. Slyšte, slyšte! Přináším nejnovější novinky ze světa Vue.

::vue-newsletter
::

Bohužel musím začít smutnou zprávou - **Weekly Vue News**, neocenitelný zdroj inspirace pro Vue vývojáře, končí. Jejich dlouholetý kurátor Michael Hoffmann [s tím seknul](https://weekly-vue.news/issues/v2/205). Budiž jeho tvrdá práce vzpomenuta.

Ale život jde dál. A život v ekosystému Vue je všechno, jen ne nudný. Pojďme si tedy shrnout nové verze a vydání:

Nejvýznamnější je bezpochyby [**Vite 8.0**](https://vite.dev/blog/announcing-vite8). Proč? Protože Vite je dnes základem moderního JS vývoje. A v8 přináší důležité novinky, jako je použití zbrusu nového a superrychlého bundleru [Rolldown](https://rolldown.rs/). Od prosince probíhala fáze beta testování a nyní byla zpřístupněna stabilní verze.

Navíc tu je [**Vite+**](https://voidzero.dev/posts/announcing-vite-plus-alpha) - sjednocený moderní toolchain postavený na nejnovějších dostupných funkcích jako _"This is the way"_ vývoje webových aplikací v roce 2026. Projekt je momentálně ve stavu Alpha a stabilní vydání se očekává brzy.

**Vitest**, testovací framework, nemohl zůstat pozadu a [vydal v4.1](https://vitest.dev/blog/vitest-4-1.html). Na rozdíl od zásadní aktualizace v4 se jedná spíše o servisní update pro nativní podporu Vite v8. Ale jsou tu i některé nové funkce, které stojí za vyzkoušení. Pokud Vitest ve svém projektu nepoužíváte, měli byste o tom popřemýšlet.

**Nuxt**, framework číslo jedna pro Vue projekty, pokračuje ve svém stabilním vývoji, přičemž [v4.4](https://nuxt.com/blog/v4-4) je nejnovější vydání. S každou minor verzí se objeví něco nového, i když změny nejsou nijak revoluční. Totéž platí pro **Nuxt UI**, oficiální UI knihovnu - od mého posledního newsletteru vyšly verze [v4.5](https://github.com/nuxt/ui/releases/tag/v4.5.0) a [v4.6](https://github.com/nuxt/ui/releases/tag/v4.6.0). Pro menší projekty opravdu nepotřebujete nic jiného na řešení vzhledu a základního UX.

Nuxt už vyhlíží svoji verzi 5. Můžete se dokonce přihlásit k budoucí dopředné kompatibilitě [prostřednictvím nastavení](https://nuxt.com/docs/4.x/guide/going-further/features#compatibilityversion). Jedním z předpokladů je finalizace **Nitro v3**, JS serverového enginu. Tento milník je nyní o krok blíž, protože [začala jeho beta fáze](https://nitro.build/blog/v3-beta).

Z nových nástrojů chci upozornit na první stabilní vydání [**Pinia Colada**](https://pinia-colada.esm.dev/), pokročilého Vue řešení pro načítání dat a správu stavu. O Pinii jste pravděpodobně slyšeli, toto posouvá koncept dál a je od stejného autora.

Nesmím zapomenout na [evlog](https://www.evlog.dev/), nový logovací nástroj od Huga Richarda, jednoho z členů Nuxt týmu. Ještě jsem si na něj nesáhl, ale opravdu to chci brzy udělat. Líbí se mi myšlenka mít své logy lépe organizované. Logování je obecně těžké - je jedno, dokud není pozdě. Že ano?

Pokud se snažíte držet krok s dobou a používáte AI ke zvýšení své vývojářské produktivity (což byste rozhodně měli), tohle by se vám mohlo hodit - Daniel Kelly z VueSchool napsal článek o [Vue Agent skills](https://vueschool.io/articles/vuejs-tutorials/vue-agent-skills-for-reliable-ai-development/), které by měly postupně zlepšit kvalitu výstupů GenAI nástrojů.

V neposlední řadě tu máme [novou verzi TypeScriptu](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/). Microsoft vydal stabilní verzi před 5 dny. Nicméně tato verze je považována spíše za méně důležitý můstek na cestě k v7, která má být tou skutečnou změnou poté, co bude její jádro přepsáno do jazyka `Go` pro lepší výkon. Takže nemusíte nutně všeho nechat a začít migrovat své kódové báze na v6.

To je pro dnešek vše. Až se příště ozvu, doufám, že budu moci sdílet podrobnosti o konferenci [PragVue 2026](https://pragvue.com/), kterou se chystáme organizovat už potřetí. Do té doby se mějte.
