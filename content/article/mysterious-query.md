---
file: 'mysterious-query'
cat: 'debugging'
title: 'Tajemný případ SQL query, které se nechtělo spustit'
dscr: 'Jak mě Copilot nasměroval, když už jsem nevěděl, kudy kam'
tags: ['debugging', 'Nuxt', 'Neon', 'SQL', 'bezpečnost', 'AI', 'Copilot']
date: '2025-12-13'
created: '13.12.2025'
edited: '13.12.2025'
english: 'https://dev.to/aloisseckar/the-mysterious-case-of-the-query-that-never-ran-1gd9'
---

Minulý víkend jsem se potýkal na podivnou chybou.

Refaktoroval jsem kód svého osobního webu. Jsem rekreační běžec a mám [přehled všech svých běžeckých výkonů](https://alois-seckar.cz/run). Data jsou uložená v [Neon PostreSQL databázi](https://neon.com/) a čtu je přes svůj vlastní modul [nuxt-neon](https://www.npmjs.com/package/nuxt-neon).

Aktualizoval jsem kód tak, aby využíval poslední změny v nejnovější verzi modulu. Konkrétně jsem se snažil změnit filtrování podle data (rok a/nebo měsíc). Původně jsem používal doslovnou `WHERE` podmínku v řetězci `r.date BETWEEN '${fromDate}' AND '${toDate}'`. Teď jsem chtěl otestovat v praxi nový objektový zápis:

```ts
where.push({ 
  column: 'r.date', 
  condition: '>=',
  value: fromDate,
});
where.push({ 
  column: 'r.date', 
  condition: '<=', 
  value: toDate, 
  operator: 'AND' 
});
```

Můžete namítnout, že je to mnohem složitější - a nejspíš byste i měli pravdu. Chtěl jsem ale ověřit, jak to doopravdy funguje mimo sterilní testy uvnitř mého modulu. A…

**Byl to totální propadák.**

Žádná data. Jen zlý, nepěkný HTTP chyba při pokusu získat data z Nuxt serverového endpointu:

```
NuxtNeonClientError in fetchFromNeonBackend: 
[POST] "/api/_neon/select": 400 Bad Request (status: 500). 
```

Krátké vysvětlení - můj modul poskytuje klientskou [composable](https://cs.vuejs.org/guide/reusability/composables.html#what-is-a-composable) `useNeon`, který vystavuje několik wrapperů nad SQL funkcemi (v tomto případě `select`). Tyto wrappery v podstatě jen přeposílají vstupní dotaz na Nuxt serverové endpointy pro jednotlivé SQL funkce. Díky tomu lze držet DB přihlašovací údaje bezpečně na serveru a nenechat je uniknout přes runtime konfiguraci do prohlížeče. Pokud vím, Neon neposkytuje bezpečné veřejné API klíče jako třeba Supabase.

Zanadával jsem si a začal pátrat, co je špatně.

Nejdřív jsem si myslel, že jsem nějak pokazil implementaci a vytvářím neplatný SQL dotaz. Ale proti téhle teorii mluvily dvě „ale“:

1. Úplně stejný dotaz fungoval bez problémů, když jsem ho reprodukoval jako nový případ v rámci testů mého modulu. A vlastně už jsem to, zda operátory _„větší než / menší než“_ umí vybírat správná data, dávno testoval.
2. Přestože jsem zapnul rozšířené debug logy modulu (můžete sledovat jak průběh zpracování, tak cílové SQL dotazy posílané na databázi), pro svůj požadavek jsem neviděl vůbec žádné údaje. Vypadalo to, jako by se endpoint vůbec nevolal.

Zoufale jsem se vrtal v souborech uvnitř `node_modules` a snažil se vystopovat, kde jsem a proč nevidím žádný použitelný výstup, který by mi pomohl problém pochopit.

Měl jsem slabé podezření, že kořen problému budou doslovné znaky `>` a `<`. Ale žádnou rozumnou teorii, proč by to mělo vadit.

Dal jsem si den pauzu a (nepřekvapivě) mě přes noc neosvítil žádný geniální nápad. Jako poslední možnost jsem se prostě zeptal Copilota. Váhal jsem, protože _**jaká by vůbec byla otázka**_? Když nerozumím, co se děje, jak mám instruovat bezduché LLM, aby přišlo s řešením? Bez dobrého promptu přece nedostanu dobrý výsledek, že ne?

No, ne - ale vlastně ano. Copilot mě sice magicky nezachránil, ale poskytl mi jedno důležité vodítko: _„Reprodukuj dotaz přes curl (obejdi prohlížeč i frontend)“_

To znamená: Zavolej endpoint přímo surovým HTTP požadavkem. Odizoluj ho od veškerého „šumu“ frontendového frameworku. Pak možná lépe pochopíš, co se rozbíjí ještě dřív, než backend vůbec stihne požadavek zpracovat. Udělal jsem tedy, co mi stroj poradil, a _voilà!_ - všechno do sebe najednou krásně zapadlo.

Ukázalo se, že můj požadavek odmítá [Nuxt Security modul](https://nuxt.com/modules/security) kvůli ochraně proti XSS útokům:

```
...\node_modules\.pnpm\nuxt-security@2.4.0_magicast@
0.3.5_rollup@4.52.5\node_modules\nuxt-security\dist\
runtime\server\middleware\xssValidator.js:38:18
```

Takhle už to bylo úplně jasné. Problém byl, že ten konkrétní řádek chybový výpisu Nuxt „spolkl“ a nechal mě jen kryptickou chybu bez zjevné příčiny.

Opravdu šlo o ty `>` a `<` závorky. Nuxt Security je považoval za potenciálně škodlivý pokus propašovat do payloadu skript. Mezi námi - tenhle modul je pro ochranu Nuxt aplikací skvělý. Vyžaduje minimální úsilí pro nastavení a hlídá kde co. Jen vás občas takhle nepříjemně „kousne“.

To byl tedy ten chybějící dílek. V testech to fungovalo, protože naivní demo aplikace si s bezečností zase tolik neláme hlavu. Na své homepage jsem ale zvolil pokročilejší ochranu - a vymstilo se mi to. Ale aspoň jsem problém našel sám sobě já a až někdo z možných budoucích konzumentů mého modulu.

Abych situaci vyřešil, přidal jsem do modulu interní mapování, které na klientovi převádí špičaté závorky na textové zkratky a při skládání skutečného SQL dotazu na serveru je zase vrací zpět. Kvůli pohodlí uživatelů raději nechávám `>` a `<` k dispozici, místo abych všechny nutil učit se, že mají používat abstrakce `GT` a `LT`.

Ačkoliv samotná příčina chyby ani její řešení průlomové nejsou, stejně mi přišlo, že unikátní kombinace okolností stojí za tento článek. Chtěl jsem se podělit o pár „lessons learned“:

1. **`Nebojte se požádat AI o pomoc`** - I když ještě neznáte správnou otázku, prostě se zeptejte: _„Proč mi to vrací tuhle chybu?“_ Začněte situaci vysvětlovat a třeba vás _vibe debugging_ k cíli dovede. Stále ještě mě překvapuje, jak účinné to v poslední době bývá.
2. **`Izolujte problém`** - Když se zdá, že backend nereaguje správně, zavolejte ho přímo, abyste omezili možnou interferenci. Po tolika letech práce vývojáře bych to měl vědět sám, ale nějak jsem se ve frontendové zemi ztratil a potřeboval virtuálního asistenta, aby mě vytáhl zpět.
3. **`Počítejte s kodém třetích stran`** - Možná to není jen váš kód, co dělá neplechu. Možná se chová zvláštně nějaká použitá knihovna (kvůli něčemu ve vašem kódu).

Software lépe či hůře vyvíjím už přes dvacet let. Cítím se jako senior a jsem tak i většinou brán. Ale jak vidíte, pořád se občas zaseknu na triviálních situacích a zpětně si připadám docela hloupě. Myslím ale, že je to součást procesu. Pořád narážíte do zdí, padáte a zase vstáváte - připraveni na další bitvu s vlastním kódem a vlastními chybami.

Jestli jste to dočetli celé, díky. Snad to někomu jednou někde pomůže. A budu se těšit někdy příště u popisu další podobné lapálie.
