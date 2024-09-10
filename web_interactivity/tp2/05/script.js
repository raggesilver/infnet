const content = `
  .titulo {
    text-align: center;
    color: white;
    background-color: blue;
  }
`;

const style = document.createElement("style");
style.innerHTML = content;
document.head.appendChild(style);

const h1 = document.querySelector("h1");

h1.addEventListener("click", function () {
  h1.classList.toggle("titulo");
});
