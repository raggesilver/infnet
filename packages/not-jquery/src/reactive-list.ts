export const LIST_DATA_ATTRIBUTE = "data-njq-list-key";

export const reactiveList = <T>(
  root: HTMLElement,
  key: keyof T,
  builder: (item: T, index: number) => HTMLElement,
  array: T[] = [],
): T[] => {
  /**
   * Wrapper around the builder callback. This adds the data attribute we use
   * to identify the elements in the list. **DO NOT CALL** `builder` directly
   * anywhere else!
   */
  const buildNode = (item: T, index: number) => {
    const node = builder(item, index);
    node.setAttribute(LIST_DATA_ATTRIBUTE, `${item[key]}`);
    return node;
  };

  /**
   * Run through the list and update the elements in the DOM.
   */
  const updateList = (arr: T[], start: number = 0) => {
    for (let i = start; i < arr.length; i++) {
      const current = root.children[i];
      if (!current) continue;
      const updated = buildNode(arr[i], i);
      current.replaceWith(updated);
    }
  };

  const insertElement = (item: T, arr: T[], index: number) => {
    const element = root.querySelector(
      `[${LIST_DATA_ATTRIBUTE}="${item[key]}"]`,
    );

    if (element) return;

    const child = buildNode(item, index);

    root.insertBefore(child, root.children[index] ?? null);

    updateList(arr, index + 1);
  };

  const removeElement = (item: T, arr: T[], index: number) => {
    root.querySelector(`[${LIST_DATA_ATTRIBUTE}="${item[key]}"]`)?.remove();
    updateList(arr, index);
  };

  const removeElementSequence = (
    items: T[],
    arr: T[],
    updateFromIndex: number,
  ) => {
    for (const item of items) {
      root.querySelector(`[${LIST_DATA_ATTRIBUTE}="${item[key]}"]`)?.remove();
    }
    updateList(arr, updateFromIndex);
  };

  const proxy = new Proxy(array, {
    get(target, prop) {
      if (prop === "push") {
        return (value: T) => {
          const ret = target.push(value);
          insertElement(value, target, ret - 1);
          return ret;
        };
      } else if (prop === "unshift") {
        return (value: T) => {
          const ret = target.unshift(value);
          insertElement(value, target, 0);
          return ret;
        };
      } else if (prop === "pop") {
        return () => {
          const ret = target.pop();
          if (ret) {
            removeElement(ret, target, target.length - 1);
          }
          return ret;
        };
      } else if (prop === "splice") {
        return (start: number, length: number, ...newItems: T[]) => {
          // Remove the elements from the DOM
          const ret = target.splice(start, length);
          removeElementSequence(ret, target, start);
          target.splice(start, 0, ...newItems);
          // Insert the new elements (there might be none)
          for (let i = 0; i < newItems.length; i++) {
            insertElement(newItems[i], target, start + i);
          }
          return ret;
        };
      } else {
        return Reflect.get(target, prop);
      }
    },
  });

  for (const [index, item] of array.entries()) {
    insertElement(item, proxy, index);
  }

  return proxy;
};
