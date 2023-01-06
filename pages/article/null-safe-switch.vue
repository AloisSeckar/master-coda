<template>
    <div>
        <ArticleHeader />
        <div class="article">
            <h2>Null safe switch</h2>
            <p>
                Switch je způsob, jak (nejen) v&nbsp;Javě rozdělit kód do více větví podle hodnoty kontrolní proměnné. 
                Použít jde tradičně na ordinální datové typy, enumy a&nbsp;od Java&nbsp;7 na řetězce. Java 17 čerstvě 
                přichází s&nbsp;pattern matchingem, který okruh možností dále rozšiřuje. To je však téma na samostatný článek.
            </p>
            <p>
                Stejně jako v případě <NuxtLink to="">.equals()</NuxtLink> se i&nbsp;v&nbsp;příkazu 
                <span class="code">switch</span> skrývá hrozba. Nemůžete do něj poslat <span class="code">null</span>, 
                aniž by se urazil a&nbsp;nevyplivl <span class="code">NullPointerException</span>.
            </p>
            <p>
                Tradiční řešení je obalit <span class="code">switch</span> kontrolní podmínkou:
            </p>

            <div class="code">
                <span class="j-key">if</span> (<span class="j-var">variable</span> != <span class="j-key">null</span>) {<br />
                &nbsp;&nbsp;<span class="j-key">switch</span> (<span class="j-var">variable</span>) {<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-com">…</span><br />
                &nbsp;&nbsp;}<br />
                }
            </div>

            <p>
                Jsou to ale dva řádky +&nbsp;odsazení navíc. Mě se proto víc líbí varianta s&nbsp;ternárním operátorem. 
                Protože nikde není psáno, že uvnitř závorek za klíčovým slovem <span class="code">switch</span> musí 
                být hodnota. Může tam klidně být i&nbsp;výraz, tedy:
            </p>
            <div class="code">
                <span class="j-key">switch</span> (<span class="j-var">variable</span> != <span class="j-key">null</span>
                    ? <span class="j-var">variable</span> : <span class="j-com">&lt;default&gt;</span> ) {…}
            </div>
            <p>
                Krom úspory místa se to může hodit třeba v&nbsp;případě, že chcete mít stejnou default akci (například 
                zahlásit „Neznámá akce“) jak pro neznámou hodnotu i&nbsp;pro <span class="code">null</span>. Teď prostě
                obojí dáte do <span class="code">default</span> labelu uvnitř <span class="code">switch</span> výrazu.
            </p>

            <h2>Optional?</h2>
            <p>
                Java 8&nbsp;umožňuje alternativní použití třídy <span class="code">Optional</span>, kde by zápis vypadal takto:
            </p>
            <div class="code">
                <span class="j-key">switch</span> (Optional.ofNullable(<span class="j-var">variable</span>).orElse(
                    <span class="j-com">&lt;default&gt;</span> )) {…}
            </div>
            <p>
                Je to o malinko delší, ale třeba pro někoho srozumitelnější a čitelnější než ternární operátor. 
                Navíc pokud instanci třídy Optional už máte v kódu k dispozici, pak už hraje srovnání čitelnosti 
                jednoznačně pro tuto variantu:
            </p>
            <div class="code">
                Optional&lt;String&gt; <span class="j-var">optVar</span> = Optional.ofNullable(<span class="j-var">variable</span>);<br />
                <span class="j-com">…</span><br />
                <span class="j-key">switch</span> (<span class="j-var">optVar</span>.orElse(
                    <span class="j-com">&lt;default&gt;</span> )) {…}
            </div>

        </div>
        <ArticleFooter />
    </div>
</template>