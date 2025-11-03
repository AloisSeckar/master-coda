const fun = [
  {
    id: 'junior-vs-senior',
    title: 'Junior vs. Senior DEV',
    added: '2023-01-14',
  },
  {
    id: 'tester',
    title: 'Tester',
    added: '2023-01-14',
  },
  {
    id: 'no-class',
    title: 'No class',
    added: '2023-01-14',
  },
  {
    id: 'join',
    title: 'Join',
    added: '2023-01-14',
  },
  {
    id: 'programmers-then-and-now',
    title: 'Dříve a dnes',
    explain: 'Vlevo Margaret Hamilton, programátorka mise Apollo 11; vpravo uživatel, co neumí s textovým editorem vim',
    added: '2023-01-14',
  },
  {
    id: 'developer-vs-tester',
    title: 'Developer vs. Tester',
    added: '2023-01-14',
  },
  {
    id: 'intern',
    title: 'Junior a Legacy kód',
    added: '2023-01-14',
  },
  {
    id: 'task-failed-successfully',
    title: 'Task Failed Successfully',
    added: '2023-01-14',
  },
  {
    id: 'debugging',
    title: 'Debugging',
    added: '2023-01-18',
  },
  {
    id: 'pointers',
    title: 'Jak funguje pointer',
    added: '2023-01-18',
  },
  {
    id: 'networking',
    title: 'Jak funguje internet',
    added: '2023-01-25',
  },
  {
    id: 'toggl-princess',
    title: 'Jak zachránit princeznu (by Toggl)',
    added: '2023-01-26',
  },
  {
    id: 'toggl-dragon',
    title: 'Jak zabít draka (by Toggl)',
    added: '2023-01-26',
  },
  {
    id: 'racing-languages',
    title: 'Závod programovacích jazyků',
    added: '2023-03-12',
  },
  {
    id: 'while-vs-do-while',
    title: 'Rozdíl mezi "while" a "do-swhile',
    added: '2023-03-16',
  },
  {
    id: 'async-programming',
    title: 'Asynchronní programování',
    added: '2023-03-16',
  },
  {
    id: 'who-caused-bug',
    title: 'Kdo způsobil tu chybu?',
    added: '2023-03-16',
  },
  {
    id: 'cat-vs-printer',
    title: 'Kočky vs. tiskárny',
    added: '2023-03-16',
  },
  {
    id: 'it-alignments',
    title: 'Programátorské povahy',
    added: '2023-05-12',
  },
  {
    id: 'computer-faults',
    title: 'Typy počítačových chyb',
    added: '2023-05-12',
  },
  {
    id: 'serious-threat',
    title: 'Skutečně závažná hrozba',
    explain: 'Narušitelé budou donuceni debuggovat PHP kód',
    added: '2023-05-16',
  },
  {
    id: 'file-name',
    title: 'Jména souborů',
    explain: 'Když ukládáte soubor jako `afagftgwj` a on už existuje',
    added: '2023-06-29',
  },
  {
    id: 'where-is-linux',
    title: 'Kde je Linux?',
    added: '2023-07-14',
  },
  {
    id: 'git-push-force',
    title: 'Push with force',
    explain: 'Příkaz, který umožní natvrdo propsat vaše změny do hlavní větve na vzdáleném úložišti',
    added: '2023-07-25',
  },
  {
    id: 'egg-chicken',
    title: 'Slepice nebo vejce?',
    explain: 'Seřazení pole Unicode znaků v JS',
    added: '2023-08-09',
  },
  {
    id: 'i-won',
    title: 'Debata o nejlepší název proměnné',
    explain: 'V cyklech používáme nejčastěji řídící proměnnou "i"',
    added: '2023-08-09',
  },
  {
    id: 'documentation',
    title: 'Úroveň dokumentace v projektech',
    explain: 'Často k vidění - nesmyslné a k ničemu užitečné popisy zjevných skutečností',
    added: '2023-08-23',
  },
  {
    id: 'funny-because-true',
    title: 'Je to pravda',
    explain: '!false === true',
    added: '2023-08-23',
  },
  {
    id: 'excel',
    title: 'Excel a automatické formátování',
    added: '2023-09-23',
  },
  {
    id: 'acronyms',
    title: 'Vysvětlení IT zkratek',
    added: '2023-11-18',
  },
  {
    id: 'dino-keyboard',
    title: 'Nová klávesnice',
    added: '2024-01-05',
  },
  {
    id: 'developer-needs',
    title: 'Pyramida IT potřeb',
    added: '2024-01-10',
  },
  {
    id: 'ctrl-x-ctrl-v',
    title: 'Ctrl-X + Ctrl-V',
    added: '2024-01-13',
  },
  {
    id: 'vim-playlist',
    title: 'Vim Playlist',
    explain: 'Vim je terminálový textový editor v Unixových systémech. Nezkušení uživatelé bývají zmatení ovládáním a mívají problémy editor opustit.',
    added: '2024-01-15',
  },
  {
    id: 'machine-learning',
    title: 'ML algoritmus v baru',
    explain: 'Strojové učení (Machine learning) se "učí" odhadovat správný výsledek na základě vstupů, které dostane',
    added: '2024-01-21',
  },
  {
    id: 'testing',
    title: 'Jak funguje testování',
    added: '2024-02-18',
  },
  {
    id: 'address',
    title: 'Není adresa jako adresa',
    explain: '1 = IP adresa, 2 = místní IP adresa počítače (localhost), 3 = tzv. MAC adresa zařízení připojeného k síti',
    added: '2024-05-11',
  },
  {
    id: 'try-catch',
    title: 'Try-Catch',
    added: '2024-05-11',
  },
  {
    id: 'multithreading',
    title: 'Multithreading - teorie vs. praxe',
    added: '2024-05-11',
  },
  {
    id: 'software-development',
    title: 'Jak probíhá vývoj softwaru, když...',
    added: '2024-06-20',
  },
  {
    id: 'toggl-games',
    title: 'Kdyby programovací jazyky byly hry (by Toggl)',
    added: '2024-07-30',
  },
  {
    id: 'css-puns',
    title: 'CSS slovní hříčky',
    added: '2024-09-23',
  },
  {
    id: 'root-beer',
    title: 'Oblíbený nápoj CSS vývojáře',
    explain: 'V USA oblíbený nápoj "root beer" - cola s bylinnou příchutí',
    added: '2024-09-25',
  },
  {
    id: '200-400',
    title: 'HTTP status',
    explain: 'Odpověď s chybou 4** se má vrátit i se statusem 4** a netvářit se jako v pořádku zpracovaný požadavek',
    added: '2024-10-21',
  },
  {
    id: 'trick-or-treat',
    title: 'Vennovy diagramy',
    explain: 'Operace s množinami - OR | AND | XOR | NOR | NAND | NXOR',
    added: '2024-10-21',
  },
  {
    id: 'learn-cpp',
    title: 'C++ v jedné lekci',
    added: '2024-10-30',
  },
  {
    id: 'compile-vs-runtime',
    title: 'Není error jako error',
    explain: 'Program, který se správně přeloží, ještě není program, který správně funguje',
    added: '2024-11-17',
  },
  {
    id: 'toggl-music',
    title: 'Hudební žánry (by Toggl)',
    added: '2024-12-01',
  },
  {
    id: 'bugfixing',
    title: 'Jak na opravy chyb',
    added: '2024-12-21',
  },
  {
    id: 'toggl-heroes',
    title: 'Komiksoví hrdinové (by Toggl)',
    added: '2025-02-01',
  },
  {
    id: 'philosophy',
    title: 'Filosofie programování',
    added: '2025-02-10',
  },
  {
    id: 'mac-os',
    title: 'Stopování uživatelů MacOS',
    explain: '.DS_Store je skrytý systémový soubor obsahující metainformace o adresáři',
    added: '2025-02-14',
  },
  {
    id: 'floor-is-java',
    title: 'The floor is Java',
    added: '2025-03-04',
  },
  {
    id: 'development-models',
    title: 'Development Models',
    explain: 'Waterfall - postupně od návrhu přes vývoj až po testování a nasazení; Agile - iterativní vývoj od malého prototypu k úplnému řešení; AI - beze slov :D',
    added: '2025-06-20',
  },
  {
    id: 'sans-sheriff',
    title: 'Sans Sheriff',
    explain: 'Písmo Sans Serif (z francouzštiny "bezpatkové")',
    added: '2025-06-29',
  },
  {
    id: 'as-any',
    title: 'Typescript as any',
    explain: 'Konstrukt "as any" umožní v TypeScriptu zcela ignorovat typovou kontrolu',
    added: '2025-11-03',
  },
]

export { fun }
