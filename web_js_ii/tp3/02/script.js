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

/**
 * Função que divide dois números
 * @param {number} a primeiro número
 * @param {number} b segundo número
 *
 * @returns {number | string} resultado da soma
 */
function divisao(a, b) {
  if (b === 0) {
    return "Divisão por zero não é permitida";
  }
  return a / b;
}

/**
 * Função que calcula a soma, subtração, multiplicação e divisão de dois
 * números
 * @param {number} a primeiro número
 * @param {number} b segundo número
 *
 * @returns {string} resultado da soma, subtração, multiplicação e divisão
 * dos dois números.
 */
function calcularTudo(a, b) {
  const resultadoSoma = soma(a, b);
  const resultadoSubtracao = subtracao(a, b);
  const resultadoMultiplicacao = multiplicacao(a, b);
  const resultadoDivisao = divisao(a, b);

  return JSON.stringify(
    {
      resultadoSoma,
      resultadoSubtracao,
      resultadoMultiplicacao,
      resultadoDivisao,
    },
    null,
    2,
  );
}

alert(calcularTudo(10, 2));
