const ul = document.querySelector("ul");

ul?.addEventListener("click", (e) => {
  const li = e.target?.closest("li");

  if (li) {
    alert(li.textContent);
  }
});
