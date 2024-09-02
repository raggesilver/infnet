// @ts-check

/**
 * @param {number[]} numeros
 */
function exibirElementosArray(numeros) {
  for (const i in numeros) {
    console.log(`Índice ${i}: ${numeros[i]}`);
  }
}

const arrayNumeros = [10, 20, 30, 40, 50];
exibirElementosArray(arrayNumeros);
