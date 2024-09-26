// @ts-check

const input = document.querySelector("input");

input?.addEventListener("keypress", (e) => {
  console.log(e.key);
});

input?.addEventListener("change", () => {
  console.log(input.value);
});
