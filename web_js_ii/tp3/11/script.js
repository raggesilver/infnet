// @ts-check

/**
 * @param {number} base
 * @param {number} altura
 */
function calcularAreaTradicional(base, altura) {
  return base * altura;
}

/**
 * @param {number} base
 * @param {number} altura
 */
const calcularAreaArrow = (base, altura) => base * altura;

alert("Área usando função tradicional:" + calcularAreaTradicional(5, 8));
alert("Área usando arrow function:" + calcularAreaArrow(5, 8));
