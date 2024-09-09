// @ts-check

const vendas = [
  [150, 200, 120], // Segunda-feira
  [180, 230, 140], // Terça-feira
  [160, 210, 130], // Quarta-feira
  [170, 220, 150], // Quinta-feira
  [190, 240, 160], // Sexta-feira
  [200, 250, 170], // Sábado
  [210, 260, 180], // Domingo
];

const diasDaSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

/**
 *
 * @param {number[][]} vendas
 */
function calcularTotalDiario(vendas) {
  const totaisDiarios = [];
  // Implemente os loops aninhados para calcular o total diário

  for (const vendasPorDia of vendas) {
    let total = 0;
    for (const venda of vendasPorDia) {
      total += venda;
    }
    totaisDiarios.push(total);
  }

  return totaisDiarios;
}

/**
 * Calcula a média de vendas diárias.
 *
 * @param {number[]} totaisDiarios - Um array contendo os totais de vendas
 * diárias.
 */
function encontrarMelhorPiorDia(totaisDiarios) {
  let maiorDia = 0;
  let menorDia = 0;

  for (let i = 0; i < totaisDiarios.length; i++) {
    if (totalDiario[i] > totalDiario[maiorDia]) {
      maiorDia = i;
    }
    if (totalDiario[i] < totalDiario[menorDia]) {
      menorDia = i;
    }
  }

  console.log(`O melhor dia foi ${diasDaSemana[maiorDia]}`);
  console.log(`O pior dia foi ${diasDaSemana[menorDia]}`);
}

const totalDiario = calcularTotalDiario(vendas);

encontrarMelhorPiorDia(totalDiario);
