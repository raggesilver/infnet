import { describe, expect, it } from "bun:test";
import { LIST_DATA_ATTRIBUTE, reactiveList } from "./reactive-list";

type Item = {
  id: number;
  name: string;
};

const createItemElement = (item: Item): HTMLElement => {
  const el = document.createElement("div");
  el.textContent = `${item.id} - ${item.name}`;
  return el;
};

describe("reactive list", () => {
  it("should add initial items to the DOM", () => {
    const root = document.createElement("div");
    const initial: Item[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    const array = reactiveList<Item>(root, "id", createItemElement, initial);
    array.forEach((item, index) => {
      expect(item).toMatchObject(initial[index]);
    });

    // Check if the elements are in the DOM and in the correct order.
    array.forEach((item, index) => {
      expect(root.children[index]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual(
        `${item.id}`,
      );
    });
  });

  it("should append items to the DOM", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Alice" });

    expect(root.children.length).toBe(1);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("1");
  });

  it("should prepend items to the DOM", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Paulo" });
    array.unshift({ id: 2, name: "Alice" });

    expect(root.children.length).toBe(2);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("2");
    expect(root.children[1]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("1");
  });

  it("should remove items from the DOM", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Alice" });

    expect(root.children.length).toBe(1);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("1");

    array.pop();

    expect(root.children.length).toBe(0);
  });

  it("should remove items from the DOM (splice)", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Alice" });
    array.push({ id: 2, name: "Bob" });
    array.push({ id: 3, name: "Frodo" });

    expect(root.children.length).toBe(3);

    array.splice(0, 2);

    expect(Array.from(array)).toMatchObject([{ id: 3, name: "Frodo" }]);

    expect(root.children.length).toBe(1);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("3");
  });

  it("should remove items and insert new ones (splice)", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Alice" });
    array.push({ id: 2, name: "Bob" });
    array.push({ id: 3, name: "Frodo" });

    expect(root.children.length).toBe(3);

    array.splice(0, 2, { id: 4, name: "Gandalf" });

    expect(Array.from(array)).toMatchObject([
      { id: 4, name: "Gandalf" },
      { id: 3, name: "Frodo" },
    ]);

    expect(root.children.length).toBe(2);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("4");
    expect(root.children[1]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("3");
  });

  it("should insert new items (splice)", () => {
    const root = document.createElement("div");

    const array = reactiveList<Item>(root, "id", createItemElement);

    array.push({ id: 1, name: "Alice" });
    array.push({ id: 2, name: "Bob" });

    expect(root.children.length).toBe(2);

    array.splice(1, 0, { id: 3, name: "Frodo" });

    expect(Array.from(array)).toMatchObject([
      { id: 1, name: "Alice" },
      { id: 3, name: "Frodo" },
      { id: 2, name: "Bob" },
    ]);

    expect(root.children.length).toBe(3);
    expect(root.children[0]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("1");
    expect(root.children[1]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("3");
    expect(root.children[2]?.getAttribute(LIST_DATA_ATTRIBUTE)).toEqual("2");
  });
});
