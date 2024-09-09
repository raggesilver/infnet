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

/**
 *
 * @param {number[][]} vendas
 */
function calcularTotalDiario(vendas) {
  const totaisDiarios = [];
  // Implemente os loops aninhados para calcular o total diári

  for (const vendasPorDia of vendas) {
    let total = 0;
    for (const venda of vendasPorDia) {
      total += venda;
    }
    totaisDiarios.push(total);
  }

  return totaisDiarios;
}

console.log(calcularTotalDiario(vendas));
