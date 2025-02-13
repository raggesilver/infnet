# TP1 — Fundamentos de Modelagem Relacional e SQL

## Questão 1

O conceito de bancos de dados relacionais foi introduzido por Edgar Codd em 1970.
Isso deu o pontapé inicial para a criação de SQL — uma linguagem de consulta
estruturada (Structured Query Language). Essa primeira implementação incluía
apenas as funcionalidades básicas de CRUD e chaves (primárias e estrangeiras).

Na década de 80, o SQL se tornou um padrão ANSI — uma entidade americana que
padroniza tecnologias. Isso permitiu que o SQL fosse implementado e utilizado em
outros bancos de dados. Outros mecanismos como _views_, _joins_, índices e
_transactions_ foram adicionados ao SQL. Isso marcou o início do suporte à
operações ACID, que garantem a consistência dos dados.

Já na década de 90, tivemos a criação do Postgres (1996) e de outras
funcionalidades avançadas como _joins_ mais complexos, _triggers_, funções
definidas pelo usuário, _constraints_ como _check_ e _unique_, e MVCC —
_Multi-Version Concurrency Control_, que permite que várias transações sejam
executadas em paralelo.

De 2000 até hoje, tivemos inúmeras adições ao SQL, como suporte para JSON, XML,
dados geo-espaciais, _full-text search_ (buscas complexas de texto),
particionamento de tabelas, _CTEs_, _UPSERT_, replicação e muito mais.

## Questão 2

### Entidade

Uma entidade é um objeto ou conceito que pode ser representado por um conjunto
de atributos.

**Exemplo:** um carro, um funcionário, uma compra, etc.

### Atributo

Um atributo é uma característica ou propriedade de uma entidade.

**Exemplo:** a cor de um carro, o nome de um funcionário, o valor de uma compra,
etc.

### Tabela

Uma tabela é uma coleção de registros que representam uma entidade. Uma tabela
só pode ter um tipo de entidade. Tabelas são compostas por colunas e linhas,
onde uma coluna representa um atributo e uma linha representa um registro.

**Exemplo:**

| id  | modelo | ano  | cor   |
| --- | ------ | ---- | ----- |
| 1   | Gol    | 2010 | Azul  |
| 2   | Uno    | 2015 | Preto |

<small>Tabela: carros</small>

### Chave Primária

Uma chave primária é um atributo (ou conjunto de atributos) que identificam um
registro (uma linha) de maneira única em uma tabela. Uma chave primária não pode
ser nula, e não pode existir duas vezes na mesma tabela.

A chave primária pode ser um número, uma string, ou qualquer outro tipo de dado.

**Exemplo:**

| id\* | modelo | ano  | cor   |
| ---- | ------ | ---- | ----- |
| 1    | Gol    | 2010 | Azul  |
| 2    | Uno    | 2015 | Preto |

<small>Tabela: carros.</small>

<small>\* Chave primária.</small>

Nesse exemplo, se você tentar inserir uma nova linha com id = 1, o banco de
dados irá retornar um erro.

```sql
INSERT INTO carros(id, modelo, ano, cor) VALUES (1, 'Fusca', 1970, 'Verde');
```

> ERROR: duplicate key value violates unique constraint "carros_pkey"

### Chave Estrangeira

Uma chave estrangeira é um atributo que faz referência a um atributo único em
outra tabela. Esse tipo de chave é usado para criar um relacionamento entre uma
linha de uma tabela e uma linha de outra tabela. Esse conceito é crucial para
garantir a integridade dos dados e é o pilar do modelo relacional.

**Exemplo:**

| id\* | modelo | ano  | cor   |
| ---- | ------ | ---- | ----- |
| 1    | Gol    | 2010 | Azul  |
| 2    | Uno    | 2015 | Preto |

<small>Tabela: carros.</small>

| id\* | valor | data       | comprador_id\*\* | carro_id\*\* |
| ---- | ----- | ---------- | ---------------- | ------------ |
| 1    | 10000 | 2025-01-04 | 1                | 1            |
| 2    | 15000 | 2025-01-05 | 2                | 2            |

<small>Tabela: compras.</small>

| id  | nome  |
| --- | ----- |
| 1   | Maria |
| 2   | João  |

<small>Tabela: compradores.</small>

<small>\* Chave primária.</small>
<small>\*\* Chave estrangeira.</small>

Por meio de chaves estrangeiras, podemos criar uma relação entre o comprador, o
modelo do carro e a venda. Isso nos permite, por exemplo, que nenhum registro de
venda seja inserido sem um comprador ou sem um carro. Além disso, o banco de
dados irá garantir que o comprador e o modelo do carro não sejam deletados caso
exista alguma compra que referencie esses registros.

### Relação

Relações são estabelecidas por meio de chaves estrangeiras. Elas são usadas para
gerar vínculos entre duas ou mais linhas de tabelas diferentes (ou, em alguns
casos, a mesma tabela).

Há três tipos de relações:

1. **1 para 1:** uma linha de uma tabela está relacionada a uma única linha de
   outra tabela.
2. **1 para N:** uma linha de uma tabela está relacionada a várias linhas de
   outra tabela.
3. **N para N:** várias linhas de uma tabela estão relacionadas a várias linhas
   de outra tabela.

**Exemplo:**

1. **1 para 1:** uma compra tem uma única nota fiscal. Se tivermos uma tabela
   `vendas` e outra tabela `comprovantes`, cada venda terá um único comprovante
   e cada comprovante estará relacionado a uma única venda.
2. **1 para N:** um cliente pode fazer várias compras. Se tivermos uma tabela
   `clientes` e outra tabela `compras`, cada cliente pode ter várias compras,
   mas cada compra estará relacionada a um único cliente.
3. **N para N:** um produto pode fazer parte de múltiplas compras, e uma compra
   pode ter múltiplos produtos. No geral, é necessário criar uma tabela extra
   para registrar relacionamentos N pra N. Se tivermos uma tabela `produtos` e
   outra tabela `compras`, precisaremos de uma tabela `produtos_compras` para
   registrar quais produtos foram comprados em cada compra.
