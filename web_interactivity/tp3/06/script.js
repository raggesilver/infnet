const div = document.createElement("div");
div.id = "card";
div.innerText = "Eu sou um card";
document.body.appendChild(div);

window.onload = () => {
  const card = document.getElementById("card");
  if (!card) return;

  card.style.border = "3px dotted green";
  card.style.width = card.style.height = "200px";
};

