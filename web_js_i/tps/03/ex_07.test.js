// @ts-check

import { describe, it, expect } from "bun:test";
import { getIsEligible } from "./ex_07";

describe("Exercice 07", () => {
  const testCases = /** @type {const} */ ([
    [40, "M", 3, true],
    [40, "M", 2, true],
    [40, "M", 1, true],
    [35, "M", 2, true],
    [35, "M", 1, true],

    [39, "M", 3, false],
    [35, "M", 3, false],

    [35, "F", 4, true],
    [35, "F", 3, true],
    [35, "F", 2, true],
    [30, "F", 3, true],
    [30, "F", 2, true],

    [29, "F", 5, false],
    [30, "F", 4, false],
    [34, "F", 4, false],
  ]);

  it.each(testCases)("%d %s with %d trips", (age, sex, trips, expected) => {
    expect(getIsEligible(sex, age, trips)).toBe(expected);
  });
});
