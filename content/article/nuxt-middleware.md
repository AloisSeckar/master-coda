---
file: 'nuxt-middleware'
cat: 'web'
title: 'Nuxt Tutorial 5 - Middleware'
dscr: 'Nuxt - jak pracuje middleware'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial']
date: '2025-11-19'
created: '19.11.2025'
english: 'https://dev.to/aloisseckar/nuxt-tutorial-5-middleware-3e5a'
---

Tento díl Nuxt tutoriálu je věnován middleware, což jsou obslužné metody, které je možné automaticky volat před každým vykreslením určité stránky na [frontendu](/article/nuxt-pages) nebo před zpracováním dat v [serverové části](/article/nuxt-api).

## /app/middleware

Soubory middleware na straně klienta se umisťují do složky `/app/middleware`, odkud si je Nuxt automaticky načítá.

Middleware se spouští v okamžiku, kdy probíhá přesměrování (routing). Aby byl soubor detekován jako middleware, musí obsahovat `export default` metody `defineNuxtRouteMiddleware`. Metoda jako parametr přijímá callback s parametry `to` (kam) a `from` (odkud) probíhá přesměrování. Syntaxe vypadá takto:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // logika
})
```

Datový typ (resp. interface) parametrů `from` a `to` je převzatý z [Vue Routeru](https://router.vuejs.org/) a jmenuje se [`RouteLocationNormalizedGeneric`](https://router.vuejs.org/api/interfaces/RouteLocationNormalizedGeneric.html). Skrz tyto objekty máte přístup ke všem podstatným informacím o navigaci - URL, get parametry (za `?` v url), hash (za `#` v url), aj. Dále je možné uvnitř funkce volat libovolné [composables a util funkce](/article/nuxt-utils).

### Spouštění middleware

Když máme obslužnou funkci, musíme ještě frameworku říct, pro kterou stránku se má metoda spustit. To se dělá nejčastěji v sekci `<script setup>` příslušného souboru stránky ve struktuře `/pages` pomocí makra `definePageMeta`. Odbočka k tomu, co to je „makro“ - konstrukce, která se z pohledu programátora tváří jako běžná funkce, ale ve skutečnosti jde o speciálně ohraničený kus zdrojového kódu, ve své podstatě _klíčové slovo_, kterému Nuxt kompilátor rozumí, vezme ho a nahradí adekvátně připraveným skutečným JS kódem. Konec vsuvky.

Definice middleware pro konkrétní stránku může vypadat například takto:

```html
<script setup lang="ts">
definePageMeta({
  middleware: 'foo'
})
</script>
```

To zajistí, aby se před vykreslením dané stránky spustila middleware funkce definovaná v souboru `/app/middleware/foo.ts`.

Toto byl případ, kdy přesměrování na stránku vyvolá pouze jednu middleware funkci. Lze jich mít i více, pokud se místo jednoduchého řetězce použije pole:

```html
<script setup lang="ts">
definePageMeta({
  middleware: ['foo1','foo2']
})
</script>
```

Dokonce je možné místo odkazu na název souboru ve složce `/app/middleware` definovat „inline“ middleware přímo [uvnitř definice](https://nuxt.com/docs/4.x/api/utils/define-page-meta#defining-middleware) v `definePageMeta`, ale to mi připadá zbytečně zamlžující, protože si budete muset pamatovat, že ho tam máte.

Často se stává, že nepotřebujeme metodu spouštět pouze na jedné či n stránkách, ale úplně na všech, takže by nutnost neustálého vypisování `definePageMeta` začala být brzy otravná. Proto existuje také jednoduchý způsob, jak Nuxtu říct, že jde o „globální“ middleware, který má spouštět pokaždé. Na to stačí specifická „přípona“ názvu souboru fungující na podobném principu jako určení HTTP metody v API endpointech. Zatímco spuštění `/app/middleware/foo.ts` musíme na stránce explicitně vyžádat, handler `/app/middleware/foo.global.ts` se sám od sebe vykoná vždy, když nastane událost přesměrování (routing) na **libovolnou** stránku.

Od Nuxt verze **3.11** přibyla ještě možnost definovat middleware centrálně v souboru `nuxt.config.ts` v sekci `routeRules` (platí pouze pro klientskou část aplikace, nikoliv pro Nitro backend!).

### Příklad použití

Takže middleware už umíme přiřazovat, ale čemu je to vlastně celé dobré? Typické použití je kontrola, zda má aktuální uživatel oprávnění danou stránku vidět. Pokud náhodou ne, tak ho můžeme třeba přesměrovat na login. K tomu se používá pomocná Nuxt funkce `navigateTo` (její návratovou hodnotu vždy vracejte pomocí `return`):

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (!userCanView(to.path)) {
    return navigateTo(`/login`)
  }
})

function userCanView(page: string): boolean {
    // logika rizeni pristupu
}
```

Pokud přesměrovat nechcete, nevracejte z funkce nic a nechte ji doběhnout. Nuxt pak bude pokračovat navigací na původně požadovanou stránku.

Další variantou aplikace mohou být například nějaké auditní logy nebo nezbytná inicializace zdrojů používaných cílovou stránkou.

**Na závěr poznámka k pořadí:** Nejprve se spouští globální middleware (v abecedním pořadí), potom teprve soubory specifické pro konkrétní stránky (v pořadí, v jakém jsou pro stránku definovány). To je potřeba mít na paměti, pokud na pořadí operací záleží.

📗[Oficiální dokumentace](hhttps://nuxt.com/docs/4.x/directory-structure/app/middleware)

## /server/middleware

Na straně Nuxt [serveru](/article/nuxt-api) existuje obdobný mechanismus. Zde se soubory umisťují do složky `/server/middleware` a opět jsou automaticky registrovány a spouštěny.

Jelikož zde nedávají smysl parametry `from` a `to`, je definice serverového middleware trochu odlišná:

```ts
export default defineEventHandler((event) => {
  // logika
})
```

Parametr `event` obsahuje veškeré informace o běhovém prostředí JS serveru a data příchozího HTTP requestu (`event.node.req`).

Na rozdíl od middleware na straně klienta, tyto soubory se spouští před **všemi** API požadavky. Vykonají se vždy předtím, než s příchozím requestem začnou manipulovat API endpointy. Neměly by vracet hodnotu a příchozí request by měly maximálně rozšiřovat, nikoliv měnit původní data.

📗[Oficiální dokumentace](https://nuxt.com/docs/4.x/directory-structure/server#server-middleware)

## Případová studie

Na projektu, který programujeme v práci, je klientské middleware použito například následujícím způsobem:

- kontroluje se přihlášení, pokud není uživatel přihlášen, je přesměrován na login stránku
- dle aktuální URL se vybírá titulek okna (šlo by to řešit i jinak, ale je to jedna z možností)

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-middleware @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-middleware)

Definovány jsou 4 middleware funkce:

- `/app/middleware/allRoutes.global.ts` - vykoná se před každým přesměrováním, vypíše do konzole odkud a kam se přepíná
- `/app/middleware/onlySecond.ts` - vykoná se pouze před načtením stránky `/second`, vypíše do konzole vysvětlení funkčnosti
- `/app/middleware/onlyThird.ts` - vykoná se pouze před načtením stránky `/third`, vypíše do konzole vysvětlení funkčnosti, je nastaveno prostřednictvím konfigurace v `nuxt.config.ts`
- `/server/middleware/server.ts` - vykoná se před zpracováním každého API požadavku, vypíše do konzole URL (na serveru, nikoliv v prohlížeči)

Jednoduchá implementace klienta umožňuje přepínat mezi odkazy a pozorovat, co se přitom děje v konzoli. Volání API endpointu se realizuje kliknutím na tlačítka na stránce `/first` nebo `/second`.

## Shrnutí

Middleware se hodí pro snadnou implementaci funkcí, které chceme volat **PŘEDTÍM**, než je zahájeno zpracování API požadavku na serveru nebo vykreslování stránky klienta. Klientské middleware metody mohou být vázány na konkrétní stránky nebo být spouštěné globálně před načtením libovolné z nich. Middleware na serveru se vykoná před každým API voláním.

V tuto chvíli jsme už pokryli značnou část základní Nuxt funkcionality. Prozatím jsem se ale - úmyslně - příliš nevěnoval tomu, jak vlastně funguje javascriptový framework [Vue.js](https://vuejs.org/), nad kterým je to celé postaveno. Mluvili jsme už trochu o [komponentách](/article/nuxt-pages#komponenty-obecně) a [composables](/article/nuxt-utils#composables), ale bez hlubšího přesahu. Přestože ani zdaleka nedosáhneme úrovně detailu, který nabízí [oficiální Vue.js dokumentace](https://cs.vuejs.org/guide/introduction.html), alespoň částečně to v [následujícím Vue.js intermezzu napravíme](/article/nuxt-vue).
