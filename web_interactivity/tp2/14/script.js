const blueItems = document.querySelectorAll(".azul");
const redItems = document.querySelectorAll(".vermelho");

for (const blueItem of blueItems) {
  blueItem.classList.remove("azul");
  blueItem.classList.add("vermelho");
}

for (const redItem of redItems) {
  redItem.classList.remove("vermelho");
  redItem.classList.add("azul");
}
