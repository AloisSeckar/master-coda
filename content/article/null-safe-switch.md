Switch je způsob, jak (nejen) v&nbsp;Javě rozdělit kód do více větví podle hodnoty kontrolní proměnné. Použít jde tradičně na ordinální datové typy, enumy a&nbsp;od Java&nbsp;7 na řetězce. Java&nbsp;17 čerstvě přichází s&nbsp;pattern matchingem, který okruh možností dále rozšiřuje. To je však téma na samostatný článek.

Stejně jako v&nbsp;případě `.equals()`{lang=java} se i&nbsp;v&nbsp;příkazu `switch`{lang=java} skrývá hrozba. Nemůžete do něj poslat `null`{lang=java}, aniž by se urazil a&nbsp;nevyplivl `NullPointerException`{lang=java}.

Tradiční řešení je obalit `switch`{lang=java} kontrolní podmínkou:

```java
if (variable != null) {
    switch(variable) {
        …
    }
}
```

Jsou to ale dva řádky +&nbsp;odsazení navíc. Mě se proto víc líbí varianta s&nbsp;ternárním operátorem. Protože nikde není psáno, že uvnitř závorek za klíčovým slovem `switch`{lang=java} musí být hodnota. Může tam klidně být i&nbsp;výraz, tedy:

```java
switch(variable != null ? variable : <<default>>) { … }
```

Krom úspory místa se to může hodit třeba v&nbsp;případě, že chcete mít stejnou default akci (například zahlásit „Neznámá akce“) jak pro neznámou hodnotu i&nbsp;pro `null`{lang=java}. Teď prostěn obojí dáte do `default`{lang=java} labelu uvnitř `switch`{lang=java} výrazu.

## Optional?

Java&nbsp;8 umožňuje alternativní použití třídy `Optional`{lang=java}, kde by zápis vypadal takto:

```java
switch(Optional.ofNullable(variable).orElse(<<default>>)) { … }
```

Je to o&nbsp;malinko delší, ale třeba pro někoho srozumitelnější a&nbsp;čitelnější než ternární operátor. Navíc pokud instanci třídy `Optional`{lang=java} už máte v&nbsp;kódu k&nbsp;dispozici, pak už hraje srovnání čitelnosti jednoznačně pro tuto variantu:

```java
Optional<String> optVar = Optional.ofNullable(variable)
…
switch(optVar.orElse(<<default>>)) { … }
```