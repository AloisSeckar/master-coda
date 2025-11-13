---
file: 'new-in-vue-2025-07'
cat: 'web'
title: 'New in Vue – Červenec 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za červenec 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-07-14'
created: '14.07.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-july-2025-24id'
unchecked: true
---

Sleduji Vue komunitu už nějaký čas. Čtu články, sleduji videa, setkávám se s úžasnými lidmi, občas přispívám, spravuji [český překlad Vue dokumentace](https://cs.vuejs.org/) a dokonce [organizuji konferenci v Praze](https://pragvue.com/).

Minulý týden se staly dvě zajímavé věci, které mě inspirovaly k napsání tohoto článku. Doufám, že se z toho stane něco jako newsletter, který budu schopen publikovat více či méně pravidelně. Vue je stále přehlíženo mnoha lidmi, přestože je to vyspělý a užitečný JS framework plně schopný konkurovat ostatním. Zaslouží si více pozornosti a rád bych pomohl. Pojďme na to.

::vue-newsletter
::

## Vercel + Nuxt = ?

První věc, která rezonuje ekosystémem Vue.js, je akvizice [NuxtLabs](https://nuxtlabs.com/) poskytovatelem cloudové platformy [Vercel](https://vercel.com/). Praktickým výsledkem je, že čtyři důležití členové týmu [Nuxt frameworku](https://nuxt.com/) - Sebastien Chopin, Daniel Roe, Pooya Parsa a Anthony Fu - jsou nyní zaměstnanci Vercelu na plný úvazek. Jejich nová práce je údajně jednoduchá: _"Pokračujte ve vývoji Nuxtu!"_.

Tato informace dopadla zcela nečekaně (alespoň pro mě) 8. července. Od té doby se o tom mnoho napsalo a řeklo. Lidé jsou za ně většinou rádi a vnímají to jako příležitost. Někteří se obávají, že přítomnost Vercelu může mít negativní dopad na budoucnost.

Věřím, že nejdůležitější je to, co si myslí přímí účastníci. Prohlášení Daniela Roe, vedoucího týmu, je dostupné [ZDE](https://github.com/nuxt/nuxt/discussions/32559). Také jsem sledoval [novou epizodu DejaVue podcastu](https://youtu.be/xHbjFW9EJ-8?si=PotSbp3pcHePdIqA) věnovanou tomuto kroku. Pokud jsou pozitivní oni, měli bychom být i my. Kromě finanční jistoty byla jednou z velkých výhod zmíněna možnost úzké spolupráce s ostatními open‑source týmy pod křídly Vercelu, aby si vyměňovali zkušenosti a nezůstali uzamčeni v jednom paradigmatu. Nuxt vždy uživatelům poskytoval možnost volby a toto s takovou filozofií souzní.

Také nezapomeňte, že nešlo o _"Vercel kupuje Nuxt"_. Nuxt zůstává open source s licencí MIT a sotva by se něco změnilo. Ale klíčoví lidé z vývojového týmu jsou nyní podporováni silným hráčem. Je to trochu jako soukromé sponzorství. A to znamená, že svých osobních 12 dolarů měsíčně mohu přesunout někam jinam.

Mezitím se Nuxt nadále zlepšuje. Patch verze [3.17.7](https://github.com/nuxt/nuxt/releases/tag/v3.17.7) byla vydána právě včera a cesta ke stabilnímu Nuxt v4 je otevřena s [v4.0.0-rc.0](https://github.com/nuxt/nuxt/releases/tag/v4.0.0-rc.0).

Slovy Daniela Roe: _"Budoucnost je světlá."_

## Vue 3.6 vstupuje do alfa fáze

Druhé oznámení bylo učiněno v mateřském projektu. Vue framework se připravuje na vydání nové minor verze **3.6** po [téměř roce](https://github.com/vuejs/core/releases/tag/v3.5.0) života s **v3.5**. Během [Vue konference v Číně](https://vueconf.cn/) byla [vydána](https://github.com/vuejs/core/releases/tag/v3.6.0-alpha.1) první alfa verze v3.6.

Zatímco by to samo o sobě bylo pozoruhodnou zprávou, je zde jedna funkce, která to činí extrémně zajímavým. Nazývá se **Vapor mode**, nová možnost kompilace pro Vue komponenty. Je to očekávaná změna vyvíjená od listopadu 2023 v separátním repozitáři. Cílí na lepší výkon a menší velikosti balíčků.

Dobrým shrnutím Vapor Mode a všech ostatních nadcházejících funkcí je [tento článek od VueSchool](https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/).

Nicméně, zatímco se věci daly do pohybu, ještě zbývá kus cesty k obecné dostupnosti. Minule bylo 5 alf, 3 bety a verze rc.1 a trvalo to několik měsíců, než byla **v3.5** konečně vydána. Ale dostáváme se tam. Už si to můžete vyzkoušet. Ve skutečnosti jste k tomu vyzýváni a měli byste hlásit jakékoli chyby a obtíže, na které můžete narazit.

---

To je vše pro toto první (nebo možná nulté) vydání. Děkuji za přečtení. Pro další novinky udržuji seznam [Nuxt News](https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md) na GitHubu, zatím bez lepšího UI.

Také skvělým zdrojem aktuálních informací je Michael Hoffman a jeho [Weekly Vue News](https://weekly-vue.news/), rozhodně nejlepší Vue newsletter, o kterém vím.