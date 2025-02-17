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

## Questão 6

```sql
CREATE TABLE departamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL
);

CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX departamento_nome_unico ON departamentos (LOWER(nome));

CREATE TABLE projetos (
    id SERIAL PRIMARY KEY,
    departamento_id INT REFERENCES departamentos(id),
    nome VARCHAR NOT NULL
);

-- Projetos devem ter nomes únicos, porém dois departamentos diferentes podem
-- ter projetos com o mesmo nome.
CREATE UNIQUE INDEX projeto_nome_unico ON projetos (LOWER(nome), departamento_id);
```

## Questão 7

Funcionários já eram integrados a departamentos na questão anterior. Tudo o que
precisamos fazer é criar um relacionamento entre funcionários e projetos. Para
isso vou criar uma tabela `funcionarios_projetos` que permitirá que um
funcionário participe de vários projetos e que um projeto tenha vários
funcionários.

```sql
CREATE TABLE funcionarios_projetos (
    funcionario_id INT REFERENCES funcionarios(id),
    projeto_id INT REFERENCES projetos(id),
    PRIMARY KEY (funcionario_id, projeto_id)
);
```

## Questão 8

Transação é um mecanismo que permite que um conjunto de operações seja
executado em sequência com a possibilidade de serem revertidas. Isso é útil
quando alguma operação entre um query e outro pode falhar, invalidando todas as
operações anteriores.

As transações seguem as propriedades ACID:

- Atomicidade: todas as operações são executadas com sucesso ou nenhuma é
- Consistência: o banco permanece em estado válido antes e depois da transação
- Isolamento: transações concorrentes não interferem uma na outra
- Durabilidade: após confirmada, a transação é permanente

Um exemplo clássico é uma compra. Suponha que temos as seguntes tabelas:

- `clientes` (id, nome, saldo)
- `produtos` (id, nome, preco, estoque)
- `compras` (id, cliente_id, produto_id, quantidade, total)

Para realizar uma compra, precisamos:

- Atualizar o saldo do cliente
- Atualizar o estoque do produto
- Registrar a compra na tabela `compras`

Se uma dessas operações falhar, precisamos reverter todas as operações
anteriores. Felizmente, transações nos permitem fazer isso sem ter que
reverter cada operação manualmente, usando os comandos BEGIN e ROLLBACK.

Em código, isso seria:

```sql
BEGIN;
  UPDATE clientes SET saldo = saldo - 100 WHERE id = 1;
  UPDATE produtos SET estoque = estoque - 1 WHERE id = 1;
  INSERT INTO compras (cliente_id, produto_id, quantidade, total)
    VALUES (1, 1, 1, 100);
COMMIT;
```

Vale ressaltar que transações não se limitam apenas a falhas nos próprios
queries. O código da aplicação que executa esses queries também pode precisar
cancelar uma transação após realizar validações de negócio. Por exemplo, usando
SQLAlchemy (comum em aplicações Python), podemos fazer:

```python
with session.begin():
    # Verificar saldo e produto (com lock)
    cliente = session.query(Cliente).with_for_update().get(cliente_id)
    produto = session.query(Produto).with_for_update().get(produto_id)

    valor_total = produto.preco * quantidade

    if cliente.saldo < valor_total:
        raise ValueError("Saldo insuficiente")

    # Atualizar saldo e estoque
    cliente.saldo -= valor_total
    produto.estoque -= quantidade

    # Registrar compra
    session.add(Compra(
        cliente_id=cliente_id,
        produto_id=produto_id,
        quantidade=quantidade,
        total=valor_total
    ))

```

## Questão 9

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    senha VARCHAR NOT NULL
);

CREATE UNIQUE INDEX unique_email ON usuarios (LOWER(email));

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL,
    preco DECIMAL NOT NULL,
    estoque INT NOT NULL DEFAULT 0
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR NOT NULL
);

CREATE UNIQUE INDEX unique_categoria_nome ON categorias (LOWER(nome));

CREATE TABLE produtos_categorias (
    produto_id INT REFERENCES produtos(id),
    categoria_id INT REFERENCES categorias(id),
    PRIMARY KEY (produto_id, categoria_id)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    total DECIMAL NOT NULL
);

CREATE TABLE pedidos_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id),
    produto_id INT REFERENCES produtos(id),
    quantidade INT NOT NULL,
    -- Salvar o preço do produto no momento da compra para evitar que alterações
    -- futuras no preço do produto alterem o histórico de compras.
    preco DECIMAL NOT NULL
);
```

## Questão 10

Existem dois tipos principais de pesquisas em bancos de dados: indexadas (_index
scan_) e sequenciais (_sequential scan_). A primeira é mais rápida, pois o banco
usa uma espécia de tabela rápida de índices para encontrar os registros. A
segunda é mais lenta, pois o banco precisa ler todos os registros da tabela, um
por um. Existem vários tipos de índices, como _B-trees_, _hash indexes_, _GiST_,
_SP-GiST_, etc. Cada um tem suas aplicações.

É importante notar que índices ocupam espaço de armazenamento, então nem sempre
é indicado "indexar tudo".

Vamos analizar alguns queries para o nosso sistema de e-commerce:

1. **Listar todos os produtos de uma categoria:**

```sql
SELECT p.*
FROM produtos p
JOIN produtos_categorias pc ON p.id = pc.produto_id
WHERE pc.categoria_id = 1;
```

Esse query já está otimizado, pois ele usa um índice da chave primária de
`produtos_categorias` para encontrar todos os produtos pertencentes a categoria 1.
A comparação `p.id = pc.produto_id` é feita de forma eficiente, pois
`produto_id` é uma chave estrangeira que aponta para uma chave primária, e
portanto já é indexada.

2. **Listar todos os pedidos de um usuário:**

```sql
SELECT *
FROM pedidos
WHERE usuario_id = 1;
```

Da mesma forma, esse query já está otimizado, pois `usuario_id` é uma chave
estrangeira que aponta para uma chave primária, e portanto já é indexada.

3. **Pesquisar um produto pelo nome:**

```sql
SELECT * FROM produtos WHERE nome ILIKE '% de %';
```

Aqui, nós estamos procurando qualquer produto que tenha a palavra "de" no nome
(cercado por espaços). Esse query não é otimizado, pois ele não usa um índice.
Para retornar os resultados, o banco precisa fazer um _sequential scan_ na
tabela `produtos`. Existem múltiplas formas de otimizar esse query, inclusive,
alguns bancos de dados foram criados exclusivamente para buscas de texto, como o
Elasticsearch.

> Para os nosso exemplos de sala, não há benefício em criar um índice para a
> coluna `nome` da tabela `produtos` dado a baixa quantidade de registros.
> Inclusive, pode ser que a execução de um _sequential scan_ seja mais rápida
> do que a busca em um índice.

```sql
-- Criaremos uma nova coluna que é automaticamente atualizada com o texto do
-- nome do produto em formato de vetor — esse vetor optimiza a busca de texto,
-- simplificando algumas palavras e removendo outras.
ALTER TABLE produtos ADD COLUMN nome_vector GENERATED ALWAYS AS (
    to_tsvector('portuguese', nome)
) STORED;

-- Criaremos um índice GIN (Generalized Inverted Index) para a coluna
-- nome_vector.
CREATE INDEX idx_nome_vector ON produtos USING GIN (nome_vector);

-- Agora podemos fazer a busca de texto de forma otimizada.
SELECT * FROM produtos WHERE nome_vector @@ to_tsquery('portuguese', 'sua pesquisa');
```

## Questão 11

```sql
-- Esse query retorna uma linha para cada produto registrado em uma compra para
-- todas as compras. Em uma única linha retornamos o id da compra, o nome do
-- cliente, o nome do produto e a quantidade comprada.
--
-- Para realizar esse query fiz o uso das chaves estrangeiras do pedidos_produtos
-- para relacionar os produtos com as compras e os clientes.
SELECT p.id as compra_id, u.nome as cliente, prod.nome as produto, pp.quantidade FROM produtos prod
JOIN pedidos_produtos pp ON pp.produto_id = prod.id
JOIN pedidos p ON p.id = pp.pedido_id
JOIN usuarios u ON u.id = p.usuario_id;
```

## Questão 12

As _foreign keys_ são necessárias para criar uma relação entre dados de duas
tabelas de forma confiável. Isso por que quando uma relação é estabelecida para
duas linhas em tabelas diferentes, o banco de dados vai garantir que a linha
referenciada exista — isso é, que a chave estrangeira aponte para uma chave
primária válida. Isso é o que garante que suas compras na Amazon, por exemplo,
não desapareçam ou fiquem sem produtos caso um produto seja retirado de venda.

Caso foreign keys não existissem, ainda poderíamos criar relações entre tabelas
simplesmente inserindo os IDs externos em uma coluna. Porém, isso não garantiria
a integridade dos dados e as referências poderiam ser facilmente quebradas se um
dos registros fosse alterado ou deletado — é assim que funcionam bancos
não-relacionais como o MongoDB.
