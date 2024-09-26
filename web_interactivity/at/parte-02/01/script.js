// @ts-check

const h1 = document.querySelector("h1");
const div = document.querySelector("#card");

h1?.addEventListener("click", () => {
  h1.classList.toggle("corVermelha");
});

div?.addEventListener("click", () => {
  div.classList.add("card");
});
