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
});
