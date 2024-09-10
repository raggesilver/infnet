const button = document.createElement("button");
button.innerText = "inserir";
document.body.appendChild(button);

const lista = document.querySelector("#lista");

button.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerText = "nova entrada";

  lista.append(li);
});
