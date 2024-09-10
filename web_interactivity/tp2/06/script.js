function clicked(element) {
  const ol = element.closest("ol");
  ol.classList.remove("lista");
  ol.classList.add("listaSelecionada");
}
