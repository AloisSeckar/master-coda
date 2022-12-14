<template>
    <div>
        <ArticleHeader />
        <div>
            <p>Jedna z&nbsp;našich aplikací je už dost stará - postavená na Java EE&nbsp;6 a&nbsp;frontend dělaný
                v&nbsp;JSP se spoustou přidrátovaného JavaScriptu. Něco se vykonává v Javových “actions”, něco řeší až
                JS na zobrazené stránce. Kvůli historickým problémům se zobrazováním se navíc udělalo, že klient obaluje
                nějakou starou verzi Internet Exploreru a&nbsp;v&nbsp;něm se vykresluje obsah. Tato legacy záležitost se
                nechystá zemřít, a&nbsp;tak do ní občas přidáváme nové funce.</p>
            <p>Tuhle jsem potřeboval, aby se po kliknutí na tlačítko v&nbsp;detailu záznamu zobrazil v&nbsp;novém okně
                PDF dokument z&nbsp;interního archivu. Záznamy jsou několika typů a&nbsp;podle toho je potřeba pokaždé
                sáhnout na různá místa. Chtěl jsem to řešit hledáním společných částí (INFO, JRF a PD) v&nbsp;řetězci
                pro název typu, podle kterých se to dá poznat.</p>
            <p>Google rychle odhalí, že JavaScript na to nabízí metodu <span class="code">.includes()</span>. Tak jsem
                si myslel, že mám hotovo.</p>
            <p>Jenomže to nefungovalo.</p>
            <p>Metoda <span style="class">.includes()</span> totiž přišla až s&nbsp;<a
                    href="https://www.w3schools.com/js/js_es6.asp">ES6</a> v&nbsp;roce 2015. Takže ačkoliv s&nbsp;ní už
                dávno nemá problém žádný z&nbsp;dnešních prohlížečů (obvyklý problém při tvorbě webů), náš speciální
                v&nbsp;aplikačním klientovi uvězněný starý IE nic takového nezná. Musel jsem se vrátit ke starému
                dobrému <span class="code">if (…) then {</span> s&nbsp;kombinací <span class="code">||</span> řetězení
                podmínek.</p>
            <p><strong>Poučení</strong>: Vždy si dobře rozmyslet, zda mi bude věc fungovat i&nbsp;na cílové platformě.
            </p>
        </div>
        <ArticleFooter />
    </div>
</template>

