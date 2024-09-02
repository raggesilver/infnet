// @ts-check

/**
 * @template {Record<string, any>} T
 * @param {T} obj
 */
function contarPropriedades(obj) {
  let count = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ in obj) {
    count++;
  }
  console.log(count);
}

const pessoa = {
  nome: "Ana",
  idade: 28,
  profissao: "Engenheira",
};

contarPropriedades(pessoa);
