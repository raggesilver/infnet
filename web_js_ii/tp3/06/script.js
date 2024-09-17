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

// Teste da função com o número 5
console.log("Fatorial de 5:", fatorial(5));
