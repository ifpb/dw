# Projeto DW

## Introdução e Objetivo

A disciplina de DW tem como objetivo principal fazer com que os alunos compreendam como se desenvolve uma aplicação Web. Por isso, que em sua trajetória são apresentadas inúmeras tecnologias que compõe uma aplicação Web, começando desde a camada Front-end até o Back-end. Contudo, muitas vezes devido a vasta extensão de temas é impraticável expor todos os detalhes em um único projeto ou exercício em sala de aula.

Então, através desse projeto o aluno vai poder praticar os conceitos vistos em sala de aula, e alguns pontos extras definidos mais adiante, de tal maneira que no final se obtenha uma aplicação Web mais sólida e robusta.

## Definição do Tema

O tema do projeto é livre!

Contudo, é exigido que se crie um sistema Web relacionado aos assuntos do seu curso, que de uma forma ou de outra, ainda são executados de modo manual ou automático usando interface CLI ou Desktop.

Por exemplo, a execução de rotinas administrativas é algo muito comum para um profissional de redes de computadores, e muitas vezes procedimentos como a verificação de disponibilidade de um servidor acontece de forma manual no terminal, entretanto, esta ação poderia ser automatizado em um sistema Web por meio de alguns cliques. Inclusive, tal cenário já é uma realidade em algumas [aplicações de administração de sistemas](https://github.com/n1trux/awesome-sysadmin) existentes no mercado, como o [Webmin](http://www.webmin.com/), o [Zabbix](http://www.zabbix.com/) ou o [Nagios](https://www.nagios.org/).

Então para a escolha do tema sugiro que sejam formadas equipes com no máximo três integrantes para a definição inicial do projeto. Para obter mais inspirações, sugiro que sejam analisados os projetos dos outros períodos (basta acessar [ifpb/projects](https://ifpb.github.io/projects/) e procurar projetos com a tag `dw-`), ou tente analisar como seria o gerenciamento e análise de algum destes itens:

- Status do computados (disco, memória, cpu, etc)
- Gerenciamento de tarefas (cron)
- Samba ou o NFS
- Cotas de Disco
- DNS
- DHCP
- SNMP
- Firewall
- Arquivos de log
- Roteamento
- Microcontrolador

Depois de escolhido o tema, todos os projetos devem declarar suas propostas [neste padlet](https://padlet.com/lucachaves/projetodw20202) seguindo esse formato de card:

```text
Título/Tema do Projeto

Descrição:
Resumidamente descreva a ideia central do seu projeto

Equipe:
- Nome do Aluno 1 (matricula)
- Nome do Aluno 2 (matricula)
- Nome do Aluno 3 (matricula)

Repositório:
http://github.com/link-do-repositorio

Vídeo de Apresentação Inicial:
http://link-para-o-video
```

A declaração de informações no Padlet deve ser realizada por apenas um dos integrantes da equipe, e para possibilitar modificações futuras é necessário possuir uma [conta no padlet](https://padlet.com/referrals/lucachaves).

> **Obs:** É muito importante que a equipe deixe o card do projeto sempre atualizado com suas informações.

## Etapas da Apresentação

O projeto será apresentado em três etapas com objetivos distintos. A primeira apresentação será para validar a `Proposta de Tema`, a segunda exibirá a `Camada Front-end`, e a terceira exibirá o sistema completo incluindo a `Camada Back-end`.

Cada etapa deverá ser apresentada oralmente de modo objetivo em vídeos por cada integrante do projeto em datas a serem definidas conforme o cronograma do curso.

> **Obs:** Para quem deseja alguma dica de apresentação de projeto recomendo assistir os [Demo Day do Le Wagon](https://www.youtube.com/playlist?list=PLkbmdtbypn7R_BN6nFX-XZc7uDyMSxhye) (Esse [Demo Day](https://www.youtube.com/watch?v=nlC1OBVZuOg&list=PLkbmdtbypn7R_BN6nFX-XZc7uDyMSxhye&index=32) foi em São Paulo)

Já em relação as entregas de cada etapa é preciso que todo o material esteja disponibilizado em algum repositório de código aberto, como o [github](http://github.com/), considerando que:

- No raiz deve existir um arquivo `README.md` que deve possuir: a `Descrição do projeto`, os `Requisitos mínimos` e `Processo de instalação`, `Inspirações de Funcionalidade e Telas`, `Descrição das Funcionalidades do Projeto` e `Contato`;
- Os arquivos e diretórios devem estar bem organizados;

### Proposta de Tema

Para ajudar na definição do tema central do projeto será exigido que a apresentação possua um tempo máximo de **3 minutos**, tipo uma apresentação de [pitch](https://endeavor.org.br/dinheiro/como-elaborar-um-pitch-quase-perfeito/), e contemple os seguintes pontos:

- Exibição da ideia e objetivo principal do projeto através de propostas de funcionalidades;
- Seleção de telas de sistemas existentes que façam algo parecido ao que se propõe no projeto, afinal de contas, não precisamos reinventar a roda sempre;
- Apresentar alguns esboços de tela de como a equipe enxerga a interface final do projeto. Pode ser até mesmo em [rabiscos de papel](https://developers.google.com/web/fundamentals/design-and-ux/ux-basics/), o importante é que fique claro as interações do sistema e sua navegabilidade. Outra opção pode ser utilizar alguma [ferramenta de prototipagem](https://uxtools.co/tools/prototyping).

### Camada Front-end

Esta apresentação envolverá a primeira parte do projeto, no qual será exibido todo o projeto de Front-end da aplicação.

Nessa fase não será exigido que a página seja carregada com dados dinamicamente, portanto uma alternativa pode ser utilizar algumas informações estaticamente. Também não será cobrado o funcionamento de algumas ações do sistema que dependam do Back-end.

### Camada Back-end

Por fim, esta etapa será a apresentação final que deverá ser entregue no último dia de aula da disciplina. As camadas Font-end e Back-end devem estar integradas e em funcionamento.

## Requisitos e Pontuação

Os critérios de avaliação serão influenciados por questões de apresentação, organização e uso de recursos tecnológicos abordados na disciplina. A tabela a seguir lista especificamente os critérios:

| Item | Etapa            | Tecnologia | Recursos                                              |
| ---- | ---------------- | ---------- | ----------------------------------------------------- |
| 1    | Proposta de Tema | -          | Apresentar a ideia e objetivo principal do projeto    |
| 2    | Proposta de Tema | -          | Exibir esboços de tela das funcionalidades do projeto |
| 4    | Camada Frontend  | HTML & CSS | Conter listas, tabela e formulário                    |
| 5    | Camada Frontend  | HTML & CSS | Página HTML estilizada                                |
| 6    | Camada Frontend  | JS         | Criação de componentes dinamicamente através de JSON  |
| 7    | Camada Backend   | Node.js    | Estruturar alguma Web API                             |
| 7    | Camada Backend   | Node.js    | Integrar Front e Back                                 |
| 8    | Camada Backend   | Node.js    | Manipulação de Sessão                                 |
| 9    | Camada Backend   | Node.js    | Uso de persistência de dados em SGBD                  |

Para auxiliar no cálculo da nota final do projeto utilize esse checklist:

| Item | Critérios (%)         | Projeto 1 | Projeto 2 | ... | Projeto n |
| ---- | --------------------- | --------- | --------- | --- | --------- |
| 1    | Ideia                 |           |           |     |           |
| 2    | Esboço de tela        |           |           |     |           |
| 3    | HTML                  |           |           |     |           |
| 4    | CSS                   |           |           |     |           |
| 5    | JS                    |           |           |     |           |
| 6    | API                   |           |           |     |           |
| 7    | Integrar Front e Back |           |           |     |           |
| 8    | Sessão                |           |           |     |           |
| 9    | Projeto do BD         |           |           |     |           |
| 10   | Integração com BD     |           |           |     |           |
|      | Organização do código |           |           |     |           |
|      | Funcionamento Geral   |           |           |     |           |
|      | Nota\*                |           |           |     |           |

_(\*) A soma de todos os itens será 100, mas também será analisado a organização e o funcionamento geral._

Também vale salientar que ocorrerão penalizações nos seguintes casos:

- Não seja enviado o projeto na data marcada com o material exigido;
- Falta de usabilidade do sistema;
- Falta de domínio do projeto.
