---
file: 'nuxt-api'
cat: 'web'
title: 'Nuxt Tutorial 4 - Serverová část'
dscr: 'Nuxt - jak funguje serverová část'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial']
date: '2024-05-01'
created: '01.05.2024'
edited: '01.05.2024'
---

Dosud jsme se pohybovali v tzv. klientské části Nuxt aplikace. Stránky (`/pages`) tvořené komponentami (`/components`) a poháněné logikou umístěnou ve složkách `/composables` a `/utils` jsou základní stavební prvky toho, co nakonec vidí uživatel - frontend. Pro řadu aplikací, zejména těch menších, to úplně stačí. 

Nuxt ale nabízí funkcionalitu i pro backendové operace. Umožňuje vystavit API endpointy, přijímat a zpracovávat na ně přijímané požadavky, a sloužit tak i jako prakticky plnohodnotný server.

## Nitro

Nuxt funguje dynamicky díky internímu webovému server enginu [Nitro](https://nitro.unjs.io/). Nitro si vytváří vlastní runtime nezávislý na všem ostatním a tvoří běhové prostředí aplikace, které poskytuje řadu skvělých funkcí. Vývojáři ocení třeba hot-module-reload (HMR) při vývoji - stačí uložit soubor a změny se ihned promítnou a nasadí do lokálně běžící verze. Pokud s programováním začínáte dnes, může vám to už připadat jako samozřejmost, ale nebylo to vždycky tak snadné...

Další vymožeností Nitra je [API vrstva](https://nuxt.com/docs/guide/concepts/server-engine#api-layer), která umožňuje jednoduše tvořit a vystavovat endpointy, které pak lze přes HTTP(S) požadavky provolávat.

## /server

Soubor, kterým se API endpoint realizuje, vypadá jednoduše takto:

```ts
export default defineEventHandler((event) => {
  // obslužný kód
})
```

Stačí jej umístit do další speciální složky `/server/api` nebo `/server/routes` a Nuxt si ho automaticky zpracuje a začne vystavovat. Rozdíl mezi uvedenými dvěma složkami je, že obslužný handler ze souboru `/server/api/foo.ts` bude vystaven na `http://localhost:3000/api/foo`, zatímco ze souboru `/server/routes/foo.ts` přímo na `http://localhost:3000/foo`. Podsložka `/server/api` je tedy de-facto totéž jako `/server/routes/api`. Použití prefixu `/api` je poměrně časté, proto existuje jako samostatná možnost, pokud ale trváte na větší volnosti, můžete použít `/routes` a uvnitř rozvinout svou strukturu podle libosti.

Pomocí _suffixů_ za tečkou v názvech souborů lze jednoduše upřesnit, kterou [HTTP metodu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) handler obsluhuje. Soubor `/server/api/foo.get.ts` umožní na `http://localhost:3000/api/foo` volat GET, `/server/api/foo.post.ts` vystaví na `http://localhost:3000/api/foo` POST. Logika obou může být výrazně odlišná. Podle [dokumentace](https://nuxt.com/docs/guide/directory-structure/server) jsou podporovány metody `GET`, `POST`, `PUT` a `DELETE`, tedy ne úplně všechny, ale ty zbylé v běžném provozu stejně příliš často nepotkáte.

Obslužný callback `defineEventHandler` může přijmout vstupní parametr `event`, který je typu `H3Event` z frameworku [h3](https://github.com/unjs/h3). Tento minimalistický HTTP framework, který v sobě Nuxt, resp. Nitro integruje, nabízí celou řadu užitečných funkcí. Například načíst obsah příchozího `POST` požadavku k dalšímu zpracování můžeme jednoduše takto:

```ts
export default defineEventHandler(async (event) => {
    const postData = await readBody(event)
    // další zpracování vstupu
}
```

V proměnné `event.node.req` zase naleznete parametry příchozího HTTP požadavku ve formátu [Node.js HTTP](https://www.w3schools.com/nodejs/obj_http_incomingmessage.asp). Snadno si tak lze sáhnout například na HTTP hlavičky, které jsou umístěny v poli `headers`.

## Případová studie

Na [úvodní stránce](/) naleznete několik odrážek _„Co nového v XY?“_ Data, která se zde zobrazují, pocházejí z mých seznamů článků na GitHubu, které si průběžně udržuju. Například [ZDE](https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md) je přehled novinek v Nuxt/Vue světě. Na tyto zdrojové soubory se odkazují Nuxt-powered webové služby, které z nich načítají _nejnovějších 5 článků_. Služba pro Nuxt novinky běží zde: [https://alois-seckar.cz/nuxt-news](https://alois-seckar.cz/nuxt-news).

Její vlastní [implementace](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/routes/nuxt-news.ts) je velmi jednoduchá, hlavní práci obstará [utility funkce](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/utils/last-articles.ts), která si přečte zadanou URL s markdown souborem a pomocí knihovny [node-html-parser](https://www.npmjs.com/package/node-html-parser) z ní vybere potřebná data.

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-api @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-api)

Serverová část projektu vystavuje dva API endpointy:
- `sample.get.ts` - vrátí text _„Hello, Nuxt!“_ + aktuální datum a čas (aby bylo vidět, že se požadavek pokaždé znovu procesuje)
- `error.get.ts` - úmyslně vrací náhodnou [HTTP chybu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) 400-410

Jednoduchý frontend provolává a zobrazuje výsledek `sample.get.ts`. Endpoint s chybou si můžete zkusmo provolat sami, když do prohlížeče zadáte:

`http://localhost:3000/api/error`

## Další odkazy
* [Web scraper in Nuxt 3 (Alois Sečkár)](https://dev.to/aloisseckar/web-scraper-in-nuxt-3-part-i-introduction-and-setting-up-4bb5) (EN) - můj čtyřdílný _step-by-step_ návod jak pracovat s Nuxt backendem
* [Server Routes in Nuxt 3 (Michael Thiessen)](https://masteringnuxt.com/blog/server-routes-in-nuxt-3) (EN)
* [Dokumentace - Nuxt `/server`](https://nuxt.com/docs/guide/directory-structure/server) (EN)
* [Dokumentace - h3](https://github.com/unjs/h3) (EN)

## Shrnutí

Serverová část Nuxt frameworku je určena k de-facto backendovým operacím. Umožňuje tvořit a vystavovat vlastní API, které lze poskytovat buďto navenek do internetu, nebo ji také lze využít k logické separaci kódu - serverová část slouží k obsluze volání externích API a k manipulaci s daty, které pak aplikace v klientské frontendové části pouze zobrazuje.

Stejně jako složka `/pages` umožňuje routing na straně klienta, složky `/server/api` a `/server/routes` abstrahují vývojáře od nutnosti definovat vlastní cesty.

[Další část tutoriálu](/article/nuxt-middleware) představí koncept <strong>middleware</strong>, což jsou obslužné metody, které je možné automaticky volat před vykreslením frontendu nebo před zpracováním dat v serverové části.
