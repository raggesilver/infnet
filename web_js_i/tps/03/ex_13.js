// @ts-check

import { log, _prompt } from "./io.js";

const x = parseInt((await _prompt("Enter a value for X (1 to 3): ")) ?? "0");
const a = parseFloat((await _prompt("Enter a value for A: ")) ?? "0");
const b = parseFloat((await _prompt("Enter a value for B: ")) ?? "0");
const c = parseFloat((await _prompt("Enter a value for C: ")) ?? "0");

const [low, mid, high] = [a, b, c].sort();

if (x === 1) {
  log(`${low} ${mid} ${high}`);
} else if (x === 2) {
  log(`${high} ${mid} ${low}`);
} else if (x === 3) {
  log(`${low} ${high} ${mid}`);
} else {
  log("Invalid value for X");
}
