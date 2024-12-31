Už nějakou dobu si hraju s obrázky od [Midjourney](https://www.midjourney.com/), ale **Tu AI** jménem [ChatGPT](https://openai.com/blog/chatgpt) jsem až do včerejška nevyzkoušel. Řekl jsem si, že nastal čas to napravit.

## Asistent při programování

Zrovna jsem si vymyslel, že na svůj web přidám možnost importu uživatelského vstupu z `.json` souboru. Honem jsem ale nevěděl, jak přesně bych to udělal - po kliknutí na tlačítko zobrazit dialog pro výběr souborů, vybraný soubor načíst do proměnné a tu pak použít pro naplnění hodnot formulářových prvků. V JavaScriptu jsem to ještě nedělal. Nic světoborného a určitě bych to brzy dohledal, ale byl to ideální podnět pro vyzkoušení ChatGPT.

Takže jsem se zeptal: `Propose JavaScript code to upload a file after clicking on button`

Během chvilky jsem dostal zformátovaný, zvýrazněný a okomentovaný zdrojový kód s vysvětlením, co přesně dělá.

Trochu mi to nevyhovovalo, protože předpokládal, že mám webový formulář s File inputem. Ok, další otázka: `What if I only have a button and no file input?`

Voilá! Upravená verze kódu si pomocí JS sama nový element pro File input vloží do DOM a nastaví CSS `display: hidden`, aby nebyl na stránce vidět.

Poslední potíž - ukázkový kód předpokládal existenci nějaké URL se vzdálenou službou pro upload souborů. Já potřeboval soubor zpracovat jenom v paměti prohlížeče: `Is it possible not to upload to url but just into browser memory?`

No jasně, že to je možné. A koukej, dělá se to takhle.

Koho to zajímá, finální návrh kódu od ChatGPT je tady:

```js
// HTML element reference
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');

// Event listener for button click
uploadButton.addEventListener('click', () => {
  fileInput.click(); // Trigger the file input dialog
});

// Event listener for file input change
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0]; // Get the selected file

  // Read the file data
  const reader = new FileReader();
  reader.onload = (event) => {
    const fileData = event.target.result; // The file data in browser memory

    // Perform operations on the file data
    // For example, you can display the file content in a textarea
    const textarea = document.getElementById('file-content');
    textarea.value = fileData;
  };
  reader.readAsText(file);
});
```

To celé za pár chvilek - i ve free verzi - a bez nutnosti kamkoliv překlikávat. Doteď jsem podobné věci "googlil", což při troše štěstí najde jako první (funkční) kód na [Stack Overflow](https://stackoverflow.com/), ale často se člověk dostane spíš na nějaký tutorial článek, kde sice nakonec potřebná informace je, ale trvá to se v ní vyznat.

Strávil jsem samozřemě nějaký čas adaptací navrženého kódu pro můj konkrétní program a [výsledná úprava](https://github.com/AloisSeckar/WBSC-Scoring/commit/9b8d3c8c03b46750af34cf13666ce796e4b2a776) vypadá o dost jinak, ale zrychlení procesu fakt stálo za to.

Při dalším vývoji jsem se ještě ptal, jak obrátit pořadí pole pro for-each cyklus, jak správně napsat regulární výraz pro test, zda řetězec končí číslem a jak nejlépe získat poslední znak řetězce. Všechno bych buďto "nějak" vymyslel sám na základě toho, co znám, nebo našel přes Google, ale zase - všechno na jednom místě a rychle.

## Pomocník při psaní

Pak jsem chtěl pomoct s [článkem](https://master-coda.netlify.app/article/nuxt-ui). To jsem vlastně chtěl jako první, ale chuť něco nového naprogramovat mě přepadla dřív, než chuť něco dopisovat.

Konkrétně mi šlo o stručné představení čtyř UI technologií, na jejichž integrace do frameworku Nuxt jsem stvořil demo příklady - něco jako slovníková definice. Práce na chvilku, ale vůbec se mi do toho nechtělo. Tak jsem poprosil ChatGPT o: `Napiš definici XY do 50 slov` (posléze upraveno na `Popiš XY v 50 slovech`).

S takto vágním zadáním z toho sice vylezly i dost vágní definice, ale pořád to byl základ, který jsem pak mohl přizpůsobit k obrazu svému. AI za mě překonala kritickou fázi "jak začít?". Doplněný článek, který jsem následně rozšířil i o mé vlastní názory a doporučení k jednotlivým nástrojům, už od rána visí na webu. Kdybych se k tomu měl dokopat sám, kdo ví, kdy by to bylo.

## Co naopak ještě neumíme?

ChatGPT má ovšem přeci jen i jednu velkou vadu - neumí přiznat, že něco neví. A co hůř, klidně si místo toho vymýšlí. Například neváhal napsat "návod" s použitím NPM modulu, který neexistuje. Alespoň že nezapírá, když je "přistižen". Některé odpovědi je ovšem třeba brát s rezervou.

Druhý problém je, že aktuální verze, se kterou se bavím, má znalosti platné v září 2021. Na obecné a zavedené konstrukce v rozšířených programovacích jazycích tedy super, ale s vývojem pro [Nuxt](https://nuxt.com/) verze 3, který byl tou dobou ještě v plenkách v některé z alpha verzí, mi zrovna příliš nepomůže. Škoda, potřeboval bych poradit s nastavením pro SEO meta tagy. Budu se holt muset obrátit na živé programátory, kteří se kolem Nuxtu pohybují...

## A co dál?

To infinity and beyond!

Zatím jsem sotva nakoukl klíčovou dírkou do nového světa. Vlastně ještě vůbec nevím, co všechno teď můžu. Ale rád to budu zkoumat. Zatím myslím, že nejdůležitější je mít v hlavě cíl a správně zformulovat úkol pro ChatGPT (ev. jiný nástroj umělé inteligence). Postupně identifikovat věci, se kterými se zatím zbytečně trápím sám a delegovat jejich řešení/tvorbu na AI.

**Fakt:** _Vývoj vždycky probíhá pomaleji, než si mnozí myslí._ ChatGPT není "živý" a v nejbližší době neovládne svět a nevyhladí lidstvo. 

**Fakt č. 2:** _Vývoj vždycky probíhá rychleji, než si mnozí myslí._ Když si vzpomenu, že pár let zpátky jsem ještě neměl chytrý telefon a v něm internetový vyhledávač čehokoliv, online mapu, aplikaci na jízdní řády a nákup jízdenek, atd. Těším se na to, co bude za dalších pár let.
