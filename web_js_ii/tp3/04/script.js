// @ts-check

/**
 * @param {number[]} arr
 * @returns {number}
 */
const sumArr = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

/**
 * @param {number[]} arr
 * @returns {number}
 */
const multiplyArr = (arr) => arr.reduce((acc, curr) => acc * curr, 1);

const lista = [10, 20, 30, 40];

console.log("Soma dos elementos:", sumArr(lista));
console.log("Multiplicação dos elementos:", multiplyArr(lista));
