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

adicionarProduto("Boné", 20, 30);
alert(JSON.stringify(atualizarProduto("Boné", 10)));
