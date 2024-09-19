/** @type {HTMLDivElement|null} */
const container = document.querySelector("#container");

container?.addEventListener("click", () => {
  const span = container.querySelector("span");
  if (span) {
    span.textContent = "teste";
  }
});
