type NotNullOrUndefined<T> = Exclude<T, undefined | null>;

export const $ = <E extends HTMLElement>(selector: string) => {
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
