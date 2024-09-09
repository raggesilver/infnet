// @ts-check

const weekDays = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

/**
 * @param {number} amount
 * @returns
 */
const formatMoney = (amount) =>
  new Intl.NumberFormat(undefined, {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

const vendas = [
  [150, 200, 120], // Segunda-feira
  [180, 230, 140], // Terça-feira
  [160, 210, 130], // Quarta-feira
  [170, 220, 150], // Quinta-feira
  [190, 240, 160], // Sexta-feira
  [200, 250, 170], // Sábado
  [210, 260, 180], // Domingo
];

// O sistema deve processar uma lista de vendas diárias e fornecer informações
// úteis, como o total vendido, a média de vendas por dia, e os dias em que as
// vendas foram mais altas e mais baixas.

const totalSalesPerDay = [];

for (const sales of vendas) {
  totalSalesPerDay.push(sales.reduce((acc, sale) => acc + sale, 0));
}

/** @type {[number, number]} */
const leastSales = totalSalesPerDay.reduce(
  (min, dayTotal, i) => {
    if (dayTotal < min[1]) {
      return [i, dayTotal];
    }
    return min;
  },
  [0, totalSalesPerDay[0]],
);

/** @type {[number, number]} */
const mostSales = totalSalesPerDay.reduce(
  (max, dayTotal, i) => {
    if (dayTotal > max[1]) {
      return [i, dayTotal];
    }
    return max;
  },
  [0, totalSalesPerDay[0]],
);

const salesTotal = totalSalesPerDay.reduce((acc, day) => acc + day, 0);

console.log("Total de vendas", formatMoney(salesTotal));

for (const index in weekDays) {
  console.log(
    "Total vendido na(o)",
    weekDays[index],
    formatMoney(totalSalesPerDay[index]),
  );
}

console.log(
  "Dia mais vendido",
  weekDays[mostSales[0]],
  formatMoney(mostSales[1]),
);
console.log(
  "Dia menos vendido",
  weekDays[leastSales[0]],
  formatMoney(leastSales[1]),
);
