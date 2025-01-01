Některé dny jsou programátorsky povedené a člověk se večer může pochlubit, co se mu povedlo. Například já se včera naučil, jak snadno nahradit potenciálně nebezpečnou Vue direktivu `v-html` za lépe ošetřenou variantu `v-dompurify-html`. Ale jsou i dny, kdy se dlouze plácáme v řešení nějaké zvláštní chyby. A pak se po několika propálených hodinách zjistí, že příčinou byla naprostá banalita a hloupá nepozornost. To se mi taky nedávno stalo.

Náš zákazník - zdravotní pojišťovna - odesílá klientům oficiální dopisy, u kterých je kvůli termínům nutné sledovat datum doručení. Proto se posílá tzv. "doručenka" - kus papíru, který pošťák vypíše při předání dopisu do rukou adresáta a pošta jej vrátí zpět odesilateli. Pomocí OCR se z doručenky naskenují a vytěží data, která přitečou do našeho systému. Pak se provádí přiřazení správné agendě a dohledávají záznamy v databázi. 

V určitých chvílích se na základě informace o datu doručení má posunout stav životního cyklu. A tady právě nastal kámen úrazu, protože to prostě nefungovalo, k posunu nedocházelo. Tedy jen pro některé případy, čímž to bylo ještě divnější. Chvíli jsem doufal, že problém vykoukám přímo z kódu, ale všechno se zdálo napsané správně - načíst typ dokumentu a stav životního cyklu a podívat se, jestli kombinace odpovídá.

Dospěl jsem k tomu, že nezbývá než situaci nasimulovat a odkrokovat, k čemu přesně při zpracování dochází. Předpřipravené testy jsme pro tenhle případ bohužel neměli, musel jsem si data vyrobit. Příprava zabrala docela dost času, protože jsem musel vzpomínat, jak to vlastně funguje a co kam podhodit. Nebudu radši zabíhat do podrobností, ale došlo třeba i na pokoutnou modifikaci dat v MongoDB GridFS kolekci.

Když jsem konečně mohl testovat, tak mi při prvním průchodu vyšlo, že se hodnota `104` nevyskytuje v poli, které `104` obsahuje. Nevěřícně jsem to zkusil podruhé a přitom mi došlo, kde se stala chyba. Program je v Javě. Hodnoty v poli možných stavů jsou definovány jako `int`. Ale stav, který se načítal ze záznamu, byl definován jako `short`. No a metoda `contains()` zkrátka short v poli integerů nenajde. 

**Oprava:** jeden řádek kódu, přepsat pět písmenek na tři. **Celková doba řešení:** čtyři hodiny. Školácká chyba, kterou by se zkušenému vývojáři ani neměla stát. Ale i to je někdy náš denní chleba.

::wise-words
Hlídat si datové typy a nespoléhat na to, že kód je "určitě správně", dokud si ho člověk opravdu alespoň jednou nevyzkouší.
::
