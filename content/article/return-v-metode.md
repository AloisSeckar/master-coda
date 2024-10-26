**Pozn.:** _S ohledem na mé zaměření mám zkušenosti převážně v Javě a JavaScriptu). Je možné, že v jiných jazycích mohou platit trochu jiná pravidla a jiná pro a proti._

Věřím, že spousta z vás se už potkala s tvrzením, že každá metoda má mít právě jeden výstup, tj. v případě Javy maximálně jeden `return`{lang="java"} (pokud je návratový typ `void`{lang="java"}, tak `return`{lang="java"} není potřeba, ačkoliv není syntaktická chyba prázdný `return;`{lang="java"} řádek uvést).

Co jsem našel, tak s tímto pravidlem jako první přišel holandský průkopník počítačových technologií [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra), když definoval zásady strukturovaného programování. Potkal jsem už programátory, kteří ho každému a za každou cenu cpou. Sám jsem ho jeden čas vcelku důsledně používal. Pak jsem si přečetl knihu o Refaktoringu od [Martina Fowlera](https://martinfowler.com/).

V jedné se svých technik pro refaktoring nazvané _**„Replace Nested Conditional with Guard Clauses“**_ dělá pravý opak a kód se čtyřmi přiřazeními výsledku a jedním returnem bourá a předělává do čtyř řádků, každý s vlastním returnem. Argumentuje přitom tím, že čitelnost a srozumitelnost je důležitější. A jeho úprava je vskutku kompaktnější než `if-else hell`, se kterým začínal.

Jedno klišovité moudro říká, že _**„když máš v ruce kladivo, všechno začne vypadat jako hřebík“**_. Jenže svět se samozřejmě neskládá pouze z hřebíků, tudíž je třeba znát i jiné nástroje a vědět, kdy použít který. Podle mě se to úplně stejně platí v případě uplatňování pravidel (nejen) pro programování.

## Argumenty pro a proti

Zde budu postupně shromažďovat argumenty a „pravidla“, které mohou pomoci rozhodnout, kdy dát přednost které variantě. Pochopitelně to bude vždy především o vašem vlastním pocitu a zkušenostech.

- Důležitý argument pro single return byl obsluha memory leaků. Předčasný return mohl způsobit, že se nevykonal kód pro uvolnění paměti. To v Javě není až tak velké téma (naučte se ale pracovat s `try-with-resources`, protože s I/O prostředky a DB konektory vám automatická správa paměti pomoct nemůže), tedy můžeme dát spíše přednost obecné čitelnosti kódu.
- Zajímavý je argument pro logování. Pokud si chcete vypisovat návratovou hodnotu, rozhodně se to bude dělat lépe před jediným returnem na konci metody, než před každým z dvaceti uvnitř…

## Další články k tématu</h2>

- [Nicolai Parlog - Multiple Return Statements](https://nipafx.dev/java-multiple-return-statements/)
