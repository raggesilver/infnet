// @ts-check

/**
 * @param {number} n
 * @returns {number}
 */
function fatorial(n) {
  if (n <= 1) {
    return n;
  }

  return n * fatorial(n - 1);
}

const valores = [3, 4, 5];
const fatoriais = valores.map((valor) => fatorial(valor));

console.log("Fatoriais dos elementos:", fatoriais);
