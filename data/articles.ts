const articles = [
  {
    id: 'null-safe-equals',
    cat: 'java',
    title: 'Null-safe porovnání',
    dscr: 'Jak se vyhnout problémům s NULL hodnotou při porovnávání aktuální hodnoty proměnné?',
    tags: ['Java', 'tipy', 'syntaxe', 'NullPointerException'],
    created: '04.01.2023',
    edited: '07.03.2023',
  },
  {
    id: 'null-safe-switch',
    cat: 'java',
    title: 'Null-safe switch',
    dscr: 'Jak se vyhnout problémům s NULL hodnotou při vyhodnocení podmínky příkazu switch?',
    tags: ['Java', 'tipy', 'syntaxe', 'NullPointerException'],
    created: '06.01.2023',
    edited: '06.01.2023',
  },
  {
    id: 'neni-js-jako-js',
    cat: 'debugging',
    title: 'Není JavaScript jako JavaScript',
    dscr: 'Když obvyklá JS metoda nechce fungovat...',
    tags: ['debugging', 'JavaScript'],
    created: '07.01.2023',
    edited: '13.01.2023',
  },
  {
    id: 'skryte-znaky',
    cat: 'debugging',
    title: 'Skryté (pa)znaky',
    dscr: 'Fonty nejsou tím, čím se zdají být',
    tags: ['debugging', 'fonty'],
    created: '11.01.2023',
    edited: '11.01.2023',
  },
  {
    id: 'return-v-metode',
    cat: 'misc',
    title: 'Kolikrát má být v metodě return?',
    dscr: 'Vždycky pouze jednou nebo to může být i jinak?',
    tags: ['refactoring', 'syntaxe'],
    created: '08.01.2023',
    edited: '08.01.2023',
  },
  {
    id: 'switch-java17',
    cat: 'java',
    title: 'Vylepšený switch v Java 17',
    dscr: 'Příjemné syntaktické novinky v (zatím) poslední LTS verzi Javy',
    tags: ['Java', 'tipy', 'tutorial', 'syntaxe'],
    created: '12.01.2023',
    edited: '12.01.2023',
  },
  {
    id: 'redukce-velikosti-fontu',
    cat: 'web',
    title: 'Redukce objemu dat při práci s webovými fonty',
    dscr: 'Jak se vyhnout posílání zbytečných dat při použití netradičního fontu na webu',
    tags: ['web', 'css', 'tipy', 'fonty', 'optimalizace', 'tutorial', 'python'],
    created: '14.01.2023',
    edited: '14.01.2023',
  },
  {
    id: 'nuxt',
    cat: 'web',
    title: 'Nuxt Tutorial',
    dscr: 'Představení nástroje, který je pro mě aktuálně nejlepší volbou pro tvorbu webů',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tipy'],
    created: '25.03.2024',
    edited: '05.05.2024',
  },
  {
    id: 'nuxt-simple',
    cat: 'web',
    title: 'Nuxt Tutorial 1 - První kroky',
    dscr: 'Jak málo dnes stačí na funkční web',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '26.03.2024',
    edited: '07.09.2024',
  },
  {
    id: 'nuxt-pages',
    cat: 'web',
    title: 'Nuxt Tutorial 2 - Components & Pages',
    dscr: 'Nuxt - jak fungují složky /components a /pages',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '31.03.2024',
    edited: '09.09.2024',
  },
  {
    id: 'nuxt-utils',
    cat: 'web',
    title: 'Nuxt Tutorial 3 - Utils & Composables',
    dscr: 'Nuxt - jak fungují složky /utils a /composables',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '17.04.2024',
    edited: '05.05.2024',
  },
  {
    id: 'nuxt-api',
    cat: 'web',
    title: 'Nuxt Tutorial 4 - Serverová část',
    dscr: 'Nuxt - jak funguje serverová část',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '01.05.2024',
    edited: '01.05.2024',
  },
  {
    id: 'nuxt-middleware',
    cat: 'web',
    title: 'Nuxt Tutorial 5 - Middleware',
    dscr: 'Nuxt - jak pracuje middleware',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '05.05.2024',
    edited: '05.05.2024',
  },
  {
    id: 'nuxt-vue',
    cat: 'web',
    title: 'Nuxt Tutorial 6 - Vue.js intermezzo',
    dscr: 'Nuxt - alespoň stručný pohled na základní principy Vue.js, nad kterým je Nuxt postaven',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '28.07.2024',
  },
  {
    id: 'nuxt-gui',
    cat: 'web',
    title: 'Nuxt Tutorial 7 - UI integrace',
    dscr: 'Nuxt - jak snadno integrovat UI prvky',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS'],
    created: '24.08.2024',
    edited: '20.09.2024',
  },
  {
    id: 'nuxt-ui',
    cat: 'web',
    title: 'Nuxt Tutorial 8 - Nuxt UI',
    dscr: 'Nuxt - práce s modulem Nuxt UI dedikovaným pro práci s uživatelským rozhraním',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS'],
    created: '26.08.2024',
  },
  {
    id: 'nuxt-forms',
    cat: 'web',
    title: 'Nuxt Tutorial 9 - Formuláře',
    dscr: 'Nuxt + FormKit = snadná tvorba formulářů',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI'],
    created: '15.09.2024',
  },
  {
    id: 'nuxt-content',
    cat: 'web',
    title: 'Nuxt Tutorial 10 - Nuxt Content',
    dscr: 'Nuxt + Nuxt Content = tvorba obsahu bez zbytečných komplikací',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'Markdown'],
    created: '05.10.2024',
    edited: '09.02.2025',
  },
  {
    id: 'nuxt-pinia',
    cat: 'web',
    title: 'Nuxt Tutorial 11 - State management',
    dscr: 'Nuxt + Pinia = efektivní ukládání a distibuce dat napříč celou aplikací',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '15.02.2025',
  },
  {
    id: 'nuxt-database',
    cat: 'web',
    title: 'Nuxt Tutorial 12 - Databáze',
    dscr: 'Rychlá integrace databázových systémů do Nuxt projektů',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '13.01.2024',
    wip: true,
    hidden: true,
  },
  {
    id: 'click-prevent',
    cat: 'debugging',
    title: 'Nechtěný reload stránky',
    dscr: 'Kliknutí na HTML odkaz dělá víc, než se na první pohled může zdát',
    tags: ['debugging', 'JavaScript', 'HTML'],
    created: '15.05.2023',
    edited: '15.05.2023',
  },
  {
    id: 'hello-chatgpt-1',
    cat: 'misc',
    title: 'První rande s ChatGPT',
    dscr: 'Kliknutí na HTML odkaz dělá víc, než se na první pohled může zdát',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '20.05.2023',
    edited: '20.05.2023',
  },
  {
    id: 'hello-chatgpt-2',
    cat: 'misc',
    title: 'Druhé rande s ChatGPT - texty',
    dscr: 'Proč AI ano a proč ne s překvapením',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '27.05.2023',
    edited: '27.05.2023',
  },
  {
    id: 'hello-chatgpt-3',
    cat: 'misc',
    title: 'Třetí rande s ChatGPT - barvy',
    dscr: 'AI coby můj osobní designový poradce',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '07.06.2023',
    edited: '08.09.2023',
  },
  {
    id: 'hello-chatgpt-4',
    cat: 'misc',
    title: 'Čtvrté rande s ChatGPT - seznam Java features',
    dscr: 'Generování obsáhlého seznamu z konkrétních dat v konkrétním formátování',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '08.09.2023',
    edited: '08.09.2023',
  },
  {
    id: 'hello-chatgpt-5',
    cat: 'misc',
    title: 'Páté rande s ChatGPT - obrázky z Wikipedie',
    dscr: 'Pokus o automatizaci získávání URL na svg obrázky z Wikipedie',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '14.10.2023',
    edited: '17.10.2023',
  },
  {
    id: 'js-gotcha-1',
    cat: 'debugging',
    title: 'Chytáky v JavaScriptu 1 - Není všechno boolean, co je za if',
    dscr: 'Vyhodnocování logických výrazů nemusí vždy fungovat tak, jak si myslíte',
    tags: ['debugging', 'JavaScript'],
    created: '18.11.2023',
    edited: '20.11.2023',
  },
  {
    id: 'js-gotcha-2',
    cat: 'debugging',
    title: 'Chytáky v JavaScriptu 2 - Reaktivní Vue.js proměnné',
    dscr: 'Při použití Vue reaktivity je třeba pamatovat na správné referencování hodnot',
    tags: ['debugging', 'JavaScript', 'Vue.js'],
    created: '23.11.2023',
    edited: '23.11.2023',
  },
  {
    id: 'regex-neni-nepritel',
    cat: 'misc',
    title: 'Regex není nepřítel ',
    dscr: 'Jak lze využít regulární výrazy k rychlým úpravám textu na praktickém příkladu',
    tags: ['regulární výrazy', 'regex', 'help', 'tutorial'],
    created: '31.12.2023',
  },
  {
    id: 'vue-overcomputed',
    cat: 'debugging',
    title: 'Overcomputed Vue.js',
    dscr: 'Pozor na Vue.js reaktivní funkci `computed()`, může se spouštět častěji, než byste čekali a chtěli',
    tags: ['debugging', 'JavaScript', 'Vue.js'],
    created: '21.08.2024',
  },
  {
    id: 'neni-short-jako-int',
    cat: 'debugging',
    title: 'Není short jako int',
    dscr: 'Když nesedí datové typy, dějí se zvláštní věci',
    tags: ['debugging', 'Java', 'testy', 'datové typy'],
    created: '07.09.2024',
  },
]

export { articles }
