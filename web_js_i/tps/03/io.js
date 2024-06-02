// @ts-check

// This file contains helpers for input/output operations to allow the same code
// to run in both Node.js and the browser.

/**
 * Prompt the user for input. If running in a browser, use the `prompt`
 * function. Use the `readline` module otherwise.
 *
 * @param {string} message
 */
export async function _prompt(message) {
  if (typeof window === "undefined") {
    return import("readline/promises").then(async (mod) => {
      const iface = mod.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const res = await iface.question(message);
      iface.close();
      return res;
    });
  } else {
    return prompt(message);
  }
}

/**
 * Log the message with alert if running in a browser, or console.log otherwise.
 *
 * @param {string} message
 * @returns {void}
 */
export function log(message) {
  if (typeof window === "undefined") {
    console.log(message);
  } else {
    alert(message);
  }
}
