---
file: 'null-safe-switch'
cat: 'java'
title: 'Null-safe switch'
dscr: 'Jak se vyhnout problémům s NULL hodnotou při vyhodnocení podmínky příkazu switch?'
tags: ['Java', 'tipy', 'syntaxe', 'NullPointerException']
date: '2023-01-06'
created: '06.01.2023'
edited: '06.01.2023'
---

Switch je způsob, jak (nejen) v Javě rozdělit kód do více větví podle hodnoty kontrolní proměnné. Použít jde tradičně na ordinální datové typy, výčtové typy (enum) a od Java 7 na řetězce. Java 17 čerstvě přichází s pattern matchingem, který okruh možností dále rozšiřuje. To je však téma na samostatný článek.

Stejně jako v případě `.equals()`{lang=java} se i v příkazu `switch`{lang=java} skrývá hrozba. Nemůžete do něj poslat `null`{lang=java}, aniž by se urazil a nevyplivl `NullPointerException`{lang=java}.

Tradiční řešení je obalit `switch`{lang=java} kontrolní podmínkou:

```java
if (variable != null) {
  switch(variable) {
    // code
  }
}
```

Jsou to ale dva řádky + odsazení navíc. Mě se proto víc líbí varianta s ternárním operátorem. Protože nikde není psáno, že uvnitř závorek za klíčovým slovem `switch`{lang=java} musí být hodnota. Může tam klidně být i výraz, tedy:

```java
switch(variable != null ? variable : <<default>>) { … }
```

Krom úspory místa se to může hodit třeba v případě, že chcete mít stejnou default akci (například zahlásit „Neznámá akce“) jak pro neznámou hodnotu i pro `null`{lang=java}. Teď prostě obojí dáte do `default`{lang=java} labelu uvnitř `switch`{lang=java} výrazu.

## Optional?

Java 8 umožňuje alternativní použití třídy `Optional`{lang=java}, kde by zápis vypadal takto:

```java
switch(Optional.ofNullable(variable).orElse(<<default>>)) { … }
```

Je to o malinko delší, ale třeba pro někoho srozumitelnější a čitelnější než ternární operátor. Navíc pokud instanci třídy `Optional`{lang=java} už máte v kódu k dispozici, pak už hraje srovnání čitelnosti jednoznačně pro tuto variantu:

```java
Optional<String> optVar = Optional.ofNullable(variable)
…
switch(optVar.orElse(<<default>>)) { … }
```