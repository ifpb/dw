# Formulários e JavaScript

  - [Elementos do Formulário](#elementos-do-formulário)
    - [single-line text field](#single-line-text-field)
    - [label field](#label-field)
    - [password field](#password-field)
    - [radio button field](#radio-button-field)
    - [checkbox field](#checkbox-field)
    - [button field](#button-field)
    - [file field](#file-field)
    - [range field](#range-field)
    - [number field](#number-field)
    - [date field](#date-field)
    - [email field](#email-field)
    - [multi-line text field](#multi-line-text-field)
    - [combobox field](#combobox-field)
  - [Exemplo de Formulário](#exemplo-de-formulário)
  - [Formulário com Boostrap](#formulário-com-boostrap)
  - [JavaScript e HTML](#javascript-e-html)
    - [Integrando JS e HTML](#integrando-js-e-html)
    - [Tratando dados de formulário](#tratando-dados-de-formulário)

## Elementos do Formulário

---

### [single-line text field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="text" name="cpf">
</div>

```html
<input type="text" name="cpf">
```

required attribute:

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <form>
    <input type="text" name="cpf" required>*
  </form>
</div>

```html
<input type="text" name="cpf" required>*
```

placeholder attribute:

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="text" name="cpf" placeholder="000.000.000-00">
</div>

```html
<input type="text" name="cpf" placeholder="000.000.000-00">
```

value attribute:

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="text" name="cpf" value="000.000.000-00">
</div>

```html
<input type="text" name="cpf" value="000.000.000-00">
```


### [label field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <label for="cpf">CPF:</label>
  <input type="text" name="cpf" id="cpf">
</div>

```html
<label for="cpf">CPF:</label>
<input type="text" name="cpf" id="cpf">
```

### [password field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="password" name="password">
</div>

```html
<input type="password" name="password">
```

### [radio button field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="radio" name="sex" value="male" id="male">
  <label for="male">masculino</label>
</div>

```html
<input type="radio" name="sex" value="male" id="male">
<label for="male">masculino</label>
```

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  Sexo:
  <input type="radio" name="sexo" value="masculino" id="masculino" checked>
  <label for="masculino">masculino</label>
  <input type="radio" name="sexo" value="feminino" id="feminino">
  <label for="feminino">feminino</label>
</div>

```html
Sexo:
<input type="radio" name="sexo" value="masculino" id="masculino" checked>
<label for="masculino">masculino</label>
<input type="radio" name="sexo" value="feminino" id="feminino">
<label for="feminino">feminino</label>
```

### [checkbox field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="checkbox" name="aceitaCondicoes" value="ok" id="condicoes">
  <label for="condicoes">Você concorda com os termos...</label>
</div>

```html
<input type="checkbox" name="aceitaCondicoes" value="ok" id="condicoes">
<label for="condicoes">Você concorda com os termos...</label>
```

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  Linguagens:
  <input type="checkbox" name="linguagens" value="javascript" id="javascript">
  <label for="javascript">Javascript</label>
  <input type="checkbox" name="linguagens" value="c" id="c">
  <label for="c">C</label>
  <input type="checkbox" name="linguagens" value="java" id="java">
  <label for="java">Java</label>
  <input type="checkbox" name="linguagens" value="python" id="python">
  <label for="python">Python</label>
</div>

```html
Linguagens:
<input type="checkbox" name="linguagens" value="javascript" id="javascript">
<label for="javascript">Javascript</label>
<input type="checkbox" name="linguagens" value="c" id="c">
<label for="c">C</label>
<input type="checkbox" name="linguagens" value="java" id="java">
<label for="java">Java</label>
<input type="checkbox" name="linguagens" value="python" id="python">
<label for="python">Python</label>
```

### [button field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <button>Create</button>
</div>

```html
<input type="button" name="submit" value="Create">
<input type="submit" name="submit" value="Create">
<button>Create</button>
```

### [file field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="file" name="file">
</div>

```html
<input type="file" name="file">
```

### [range field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <input type="range" name="number" min="1" max="99" step="1">
  <input type="text" name="number-value" value="20" size="3">
</div>
<script>
    document.querySelector('input[type=range]').oninput = function() {
      document.querySelector('input[name=number-value]').value = this.value
    }
  </script>

```html
<input type="range" name="number" min="1" max="100" step="1">
<input type="text" name="number-value" value="20" size="3">
```

### [number field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <form>
    <input type="number" name="number">
  </form>
</div>

```html
<input type="number" name="number">
```

### [date field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <form>
    <input type="date" name="date">
  </form>
</div>

```html
<input type="date" name="date">
```

### [email field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <form>
    <input type="email" name="email">
  </form>
</div>

```html
<input type="email" name="email">
```

### [multi-line text field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <label for="message">Mensagem:</label><br>
  <textarea name="message" id="message" rows="3" cols="60">digite uma mensagem</textarea>
</div>

```html
<label for="message">Mensagem:</label><br>
<textarea name="message" id="message" rows="3" cols="60">digite uma mensagem</textarea>
```

### [combobox field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <label for="place">Estado: </label>
  <select name="place" id="place">
    <option value=""></option>
    <option value="PB">Paraíba</option>
    <option value="PE">Pernambuco</option>
  </select>
</div>

```html
<label for="place">Estado: </label>
<select name="place" id="place">
  <option value=""></option>
  <option value="PB">Paraíba</option>
  <option value="PE">Pernambuco</option>
</select>
```

## Exemplo de Formulário

---

[simple-form/index.html](codes/simple-form/index.html):

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <main>
    <h1 style="color: 2em;">Contato</h1>
    <form action="sucesso.html" method="post">
      <fieldset>
        <div>
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome" required> *
        </div>
        <div>
          <label for="curso">Curso</label>
          <select name="curso" id="curso">
            <option value="" selected>escolha um curso</option>
            <option value="TSI">Sistemas para Internet</option>
            <option value="RC">Redes de Computadores</option>
          </select>
        </div>
      </fieldset>
      <input type="submit" value="Enviar">
    </form>
  </main>
</div>

```html
<main>
  <h1 style="color: #606c71">Contato</h1>
  <form action="sucesso.html" method="post">
    <fieldset>
      <div>
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required> *
      </div>
      <div>
        <label for="curso">Curso</label>
        <select name="curso" id="curso">
          <option value="" selected>escolha um curso</option>
          <option value="TSI">Sistemas para Internet</option>
          <option value="RC">Redes de Computadores</option>
        </select>
      </div>
    </fieldset>
    <input type="submit" value="Enviar">
  </form>
</main>
```

## Formulário com Boostrap

---

[bootstrap-form/index.html](codes/bootstrap-form/index.html):

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <iframe
    src="codes/bootstrap-form/index.html"
    width="100%"
    height="300px"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

```html
<main class="container">
  <h1>Contato</h1>
  <form action="sucesso.html" method="post">
    <div class="form-group">
      <label for="nome">Nome</label>*
      <input type="text" class="form-control" id="nome" name="nome" required>
    </div>
    <div class="form-group">
      <label for="curso">Curso</label>
      <select class="form-control" name="curso" id="curso">
        <option value="" selected>escolha um curso</option>
        <option value="TSI">Sistemas para Internet</option>
        <option value="RC">Redes de Computadores</option>
      </select>
    </div>
    <input type="submit" value="Enviar">
  </form>
</main>
```

[bootstrap-grid-form/index.html](codes/bootstrap-grid-form/index.html):

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <iframe
    src="codes/bootstrap-grid-form/index.html"
    width="100%"
    height="300px"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

```html
<main class="container">
  <h1>Contato</h1>
  <form action="sucesso.html" method="post">
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="nome">Nome</label>*
        <input type="text" class="form-control" id="nome" name="nome" required>
      </div>
      <div class="form-group col-sm-6">
        <label for="curso">Curso</label>
        <select class="form-control" name="curso" id="curso">
          <option value="" selected>escolha um curso</option>
          <option value="TSI">Sistemas para Internet</option>
          <option value="RC">Redes de Computadores</option>
        </select>
      </div>
    </div>
    <input type="submit" value="Enviar">
  </form>
</main>
```

## JavaScript e HTML

---

### Integrando JS e HTML

[hello-js/index.html](codes/hello-js/index.html):

```html
{% include_relative codes/hello-js/index.html %}
```

[hello-js/js/index.js](codes/hello-js/js/index.js):

```js
{% include_relative codes/hello-js/js/index.js %}
```

### Tratando dados de formulário

[calc/index.html](codes/calc/index.html):

<div style="border-radius: 0.3rem; border: solid 1px #dce6f0; padding: 0.8rem">
  <iframe
    src="codes/calc/index.html"
    width="100%"
    height="330px"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

```html
<main class="container">
  <h1 class="mb-5">Calculadora</h1>
  <form action="sucesso.html" method="post">
      <div class="form-group">
        <input type="text" class="form-control w-25" id="number1" name="number1">
      </div>
      <div class="form-group">
        <input type="text" class="form-control w-25" id="number2" name="number2">
      </div>
      <div class="form-group ml-2">
        <input type="button" class="btn btn-primary" id="sum" name="sum" value="+">
        <input type="button" class="btn btn-primary" id="minus" name="minus" value="-">
        <input type="button" class="btn btn-primary" id="multiply" name="minus" value="x">
        <input type="button" class="btn btn-primary" id="divide" name="minus" value="÷">
      </div>
      <div class="form-group">
        <input type="text" class="form-control w-25" id="result" name="result">
      </div>
    </div>
  </form>
</main>
<script src="js/index.js"></script>
```

[calc/js/index.js](codes/calc/js/index.js):

```js
{% include_relative codes/calc/js/index.js %}
```
