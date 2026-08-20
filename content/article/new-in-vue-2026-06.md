---
file: 'new-in-vue-2026-06'
cat: 'web'
title: 'New in Vue - Červen 2026'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za červen 2026'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2026-06-26'
created: '26.06.2026'
english: 'https://dev.to/aloisseckar/new-in-vue-june-2026-28p'
unchecked: true
---

Tenhle týden je tu v Praze pořádné vedro. V neděli se dokonce čekají teploty, které by mohly zaútočit na absolutní teplotní rekordy. Ale víte, co je taky žhavé? Novinky ze světa Vue, Nuxtu, Vite a spol. Tak pojďme na další z mých měsíčních souhrnů.

::vue-newsletter
::

**Vue** právě vydalo svou patch verzi [**3.5.39**](https://github.com/vuejs/core/releases/tag/v3.5.39). Se zhruba dvěma vydáními měsíčně se tým soustředí především na ladění a odstraňování chyb. Mezitím se ale vaří dlouho očekávaná novinka [_vapor mode_](https://dev.to/parsajiravand/what-is-vue-3-vapor-mode-3k2o). Její beta verzi jsem [oznámil](https://dev.to/aloisseckar/new-in-vue-december-2025-1hk0) už v prosinci. Od té doby jsme se dočkali 17 beta vydání, v poslední době v zhruba týdenním rytmu. Každé z nich přináší řadu nových oprav a vylepšení, většinou v kódu souvisejícím s _vapor mode_. I když musím přiznat, že jsem čekal trochu rychlejší pokrok a že bychom už teď měli mít oficiálně vydané Vue 3.6, tenhle důkladný vývoj a testování jistě pomůže dodat kvalitní a užitečnou aktualizaci. Doufám, že to brzy dorazí.

My **Nuxt**eři pořád sníme o verzi 5, která je ještě trochu v nedohlednu, a čekáme na v4.5, která by tu měla být brzy. Momentálně jsou nejnovějšími dostupnými verzemi [**v4.4.8**](https://github.com/nuxt/nuxt/releases/tag/v4.4.8) a odpovídající backport **v3.21.8**. Zatímco čekáme, až dorazí nové funkce, co si prohloubit znalosti toho stávajícího? Narazil jsem na tenhle opravdu dobře napsaný článek o [testování v Nuxtu](https://blog.logrocket.com/advanced-guide-nuxt-testing-mocking/). Popisuje a vysvětluje některé bolestivé body při snaze spouštět izolované testy v prostředí Nuxtu a dává praktické příklady, jak na to.

**Vite** oznámilo [**v8.1**](https://vite.dev/blog/announcing-vite8-1) dne 23. června. Seznam nových funkcí zahrnuje: experimentální _Bundled Dev Mode_ pro rychlejší start a reload při vývoji, podporu pro _Wasm ESM integraci_, pokrok směrem k přijetí _Lighting CSS_ a novou možnost _additionalAssetSources_ pro univerzálnější objevování HTML assetů. Podrobnosti najdete v odkazovaném článku.

A ve _ViteLandu_ přistálo ještě jedno oznámení. VoidZero, společnost stojící za Vite a souvisejícími technologiemi, se 4. června stala součástí Cloudflare. Více podrobností si můžete přečíst v [oficiálním oznámení](https://voidzero.dev/posts/voidzero-cloudflare). Poté, co loni NuxtLabs přešlo pod Vercel, jde o další krok k zajištění širšího ekosystému Vue.js. Ať se nám to líbí nebo ne, udržovat oblíbené open-source nástroje a dělat to dobře je práce na plný úvazek. A práce na plný úvazek musí být zaplacená. Pořád věřím, že z toho naše komunita jenom vytěží.

Minulý týden Microsoft oznámil první release candidate pro [TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/). Na rozdíl od nedávného přemostění verzí 6 má tahle verze přinést skutečné zlepšení a rychlost poté, co bylo jeho jádro přepsáno do jazyka Go. Vývojáři tvrdí, že _TypeScript 7.0 je často zhruba 10× rychlejší než TypeScript 6.0_. Kromě toho je tu i řada změn ve výchozím chování a nastavení, takže před migrací si určitě zkontrolujte, co se změnilo.

Pokud rádi sledujete videa z konferenčních přednášek, [Frontend Nation](https://frontendnation.com/) na začátku června vydala záznamy z ročníku 2026. Sledovat je můžete [TADY](https://www.youtube.com/playlist?list=PLRRLRwvPfvEw). Zaměření je širší než jen na Vue.js, ale spousta témat je společná pro frontendový vývoj obecně a rozhodně stojí za povšimnutí.

Pro tuhle chvíli jsem se vyčerpal. Užijte si nadcházející léto (pokud nežijete na jižní polokouli, a pokud ano, užijte si tedy zimu) a brzy se uvidíme s další porcí _New in Vue_.
