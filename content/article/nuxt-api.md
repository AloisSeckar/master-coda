Dosud jsme se pohybovali v tzv. klientské části Nuxt aplikace. Stránky (`/pages`) tvořené komponentami (`/components`) a poháněné logikou umístěnou do `/composables` a `/utils` jsou stavební prvky toho, co ve finále vidí uživatel - frontend. Pro řadu aplikací, zejména menších, to úplně stačí. 

Nuxt ale nabízí funkcionalitu i pro backendové operace. Umožňuje vystavit API endpointy a sloužit i jako prakticky plnohodnotý server.

## Nitro

Nuxt pracuje dynamicky pomocí interního webového server enginu [Nitro](https://nitro.unjs.io/). Nitro si vytváří vlastní runtime nezávislý na všem ostatním a tvoří běhové prostředí aplikace, které poskytuje řadu skvělých funkcí. Jednou z nich je API vrstva, která umožňuje tvořit a vystavovat endpointy, které pak lze provolat klasikým HTTP voláním.

## /server

Soubor, kterým se API endpoint realizuje, vypadá jednoduše takto:

```ts
export default defineEventHandler((event) => {
  // obslužný kód
})
```

Stačí jej umístit do další speciální složky `/server/api` nebo `/server/routes` a Nuxt si je automaticky zpracuje a začne vystavovat. Rozdíl mezi uvedenými dvěma složkami je, že obslužný handler ze souboru `/server/api/foo.ts` bude vystaven na `http://localhost:3000/api/foo`, zatímco ze souboru `/server/routes/foo.ts` přímo na `http://localhost:3000/foo`. Podsložka `/server/api` je tedy de-facto totéž jako `/server/routes/api`. Použití prefixu `/api` je poměrně časté, proto existuje jako samostatná možnost, pokud ale trváte na větší volnosti, můžete použít `/routes`.

Pomocí suffixů za tečkou v názvech souborů lze jednouše upřesit, kterou [HTTP metodu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) handler obsluhuje. Soubor `/server/api/foo.get.ts` umožní na `http://localhost:3000/api/foo` volat GET, `/server/api/foo.post.ts` vystaví na `http://localhost:3000/api/foo` POST. Logika obou může být výrazně odlišná v souladu s účelem, které jednotlivé HTTP metody obvyle mají.

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-api @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-api)

Serverová část projektu vystavuje dva API endpointy:
- `sample.get.ts` - vrátí text "Hello, Nuxt!" + aktuální datum a čas (aby bylo vidět, že se požadavek pokaždé znovu procesuje)
- `error.get.ts` - úmyslně vrací náhodnou HTTP chybu 400-410

Jednoduchý frontend provolává a zobrazuje pouze výsledek `sample.get.ts`. Endpoint s chybou si můžete zkusmo provolat sami zadáním `http://localhost:3000/api/error` do prohlížeče.

## Shrnutí

Serverová část Nuxt frameworku je určena k de-facto backendovým operacím. Umožňuje tvořit a vystavovat vlastní API, které lze poskytovat buďto navenek do internetu, nebo ji také lze využít k logické separaci kódu - serverová část slouží k obsluze volání externích API a k manipulaci s daty, které pak aplikace v klientské frontendové části pouze zobrazuje.

Stejně jako složka `/pages` umožňuje routing na klientovi, složky `/server/api` a `/server/routes` abstrahují vývojáře od nutnosti definovat vlastní cesty.

[Další část tutoriálu](/article/nuxt-middleware) představí koncept <strong>middleware</strong>, což jsou obslužné metody, které je možné volat před vykreslením frontendu nebo před zpracováním dat v serverové části.
