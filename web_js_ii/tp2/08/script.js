// @ts-check

/**
 * @param {string} texto
 */
function contarCaracteres(texto) {
  let totalCaracteres = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of texto) {
    totalCaracteres++;
  }
  console.log(`${texto} tem ${totalCaracteres} caracteres`);
}
const mensagem = "Olá, mundo!";
contarCaracteres(mensagem);
