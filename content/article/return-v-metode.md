**Pozn.:** _S ohledem na mé zaměření mám zkušenosti převážně v&nbsp;Javě a&nbsp;JavaScriptu). Je možné, že v&nbsp;jiných jazycích mohou platit trochu jiná pravidla a&nbsp;jiná pro a&nbsp;proti._

Věřím, že spousta z&nbsp;vás se už potkala s&nbsp;tvrzením, že každá metoda má mít právě jeden výstup, tj. v&nbsp;případě Javy maximálně jeden `return`{lang="java"} (pokud je návratový typ `void`{lang="java"}, tak `return`{lang="java"} není potřeba, ačkoliv není syntaktická chyba prázdný `return;`{lang="java"} řádek uvést).

Co jsem našel, tak s&nbsp;tímto pravidlem jako první přišel holandský průkopník počítačových technologií [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra), když definoval zásady strukturovaného programování. Potkal jsem už programátory, kteří ho každému a&nbsp;za každou cenu cpou. Sám jsem ho jeden čas vcelku důsledně používal. Pak jsem si přečetl knihu o&nbsp;Refaktoringu od [Martina Fowlera](https://martinfowler.com/).

V&nbsp;jedné se svých technik pro refaktoring nazvané _**„Replace Nested Conditional with Guard Clauses“**_ dělá pravý opak a&nbsp;kód se čtyřmi přiřazeními výsledku a&nbsp;jedním returnem bourá a&nbsp;předělává do čtyř řádků, každý s&nbsp;vlastním returnem. Argumentuje přitom tím, že čitelnost a&nbsp;srozumitelnost je důležitější. A&nbsp;jeho úprava je vskutku kompaktnější než `if-else hell`, se kterým začínal.

Jedno klišovité moudro říká, že _**„když máš v&nbsp;ruce kladivo, všechno začne vypadat jako hřebík“**_. Jenže svět se samozřejmě neskládá pouze z&nbsp;hřebíků, tudíž je třeba znát i&nbsp;jiné nástroje a&nbsp;vědět, kdy použít který. Podle mě se to úplně stejně platí v&nbsp;případě uplatňování pravidel (nejen) pro programování.

## Argumenty pro a&nbsp;proti

Zde budu postupně shromažďovat argumenty a&nbsp;„pravidla“, které mohou pomoci rozhodnout, kdy dát přednost které variantě. Pochopitelně to bude vždy především o&nbsp;vašem vlastním pocitu a&nbsp;zkušenostech.

- Důležitý argument pro single return byl obsluha memory leaků. Předčasný return mohl způsobit, že se nevykonal kód pro uvolnění paměti. To v&nbsp;Javě není až tak velké téma (naučte se ale pracovat s&nbsp;`try-with-resources`, protože s&nbsp;I/O prostředky a&nbsp;DB konektory vám automatická správa paměti pomoct nemůže), tedy můžeme dát spíše přednost obecné čitelnosti kódu.
- Zajímavý je argument pro logování. Pokud si chcete vypisovat návratovou hodnotu, rozhodně se to bude dělat lépe před jediným returnem na konci metody, než před každým z&nbsp;dvaceti uvnitř…

## Další články k&nbsp;tématu</h2>

- [Nicolai Parlog - Multiple Return Statements](https://nipafx.dev/java-multiple-return-statements/)
