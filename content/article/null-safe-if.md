Původně mi přišlo, že tento článek je zbytečný, protože to přeci každý zná. Ale nedávno jsem přesně na tuto situaci narazil při řešení provozní chyby v&nbsp;našem produkčním kódu. Takže se zdá, že to smysl zopakovat má.

Často potřebujeme porovnat aktuální hodnotu proměnné s&nbsp;nějakou konstantou a&nbsp;podle toho určit další průchod kódem. Pokud je to v&nbsp;Javě textový řetězec, použijeme metodu `.equals()`{lang="java"}. Tedy něco jako:

```java
if (variable.equals("hodnota")) { … } 
```

Pokud však proměnná variable může být null (což předpokládejte vždycky, ledaže jste si 100% jistí, že tam vaše aplikace null nepustí), je tohle pozvánka pro `NullPointerException`{lang="java"}, aby na nás vyskočil, až se to bude nejméně hodit.

Co s&nbsp;tím? Jako první člověka asi napadne přidat další kontrolu:

```java
if (variable != null && variable.equals("hodnota")) { … } 
```

Což je samo o&nbsp;sobě správně. Akorát je to zbytečně moc písmenek a&nbsp;můžeme to napsat jednodušeji. Stačí otočit pořadí. Vůbec nic nám nebrání porovnávat:

```java
if ("hodnota".equals(variable)) { … } 
```

Implementace metody `.equals()`{lang="java"} pro `String`{lang="java"} má porovnání s&nbsp;null argumentem vyřešeno –&nbsp;jak porovnání dvou objektů pomocí `==`, tak operátor `instanceof`{lang="java"} si s&nbsp;null hodnotou poradí. `NullPointerException`{lang="java"} nás ohrožuje pouze tehdy, pokud se `.equals()`{lang="java"} snažíme zavolat na null objekt. A&nbsp;jelikož řetězec "hodnota" logicky nikdy null nebude, máme vyřešeno.

Doporučuji si ještě zvyknout nenechávat podobné řetězce přímo v&nbsp;kódu, ale vytahovat si je jako konstanty:

```java
private static final String HODNOTA = "hodnota";
…
if (HODNOTA.equals(variable)) { … } 
```

I&nbsp;kdybyste ji potřebovali pouze jednou, toto vám pomůže držet definice na jednom místě a&nbsp;v&nbsp;případě potřeby snadno najít, kde provést úpravu. Já často používám napříč aplikací `final`{lang="java"} třídu `XYZConstants`{lang="java"}, která obsahuje pouze `public static final`{lang="java"} definice konstant (a&nbsp;`private`{lang="java"} konstruktor, aby nikoho nenapadlo plevelit aplikaci jejími instancemi) použitelných podle potřeby kdekoliv jinde.

V případě, že se řetězec (String literal) používá v aplikaci vícekrát, má tento návyk přínos pro budoucí údržbu kódu - protože změny bude stačit dělat pouze na jednom místě. 

## Optional?

Java&nbsp;8 přinesla novinku v&nbsp;podobě třídy `Optional`{lang="java"}, která je navržena právě pro snazší práci s&nbsp;objekty, které mohou být null. Zrovna tento use-case však příliš nezjednodušuje. Psát bychom museli:

```java
if (Optional.ofNullable(variable).orElse("").equals("hodnota")) { … } 
```

A&nbsp;to je ještě delší než původní varianta s&nbsp;explicitním porovnáním s&nbsp;`null`{lang="java"}. Pokud bychom už optional instanci měli k&nbsp;dispozici, bylo by to o&nbsp;něco lepší, ale pořád ne ideální.

```java
Optional optVar = Optional.ofNullable(variable);
…
if (optVar.orElse("").equals("hodnota")) { … } 
```

Síla `Optional`{lang="java"} objektů se víc projeví až v&nbsp;kombinaci s&nbsp;Lambda výrazy a&nbsp;Streamy, ale o&nbsp;tom až někdy příště.
