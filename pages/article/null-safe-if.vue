<template>
    <div>
        <ArticleHeader />
        <div>
            <h2>Null safe equals</h2>
            <p>Často potřebujeme porovnat aktuální hodnotu proměnné s&nbsp;nějakou konstantou a&nbsp;podle toho určit
                další průchod kódem. Pokud je to v&nbsp;Javě textový řetězec, použijeme metodu <span
                    class="code">.equals()</span>. Tedy něco jako:</p>
            <div class="code"><span class="j-key">if</span> (<span class="j-var">variable</span>.equals(<span
                    class="j-lit">"hodnota"</span>) {…}</div>
            <p>Pokud však proměnná variable může být null (což předpokládejte vždycky, ledaže jste si 100% jistí, že tam
                vaše aplikace null nepustí), je tohle pozvánka pro <span class="code">NullPointerException</span>, aby
                na nás vyskočil, až se to bude nejméně hodit.</p>
            <p>Co s&nbsp;tím? Jako první člověka asi napadne přidat další kontrolu:</p>
            <div class="code"><span class="j-key">if</span> (<span class="j-var">variable</span> != <span
                    class="j-key">null</span> && <span class="j-var">variable</span>.equals(<span
                    class="j-lit">"hodnota"</span>) {…}</div>
            <p>Což je samo o&nbsp;sobě správně. Akorát je to zbytečně moc písmenek a&nbsp;můžeme to napsat jednodušeji.
                Stačí otočit pořadí. Vůbec nic nám nebrání porovnávat:</p>
            <div class="code"><span class="j-key">if</span> (<span class="j-lit">"hodnota"</span>.equals(<span
                    class="j-var">variable</span>)) {…}</div>
            <p>Implementace metody <span class="code">.equals()</span> pro <span class="code">String</span> má porovnání
                s&nbsp;null argumentem vyřešeno –&nbsp;jak porovnání dvou objektů pomocí <span class="code">==</span>,
                tak operátor <span class="code">instanceof</span> si s&nbsp;null hodnotou poradí. <span
                    class="code">NullPointerException</span> nás ohrožuje pouze tehdy, pokud se <span
                    class="code">.equals()</span> snažíme zavolat na null objekt. A&nbsp;jelikož řetězec "hodnota"
                logicky nikdy null nebude, máme vyřešeno.</p>
            <p>Doporučuji si ještě zvyknout nenechávat podobné řetězce přímo v&nbsp;kódu, ale vytahovat si je jako
                konstanty:</p>
            <div class="code"><span class="j-key">private static final</span> String <span class="j-var">HODNOTA</span>
                = <span class="j-lit">"hodnota"</span>;<br />
                …<br />
                if (<span class="j-var">HODNOTA</span>.equals(<span class="j-var">variable</span>)) {…}</div>
            <p>I&nbsp;kdybyste ji potřebovali pouze jednou, toto vám pomůže držet definice na jednom místě
                a&nbsp;v&nbsp;případě potřeby snadno najít, kde provést úpravu. Já často používám napříč aplikací final
                třídu <span class="code">XYZConstants</span>, která obsahuje pouze <span class="code">public static
                    final</span> definice konstant (a&nbsp;<span class="code">private</span> konstruktor, aby nikoho
                nenapadlo plevelit aplikaci jejími instancemi) použitelných podle potřeby kdekoliv jinde.</p>
            <h2>Optional?</h2>
            <p>Java&nbsp;8 přinesla novinku v podobě třídy <span class="code">Optional</span>, která je navržena právě
                pro snazší práci s&nbsp;objekty, které mohou být null. Zrovna tento use-case však příliš nezjednodušuje.
                Psát bychom museli:</p>
            <div class="code"><span class="j-key">if</span> (Optional.ofNullable(<span
                    class="j-var">variable</span>).orElse(<span class="j-lit">""</span>).equals(<span
                    class="j-lit">"hodnota"</span>)) {…}</div>
            <p>A&nbsp;to je ještě delší než původní varianta s explicitním porovnáním s&nbsp;<span
                    class="code">null</span>. Pokud bychom už optional instanci měli k&nbsp;dispozici, bylo by to
                o&nbsp;něco lepší, ale pořád ne ideální.</p>
            <div class="code">Optional <span class="j-var">optVar</span> = Optional.ofNullable(<span
                        class="j-var">variable</span>);<br />
                    …<br />
                    <span class="j-key">if</span> (<span class="j-var">optVar</span>.orElse(<span
                        class="j-lit">""</span>).equals(<span class="j-lit">"hodnota"</span>)) {…}</div>
            <p>Síla Optional objektů se víc projeví až v&nbsp;kombinaci s&nbsp;Lambda výrazy a&nbsp;Streamy, ale o tom
                až někdy příště.</p>
        </div>
        <ArticleFooter />
    </div>
</template>