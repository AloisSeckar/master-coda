<div style="background-color: #111111; padding: 5px;">&nbsp;&raquo;&raquo; Tento text se zabývá programováním ve <a href="https://vuejs.org/">Vue.js</a>. Pro zájemce o tuto technologii tu mám svůj <a href="/article/nuxt">tutoriál práce s frameworkem Nuxt</a>, který je nad Vue postaven.</div>

V prosinci 2023 jsme do provozu nasadili naši první úspěšnou implementaci Nuxt frontendu. Celkem velká věc pro jeden státní úřad. Časem snad sepíšu svoje zkušenosti, jaké to bylo začínat (téměř) na zelené louce s novou a pořád ještě dost živou technologií, co se přitom povedlo a co o něco míň. Podstatné je, že to proběhlo vcelku dobře a nepsalo se o tom v novinách jako o dalším provaru při pokusech o digitalizaci státní správy.

Přesto jsme po cestě museli řadu nečekaných situací řešit. Jedním z bugů, které nám začali uživatelé hlásit, byly nečekané ztráty dat z již vyplněných formulářů. Konkrétně v jednom radio-button poli formuláře s hodnotami "doložena/nedoložena" docházelo kdesi na pozadí k nečekanému přepnutí do polohy "nedoložena", což zároveň vynulovalo některé další na to navázané prvky. Protože příchozí data jsou vždy uložena přesně v té podobě, v jaké byla doručena, jejich obnova nebyl naštěstí až takový problém. Horší bylo přijít na to, co se děje.

Zprvu se totiž nedařilo problém jednoduše replikovat. Prvním nápadem bylo samozřejmě najít místa v kódu, kde mohlo k nastavení na "nedoložena" (v řeči našich dat hodnota "0") dojít. Takové místo ale bylo pouze jedno - v kódu pro inicializaci komponenty pro zobrazení této části formuláře. Zvláštní ovšem bylo, že tento kód se mohl vykonat jen v komponěntě použité na formulář pro nejnovější verzi záznamu 5.0. Situace přitom nastávala výhradně v případech, kdy se pracovalo se záznamy starších verzí (4.0, 3.9 nebo 3.8). Postupně se nám s pomocí logů, které jsme v první iteraci řešení museli doplnit, povedlo vytrasovat, že k tomu dochází vždy ve chvíli, kdy se přešlo odkazem v menu na stránku "Správa příloh". Při přechodech v rámci detailu záznamu provádíme automatickému ukládání hodnot formuláře - v tomto případě ale bohužel už špatných. Brzy jsme situaci dovedli alespoň úspěšně a spolehlivě navodit v našem prostředí. Oříšek i tak ještě nějakou dobu odolával.

Nechtělo se nám věřit, že se někde pokoutně iniciuje stránka pro formulář ve verzi 5.0, když otevíráme záznam verze 4.0. Tohle totiž v naší aplikaci řídíme přímo na úrovni cesty (route) v URL. Jaké číslo (50, 40, 39, 38...) je v cestě, taková komponenta (Zadost50Formular1, Zadost40Formular1, atd.) se použije a vykreslí svoje vnitřní komponenty. Nicméně logování události `onMounted` (okamžik zapojení Vue komponenty do HTML stránky) nemilosrdně potvrdilo, že skutečně těsně před přechodem na "Správu příloh" k připojení komponent verze 5.0 dojde.

Zbývalo už jen pochopit, čím je to způsobeno. Klíčovou stopou se stal fakt, že stránka "Správa příloh" ve svém URL identifikaci verze záznamu neměla. Povaha její funkcionality verzování na rozdíl od samotných formulářů, kde se podoba a logika zpracování v průběhu času mění, nepotřebovala. Detektivní pátrání nás následně zavedlo do defince page komponenty (obsah, která Nuxt vykreslí při zadání odpovídajícího URL) pro zobrazení formuláře s údaji záznamu.

Tu jsme vyřešili dynamicky - podle toho, jaká je v URL identifikace verze, taková komponenta se má načíst. Technicky se ve Vue řeší pomocí vestavěného konstruktu `<component :is="dynamickaKomponenta" />`. Hodnotu proměnné `dynamickaKomponenta` jsem na samém začátku projektu začal určovat pomocí Vue funkce `resolveComponent()` uvnitř reaktivní `computed()` funkce. A to byl právě kámen úrazu.

Použít `computed()` v tomto případě je totiž nejen zbytečné (hodnota mě zajímá pouze na začátku zobrazování stránky, když je třeba určit, které verzované komponenty formuláře se mají načíst, pak už se to nemění), ale přímo škodlivé. Proč? Protože výpočet je navázán na změnu proměnné `verze`. Dokud uživatel zústával na stránce, nedělo se nic. Jakmile se však chtěl přesunout na "Správu příloh", stalo se následující:
- vlivem změny URL došlo ke změně proměnné `verze`
- změnu hodnoty `verze` zachytil reaktivní systém Vue a provedl přepočet hodnoty `dynamickaKomponenta`
- protože hodnota byla v tu chvíli `undefined` (stránka "Správa příloh" verzi neřeší), výpočet spadl do default větve, což je verze 5.0
- nově získaná komponenta `Zadost50Formular1` se předal do dynamické `<component>` a Vue provedlo její vykreslení
- teprve **POTOM** začal "routing" - akce přesměrování na novou stránku
- během přesměrování se automaticky uložil formulář - s aktuálními, na pozadí tiše vynulovanými, hodnotami...

K nápravě tedy následně stačila úplná maličkost - zrušit pro tento případ `computed()` a určení, která formulářová komponenta se bude vykreslovat, provést pouze jednou během setup fáze stránky.

V případě Vue reaktivity jsem v počátcích mé práce s Vue utrpěl syndromem kladiva a hřebíku - připadalo mi, že pro zajištění správné funkcionality je potřeba nacpat `computed()` (nebo `ref()` či `watch()`) úplně všude, aby se mi stránky hezky dynamicky aktualizovaly. Samozřejmě to tak není. Kromě příkladu uvedeného zde, mají tyto funkce navrstvené chaoticky přes sebe schopnost vyvolat kaskádovité efekty nekonečných aktualizací a překreslování, které postupně otravují web a zpomalují ho. Něco o tom viz třeba [ZDE](https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j).

Zpočátku je problém si toho vůbec všimnout, protože Vue je samo o sobě dobře optimalizované. Když se to někde provalí, může být už zase problém s tím v rozvinuté a nějak fungující aplikaci něco dělat. Proto si pokaždé dobře rozmyslete, které reaktivní funkce skutečně potřebujete, a vyhýbejte se jejich zbytečnému nadužívání.

## Poučení
Dvakrát (i třikrát) měř než použiješ `computed()` 
