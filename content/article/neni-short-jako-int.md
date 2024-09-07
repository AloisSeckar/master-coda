Některé dny jsou programátorsky povedené a&nbsp;člověk se večer může pochlubit, co se mu povedlo. Například já se včera naučil, jak snadno nahradit potencálně nebezpečnou Vue direktivu `v-html` za lépe ošetřenou variantu `v-dompurify-html`. Ale jsou i&nbsp;dny, kdy se dlouze plácáme v&nbsp;řešení nějaké zvláštní chyby. A&nbsp;pak se po několika propálených hodinách zjistí, že příčinou byla naprostá banalita a&nbsp;hloupá nepozornost. To se mi taky nedávno stalo.

Náš zákazník - zdravotní pojišťovna - odesílá klientům oficiální dopisy, u&nbsp;kterých je kvůli termínům nutné sledovat datum doručení. Proto se posílá tzv. "doručenka" -&nbsp;kus papíru, který pošťák vypíše při předání dopisu do rukou adresáta a&nbsp;pošta jej vrátí zpět odesilateli. Pomocí OCR se z&nbsp;doručenky naskenují a&nbsp;vytěží data, která přitečou do našeho systému. Pak se provádí přiřazení správné agendě a&nbsp;dohledávají záznamy v&nbsp;databázi. 

V určitých chvílích se na základě informace o&nbsp;datu doručení má posunout stav životního cyklu. A&nbsp;tady právě nastal kámen úrazu, protože to prostě nefungovalo, k&nbsp;posunu nedocházelo. Tedy jen pro některé případy, čímž to bylo ještě divnější. Chvíli jsem doufal, že problém vykoukám přímo z&nbsp;kódu, ale všechno se zdálo napsané správně -&nbsp;načíst typ dokumentu a&nbsp;stav životního cyklu a&nbsp;podívat se, jestli kombinace odpovídá.

Dospěl jsem k tomu, že nezbývá než situaci nasimulovat a&nbsp;odkrokovat, k&nbsp;čemu přesně při zpracování dochází. Předpřipravené testy jsme pro tenhle případ bohužel neměli, musel jsem si data vyrobit. Příprava zabrala docela dost času, protože jsem musel vzpomínat, jak to vlastně funguje a&nbsp;co kam podhodit. Nebudu radši zabíhat do podrobností, ale došlo třeba i&nbsp;na pokoutnou modifikaci dat v&nbsp;MongoDB GridFS kolekci.

Když jsem konečně mohl testovat, tak mi při prvním průchodu vyšlo, že se hodnota `104` nevyskytuje v&nbsp;poli, které `104` obsahuje. Nevěřícně jsem to zkusil podruhé a&nbsp;přitom mi došlo, kde se stala chyba. Program je v&nbsp;Javě. Hodnoty v&nbsp;poli možných stavů jsou definovány jako `int`. Ale stav, který se načítal ze záznamu, byl definován jako `short`. No a&nbsp;metoda `contains()` zkrátka short v&nbsp;poli integerů nenajde. 

**Oprava:** jeden řádek kódu, přepsat pět písmenek na tři. **Celková doba řešení:** čtyři hodiny. Školácká chyba, kterou by se zkušenému vývojáři ani neměla stát. Ale i&nbsp;to je někdy náš denní chleba.

::wise-words
Hlídat si datové typy a&nbsp;nespoléhat na to, že kód je "určitě správně", dokud si ho člověk opravdu alespoň jednou nevyzkouší.
::
