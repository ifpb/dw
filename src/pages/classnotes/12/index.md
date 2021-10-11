# REST API

## Back-end Web

### Rotas do Foods API

| Método | Caminho              | Parâmetro   | Status       | Resposta                                     |
| ------ | -------------------- | ----------- | ------------ | -------------------------------------------- |
| POST   | `/foods`             | Body        | `201`        | Cria uma nova comida                         |
| GET    | `/foods`             | -           | `200`        | Retorna todas as comidas                     |
| GET    | `/foods?name=Salada` | Query       | `200`        | Retorna todas as comidas com o nome `Salada` |
| GET    | `/foods/1`           | Route       | `200`, `400` | Retorna a comida de ID 1                     |
| PUT    | `/foods/1`           | Body, Route | `200`, `400` | Atualiza a comida de ID 1                    |
| DELETE | `/foods/1`           | Route       | `204`, `400` | Exclui a comida de ID 1                      |

### HTTP Status Codes

- [Classes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - Respostas de informação (100-199)
  - Respostas de sucesso (200-299)
  - Redirecionamentos (300-399)
  - Erros do cliente (400-499)
  - Erros do servidor (500-599)
- Códigos do Foods API

| Código | Nome                  | Significado                                                                |
| ------ | --------------------- | -------------------------------------------------------------------------- |
| `200`  | Ok                    | Solicitação gerada com sucesso                                             |
| `201`  | Created               | Solicitação gerada com sucesso e um novo recurso foi criado como resultado |
| `204`  | No Content            | Solicitação gerada com sucesso e não há conteúdo para ser enviado          |
| `400`  | Bad Request           | Solicitação não compreendida por motivos de erro                           |
| `404`  | Not Found             | O servidor não pode encontrar o recurso solicitado                         |
| `500`  | Internal Server Error | O servidor encontrou uma situação com a qual não sabe lidar.               |

### Estrutura do Código

```text
foods-api
├── .gitignore
├── package-lock.json
├── package.json
├── requests.http
└── src
    └── index.js
```

[![Edit foods-api](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/foods-api-zedcj?fontsize=14&hidenavigation=1&theme=dark)

src/index.js:

```js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Access-Control-Allow-Origin: *
app.use(express.json());

let key = 1;
const foods = [];
```

### Create

Request:

![](/imgs/rest-api/create-food.png)

```text
### Create Food (Salada)

POST http://localhost:3000/foods
Content-Type: application/json

{
  "name": "Salada 1",
  "price": 15.5
}
```

src/index.js:

```js
app.post('/foods', (req, res) => {
  const { name, price } = req.body;

  const id = key++;

  const food = { id, name, price };

  foods.push(food);

  res.status(201).json(food);
});
```

CodeSandBox: [Create (REQBIN)](https://reqbin.com/kxrzigfx)

### Read

Request:

![](/imgs/rest-api/read-foods.png)

```text
### Read Foods

GET http://localhost:3000/foods


### Read Foods by Name

GET http://localhost:3000/foods?name=Salada
```

src/index.js:

```js
app.get('/foods', (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredFoods = foods.filter((food) => food.name.includes(name));

    return res.json(filteredFoods);
  }

  res.json(foods);
});
```

CodeSandBox: [Read](https://zedcj.sse.codesandbox.io/foods), [Read by Name](https://zedcj.sse.codesandbox.io/foods?name=Salada)

Request:

![](/imgs/rest-api/read-food-by-id.png)

```text
### Read Food by ID

GET http://localhost:3000/foods/1
```

src/index.js:

```js
app.get('/foods/:id', (req, res) => {
  const id = Number(req.params.id);

  const food = foods.find((food) => food.id === id);

  if (food) {
    return res.json(food);
  } else {
    return res.status(400).json({ error: 'Food not found.' });
  }
});
```

CodeSandBox: [Read by ID](https://zedcj.sse.codesandbox.io/foods/1)

### Update

Request:

![](/imgs/rest-api/update-food.png)

```text
### Update Food

PUT http://localhost:3000/foods/1
Content-Type: application/json

{
  "name": "Salada 1",
  "price": 16.5
}
```

src/index.js:

```js
app.put('/foods/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;

  const index = foods.findIndex((food) => food.id === id);

  if (index >= 0) {
    const food = { id, name, price };

    foods[index] = food;

    res.json(food);
  } else {
    return res.status(400).json({ error: 'Food not found.' });
  }
});
```

CodeSandBox: [Update (REQBIN)](https://reqbin.com/ngkkunqu)

### Delete

Request:

![](/imgs/rest-api/delete-food.png)

```text
### Delete Food

DELETE http://localhost:3000/foods/1
```

src/index.js:

```js
app.delete('/foods/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = foods.findIndex((food) => food.id === id);

  if (index >= 0) {
    foods.splice(index, 1);

    res.status(204).send();
  } else {
    return res.status(400).json({ error: 'Food not found.' });
  }
});
```

CodeSandBox: [Delete (REQBIN)](https://reqbin.com/epd9hrqo)

## Front-end Web

### Estrutura do Código

```text
foods-client
├── index.html
└── js
    ├── index.js
    └── services
        └── api.js
```

[![Edit foods-client](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/foods-client-m91qk?fontsize=14&hidenavigation=1&theme=dark)

### Create

js/services/api.js:

```js
const api = 'http://127.0.0.1:3000';

async function create(food) {
  const res = await fetch(`${api}/foods`, {
    method: 'post',
    body: JSON.stringify(food),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return await res.json();
}
```

### Read

js/services/api.js:

```js
async function readAll() {
  const res = await fetch(`${api}/foods`);

  return await res.json();
}

async function readByName(name) {
  const res = await fetch(`${api}/foods?name=${name}`);

  return await res.json();
}

async function readById(id) {
  const res = await fetch(`${api}/foods/${id}`);

  return await res.json();
}
```

### Update

js/services/api.js:

```js
async function update(id, food) {
  const res = await fetch(`${api}/foods/${id}`, {
    method: 'put',
    body: JSON.stringify(food),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return await res.json();
}
```

### Delete

js/services/api.js:

```js
async function remove(id) {
  await fetch(`${api}/foods/${id}`, {
    method: 'delete',
  });
}
```
