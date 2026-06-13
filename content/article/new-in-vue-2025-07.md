---
file: 'new-in-vue-2025-07'
cat: 'web'
title: 'New in Vue - Červenec 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za červenec 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-07-14'
created: '14.07.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-july-2025-24id'
---

Už nějaký čas sleduju Vue komunitu. Čtu články, dívám se na videa, setkávám se s inspirativními lidmi, občas i drobně přispívám, spravuji [český překlad Vue.js dokumentace](https://cs.vuejs.org/) a dokonce [organizuji výroční konferenci v Praze](https://pragvue.com/).

Minulý týden se staly dvě zajímavé věci, které mě inspirovaly k napsání tohoto článku. Doufám, že se z toho stane něco jako newsletter, který budu schopen více či méně pravidelně publikovat. Vue je stále mnoha lidmi přehlíženo, přestože je to vyspělý a užitečný JS framework plně schopný konkurovat těm známnějším. Zaslouží si více pozornosti a já bych s tím rád pomohl. Pojďme na to.

::vue-newsletter
::

## Vercel + Nuxt = ?

První věc, která ekosystémem Vue.js rezonuje, je akvizice [NuxtLabs](https://nuxtlabs.com/) poskytovatelem cloudové platformy [Vercel](https://vercel.com/). Praktickým výsledkem je, že čtyři důležití členové týmu [frameworku Nuxt](https://nuxt.com/) - Sebastien Chopin, Daniel Roe, Pooya Parsa a Anthony Fu - jsou nyní zaměstnanci Vercelu na plný úvazek. Jejich nová práce je údajně jednoduchá: _"Pokračujte ve vývoji Nuxtu!"_.

Tato informace přistála zcela nečekaně (alespoň pro mě) 8. července. Od té doby se o tom stihlo napsat a říct mnohé. Lidé jsou za ně většinou rádi, přejí jim to a vnímají to jako příležitost. Někteří se však obávají, že přítomnost Vercelu může mít negativní dopad na budoucnost.

Věřím, že nejdůležitější je to, co si myslí přímí účastníci. Prohlášení Daniela Roe, vedoucího týmu, je dostupné [ZDE](https://github.com/nuxt/nuxt/discussions/32559). Také jsem sledoval [novou epizodu podcastu DejaVue](https://youtu.be/xHbjFW9EJ-8?si=PotSbp3pcHePdIqA) věnovanou tomuto kroku. Pokud jsou pozitivní oni, měli bychom být i my. Kromě finanční jistoty byla jednou z velkých výhod zmíněna možnost úzké spolupráce s ostatními open-source týmy pod křídly Vercelu, aby si vyměňovali zkušenosti a nezůstali uzamčeni ve svém jednom paradigmatu. Nuxt vždy uživatelům poskytoval možnost volby a toto s takovou filozofií souzní.

Také nezapomeňte, že nešlo o _"Vercel kupuje Nuxt"_. Nuxt zůstává open source s licencí MIT a sotva by se něco změnilo. Ale klíčoví lidé z vývojového týmu jsou nyní podporováni silným hráčem. Je to trochu jako soukromé sponzorství. A to znamená, že svých osobních 12 dolarů měsíčně mohu přesunout někam jinam.

Mezitím se Nuxt nadále zlepšuje. Patch verze [3.17.7](https://github.com/nuxt/nuxt/releases/tag/v3.17.7) byla vydána zrovna včera a cesta ke stabilnímu Nuxt v4 je otevřena s [v4.0.0-rc.0](https://github.com/nuxt/nuxt/releases/tag/v4.0.0-rc.0).

Slovy Daniela Roe: _"The future is bright."_

## Vue 3.6 vstupuje do alfa fáze

Druhé oznámení bylo učiněno v mateřském projektu. Vue framework se připravuje na vydání nové minor verze **3.6** po [téměř roce](https://github.com/vuejs/core/releases/tag/v3.5.0) života s **v3.5**. Během [Vue konference v Číně](https://vueconf.cn/) byla [vydána](https://github.com/vuejs/core/releases/tag/v3.6.0-alpha.1) první alfa verze **v3.6**.

Zatímco by to i samo o sobě bylo pozoruhodnou zprávou, je tu jedna funkce, která ji činí extrémně zajímavou. Nazývá se **Vapor mode** a jde o novou možnost kompilace pro Vue komponenty. Je to očekávaná změna vyvíjená už od listopadu 2023 v separátním repozitáři. Cílí na lepší výkon a menší velikosti balíčků.

Dobrým shrnutím Vapor Mode a všech ostatních nadcházejících funkcí je [tento článek od VueSchool](https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/).

Nicméně, i když se už věci daly do pohybu, ještě stále zbývá kus cesty k obecné dostupnosti. Minule bylo 5 alf, 3 bety a verze rc.1 a trvalo to několik měsíců, než byla **v3.5** konečně vydána. Ale dostáváme se tam. Už si to můžete vyzkoušet. Ve skutečnosti jste vyzýváni ke zkušebnímu použití a k hlášení jakýkoli chyb a obtíží, na které můžete narazit.

---

To je vše pro toto první (nebo možná nulté) vydání. Děkuji za přečtení. Pro zájemce o další čerstvé novinky udržuji seznam [Nuxt News](https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md) na GitHubu, zatím bez lepšího UI.

Dalším skvělým zdrojem aktuálních informací je Michael Hoffman a jeho [Weekly Vue News](https://weekly-vue.news/), rozhodně nejlepší Vue newsletter, o kterém vím.
