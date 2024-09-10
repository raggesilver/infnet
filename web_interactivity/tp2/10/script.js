const button = document.createElement("button");
button.innerText = "inserir";

document.body.prepend(button);

const container = document.querySelector("#container");

button.addEventListener("click", function () {
  const h2 = document.createElement("h2");
  h2.innerText = "Inserido";

  container.appendChild(h2);
});
