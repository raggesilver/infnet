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

## Questão 3

> Resolvi propor um esquema com quatro tabelas ao invés de três, para que o
> seja possível registrar multiplos produtos em um pedido (precisamos de uma
> tabela extra para isso).

```sql
-- Tabela clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL
);

-- Tabela produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    preco DECIMAL NOT NULL
);

-- Tabela pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    total DECIMAL NOT NULL,

    -- Chave estrangeira cliente_id
    CONSTRAINT fk_cliente_id
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
);

-- Tabela relacional pedido produtos (N para N)
CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,

    -- Chave estrangeira pedido_id. Se o pedido for deletado, deletaremos também
    -- a relação entre pedido e produto.
    CONSTRAINT fk_pedido_id
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id),

    -- Chave estrangeira produto_id
    CONSTRAINT fk_produto_id
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
);
```

## Questão 4

Restrições são importantes para garantir que os dados inseridos no banco de
dados sigam as regras de negócio estabelecidas pelos desenvolvedores. Não só
isso, como elas também garantem a integridade dos dados e evitam
inconsistências — por meio de chaves primárias, chaves estrangeiras, _checks_,
etc.

Na tabela `pedido_produtos` que criamos acima, por exemplo, a restrição de chave
estrangeira previne que um produto seja deletado caso exista algum pedido que
faça referência a ele. Isso evita que um dia um produto seja deletado e quebre
a aplicação, pois o carrinho de um cliente agora tem `NULL` ao invés do produto
que ele comprou.

Outra restrição importante são as de unicidade, que garantem que duas linhas em
uma tabela não tenham o mesmo valor em uma (ou mais) coluna(s). O exemplo mais
simples disso é a chave primária, que garante que não existam duas linhas com o
mesmo valor de `id`. Outro exemplo comum é a restrição `UNIQUE`, que é comumente
utilizada para garantir que não existam dois usuários com o mesmo e-mail ou nome
de usuário.

Por último, temos ainda as restrições de _check_, que podemos utilizar para
enforçar regras de negócio mais particulares. Por exemplo, podemos criar um
_check_ na tabela `pedidos` que não permite que o total de um pedido seja menor
que 100 reais.

```sql
ALTER TABLE pedidos ADD CONSTRAINT check_total_minimo CHECK (total >= 100);
```

<!--
Já os índices servem para acelerar a buscas em um banco de dados. Existem vários
algorítimos utilizados para criar índices, como _B-trees_, _hash indexes_, etc.
Cada um deles tem sua aplicação e impacto no desempenho do banco de dados, sendo
uns mais apropriados para certas situações do que outros. Vale lembrar que
índices diferentes ocupam diferentes quantidades de espaço de armazenamento, por
isso performance nem sempre é o único fator a ser considerado.
-->

## Questão 5

```sql
-- É possível adicionar uma restrição de unicidade na coluna nome da tabela de
-- produtos da seguinte forma:
ALTER TABLE produtos ADD CONSTRAINT unique_product_name UNIQUE (nome);
-- Porém, esse índice trata "MacBook" e "macbook" como strings diferentes. Para
-- resolver isso, podemos criar um índice que ignora a diferença entre
-- maiúsculas e minúsculas:
CREATE UNIQUE INDEX unique_product_name ON produtos (LOWER(nome));
-- (não faz sentido usar os dois, então escolha um).
```
