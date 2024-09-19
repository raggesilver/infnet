/** @type {HTMLUListElement|null} */
const list = document.querySelector("#lista");

list?.addEventListener("click", () => {
  const li = list.querySelectorAll("li");

  li.forEach((item) => {
    if (item.innerText === "Acre") {
      item.innerText = "Amapá";
    }
  });

  list.style.backgroundColor = "blue";
});
