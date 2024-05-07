import { reactiveList } from "./reactive-list";

type NotNullOrUndefined<T> = Exclude<T, undefined | null>;

const r = <E extends HTMLElement>(selector: string) => {
  const el = document.querySelector<E>(selector);

  const onn = el?.addEventListener.bind(el);

  return {
    el,
    on(...args: Parameters<NotNullOrUndefined<typeof onn>>) {
      onn?.(...args);
      return this;
    },
    html(str: string) {
      if (el) {
        el.innerHTML = str;
      }
      return this;
    },
    show() {
      if (el?.style.display === "none") {
        el.style.display = el.getAttribute("data-not-jquery-old-display") ?? "";
        el.removeAttribute("data-not-jquery-old-display");
      }
      return this;
    },
    hide() {
      if (el) {
        if (el.style.display) {
          el.setAttribute("data-not-jquery-old-display", el.style.display);
        }
        el.style.display = "none";
      }
      return this;
    },
  };
};

export const $ = Object.assign(r, {
  // JSDoc annotations must be added here.

  /**
   * Create a reactive list.
   *
   * Reactive lists allow you to append items to a list and have them
   * automatically rendered in the DOM.
   *
   * @param root The root element of the list. This must already exist in the
   * DOM.
   * @param key The key to use to identify each item in the list.
   * @param builder A callback that returns an HTMLElement for each item in the
   * list.
   * @param array Initial values to append to the list.
   * @returns A reactive array that you can use to manipulate the list. Keep in
   * mind that the only supported methods are `push`, `unshift`, `pop`, and
   * `splice`. Any other method will not update the DOM.
   */
  reactiveList,
});
