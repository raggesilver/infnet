const button = document.createElement("button");
button.innerText = "inserir";

document.body.append(button);

const lista = document.querySelector("#lista");

button.addEventListener("click", function () {
  const li = document.createElement("li");
  li.innerText = "nova entrada";

  lista.appendChild(li);
});
