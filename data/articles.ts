const articles = [
  {
    id: 'null-safe-equals',
    cat: 'java',
    title: 'Null-safe porovnání',
    dscr: 'Jak se vyhnout problémům s NULL hodnotou při porovnávání aktuální hodnoty proměnné?',
    tags: ['Java', 'tipy', 'syntaxe', 'NullPointerException'],
    created: '04.01.2023',
    edited: '07.03.2023'
  },
  {
    id: 'null-safe-switch',
    cat: 'java',
    title: 'Null-safe switch',
    dscr: 'Jak se vyhnout problémům s NULL hodnotou při vyhodnocení podmínky příkazu switch?',
    tags: ['Java', 'tipy', 'syntaxe', 'NullPointerException'],
    created: '06.01.2023',
    edited: '06.01.2023'
  },
  {
    id: 'neni-js-jako-js',
    cat: 'debugging',
    title: 'Není JavaScript jako JavaScript',
    dscr: 'Když obvyklá JS metoda nechce fungovat...',
    tags: ['debugging', 'JavaScript'],
    created: '07.01.2023',
    edited: '13.01.2023'
  },
  {
    id: 'skryte-znaky',
    cat: 'debugging',
    title: 'Skryté (pa)znaky',
    dscr: 'Fonty nejsou tím, čím se zdají být',
    tags: ['debugging', 'fonty'],
    created: '07.01.2023',
    edited: '07.01.2023'
  },
  {
    id: 'return-v-metode',
    cat: 'misc',
    title: 'Kolikrát má být v metodě return?',
    dscr: 'Vždycky pouze jednou nebo to může být i jinak?',
    tags: ['refactoring', 'syntaxe'],
    created: '08.01.2023',
    edited: '08.01.2023'
  },
  {
    id: 'switch-java17',
    cat: 'java',
    title: 'Vylepšený switch v Java 17',
    dscr: 'Příjemné syntaktické novinky v (zatím) poslední LTS verzi Javy',
    tags: ['Java', 'tipy', 'tutorial', 'syntaxe'],
    created: '12.01.2023',
    edited: '12.01.2023'
  },
  {
    id: 'redukce-velikosti-fontu',
    cat: 'web',
    title: 'Redukce objemu dat při práci s webovými fonty',
    dscr: 'Jak se vyhnout posílání zbytečných dat při použití netradičního fontu na webu',
    tags: ['web', 'css', 'tipy', 'fonty', 'optimalizace', 'tutorial', 'python'],
    created: '14.01.2023',
    edited: '14.01.2023'
  },
  {
    id: 'nuxt',
    cat: 'web',
    title: 'Nuxt Framework',
    dscr: 'Představení nástroje, který je pro mě aktuálně nejlepší volbou pro tvorbu webů',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tipy'],
    created: '09.09.2023',
    edited: '09.09.2023'
  },
  {
    id: 'nuxt-simple',
    cat: 'web',
    title: 'Nuxt Tutorial 1 - První kroky',
    dscr: 'Jak málo dnes stačí na funkční web',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    edited: '14.09.2023'
  },
  {
    id: 'nuxt-pages',
    cat: 'web',
    title: 'Nuxt Tutorial 2 - Components & Pages',
    dscr: 'Nuxt 3 - jak fungují složky /components a /pages',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    edited: '15.09.2023'
  },
  {
    id: 'nuxt-utils',
    cat: 'web',
    title: 'Nuxt Tutorial 3 - Utils & Composables',
    dscr: 'Nuxt 3 - jak fungují složky /utils a /composables',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    edited: '16.09.2023'
  },
  {
    id: 'nuxt-api',
    cat: 'web',
    title: 'Nuxt Tutorial 4 - Serverová část',
    dscr: 'Nuxt 3 - jak funguje serverová část',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    edited: '27.09.2023'
  },
  {
    id: 'nuxt-middleware',
    cat: 'web',
    title: 'Nuxt Tutorial 5 - Middleware',
    dscr: 'Nuxt 3 - jak pracuje middleware',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    edited: '28.09.2023'
  },
  {
    id: 'nuxt-vue',
    cat: 'web',
    title: 'Nuxt Tutorial 6 - Vue.js intermezzo',
    dscr: 'Nuxt 3 - alespoň stručný pohled na základní principy Vue.js, nad kterým je Nuxt postaven',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '30.09.2023'
  },
  {
    id: 'nuxt-ui',
    cat: 'web',
    title: 'Nuxt Tutorial 7 - UI integrace',
    dscr: 'Nuxt 3 - jak snadno integrovat UI prvky',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS'],
    created: '09.09.2023'
  },
  {
    id: 'nuxt-forms',
    cat: 'web',
    title: 'Nuxt Tutorial 8 - Formuláře',
    dscr: 'Nuxt 3 - jak snadno integrovat formulářové prvky',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI'],
    created: '09.09.2023'
  },
  {
    id: 'nuxt-content',
    cat: 'web',
    title: 'Nuxt Tutorial 9 - Nuxt Content',
    dscr: 'Nuxt 3 - modul pro usnadnění tvorby obsahu',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'Markdown'],
    created: '09.09.2023'
  },
  {
    id: 'nuxt-pinia',
    cat: 'web',
    title: 'Nuxt Tutorial 10 - State management',
    dscr: 'Nuxt 3 - jak ukládat a distibuovat data napříč celou aplikací',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    wip: true
  },
  {
    id: 'nuxt-tailwind',
    cat: 'web',
    title: 'Nuxt Tutorial 11 - CSS',
    dscr: 'Nuxt 3 - jak si usnadnit tvorbu CSS vzhledu',
    tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial'],
    created: '09.09.2023',
    wip: true
  },
  {
    id: 'click-prevent',
    cat: 'debugging',
    title: 'Nechtěný reload stránky',
    dscr: 'Kliknutí na HTML odkaz dělá víc, než se na první pohled může zdát',
    tags: ['debugging', 'JavaScript', 'HTML'],
    created: '15.05.2023',
    edited: '15.05.2023'
  },
  {
    id: 'hello-chatgpt-1',
    cat: 'misc',
    title: 'První rande s ChatGPT',
    dscr: 'Kliknutí na HTML odkaz dělá víc, než se na první pohled může zdát',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '20.05.2023',
    edited: '20.05.2023'
  },
  {
    id: 'hello-chatgpt-2',
    cat: 'misc',
    title: 'Druhé rande s ChatGPT - texty',
    dscr: 'Proč AI ano a proč ne s překvapením',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '27.05.2023',
    edited: '27.05.2023'
  },
  {
    id: 'hello-chatgpt-3',
    cat: 'misc',
    title: 'Třetí rande s ChatGPT - barvy',
    dscr: 'AI coby můj osobní designový poradce',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '07.06.2023',
    edited: '08.09.2023'
  },
  {
    id: 'hello-chatgpt-4',
    cat: 'misc',
    title: 'Čtvrté rande s ChatGPT - seznam Java features',
    dscr: 'Generování obsáhlého seznamu z konkrétních dat v konkrétním formátování',
    tags: ['ChatGPT', 'AI', 'programování', 'help'],
    created: '08.09.2023',
    edited: '08.09.2023'
  }
]

export { articles }
