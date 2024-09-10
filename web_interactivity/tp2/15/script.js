const buttons = document.querySelectorAll("button");

function handleClick(event) {
  const tr = event.target.closest("tr");
  const nota = tr.querySelector(".nota");
  const valor = parseFloat(nota.innerText);

  if (valor < 5) {
    tr.classList.add("reprovado");
  } else {
    tr.classList.add("aprovado");
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
