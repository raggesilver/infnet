window.onload = function () {
  const h1 = document.querySelector("h1");

  h1?.addEventListener("click", function () {
    h1.classList.toggle("corVermelha");
  });
};
