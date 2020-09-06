# Revisão

- [HTML](#html)
  - [Tags (Sintase)](#tags-sintase)
  - [Atributo de tag (Sintase)](#atributo-de-tag-sintase)
  - [Estrutura básica](#estrutura-básica)
- [CSS](#css)
  - [Local do CSS](#local-do-css)
  - [Propriedades (Sintase)](#propriedades-sintase)
  - [Seletores (Sintase)](#seletores-sintase)
  - [Funções (Sintase)](#funções-sintase)
  - [At-rules (Sintase)](#at-rules-sintase)
  - [Media queries (Sintase)](#media-queries-sintase)
  - [Herança](#herança)
  - [Pacotes do Front-end](#pacotes-do-front-end)
  - [Bootstrap](#bootstrap)

## HTML

---

### Tags (Sintase)

Estrutura:

```
openning              closing
  tag      content      tag
  ┌┴┐┌────────────────┐┌─┴─┐
  <p>Lorem ipsum dolor.</p>
  └────────────────────────┘
          Element
```

Exemplos:

- Cabeçalho: `<link>`, `<style>`, `<title>`, `<meta>`
- Texto: `<p>`, `<b>`, `<i>`, `<h1-6>`
- Lista: `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`
- Hiperlink: `<a>`
- Tabela: `<table>`, `<tr>`, `<th>`, `<td>`
- Imagem: `<img>`

### Atributo de tag (Sintase)

Estrutura:

```
     attribute
   ┌─────┴────┐
<p lang="pt-BR">Lorem ipsum dolor.</p>
```

Exemplos:

- Global: `lang`, `id`, `class`
- Específico:
  - img: `src`, `alt`
  - ol: `start`, `type`
  - table: `border`

### Estrutura básica

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

## CSS

---

### Local do CSS

**Inline styles**

```html
<h1 style="color: blue;">Lorem ipsum</h1>
```

**Internal stylesheet**

```html
<style>
  p {
    font-size: 20px;
    text-align: justify;
  }
</style>
```

**External stylesheet**

css/master.html:
```css
p {
  font-size: 20px;
  text-align: justify;
}
```

index.html:
```html
<link rel="stylesheet" href="css/master.css" />
```

### Propriedades (Sintase)

Exemplo:

```html
<h1 style="color: blue;">Lorem ipsum</h1>
```

Tipos:

- Tipografia: `font-size`, `font-family`, `font`, `color`, `text-align`
- Plano de Fundo: `background-color`, `background-image`, `background-position`, `background`

### Seletores (Sintase)

Exemplos:

```css
p.text-red {
  color: red;
}
```

```html
<p>Lorem ipsum dolor</p>
<p class="text-red">Lorem ipsum dolor</p>
<p>Lorem ipsum dolor</p>
```

Tipos:

- Basic selectors: `element`, `#id`, `.class`
- Combinators: `Descendant combinator` (A B), `Child combinator` (A > B)
- Pseudo-classes: `:hover`, `:first-child`, `:nth-child`

### Funções (Sintase)

```css
p.text-red {
  color: rgb(255, 0, 0);
}
```

### At-rules (Sintase)

```css
@charset 'uft-8';
```

### Media queries (Sintase)

```css
h1 {
  text-align: center;
}

@media print {
  h1 {
    text-align: left;
  }
}
```

### Herança

```css
body {
  color: green;
}
```

```html
<body>
  <h1>Lorem ipsum</h1>
</body>
```

### Pacotes do Front-end

- [Google Fonts](https://fonts.google.com/)
- [Fontawesome](https://fontawesome.com/)
- [Bootstrap](https://getbootstrap.com/)

### Bootstrap

- Introduction
  - [Starter template](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
- Layout
  - [Grid system](https://getbootstrap.com/docs/4.5/layout/grid/)
- Content
  - [Reboot](https://getbootstrap.com/docs/4.5/content/reboot/): `<h1-6>`, `<table>`, `<form>`
- Components
  - [Cards](https://getbootstrap.com/docs/4.5/components/card/)
  - [Progress](https://getbootstrap.com/docs/4.5/components/progress/)
- Utilities
  - [Spacing](https://getbootstrap.com/docs/4.5/utilities/spacing/)
  - [Text](https://getbootstrap.com/docs/4.5/utilities/text/)
- [Bootstrap 4 GUI Components \| Figma](https://www.figmaresources.com/resources/cJcf8ooDrfuhpFYLS)
