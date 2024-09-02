// @ts-check

function exibirCarro() {
  const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020,
  };

  for (const prop in carro) {
    console.log(`${prop}: ${carro[/** @type {keyof typeof carro} */ (prop)]}`);
  }
}

exibirCarro();
