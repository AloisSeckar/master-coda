---
file: 'neni-js-jako-js'
cat: 'debugging'
title: 'Není JavaScript jako JavaScript'
dscr: 'Když obvyklá JS metoda nechce fungovat...'
tags: ['debugging', 'JavaScript']
date: '2023-01-07'
created: '07.01.2023'
edited: '13.01.2023'
---

Jedna z našich aplikací je už dost stará - postavená na Java EE 6 a frontend dělaný v JSP se spoustou přidrátovaného JavaScriptu. Něco se vykonává v Javových “actions”, něco řeší až JS na zobrazené stránce. Kvůli historickým problémům se zobrazováním se navíc udělalo, že klient obaluje nějakou starou verzi Internet Exploreru a v něm se vykresluje obsah. Tato legacy záležitost se nechystá zemřít, a tak do ní občas přidáváme nové funkce.

Tuhle jsem potřeboval, aby se po kliknutí na tlačítko v detailu záznamu zobrazil v novém okně PDF dokument z interního archivu. Záznamy jsou několika typů a podle toho je potřeba pokaždé sáhnout na různá místa. Chtěl jsem to řešit hledáním společných částí (INFO, JRF a PD) v řetězci pro název typu, podle kterých se to dá poznat.

Google rychle odhalil, že JavaScript na to nabízí metodu `.includes()`{lang="js"}. Tak jsem si myslel, že mám hotovo.

Jenomže to nefungovalo.

Metoda `.includes()`{lang="js"} totiž přišla až s [ES6](https://www.w3schools.com/js/js_es6.asp) v roce 2015. Takže ačkoliv s ní už dávno nemá problém žádný z dnešních prohlížečů (obvyklý problém při tvorbě webů), náš speciální v aplikačním klientovi uvězněný starý IE nic takového nezná. Musel jsem se vrátit ke starému dobrému `if (…) then {`{lang="js"} s kombinací `||`{lang="js"} řetězení podmínek.

## Web Can I use…
Užitečným pomocníkem pro plánování kompatibility vašeho kódu může být například webová stránka [https://caniuse.com/](https://caniuse.com/), která je zaměřena přesně na tuto problematiku. V přehledné grafice ihned uvidíte, zda a od které verze prohlížeče tu kterou funkcionalitu podporují. Různých prohlížečů je v nabídce hned **sedmnáct**! S tím už vás jen tak něco nepřekvapí.

Například pro mnou zmiňovanou metodu `.includes()`{lang="js"} to s podporou v prohlížečích vypadá [TAKTO](https://caniuse.com/?search=includes).

::wise-words
Vždy si dobře rozmyslet, zda mi bude věc fungovat i na cílové platformě. Existují on-line nástroje, jak to zjistit.
::
