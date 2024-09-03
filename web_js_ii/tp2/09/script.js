// @ts-check

/**
 * @param {number[]} numeros
 */
function somarArray(numeros) {
  let somaTotal = 0;
  for (const num of numeros) {
    somaTotal += num;
  }
  console.log(somaTotal);
}

const numerosArray = [5, 10, 15, 20];
somarArray(numerosArray);
