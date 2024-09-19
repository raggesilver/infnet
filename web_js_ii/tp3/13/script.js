// @ts-check

/**
 * @typedef {{
 *   nome: string;
 *   quantidade: number;
 *   precoUnitario: number;
 * }} Produto
 */

/** @type {Produto[]} */
const estoque = [];

/**
 * Adicionar um produto ao estoque.
 *
 * @param {string} nome Nome do produto.
 * @param {number} quantidade Quantidade do produto.
 * @param {number} precoUnitario Preço unitário do produto.
 * @returns {void}
 */
function adicionarProduto(nome, quantidade, precoUnitario) {
  // TODO: do we need to check if the product already exists?
  estoque.push({ nome, quantidade, precoUnitario });
}

/**
 * Atualizar a quantidade de um produto no estoque.
 *
 * @param {string} nome Nome do produto.
 * @param {number} quantidade Nova quantidade do produto.
 * @returns {Produto} Produto atualizado.
 * @throws {Error} Se o produto não for encontrado.
 */
function atualizarProduto(nome, quantidade) {
  const produto = estoque.find((produto) => produto.nome === nome);
  if (produto) {
    produto.quantidade = quantidade;
    return produto;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

/**
 * Remover um produto do estoque.
 *
 * @param {string} nome Nome do produto.
 * @returns {boolean} `true` se o produto foi removido, `false` se não foi
 * encontrado.
 */
function removerProduto(nome) {
  const index = estoque.findIndex((produto) => produto.nome === nome);
  if (index !== -1) {
    estoque.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Calcular o valor total do estoque.
 *
 * @returns {number} Valor total do estoque.
 */
function calcularValorTotal() {
  return estoque.reduce(
    (acc, produto) => acc + produto.quantidade * produto.precoUnitario,
    0,
  );
}

/**
 * Exibir um relatório do estoque.
 */
function relatorioEstoque() {
  console.log("Estoque:");
  for (const produto of estoque) {
    console.log(
      `${produto.nome}: ${produto.quantidade} x R$ ${produto.precoUnitario} (${produto.quantidade * produto.precoUnitario})`,
    );
  }
  console.log(`Valor total: R$ ${calcularValorTotal()}`);
}

adicionarProduto("Camiseta", 10, 20);
adicionarProduto("Calça", 5, 50);
adicionarProduto("Boné", 20, 10);

atualizarProduto("Camiseta", 15);

removerProduto("Calça");

console.log(`Valor total do estoque: R$ ${calcularValorTotal()}`);
relatorioEstoque();
