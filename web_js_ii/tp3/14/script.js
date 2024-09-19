// @ts-check

/**
 * @typedef {{ nome: string; notas: number[]; situacao?: string }} Estudante
 */

/** @type {Estudante[]} */
const estudantes = [];

/**
 * @param {number[]} notas
 * @returns {number}
 */
const calcularMedia = (notas) =>
  notas.reduce((acc, nota) => acc + nota, 0) / notas.length;

/**
 * Atualizar situacao do estudante.
 *
 * @param {Estudante} estudante
 * @returns {void}
 */
function atualizarSituacao(estudante) {
  const media = calcularMedia(estudante.notas);
  if (media >= 5) {
    estudante.situacao = "Aprovado";
  } else {
    estudante.situacao = "Reprovado";
  }
}

/**
 * Gerar lista de estudantes em recuperacao.
 *
 * @param {Estudante[]} lista
 * @param {number} [start]
 * @returns {Estudante[]} Lista de estudantes em recuperacao
 */
function verificarRecuperacao(lista, start = 0) {
  // This function had to be implemented recursively as part of the assignment
  // but it could be implemented using a simple .filter().

  if (start >= lista.length) {
    return [];
  }

  const estudante = lista[start];
  atualizarSituacao(estudante);

  if (estudante.situacao === "Reprovado") {
    return [estudante, ...verificarRecuperacao(lista, start + 1)];
  }

  return verificarRecuperacao(lista, start + 1);
}

// Lista todos os estudantes, suas notas e situacao final
function gerarRelatorio() {
  for (const estudante of estudantes) {
    atualizarSituacao(estudante);
    console.log(
      `${estudante.nome} - ${estudante.notas.join(", ")} - ${estudante.situacao}`,
    );
  }
}

// Test
estudantes.push({ nome: "Alice", notas: [10, 9, 8] });
estudantes.push({ nome: "Bob", notas: [10, 9, 4] });
estudantes.push({ nome: "Charlie", notas: [10, 4, 3] });
estudantes.push({ nome: "David", notas: [4, 3, 2] });
estudantes.push({ nome: "Eve", notas: [3, 2, 1] });
estudantes.push({ nome: "Frank", notas: [2, 1, 0] });
estudantes.push({ nome: "Grace", notas: [1, 0, 0] });
estudantes.push({ nome: "Heidi", notas: [0, 0, 0] });
estudantes.push({ nome: "Ivan", notas: [10, 10, 10] });

gerarRelatorio();
console.log(verificarRecuperacao(estudantes));
