function onItemClicked(event) {
  const accordionItem = event.target.closest(".accordion-item");

  if (accordionItem.classList.contains("open")) {
    accordionItem.classList.remove("open");
  } else {
    items.forEach((item) => item.classList.remove("open"));
    accordionItem.classList.add("open");
  }
}

const items = document.querySelectorAll(".accordion-item");

for (const item of items) {
  item.classList.remove("open");
  item.addEventListener("click", onItemClicked);
}
