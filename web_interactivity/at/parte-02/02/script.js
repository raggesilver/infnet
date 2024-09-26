// @ts-check

const container = document.querySelector("#container");

function insert() {
  const h2 = document.createElement("h2");
  h2.textContent = "Titulo inserido";
  container?.appendChild(h2);
}
