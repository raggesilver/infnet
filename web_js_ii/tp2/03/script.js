// @ts-check

/**
 * @param {number[]} numeros
 */
function multiplicarArray(numeros) {
  const res = [];
  for (const n of numeros) {
    res.push(n * 3);
  }
  return res;
}

const resultado = multiplicarArray([1, 2, 3, 4, 5]);
console.log(resultado);
