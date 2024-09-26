// @ts-check

/**
 * @param {string} nome
 * @param {string} continente
 * @param {string} capital
 */
function Pais(nome, continente, capital) {
  this.nome = nome;
  this.continente = continente;
  this.capital = capital;
}

const nome = /** @type {string} */ (prompt("Digite o nome do país"));
const continente = /** @type {string} */ (
  prompt("Digite o continente do país")
);
const capital = /** @type {string} */ (prompt("Digite a capital do país"));

const pais = new Pais(nome, continente, capital);

console.log(pais);
