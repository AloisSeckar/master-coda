<div style="background-color: #111111; padding: 5px;">&nbsp;&raquo;&raquo; Tento text se zabývá programováním ve <a href="https://vuejs.org/">Vue.js</a>. Pro zájemce o tuto technologii tu mám svůj <a href="/article/nuxt">tutoriál práce s frameworkem Nuxt</a>, který je nad Vue postaven.</div>

V prosinci 2023 jsme do provozu nasadili naši první úspěšnou implementaci Nuxt frontendu. Celkem velká věc pro jeden státní úřad. Časem snad sepíšu svoje zkušenosti, jaké to bylo začínat (téměř) na zelené louce s&nbsp;novou a&nbsp;pořád ještě dost živou technologií. Podstatné je, že to proběhlo vcelku dobře a&nbsp;nepsalo se o&nbsp;tom v&nbsp;novinách jako o&nbsp;dalším provaru při pokusech o&nbsp;větší digitalizaci státní správy.

Přesto jsme po cestě museli řadu nečekaných situací řešit. Jedním z&nbsp;bugů, které nám začali uživatelé hlásit, byly nečekané ztráty dat z&nbsp;již vyplněných formulářů. Konkrétně v&nbsp;jednom radio-button poli formuláře s&nbsp;hodnotami _"doložena/nedoložena"_ docházelo kdesi na pozadí k nečekanému přepnutí do polohy _"nedoložena"_, což zároveň vynulovalo některé další navázané prvky. Protože příchozí data jsou vždy uložena přesně v&nbsp;podobě, v&nbsp;jaké byla doručena, jejich obnova naštěstí nebyl až takový problém. Horší bylo přijít na to, co se děje.

Zprvu se nám vůbec nedařilo problém replikovat. Prvním nápadem samozřejmě bylo najít místa v&nbsp;kódu, kde mohlo k&nbsp;nastavení na _"nedoložena"_ (v&nbsp;řeči našich dat číselná hodnota `0`) dojít. Takové místo ale bylo pouze jedno -&nbsp;v&nbsp;kódu pro inicializaci komponenty na zobrazení této části formuláře. Tento kód se ovšem mohl vykonat jen v&nbsp;komponentě použité na formuláři pro nejnovější verzi záznamu `5.0`. Situace přitom nastávala výhradně v případech, kdy se pracovalo se záznamy starších verzí (`4.0`, `3.9` nebo `3.8`). Postupně se nám s&nbsp;pomocí logů, které jsme v&nbsp;první iteraci hledání řešení museli doplnit, povedlo vytrasovat, že k&nbsp;tomu dochází vždy ve chvíli, kdy se přešlo odkazem v&nbsp;menu na stránku _"Správa příloh"_. Při přechodech v&nbsp;rámci detailu záznamu provádíme automatické ukládání hodnot formuláře -&nbsp;v&nbsp;tomto případě už bohužel pokažených. Brzy jsme situaci dovedli alespoň úspěšně a&nbsp;spolehlivě navodit i&nbsp;v&nbsp;našem prostředí. Oříšek i&nbsp;tak ještě nějakou dobu odolával.

Nechtělo se nám věřit, že se někde pokoutně iniciuje stránka pro formulář ve verzi `5.0`, když otevíráme záznam verze `4.0`. Tohle totiž v&nbsp;naší aplikaci řídíme přímo na úrovni cesty (route) v&nbsp;URL. Jaké číslo (`50`, `40`, `39`, `38`) je v&nbsp;cestě, taková komponenta (`Zadost50Formular1`, `Zadost40Formular1`, atd.) se použije k&nbsp;vykreslení svých vnitřních komponent. Nicméně logování události `onMounted` (okamžik zapojení Vue komponenty do HTML stránky) nemilosrdně potvrdilo, že skutečně těsně před přechodem na _"Správu příloh"_ k&nbsp;připojení komponent verze `5.0` dojde.

Zbývalo už jen pochopit, čím je to způsobeno. Klíčovou stopou se stal fakt, že stránka _"Správa příloh"_ ve svém URL identifikaci verze záznamu neměla. Povaha její funkcionality verzování na rozdíl od samotných formulářů, kde se jejich podoba a&nbsp;logika zpracování v&nbsp;průběhu času mění, nepotřebovala. Detektivní pátrání nás následně zavedlo do defince page komponenty (obsah, který Nuxt vykreslí při zadání odpovídajícího URL) pro zobrazení formuláře s&nbsp;údaji záznamu.

Tu jsme vyřešili dynamicky -&nbsp;podle toho, jaká je v&nbsp;URL identifikace verze, taková komponenta se má načíst. Technicky se to ve Vue řeší pomocí vestavěného konstruktu `<component :is="dynamickaKomponenta" />`. Hodnotu proměnné `dynamickaKomponenta` jsem na samém začátku projektu začal určovat pomocí Vue utility `resolveComponent()` uvnitř reaktivní `computed()` funkce. A&nbsp;to byl právě kámen úrazu.

Použít `computed()` v&nbsp;tomto případě je totiž nejen zbytečné (hodnota mě zajímá pouze na začátku zobrazování stránky, když je třeba určit, které verzované komponenty formuláře se mají načíst, pak už se to nemění), ale přímo škodlivé. Proč? Protože výpočet je navázán na změnu proměnné `verze`. Dokud uživatel zústával na stránce, nedělo se nic. Jakmile se však chtěl přesunout na _"Správu příloh"_, stalo se následující:

- vlivem změny URL došlo ke změně proměnné `verze`
- změnu hodnoty `verze` zachytil reaktivní systém Vue a&nbsp;provedl přepočet hodnoty `dynamickaKomponenta`
- protože hodnota byla v&nbsp;tu chvíli `undefined` (stránka _"Správa příloh"_ verzi neřeší), výpočet spadl do _default_ větve, což je verze `5.0`
- nově získaná komponenta `Zadost50Formular1` se předala do dynamické `<component>` a&nbsp;Vue provedlo její vykreslení
- teprve **POTOM** začal "routing" -&nbsp;akce přesměrování na novou stránku
- během přesměrování se automaticky uložil formulář -&nbsp;s&nbsp;aktuálními, na pozadí tiše vynulovanými, hodnotami...

K nápravě tedy následně stačila úplná maličkost - zrušit pro tento případ `computed()` a&nbsp;určení, která formulářová komponenta se bude vykreslovat, provést pouze jednou během setup fáze stránky.

V případě reaktivity jsem v&nbsp;mých začátcích s&nbsp;Vue utrpěl syndromem kladiva a&nbsp;hřebíku -&nbsp;připadalo mi, že pro zajištění správné funkcionality je potřeba nacpat `computed()` (nebo `ref()` či `watch()`) úplně všude, aby se mi stránky hezky dynamicky aktualizovaly. Samozřejmě to tak není. Kromě příkladu uvedeného zde, mají tyto funkce navrstvené chaoticky přes sebe nepříjemnou schopnost generovat kaskádovité efekty nekonečných aktualizací a&nbsp;překreslování, které postupně otravují web a&nbsp;zpomalují ho. Něco o&nbsp;tom viz třeba [ZDE](https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j).

Zpočátku je problém si toho vůbec všimnout, protože Vue je dobře optimalizované. Když se to někde provalí, může být už zase složité s&nbsp;tím v&nbsp;rozvinuté a&nbsp;nějak fungující aplikaci něco dělat. Proto je nejlepší řešit to už na začátku. Pokaždé si dobře rozmyslete, které reaktivní funkce skutečně potřebujete, a&nbsp;vyhýbejte se jejich zbytečnému nadužívání.

## Poučení
Dvakrát (i&nbsp;třikrát) měř než použiješ `computed()` 
