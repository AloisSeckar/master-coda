---
file: 'hello-chatgpt-4'
cat: 'misc'
title: 'Čtvrté rande s ChatGPT - seznam Java features'
dscr: 'Generování obsáhlého seznamu z konkrétních dat v konkrétním formátování'
tags: ['ChatGPT', 'AI', 'programování', 'help']
date: '2023-09-08'
created: '08.09.2023'
edited: '08.09.2023'
---

Blíží se vydání [Java JDK 21](https://www.infoworld.com/article/3689880/jdk-21-the-new-features-in-java-21.html), což mě vedlo k tomu, abych oprášil svůj projekt [Java Demos](https://github.com/AloisSeckar/demos-java), který jsem vytvořil po vydání Javy 17. Napadlo mě, že by nebylo špatné přidat si tam `.md` soubor s přehledem všech úprav (JEP), které postupně do JDK přistávají s jednotlivými verzemi, jež nyní Oracle uvolňuje pravidelně každý půlrok.

Tím vznikl nový usecase pro ChatGPT, jelikož těchto "JEPů" už je přes 450, takže sepisovat všechno ručně by zabralo zbytečně moc času. Tedy vzhůru do toho.

Jak se ukázalo, umělé inteligenci stačí celkem málo. Už prvotní prompt:

``Please, make a list of Java JDK 17 new features in .md format. Each item of the list should start with a JEP number and name which will link to the OpenJDK JEP page followed by a dash and then a brief explanation of the feature with up to 100 words.``

vrátil v podstatě to, co jsem od toho očekával a potřeboval:

```
# Java JDK 17 New Features

## [JEP 356: Enhanced Pseudo-Random Number Generators](https://openjdk.java.net/jeps/356)
- Introduces new interfaces and implementations for random number generation in the `java.util.random` package. This offers more options and greater flexibility compared to the existing `Random` and `ThreadLocalRandom`.

## [JEP 382: New macOS Rendering Pipeline](https://openjdk.java.net/jeps/382)
- Introduces a new rendering pipeline based on Apple's Metal framework as an alternative to the existing pipeline based on the deprecated OpenGL framework, providing improved performance and platform integration on macOS.

...atd
```

Požádal jsem jen o malou formátovací změnu, aby to byl opravdu "list" a ne seznam nadpisů druhé úrovně:

``Please replace "##" with "-" in the .md file you've just generated``

A hotovo.

Tedy zdánlivě, jak jsem si všiml později. Ve výsledku byla jedna duplicita a JEP 414 a 415 z nějakého důvodu zapřel. Nicméně přes nutnost kontroly výsledku byla úspora času nesmírná. Obzvlášť ve chvíli, kdy jsem se pochopitelně nezastavil u JDK 17 a postupně z ChatGPT vymámil přehledy pro všechny verze od 9 po nejnovější 21.

Co mi moc nezafungovalo, byl pokus zrychlit práci ještě víc a spojit generování více seznamů do jednoho promptu. Požadavku:

``Please, make the same list as above for Java versions 12 to 16``

sice ChatGPT vyhověl, ovšem rozhodl se vybrat z každého JDK pouze 3 novinky (a raději nechci vědět, zda je vybíral podle nějakého klíče, nebo pouze náhodně, jak mu to přišlo vhodné). Možná by šlo prompt zpřesnit, ale raději jsem pak generoval jednu verzi po druhé samostatně.

Abych překonal technologickou překážku danou ukončením nativních znalostí ChatGPT v srpnu 2021 (tedy v době vydání Javy 17, ale dávno před Java 18-21), zapojil jsem do akce také [pluginy](https://www.lupa.cz/clanky/jak-naucit-chatgpt-pocitat-pracovat-s-dokumenty-dat-mu-zrak-nebo-pristup-k-internetu/), konkrétně plugin [BrowserOp](https://community.openai.com/t/meet-browserop-our-chatgpt-plugin-that-lets-you-search-up-to-date-information-smoothly-and-efficiently/304018), který dá možnost prohledávání aktuálních internetových dat.

Překvapivě zásek nepřišel na těch nových verzích JDK, ale na té nejstarší. Pro Javu 9 mi bot zahlásil:

``Unfortunately, I was unable to access the OpenJDK page for Java JDK 9 to provide a similar list. Would you like me to try another source for that information?``

Navedl jsem ho na primární datovou stránku [https://openjdk.org/jeps/0](https://openjdk.org/jeps/0), se kterou si už poradil, přestože se zprvu cukal, že je to spousta dat. To se pak projevilo i během generování, kdy skončil předčasně a kus seznamu usekl. Řekl jsem si o JEP `265 and higher` a dostal list useknutý na 280. Nezbylo tedy než si říct potřetí o `281 až 300`. Ale to jsou všechno jen maličkosti pro ilustraci toho, že úplně samo to přeci jenom ještě nejde.

Pokud vás to zajímá, na momentální podobu výsledného seznamu se můžete podívat zde: [Java Features](https://github.com/AloisSeckar/demos-java/blob/master/JavaFeatures.md)

Soubor se rozhodně bude dál vyvíjet, budu do něj asi víc vstupovat i ručně, a možná tam dříve či později odhalím další chyby a nepřesnosti, nicméně rychlost jeho vzniku oproti tomu, kdybych si ho měl připravit sám, je prostě neuvěřitelná (i když člověk musí chvíli čekat, výpis se v chatovacím okně objevuje relativně "pomalu"). Pro takto dobře definované úkoly s jasným zdrojem dat a jednoduše porovnatelným výsledkem pokládám použití generativní AI za naprosto ideální.

Já osobně i po několika měsících stále bojuju s hledáním vhodných úkolů, které takto delegovat. ChatGPT mám neustále k dispozici, ale použiju ho třeba jednou týdně, pokud vůbec. Budu na tom muset ještě pracovat.
