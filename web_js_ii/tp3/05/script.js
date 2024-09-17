// @ts-check

/**
 * @param {number[]} array
 * @returns {number[]}
 */
function dobrarValores(array) {
  // Função de alta ordem que dobra os valores do array
  return array.map((valor) => valor * 2);
}

const numeros = [1, 2, 3, 4, 5];
console.log("Valores dobrados:", dobrarValores(numeros));
