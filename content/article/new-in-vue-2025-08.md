---
file: 'new-in-vue-2025-08'
cat: 'web'
title: 'New in Vue – Srpen 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za srpen 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-08-06'
created: '06.08.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-august-2025-lip'
unchecked: true
---

Jsou to tři týdny od mého [prvního článku New in Vue](https://dev.to/aloisseckar/new-in-vue-july-2025-24id), je na čase začít skládat další. Věděli jste, že je vlastně docela těžké nutit se do psaní článků pravidelně? Ale svět Vue.js se neustále vyvíjí a nová inspirativní témata vznikají téměř každý den. Podívejme se.

::vue-newsletter
::

## Vite 7.0 a velké plány do budoucna

Nová hlavní verze tohoto de-facto standardního build nástroje pro (nejen) Vue [byla vydána 24. června](https://vite.dev/blog/announcing-vite7). [Změny](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#700-2025-06-24) tentokrát nejsou míněny jako revoluční, ale jak můžete vidět z odkazovaného changelogu, je to velmi živý projekt a spousta oprav a nových funkcí byla již dodána v následujících minor/patch verzích.

Vite je dnes pojem v moderním světě JavaScriptu, pomalu si razí cestu do více a více projektů a frameworků. Nedávno předstihl Webpack v popularitě (měřeno týdenními staženími na NPM):

{% embed https://x.com/youyuxi/status/1950234261573038444 %}

Ale to je stále jen začátek. Sledoval jsem nedávnou prezentaci Evana You z konference JSNation o všech nových věcech, které jsou na cestě:

{% embed https://youtu.be/cXiy8jtgfmM?si=jHsH_vookp8Bxphc %}

Mezitím se některé z těchto věcí už dějí ve _"ViteLandu"_. Pokud máte zájem, můžete si přečíst [tento užitečný přehled](https://voidzero.dev/posts/whats-new-jul-2025). A buďte si jistí, že nás brzy zasáhnou další novinky.

## Vizuální testování míří do Vitestu v4

[Vitest](https://vitest.dev/) je testovací framework, který už nyní stojí za vaši pozornost. Ale brzy bude ještě lepší! Jak bylo [nedávno oznámeno](https://x.com/TheAlexLichter/status/1952457050883236296), nadcházející nová verze 4 bude obsahovat vestavěné vizuální regresní testy prostřednictvím funkce `toMatchScreenshot`. Momentálně je to stále v beta verzi, ale věřím, že jsme jen pár dní od GA vydání.

[Vizuální regresní testování](https://github.com/mojoaxel/awesome-regression-testing) je docela užitečná technika pro nalezení neočekávaných chyb zaváděných se změnami ve frontend aplikacích. Podařilo se mi nastavit pro jeden z mých vedlejších projektů – vykresluje věci na HTML canvas a potřebuji být si jistý, že pokud něco změním v renderovacím enginu, všechny případy (momentálně 220+) stále dávají očekávaný výstup.

Opravdu mi to ušetřilo spoustu trapných chyb, protože přirozeně sotva předvídáte všechny důsledky vašich změn. Mé řešení má ale dva problémy - stalo se docela pomalým (více než 5 minut) a je postaveno na knihovně nazvané [BackstopJS](https://github.com/garris/backstopjs), která už není moc udržována.

Přemýšlel jsem o nalezení nějaké alternativy a všiml si snah to udělat ve Vitestu. Ale teď to vypadá, že to bude zahrnuto přímo ve frameworku, žádné vlastní workaroundy! Jsem nadšený a těším se, až to vyzkouším. Dám vám vědět, jak to dopadlo.

## Nuxt - stabilní zpětně kompatibilní evoluce

Od té doby, co byl **Nuxt 4** [vydán](https://nuxt.com/blog/v4) minulý měsíc, už jsme dostali tři patch verze, které se zdají být vydávány v docela stabilním týdenním tempu. Každá opravuje nějaké nové problémy a činí framework lepším a lepším.

Mezitím byl také otevřen kanál zpětné kompatibility. S [Nuxt 3.18](https://nuxt.com/blog/v3-18) začaly proudit nové funkce a věci, které jsou opravovány ve v4 a mohou být zpětně portovány do v3. Tato podpora bude udržována nejméně půl roku. To by mělo dát všem používajícím Nuxt v3 dostatek času na naplánování a provedení migrace, která by mimochodem měla být opravdu docela snadná, pokud nemáte nějaké velmi speciální nastavení.

A pokud přece jen máte, neváhejte [vyhledat pomoc](https://nuxt.com/docs/4.x/community/getting-help) od týmu Nuxt. Jsou velmi přátelští a nápomocní.

---

To je prozatím vše. Děkuji za pozornost, užijte si zbytek léta a uvidíme se zase za měsíc nebo tak :wave:
