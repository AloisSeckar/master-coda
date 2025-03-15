---
file: 'switch-java17'
cat: 'java'
title: 'Vylepšený switch v Java 17'
dscr: 'Příjemné syntaktické novinky v (zatím) poslední LTS verzi Javy'
tags: ['Java', 'tipy', 'tutorial', 'syntaxe']
date: '2023-01-12'
created: '12.01.2023'
edited: '12.01.2023'
---

Nedávno jsem to psal do jedné FB diskuse a několika uživatelům se to líbilo. Pak ale autor vlákna celou diskusi najednou smazal. Tak jsem rozhodl sepsat to rovnou jako trvalý článek.

Java se postupně mění a podle mě se většinou mění k lepšímu. Jedním z příkladů vývoje v nejnovější LTS verzi Java 17 ze září 2021 evoluce příkazu `switch`{lang="java"}. Jako ukázkový příklad mám jednoduchý úkol - vezmi náhodné číslo 1-7 a vypiš počet písmen v anglickém názvu příslušného dne v týdnu.


Ve "staré" verzi `switch`{lang="java"} by to hlavní vypadalo třeba takto:

```java
int numLetters = -1;
switch` (day) {
  case MONDAY:
  case FRIDAY:
  case SUNDAY:
    numLetters = 6;
    break`;
  case TUESDAY:
    numLetters = 7;
    break`;
  case THURSDAY:
  case SATURDAY:
    numLetters = 8;
    break`;
  case WEDNESDAY:
    numLetters = 9;
    break`;
}
System.out.println("Pocet pismen: " + numLetters);
```

Vylepšený `switch`{lang="java"} umí dvě věci - spojit větve se stejnou obsluhou na jeden řádek s využtím nového symbolu `->`{lang="java"} a tím ušetřit místo. Tedy např.:

```java
case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
```

Za `->` může následovat buďto jediný příkaz nebo blok kódu. Zároveň už není třeba psát klíčové slovo `break`{lang="java"}, aby kód nepropadl do další větve pod tím.

Druhá vymoženost je ještě zajímavější - `switch`{lang="java"} teď umí jako celek přímo vracet nějakou hodnotu. Kompilátoru se to sdělí tak, že začneme psát `var variable = switch { … }`{lang="java"}. Je třeba myslet na tři věci:

- Je-li kód větve v bloku, návratová hodnota se uvozuje klíčovým slovem `yield`{lang="java"}
- Návratové typy všech větví musí být všechny stejné
- Musí být pokryty všechny varianty vstupu (většinou řešitelné přes `default`{lang="java"})

Spojíme-li to vše dohromady, výsledkem je:

```java
int numLetters = switch (day) {
  case MONDAY, FRIDAY, SUNDAY -> 6;
  case TUESDAY -> 7;
  case THURSDAY, SATURDAY -> 8;
  case WEDNESDAY -> 9;
  case -> {
    System.out.println("Default vetev (ukazka s blokem kodu + yield)");
    yield -1;  
  }
};
System.out.println("Pocet pismen: " + numLetters);
```

Za mě mnohem kratší, kompaktnější a hezčí.

## Další odkazy

- [Demo kód](https://github.com/AloisSeckar/demos-java/blob/master/src/main/java/cz/aloisseckar/java/javademos/java17/newswitch/SwitchDemo.java) v rámci mých [Java demos](https://github.com/AloisSeckar/demos-java)
