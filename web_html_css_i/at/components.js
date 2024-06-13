// @ts-check

["header-bar", "site-footer"].map((component) =>
  fetch(`${component}.html`).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${component}.html`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, "text/html");

    customElements.define(
      component,
      class extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = html.querySelector("template")?.innerHTML || "";
        }
      },
    );
  }),
);
