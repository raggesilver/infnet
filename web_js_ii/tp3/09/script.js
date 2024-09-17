// @ts-check

/**
 * Recebe um array de números e retorna um novo array com cada número ao
 * quadrado.
 *
 * @param {number[]} arr - O array de números a serem elevados ao quadrado.
 * @returns {number[]} Um novo array com cada número ao quadrado.
 */
const arrSquare = (arr) => arr.map((item) => item ** 2);

const numeros = [2, 4, 6, 8];

alert("Quadrados dos números: " + arrSquare(numeros));
