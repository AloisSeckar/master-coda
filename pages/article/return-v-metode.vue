<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <p class="font-italic">
        <strong>Pozn.:</strong> S ohledem na mé zaměření mám zkušenosti převážně v&nbsp;Javě a&nbsp;JavaScriptu).
        Je možné, že v&nbsp;jiných jazycích mohou platit trochu jiná pravidla a&nbsp;jiná pro a&nbsp;proti.
      </p>
      <p>
        Věřím, že spousta z&nbsp;vás se už potkala s&nbsp;tvrzením, že každá metoda má mít právě jeden výstup,
        tj. v&nbsp;případě Javy maximálně jeden <span class="code">return</span> (pokud je návratový typ
        <span class="code">void</span>, tak <span class="code">return</span> není potřeba, ačkoliv není
        syntaktická chyba prázdný <span class="code">return;</span> řádek uvést).
      </p>
      <p>
        Co jsem našel, tak s&nbsp;tímto pravidlem jako první přišel holandský průkopník počítačových technologií
        <NuxtLink to="https://en.wikipedia.org/wiki/Edsger_W._Dijkstra" :external="true">
          Edsger Dijkstra
        </NuxtLink>,
        když definoval zásady strukturovaného programování. Potkal jsem už programátory, kteří ho každému a&nbsp;za
        každou cenu cpou. Sám jsem ho jeden čas vcelku důsledně používal. Pak jsem si přečetl knihu o&nbsp;Refaktoringu
        od <NuxtLink to="https://martinfowler.com/" :external="true">
          Martina Fowlera
        </NuxtLink>.
      </p>
      <p>
        V&nbsp;jedné se svých technik pro refaktoring nazvané <em>„Replace Nested Conditional with Guard Clauses“</em>
        dělá pravý opak a&nbsp;kód se čtyřmi přiřazeními výsledku a&nbsp;jedním returnem bourá a&nbsp;předělává do
        čtyř řádků, každý s&nbsp;vlastním returnem. Argumentuje přitom tím, že čitelnost a&nbsp;srozumitelnost je
        důležitější. A&nbsp;jeho úprava je vskutku kompaktnější než <span class="code">if-else hell</span>,
        se kterým začínal.
      </p>
      <p>
        Jedno klišovité moudro říká, že <em>„když máš v&nbsp;ruce kladivo, všechno začne vypadat jako hřebík“</em>.
        Jenže svět se samozřejmě neskládá pouze z&nbsp;hřebíků, tudíž je třeba znát i&nbsp;jiné nástroje a&nbsp;vědět,
        kdy použít který. Podle mě se to úplně stejně platí v&nbsp;případě uplatňování pravidel (nejen) pro programování.
      </p>

      <h2>Argumenty pro a&nbsp;proti</h2>
      <p>
        Zde budu postupně shromažďovat argumenty a&nbsp;„pravidla“, které mohou pomoci rozhodnout, kdy dát přednost
        které variantě. Pochopitelně to bude vždy především o&nbsp;vašem vlastním pocitu a&nbsp;zkušenostech.
      </p>
      <ul class="list-disc">
        <li>
          Důležitý argument pro single return byl obsluha memory leaků. Předčasný return mohl způsobit,
          že se nevykonal kód pro uvolnění paměti. To v&nbsp;Javě není až tak velké téma (naučte se ale pracovat
          s&nbsp;<span class="code">try-with-resources</span>, protože s&nbsp;I/O prostředky a&nbsp;DB konektory
          vám automatická správa paměti pomoct nemůže), tedy můžeme dát spíše přednost obecné čitelnosti kódu.
        </li>
        <li>
          Zajímavý je argument pro logování. Pokud si chcete vypisovat návratovou hodnotu, rozhodně se to bude
          dělat lépe před jediným returnem na konci metody, než před každým z&nbsp;dvaceti uvnitř…
        </li>
      </ul>

      <h2>Další články k&nbsp;tématu</h2>
      <ul class="list-disc">
        <li>
          <NuxtLink to="https://nipafx.dev/java-multiple-return-statements/" :external="true">
            Nicolai Parlog - Multiple Return Statements
          </NuxtLink>
        </li>
      </ul>
    </div>
    <ArticleFooter />
  </div>
</template>
