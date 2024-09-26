// @ts-check

const fruta = {
  cor: "amarelo",
  tamanho: "média",
  pais: "Brasil",
};

fruta.cor = prompt("Digite a cor da fruta", fruta.cor) || fruta.cor;
fruta.tamanho =
  prompt(
    "Digite o tamanho da fruta (pequena, média ou grande)",
    fruta.tamanho,
  ) || fruta.tamanho;
fruta.pais =
  prompt("Digite o país de origem da fruta", fruta.pais) || fruta.pais;

console.log(fruta);
