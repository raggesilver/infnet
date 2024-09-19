// @ts-check

/** @type {NodeListOf<HTMLDivElement>} */
const boxes = document.querySelectorAll("div.caixinha");

/** @type {NodeListOf<HTMLDivElement>} */
const containers = document.querySelectorAll(".container");

const newBoxButton = document.getElementById("criar");
const newBoxContainer = document.getElementById("novo");

/**
 * @param {HTMLDivElement} box
 */
function setupBox(box) {
  box.draggable = true;
  box.id = `box-${Math.random().toString(36).slice(2)}`;

  box.ondragstart = (e) => {
    e.dataTransfer?.setData("text/plain", box.id);
    if (e.target instanceof HTMLElement) {
      e.target.classList.add("dragging");
    }
  };

  box.ondragend = (e) => {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove("dragging");
    }
  };
}

/**
 * Sets up drag-and-drop event listeners on a given container element.
 *
 * @param {HTMLElement} container - The container element to set up.
 */
function setupContainer(container) {
  container?.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (e.target instanceof Element) {
      e.target.closest(".container")?.classList.add("hover");
    }
  });

  container?.addEventListener("dragleave", (e) => {
    e.preventDefault();

    if (e.target instanceof Element) {
      e.target.closest(".container")?.classList.remove("hover");
    }
  });

  container?.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.target instanceof Element) {
      e.target.closest(".container")?.classList.remove("hover");
    }

    const boxId = e.dataTransfer?.getData("text/plain");
    const box = boxId && document.getElementById(boxId);

    if (!box) return;

    container.appendChild(box);
  });
}

newBoxButton?.addEventListener("click", () => {
  const newBox = document.createElement("div");
  newBox.classList.add("caixinha");
  setupBox(newBox);
  newBoxContainer?.appendChild(newBox);
});

containers.forEach(setupContainer);
boxes.forEach(setupBox);
