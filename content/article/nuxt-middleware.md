Tento díl Nuxt tutoriálu je věnován middleware, což jsou obslužné metody, které je možné volat před vykreslením frontendu nebo před zpracováním dat v serverové části.

## /middleware

TODO middleware klienta

## /server/middleware

TODO middleware serveru

## Případová studie

Na projektu, který programujeme v práci, je klientské middleware například následujícím způsobem:
- kontroluje se přihlášení, pokud není uživatel přihlášen, je přesměrován na login stránku
- dle aktuální URL se vybírá titulek okna

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-middleware @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-middleware)

Definovány jsou 3 middleware funkce:
- `/middleware/allRoutes.global.ts` - vykoná se před každým načtením stránky, vypíše do konzole odkud kam se přepíná
- `/middleware/onlySecond.ts` - vykoná se pouze před načtením stránky `/second`, vypíše do konzole vysvětlení funkčnosti
- `/server/middleware/server.ts` - vykoná se před zpracováním každého API požadavku, vypíše do konzole URL

Jednoduchá implementace klienta umožňuje přepínat mezi odkazy a pozorvat, co se přitom děje. Volání API se realizuje kliknutím na tlačítko na stránce `/first` nebo `/second`.

## Shrnutí

Middleware se hodí na jednoduchou implementaci funkcí, které chceme volat PŘEDTÍM, než je zahájeno zpracování API požadavku na serveru nebo vykreslování stránky klienta. Middleware metody mohou být vázány na konkrétní stránky nebo být spouštěné globálně před každou klient/server operací.
