import { describe, expect, it, mock } from "bun:test";
import { $ } from ".";

describe("$", () => {
  it("finds button element", () => {
    document.body.innerHTML = `<button>My button</button>`;
    const button = $("button");
    expect(button.el).not.toBeNull();
  });

  it("sets up event listener", () => {
    document.body.innerHTML = `<button>My button</button>`;
    const callback = mock(() => {});
    const button = $<HTMLButtonElement>("button").on("click", callback);
    expect(button.el).not.toBeNull();
    button.el!.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("can modify elements' html", () => {
    document.body.innerHTML = `<button>My button</button>`;
    const button = $("button");
    expect(button.el).not.toBeNull();
    expect(button.el!.innerHTML).toBe("My button");
    button.html("I've changed");
    expect(button.el!.innerHTML).toBe("I've changed");
  });

  it("can hide and show elements", () => {
    document.body.innerHTML = `<button>My button</button>`;
    const button = $("button");
    expect(button.el).not.toBeNull();
    button.hide();
    expect(button.el!.style.display).toBe("none");
    button.show();
    expect(button.el!.style.display).toBe("");
  });

  it("can hide and show elements without losing original display", () => {
    const initial = "flex";
    document.body.innerHTML = `<button style="display: ${initial}">My button</button>`;
    const button = $("button");
    expect(button.el).not.toBeNull();
    button.hide();
    expect(button.el!.style.display).toBe("none");
    button.show();
    expect(button.el!.style.display).toBe(initial);
  });
});
