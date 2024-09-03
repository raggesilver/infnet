// @ts-check

function gerarPadraoAsteriscos() {
  for (let i = 1; i <= 5; i++) {
    let str = "";
    for (let j = 1; j <= i; j++) {
      str += "*";
    }
    console.log(str);
    // This is much easier, but we have to use nested loops
    // console.log("*".repeat(i));
  }
}

gerarPadraoAsteriscos();
