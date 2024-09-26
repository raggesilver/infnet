// @ts-check

/**
 * @param {string} nome
 */
function verNome(nome) {
  alert(nome);
}

window.onload = () => {
  const input = /** @type {HTMLInputElement | null} */ (
    document.querySelector("#nome")
  );

  input?.addEventListener("change", () => {
    verNome(input.value);
  });
};
