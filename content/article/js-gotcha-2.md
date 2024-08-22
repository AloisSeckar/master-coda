<div>
<nuxt-tutorial />
</div>

V tomto textu se budu zabývat opakujícím se scénářem, který generuje chyby při vyhodnocování JS kódu ve Vue.js aplikacích. Konkrétně se nejčastěji objevuje v podmínkách pro určení, zda zobrazit nebo nezobrazit určitý prvek.

Představte si, že máte nadefinovanou `boolean` proměnnou, tj. nabývá hodnot buďto `true` nebo `false`, například testuje, zda je zadán neprázdný řetězec:
```js
const textZadan = text?.length > 0
```

Na základě její hodnoty se pak o kus dál ve skriptu určuje řídící proměnná pro zobrazení elementu:
```js
const zobrazitPrvek = textZadan && // nějaké další podmínky…
```

Určit zobrazení prvku v šabloně Vue komponenty je pak hračka:
```vue
<div v-if=“zobrazitPrvek“>Zobrazí se jen, pokud je zadán text</div>
```

Při použití statické proměnné to bude fungovat podle očekávání. Problém nastává, pokud se zavede proměnná reaktivní, tj.:
```js
const textZadan = ref(false)
watch(text, (newValue) => {
  textZadan.value = nevValue?.length > 0
})

// nebo

const textZadan = computed(() => text?.length > 0)
```

To je celkem časté použití, pokud chcete dynamicky reagovat na změny, třeba na vstup uživatele do připraveného formuláře. Pokud však zapomenete na to, že vaše proměnná už není statická, ale změnila se na reaktivní, čeká vás překvapení. Ve výrazu:
```js
const zobrazitPrvek = textZadan && // nějaké další podmínky…
```

se odteď bude `textZadan` pořád vyhodnocovat jako `true`, i když se vstupní text změní na prázdný. 

Proč? :fearful:

Protože nyní je obsahem proměnné speciální Vue [`Ref` objekt](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref), což znamená, že je vždycky něčím naplněna, a díky tomu jde o tzv. [`truthy` hodnotu](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). 

Pro přístup ke skutečné hodnotě uvnitř `Ref` objektu je potřeba zavolat prvek `.value`. Vyhodnocení podmínky se tedy musí změnit takto:
```js
const zobrazitPrvek = textZadan.value && // nějaké další podmínky…
```

A zobrazení v šabloně opět funguje tak, jak by člověk očekával :+1:
