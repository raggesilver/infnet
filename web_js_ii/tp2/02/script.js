// @ts-check

function somarImpares() {
  let acc = 0;
  for (let i = 1; i <= 15; i++) {
    if (i % 2 !== 0) {
      acc += i;
    }
  }
  console.log("Soma dos ímpares:", acc);
}

somarImpares();
