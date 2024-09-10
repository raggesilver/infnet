const modal = document.querySelector("#modal");
modal.classList.add("hide");

const button = document.querySelector("button");
button.onclick = () => {
  modal.classList.remove("hide");
};

const close = document.querySelector("#close");
close.onclick = () => {
  modal.classList.add("hide");
};
