const content = `
  .texto {
    text-align: center;
    font-weight: bold;
  }
`;

const style = document.createElement("style");
style.innerHTML = content;
document.head.appendChild(style);

const button = document.querySelector("button");
const p = document.querySelector("p");

button.addEventListener("click", function () {
  p.classList.toggle("texto");
});
