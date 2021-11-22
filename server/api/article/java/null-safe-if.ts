export default () => {
    return {
        'id': 'null-safe-if',
        'title': 'Null-safe porovnání',
        'content': `
<p>Jak se vyhnout problémům s null hodnotou při porovnávání aktuální hodnoty promněnné?</p>    
<h3>Null safe equals</h3>
<p>Často potřebujeme porovnat aktuální hodnotu proměnné s nějakou konstantou a podle toho určit další průchod kódem. Pokud je to v Javě textový řetězec, použijeme metodu <span class="code">.equals()</span>. Tedy něco jako:</p>
<div class="code">if (variable.equals(„hodnota“) …</div>
<p>Pokud však proměnná variable může být null (což předpokládejte vždycky, ledaže jste si 100% jistí, že tam vaše aplikace null nepustí), je tohle pozvánka pro <span class="code">NullPointerException</span>, aby na nás vyskočil, až se to bude nejméně hodit.</p>
<p>Co s tím? Jako první člověka asi napadne přidat další kontrolu:</p>
<div class="code">if (variable != null && variable.equals(„hodnota“) …</div>
<p>Což je samo o sobě správně. Akorát je to zbytečně moc písmenek a můžeme to napsat jednodušeji. Stačí otočit pořadí. Vůbec nic nám nebrání porovnávat:</p>
<div class="code">if („hodnota“.equals(variable)) …</div>
<p>Implementace metody <span class="code">.equals()</span> pro <span class="code">String</span> má porovnání s null argumentem vyřešeno – jak porovnání dvou objektů pomocí <span class="code">==</span>, tak operátor <span class="code">instanceof</span> si s null hodnotou poradí. <span class="code">NullPointerException nás ohrožuje pouze tehdy, pokud se <span class="code">.equals()</span> snažíme zavolat na null objekt. A jelikož řetězec „hodnota“ logicky nikdy null nebude, máme vyřešeno.</p>
<p>Doporučuji si ještě zvyknout nenechávat podobné řetězce přímo v kódu, ale vytahovat si je jako konstanty:</p>
<div class="code">private static final String HODNOTA = „hodnota“;
…
if (HODNOTA.equals(variable)) …</div>
<p> kdybyste ji potřebovali pouze jednou, toto vám pomůže držet definice na jednom místě a v případě potřeby snadno najít místo, kde provést úpravu. Já často používám napříč aplikací final třídu <span class="code">XYZConstants</span>, která obsahuje pouze <span class="code">public static final</span> definice konstant (a <span class="code">private</span> konstruktor, aby nikoho nenapadlo plevelit aplikaci jejími instancemi) použitelných podle potřeby kdekoliv jinde.</p>
<h3>Optional?</h3>
<p>Java 8 přinesla novinku v podobě třídy <span class="code">Optional</span>, která je navržena právě pro snazší práci s objekty, které mohou být null. Zrovna tento use-case však příliš nezjednodušuje. Psát bychom museli:</p>
<div class="code">if (Optional.ofNullable(variable).orElse("“).equals("hodnota")) …</div>
<p>A to je ještě delší než původní varianta s explicitním porovnáním s <span class="code">null. Pokud bychom už optional instanci měli k dispozici, bylo by to o něco lepší, pořád ale ne ideální.</p>
<div class="code">Optional<String> optVar = Optional.ofNullable(variable);
…
if (optVar.orElse("").equals("hodnota ")) …</div>
<p>Síla Optional objektů se víc projeví až v kombinaci s Lambda výrazy a Streamy, ale o tom až někdy příště.</p>
        `
    }
}