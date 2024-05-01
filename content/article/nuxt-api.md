Dosud jsme se pohybovali v&nbsp;tzv. klientské části Nuxt aplikace. Stránky (`/pages`) tvořené komponentami (`/components`) a&nbsp;poháněné logikou umístěnou ve složkách `/composables` a&nbsp;`/utils` jsou základní stavební prvky toho, co nakonec vidí uživatel - frontend. Pro řadu aplikací, zejména těch menších, to úplně stačí. 

Nuxt ale nabízí funkcionalitu i&nbsp;pro backendové operace. Umožňuje vystavit API endpointy, přijímat a&nbsp;zpracovávat na ně přijímané požadavky, a&nbsp;sloužit tak i&nbsp;jako prakticky plnohodnotý server.

## Nitro

Nuxt funguje dynamicky díky internímu webovému server enginu [Nitro](https://nitro.unjs.io/). Nitro si vytváří vlastní runtime nezávislý na všem ostatním a&nbsp;tvoří běhové prostředí aplikace, které poskytuje řadu skvělých funkcí. Vývojáři ocení třeba hot-module-reload (HMR) při vývoji -&nbsp;stačí uložit soubor a&nbsp;změny se ihned promítnou a&nbsp;nasadí do lokálně běžící verze. Pokud s&nbsp;programováním začínáte dnes, může vám to už připadat jako samozřejmost, ale nebylo to vždycky tak snadné...

Další vymožeností Nitra je [API vrstva](https://nuxt.com/docs/guide/concepts/server-engine#api-layer), která umožňuje jednoduše tvořit a&nbsp;vystavovat endpointy, které pak lze přes HTTP(S) požadavky provolávat.

## /server

Soubor, kterým se API endpoint realizuje, vypadá jednoduše takto:

```ts
export default defineEventHandler((event) => {
  // obslužný kód
})
```

Stačí jej umístit do další speciální složky `/server/api` nebo `/server/routes` a&nbsp;Nuxt si ho automaticky zpracuje a&nbsp;začne vystavovat. Rozdíl mezi uvedenými dvěma složkami je, že obslužný handler ze souboru `/server/api/foo.ts` bude vystaven na `http://localhost:3000/api/foo`, zatímco ze souboru `/server/routes/foo.ts` přímo na `http://localhost:3000/foo`. Podsložka `/server/api` je tedy de-facto totéž jako `/server/routes/api`. Použití prefixu `/api` je poměrně časté, proto existuje jako samostatná možnost, pokud ale trváte na větší volnosti, můžete použít `/routes` a&nbsp;uvnitř rozvinout svou strukturu podle libosti.

Pomocí _suffixů_ za tečkou v názvech souborů lze jednouše upřesit, kterou [HTTP metodu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) handler obsluhuje. Soubor `/server/api/foo.get.ts` umožní na `http://localhost:3000/api/foo` volat GET, `/server/api/foo.post.ts` vystaví na `http://localhost:3000/api/foo` POST. Logika obou může být výrazně odlišná. Podle [dokumentace](https://nuxt.com/docs/guide/directory-structure/server) jsou podporovány metody `GET`, `POST`, `PUT` a&nbsp;`DELETE`, tedy ne úplně všechny, ale ty zbylé v&nbsp;běžném provozu stejně příliš často nepotkáte.

Obslužný callback `defineEventHandler` může přijmout vstupní parametr `event`, který je typu `H3Event` z&nbsp;frameworku [h3](https://github.com/unjs/h3). Tento minimalistický HTTP framework, který v&nbsp;sobě Nuxt, resp. Nitro integruje, nabízí celou řadu užitečných funkcí. Například načíst obsah příchozího `POST` požadavku k&nbsp;dalšímu zpracování můžeme jednoduše takto:

```ts
export default defineEventHandler(async (event) => {
    const postData = await readBody(event)
    // další zpracování vstupu
}
```

V proměnné `event.node.req` zase naleznete parametry příchozího HTTP požadavku ve formátu [Node.js HTTP](https://www.w3schools.com/nodejs/obj_http_incomingmessage.asp). Snadno si tak lze sáhnout například na HTTP hlavičky, které jsou umístěny v&nbsp;poli `headers`.

## Případová studie

Na [úvodní stránce](/) naleznete několik odrážek _„Co nového v&nbsp;XY?“_ Data, která se zde zobrazují, pocházejí z&nbsp;mých seznamů článků na GitHubu, které si průběžně udržuju. Například [ZDE](https://github.com/AloisSeckar/demos-nuxt/blob/main/NuxtNews.md) je přehled novinek v&nbsp;Nuxt/Vue světě. Na tyto zdrojové soubory se odkazují Nuxt-powered webové služby, které z&nbsp;nich načítají _nejnovějších 5&nbsp;článků_. Služba pro Nuxt novinky běží zde: [https://alois-seckar.cz/nuxt-news](https://alois-seckar.cz/nuxt-news).

Její vlastní [implementace](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/routes/nuxt-news.ts) je velmi jednoduchá, hlavní práci obstará [utility funkce](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/server/utils/last-articles.ts), která si přečte zadanou URL s&nbsp;markdown souborem a&nbsp;pomocí knihovny [node-html-parser](https://www.npmjs.com/package/node-html-parser) z&nbsp;ní vybere potřebná data.

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-api @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-api)

Serverová část projektu vystavuje dva API endpointy:
- `sample.get.ts` - vrátí text _„Hello, Nuxt!“_ + aktuální datum a&nbsp;čas (aby bylo vidět, že se požadavek pokaždé znovu procesuje)
- `error.get.ts` - úmyslně vrací náhodnou [HTTP chybu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) 400-410

Jednoduchý frontend provolává a&nbsp;zobrazuje výsledek `sample.get.ts`. Endpoint s&nbsp;chybou si můžete zkusmo provolat sami, když do prohlížeče zadáte:

`http://localhost:3000/api/error`

## Další odkazy
* [Web scraper in Nuxt&nbsp;3 (Alois Sečkár)](https://dev.to/aloisseckar/web-scraper-in-nuxt-3-part-i-introduction-and-setting-up-4bb5) (EN) - můj čtyřdílný _step-by-step_ návod jak pracovat s Nuxt backendem
* [Server Routes in Nuxt&nbsp;3 (Michael Thiessen)](https://masteringnuxt.com/blog/server-routes-in-nuxt-3) (EN)
* [Dokumentace - Nuxt `/server`](https://nuxt.com/docs/guide/directory-structure/server) (EN)
* [Dokumentace - h3](https://github.com/unjs/h3) (EN)

## Shrnutí

Serverová část Nuxt frameworku je určena k&nbsp;de-facto backendovým operacím. Umožňuje tvořit a&nbsp;vystavovat vlastní API, které lze poskytovat buďto navenek do internetu, nebo ji také lze využít k&nbsp;logické separaci kódu - serverová část slouží k&nbsp;obsluze volání externích API a&nbsp;k&nbsp;manipulaci s&nbsp;daty, které pak aplikace v&nbsp;klientské frontendové části pouze zobrazuje.

Stejně jako složka `/pages` umožňuje routing na straně klienta, složky `/server/api` a&nbsp;`/server/routes` abstrahují vývojáře od nutnosti definovat vlastní cesty.

[Další část tutoriálu](/article/nuxt-middleware) představí koncept <strong>middleware</strong>, což jsou obslužné metody, které je možné automaticky volat před vykreslením frontendu nebo před zpracováním dat v&nbsp;serverové části.
