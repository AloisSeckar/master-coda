Jedna z věcí, co mě baví na JavaScriptu, je možnost zkráceného vyhodnocování, zda je proměnná řádně naplněná. Namísto zdlouhavého porovnávání `if (text !== undefined && text !== null && text.length > 0)` můžeme psát jenom `if (text)` a zafunguje to stejně.

Jen je potřeba si dávat pozor, pokud chce člověk skládat více takových podmínek. Když zadáte:

```js
let text1 = 'text1'
let text2 = 'text2'
console.log(text1 && text2)
console.log(text1 || text2)
```

tak totiž nedostanete `true`, jak čas od času nepozorného JavaScript vývojáře napadne, nýbrž v prvním případě `'text2'` a v druhém `'text1'`. Huh? :dizzy_face:

U prvního výrazu se sice jako první vyhodnotí [_truthiness_](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) proměnné `text1`, ale po vyhodnocení `text2` zůstane JavaScriptu reálná hodnota řetězce, a tak ji vrátí, protože nemá očekávat, že jste ho nenakrmili `boolean` hodnotami, jak byste správně měli. Naproti tomu v případě „or“ je _truthy_ už `text1`, takže z výrazu vypadne skutečná hodnota proměnné. Ono `if (text)` z úvodu článku to vlastně udělá taky. My však s hodnotou dál nijak nepracujeme, jen jsme chtěli vědět, že tam _**nějaká**_ je, a tak to funguje.

Podobné legrácky mají zřejmě na svědomí utkvělou představu mnohých programátorů, že JavaScript je zlo a bordel, kterému je vhodné se obloukem vyhýbat. Přitom je spíš jejich chyba, pokud se do něj snaží procpat nelogické kombinace. _**„Play stupid games, win stupid prizes.“**_. Původně jsem myslel, že tu pravidla vyhodnocování operátorů v JavaScriptu rozeberu trochu podrobněji, ale je to docela složité, takže jen [odkaz na dokumentaci](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) pro [`&&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) a [`||`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) pro ty, které by to zajímalo (jsou tam i ostatní logické operátory).

Aby logické operace fungovaly skutečně logicky, potřebujeme je krmit operandy, které jsou opravdu `boolean`, tj. `true` nebo `false` samy od sebe, a nikoliv díky nějakému kouzlu na pozadí. Jinak totiž budete dřív nebo později nevěřícně debuggovat aplikaci a divit se, jaktože se podmínka nevyhodnocuje podle vašeho očekávání.

Pokud se bojíte, že to znamená návrat k „ukecanému“ explicitnímu porovnání s několika možnými (ne)hodnotami, nevěšte hlavu. Máme na to trik. Přepište to jednoduše jako:

```js
console.log(!!text1 && !!text2)
console.log(!!text1 || !!text2)
```

Funguje to! Ale proč? :eyes: 

Nebojte, u mě taky nastal „WTF?“ moment, když jsem to poprvé viděl. Ale na dvojité negaci není nic magického. JavaScript opět začně tím, že si vyhodnotí _truthiness_ proměnné `text1`, a jelikož tam je `'text1'`, tak má interně hodnotu `true`. Tu mu prvním `!` znegujeme a pak dalším `!` znegujeme podruhé. Možná si pamatuje ze školních hodin matematiky průpovídku, že _**„minus a minus je plus“**_. A sláva, zase jednou se vám něco ze školy hodí v běžném životě!

Kdyby to bylo naopak a `text1` byl `undefined`, `null` nebo prázdný řetězec, JavaScript řekne jako první `false`, první negace udělá `true` a druhá zase zpátky `false`.

Pomocí zřetězení dvou logických NOT `!!` tedy dostáváme jednoduchý, univerzální a vždy funkční převod JavaScriptových hodnot na `boolean` výrazy, které pak lze bezpečně používat pro logické vyhodnocování podmínek. Pamatujte na to, až budete psát svůj JS kód a buďte připraveni hledat nesprávná použití, jestli budete někdy hledat chyby v existujících programech.
