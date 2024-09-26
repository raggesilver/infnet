// @ts-check

const form = document.querySelector("form");
const span = document.querySelector("#texto");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  if (span && data.nome) {
    span.textContent = data.nome.toString();
  }
});
