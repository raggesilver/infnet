# not-jquery

This is a simple, jQuery-inspired library for manipulating the DOM. It is a work
in progress and is not intended to be a full replacement for jQuery. It is
intended to be a lightweight alternative for simple DOM manipulation for
projects I'm not allowed to use frameworks in.

## How to Use

not-jquery currently needs to be bundled in a project to be used — that means
you must use Vite, Webpack, Rollup, or another bundler of your preference.

### jQuery-inspired API

```ts
import { $ } from "@raggesilver/not-jquery";

$("button").el; // returns the first button element

// You can easily add event listeners to elements.
$("button").on("click", () => {
  console.log("Button clicked!");
});

$("button").hide(); // adds inline style display: none to the button

$("button").show(); // removes inline style display: none from the button

$("button").html("<span>Click Me</span>"); // change button's innerHTML
```

### Framework-inspired API

```ts
// The reactiveList method allows you to bind an array to a root DOM element.
// Adding or removing elements from the array will automatically update the DOM.
//
// This function returns the reactive array.
const myArray = $.reactiveList(
  // List root element
  $("#list").el,
  // Item identifier. This is used to track changes in the array. This must be
  // a property present on every item in the array.
  "id",
  // Callback to create a DOM element for each item in the array.
  (item, index) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    return li;
  },
  // (optional) initial items
  [
    { id: 1, name: "Ederth" },
    { id: 2, name: "Ragge Silver" },
  ],
);

// The initial items are appended to the DOM as soon as the function is called.
// From then on, items will be appended to or removed from the DOM when you call
// `push`, `pop`, `unshift`, or `splice` on the reactive array.

// This will add a new item to the array, which will be appended to the DOM.
myArray.push({ id: 3, name: "John Doe" });

// This will remove the second item from the array and the DOM.
myArray.splice(1, 1);
```
