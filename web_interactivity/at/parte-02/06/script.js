// @ts-check

const escolhido = /** @type {HTMLElement | null} */ (
  document.querySelector("#escolhido")
);
const liBrasil = document.querySelector("li#brasil");
const liArgentina = document.querySelector("li#argentina");

liBrasil?.addEventListener("click", () => {
  if (!escolhido) return;
  escolhido.textContent = "Brasil";
  escolhido.style.border = "1px solid #009739";
});

liArgentina?.addEventListener("click", () => {
  if (!escolhido) return;
  escolhido.textContent = "Argentina";
  escolhido.style.border = "1px solid #6CACE4";
});
