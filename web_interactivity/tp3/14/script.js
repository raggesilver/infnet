/** @type {HTMLInputElement|null} */
const input = /** @type {any} */ (document.getElementById("texto"));
const span = document.getElementById("nome");

input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const texto = input.value;
    input.value = "";
    if (span) {
      span.textContent = texto;
    }
  }
});
