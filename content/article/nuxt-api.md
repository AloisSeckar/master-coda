---
file: 'nuxt-api'
cat: 'web'
title: 'Nuxt Tutorial 4 - Serverová část'
dscr: 'Nuxt - jak funguje serverová část'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial']
date: '2025-11-16'
created: '16.11.2025'
english: 'https://dev.to/aloisseckar/nuxt-tutorial-4-server-side-2dal'
---

Dosud jsme se pohybovali v tzv. klientské části Nuxt aplikace. Stránky (`/app/pages`) tvořené komponentami (`/app/components`) a poháněné logikou umístěnou ve složkách `/app/composables` a `/app/utils` jsou základní stavební prvky toho, co nakonec vidí uživatel - frontend. Pro řadu aplikací, zejména těch menších, to úplně stačí. 

Nuxt ale nabízí funkcionalitu i pro backendové operace. Umožňuje vystavit API endpointy, přijímat a zpracovávat na ně přijímané požadavky, a sloužit tak i jako plnohodnotný server - a to vše dohromady v jedné kódové bázi.

## Nitro

Nuxt je postaven na využití interního webového server enginu [Nitro](https://nitro.build/). Nitro tvoří vlastní runtime nezávislý na všem ostatním a zajišťuje běhové prostředí aplikace, které nám pak poskytuje řadu skvělých funkcí. Vývojáři ocení třeba hot-module-reload (HMR) při vývoji - stačí uložit soubor a změny se ihned promítnou a nasadí do lokálně běžící verze. Pokud s programováním začínáte dnes, může vám to už připadat jako samozřejmost, ale nebylo to vždycky tak snadné...

Další vymožeností Nitra je [API vrstva](https://nuxt.com/docs/4.x/guide/concepts/server-engine#api-layer). Ta umožňuje jednoduše tvořit a vystavovat endpointy, jenž pak lze přes HTTP(S) požadavky provolávat.

## /server

Soubor, kterým se API endpoint realizuje, vypadá jednoduše takto:

```ts
export default defineEventHandler((event) => {
  // obslužný kód
})
```

Stačí jej umístit do další speciální složky `/server/api` nebo `/server/routes` a Nuxt si ho automaticky zpracuje a začne vystavovat. Rozdíl mezi uvedenými dvěma složkami je, že obslužný handler ze souboru `/server/api/foo.ts` bude vystaven na `http://localhost:3000/api/foo`, zatímco ze souboru `/server/routes/foo.ts` přímo na `http://localhost:3000/foo`. Podsložka `/server/api` je tedy de-facto totéž jako `/server/routes/api`. Použití prefixu `/api` je poměrně časté, proto existuje jako samostatná možnost, pokud ale trváte na větší volnosti, můžete použít `/routes` a uvnitř rozvinout svou server-side strukturu podle libosti.

Pomocí _suffixů_ za tečkou v názvech souborů lze jednoduše upřesnit, kterou [HTTP metodu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) handler obsluhuje. Soubor `/server/api/foo.get.ts` umožní na `http://localhost:3000/api/foo` volat GET, `/server/api/foo.post.ts` vystaví na `http://localhost:3000/api/foo` POST. Logika obou může být výrazně odlišná. Využít je možné všechny [HTTP metody](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Pokud není suffix metody specifikován, handler obslouží všechny metody stejným způsobem.

Obslužný callback `defineEventHandler` může přijmout vstupní parametr `event`, který je typu `H3Event` z frameworku [h3](https://github.com/unjs/h3). Tento minimalistický HTTP framework, který v sobě Nuxt, resp. Nitro integruje, přináší celou řadu užitečných funkcí. Například načíst obsah příchozího `POST` požadavku k dalšímu zpracování můžeme jednoduše takto:

```ts
export default defineEventHandler(async (event) => {
    const postData = await readBody(event)
    // další zpracování vstupu
}
```

V proměnné `event.node.req` zase naleznete parametry příchozího HTTP požadavku ve formátu [Node.js HTTP](https://www.w3schools.com/nodejs/obj_http_incomingmessage.asp). Snadno si tak lze sáhnout například na HTTP hlavičky, které jsou umístěny v poli `headers`.

Důležitá vlastnost, kterou bych rád zmínil už teď, přestože se k ní ještě vrátíme později, je to, že kód běžící v serverové části běží skutečně **na serveru** - tedy tam, kde bude vaše aplikace v budoucnu nasazená. Ven do internetového světa vypouští pouze to, co sami určíte v návratových hodnotách obslužných handlerů. Cokoliv, kde se zadávají citlivé údaje - hesla či API klíče - by mělo být takto odstíněno od prohlížeče cílového uživatele, jinak hrozí narušení bezpečnosti a úniky dat. Zmiňuji to proto, že existují způsoby, jak například databázi volat z klientských funkcí přímo a mohlo by vás svádět je pro jednoduchost používat. Nedělejte to a citlivé operace vždy schovejte za bezpečnou vrstvu serverové části.

## Případová studie

Na [úvodní stránce](/) naleznete několik odrážek _„Co nového v XY?“_ Data, která se zde zobrazují, pocházejí z mnou udržovaných seznamů článků na GitHubu. Například [ZDE](https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md) je přehled novinek v Nuxt/Vue světě. Na tyto zdrojové soubory se odkazují Nuxt-powered webové služby, které z nich načítají _nejnovějších 5 článků_. Služba pro Nuxt novinky běží na mém osobním webu zde: [https://alois-seckar.cz/nuxt-news](https://alois-seckar.cz/nuxt-news).

Její vlastní [implementace](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/routes/nuxt-news.ts) je velmi jednoduchá, hlavní práci obstará [utility funkce](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/utils/last-articles.ts), která si přečte zadanou URL s markdown souborem a pomocí knihovny [node-html-parser](https://www.npmjs.com/package/node-html-parser) z ní vybere potřebná data.

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-api @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-api)

Serverová část projektu vystavuje dva API endpointy:
- `sample.get.ts` - vrátí text _„Hello from Nuxt Server!“_ + aktuální datum a čas (aby bylo vidět, že se požadavek pokaždé znovu procesuje)
- `error.get.ts` - úmyslně vrací náhodnou [HTTP chybu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) 400-410

Jednoduchý frontend po stisknutí tlačítka provolává a čte výsledek `sample.get.ts`. Dále můžete přímým odkazem navštívit oba vystavené endpointy. Pokud to zkusíte pro "chybovou" službu, uvidíte zároveň, jak nejnovější Nuxt (`v4.2`) v dev módu zachycuje a zobrazuje chyby, které ve vašich aplikacích nevyhnutelně budou vznikat.

## Další odkazy
* [Web scraper in Nuxt 3 (Alois Sečkár)](https://dev.to/aloisseckar/web-scraper-in-nuxt-3-part-i-introduction-and-setting-up-4bb5) (EN) - můj podrobnější čtyřdílný _step-by-step_ návod jak pracovat s Nuxt backendem
* [Server Routes in Nuxt 3 (Michael Thiessen)](https://masteringnuxt.com/blog/server-routes-in-nuxt-3) (EN)
* [Dokumentace - Nuxt `/server`](https://nuxt.com/docs/4.x/directory-structure/server) (EN)
* [Dokumentace - Nitro](https://nitro.build/guide) (EN)
* [Dokumentace - h3](https://h3.dev/guide) (EN)

## Shrnutí

Serverová část Nuxt frameworku je určena k backendovým operacím. Umožňuje tvořit a vystavovat vlastní API, které lze poskytovat buďto navenek do internetu, nebo ji také lze využít k logické separaci kódu - serverová část slouží k obsluze volání externích API a k manipulaci s daty, které pak aplikace v klientské frontendové části pouze zobrazuje. Operace vyžadující zadávání citlivých údajů - hesel či API klíčů - by měly být vždy prováděny na serveru, protože tam jsou chráněny před únikem do volného internetu.

Stejně jako složka `/app/pages` umožňuje routing na straně klienta, složky `/server/api` a `/server/routes` abstrahují vývojáře od nutnosti definovat vlastní cesty. Staráte se pouze o svůj vlastní aplikační kód.

[Další část tutoriálu](/article/nuxt-middleware){external} představí koncept <strong>middleware</strong>, což jsou obslužné metody, které je možné automaticky volat před vykreslením frontendu nebo před zpracováním dat v serverové části.
