// @ts-check

document.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    if (li.classList.contains("corVerde")) {
      li.classList.remove("corVerde");
      li.parentNode.classList.add("corRoxa");
    } else if (li.classList.contains("corAmarela")) {
      li.classList.add("corAzul");
      li.parentNode.classList.remove("corPreta");
    }
  });
});
