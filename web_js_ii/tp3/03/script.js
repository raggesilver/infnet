// @ts-check

/**
 * Função que soma dois números
 * @param {number} a primeiro número
 * @param {number} b segundo número
 *
 * @returns {number} resultado da soma
 */
function soma(a, b) {
  return a + b;
}

/**
 * Função que subtrai dois números
 * @param {number} a primeiro número
 * @param {number} b segundo número
 *
 * @returns {number} resultado da subtração
 */
function subtracao(a, b) {
  return a - b;
}

/**
 * Função que multiplica dois números
 * @param {number} a primeiro número
 * @param {number} b segundo número
 *
 * @returns {number} resultado da multiplicação
 */
function multiplicacao(a, b) {
  return a * b;
}

const numeros1 = [1, 2, 3, 4];
const numeros2 = [5, 6, 7, 8];

const operacoes = /** @type {const} */ ([
  [soma, "soma"],
  [subtracao, "diferença"],
  [multiplicacao, "produto"],
]);

for (const [opr, name] of operacoes) {
  for (const i in numeros1) {
    console.log(name, opr(numeros1[i], numeros2[i]));
  }
}
