# Estruturas e Funções

  - [Estruturas de Decisão](#estruturas-de-decisão)
    - [if](#if)
    - [switch](#switch)
  - [Estrutura de Repetição](#estrutura-de-repetição)
    - [while](#while)
    - [do...while](#dowhile)
    - [for](#for)
  - [Funções](#funções)
    - [Declaração de função](#declaração-de-função)
    - [Case Sensitive](#case-sensitive)
    - [Redefinição de Função](#redefinição-de-função)
    - [Parâmetro Default](#parâmetro-default)
    - [Parâmetro Rest](#parâmetro-rest)

## Estruturas de Decisão

---

```js
const number1 = 10;
const number2 = 10;
const operator = '+'; // (+, -)

// decision

console.log(result); //=> 20
```

### if

```js
if (operator === '+') {
    result = number1 + number2;
} else if (operator === '-') {
    result = number1 - number2;
} else {
    result = 'Invalid operator';
}
```

### switch

```js
switch (operator) {
  case '+':
    result = number1 + number2;
    break;
  case '-':
    result = number1 - number2;
    break;
  default:
    result = 'Invalid operator';
}
```

## Estrutura de Repetição

---

```
1
2
...
9
10
```

### while

```js
let flag = 1;

while (flag <= 10) {
  console.log(flag);
  flag += 1;
}
```

### do...while
```js
let flag = 1;

do {
  console.log(flag);
  flag += 1;
} while (flag < 10)
```

### for
```js
for (let flag = 1; flag <= 10; flag += 1) {
  console.log(flag);
}
```

## Funções

---

### Declaração de função

```js
function addition(param1, param2) {
  return param1 + param2;
}

console.log(addition(1)); //=> NaN
console.log(addition(1, 2)); //=> 3
console.log(addition(1, 2, 3)); //=> 3
```

```js
const addition = function(param1, param2) {
  return param1 + param2;
}

console.log(addition(1, 2)); //=> 3
```

```js
const addition = (param1, param2) => {
  return param1 + param2;
}

console.log(addition(1, 2)); //=> 3
```

```js
const addition = (param1, param2) => param1 + param2;

console.log(addition(1, 2)); //=> 3
```

### Case Sensitive


```js
function addition(param1, param2) {
  return param1 + param2;
}

function Addition(param) {
  return param + 1;
}

console.log(Addition(1)); //=> 2
console.log(Addition(1, 2)); //=> 2
```

### Redefinição de Função


```js
function addition(param1, param2) {
  return param1 + param2;
}

function addition(param) {
  return param + 1;
}

console.log(addition(1)); //=> 2
console.log(addition(1, 2)); //=> 2
```

### Parâmetro Default


```js
function addition(param1, param2 = 0) {
  return param1 + param2;
}

console.log(addition(1)); //=> 1
console.log(addition(1, 2)); //=> 3
```

### Parâmetro Rest

```js
function addition(...params) {
  let summation = 0;
  for (let value of params) {
    summation += value;
  }
  return summation;
}

console.log(addition(1)); //=> 1 ([1])
console.log(addition(1, 1)); //=> 2 ([1, 1])
console.log(addition(1, 1, 1, 1)); //=> 4 ([1, 1, 1, 1])
```
