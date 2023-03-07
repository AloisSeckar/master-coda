Jedna z&nbsp;našich aplikací je už dost stará - postavená na Java EE&nbsp;6 a&nbsp;frontend dělaný v&nbsp;JSP se spoustou přidrátovaného JavaScriptu. Něco se vykonává v&nbsp;Javových “actions”, něco řeší ažJS na zobrazené stránce. Kvůli historickým problémům se zobrazováním se navíc udělalo, že klient obaluje nějakou starou verzi Internet Exploreru a&nbsp;v&nbsp;něm se vykresluje obsah. Tato legacy záležitost se nechystá zemřít, a&nbsp;tak do ní občas přidáváme nové funce.

Tuhle jsem potřeboval, aby se po kliknutí na tlačítko v&nbsp;detailu záznamu zobrazil v&nbsp;novém okně PDF dokument z&nbsp;interního archivu. Záznamy jsou několika typů a&nbsp;podle toho je potřeba pokaždé sáhnout na různá místa. Chtěl jsem to řešit hledáním společných částí (INFO, JRF a&nbsp;PD) v&nbsp;řetězci pro název typu, podle kterých se to dá poznat.

Google rychle odhalil, že JavaScript na to nabízí metodu `.includes()`. Tak jsem si myslel, že mám hotovo.

Jenomže to nefungovalo.

Metoda `.includes()` totiž přišla až s&nbsp;[ES6](https://www.w3schools.com/js/js_es6.asp) v&nbsp;roce 2015. Takže ačkoliv s&nbsp;ní už dávno nemá problém žádný z&nbsp;dnešních prohlížečů (obvyklý problém při tvorbě webů), náš speciální v&nbsp;aplikačním klientovi uvězněný starý IE nic takového nezná. Musel jsem se vrátit ke starému dobrému `if (…) then {` s&nbsp;kombinací `||` řetězení podmínek.

## Web Can I use…
Užitečným pomocníkem pro plánování kompatibility vašeho kódu může být například webová stránka [https://caniuse.com/](https://caniuse.com/), která je zaměřena přesně na tuto problematiku. V&nbsp;přehledné grafice ihned uvidíte, zda a&nbsp;od které verze prohlížeče tu kterou funkcionalitu podporují. Různých prohlížečů je v&nbsp;nabídce hned **sedmnáct**! S&nbsp;tím už vás jen tak něco nepřekvapí.

Například pro mnou zmiňovanou metodu `.includes()` to s&nbsp;podporou v&nbsp;prohlížečích vypadá [TAKTO](https://caniuse.com/?search=includes).

## Poučení
Vždy si dobře rozmyslet, zda mi bude věc fungovat i&nbsp;na cílové platformě. Existují on-line nástroje, jak to zjistit.
