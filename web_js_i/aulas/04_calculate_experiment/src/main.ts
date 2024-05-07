import "@unocss/reset/tailwind-compat.css";
import "virtual:uno.css";

import "./style.css";

import { $ } from "@raggesilver/not-jquery";

/**
 * @param yob Year of birth
 */
function calculateAge(yob: Date) {
  return new Date().getFullYear() - yob.getFullYear();
}

/**
 * Calculate additional salary based on age.
 * @param age
 * @returns the additional salary
 */
function calculateAdditional(age: number): number {
  return age <= 20 ? 1000 : 2000;
}

type SalaryData = {
  name: string;
  baseSalary: number;
  bonus: number;
  gratification: number;
  discount: number;
  yob: Date;
};

/**
 * Calculate the liquid salary.
 *
 * @param {SalaryData} data
 * @returns {number} the liquid salary
 */
function calculateSalary(data: SalaryData): number {
  const age = calculateAge(data.yob);
  const additional = calculateAdditional(age);

  const liquid =
    data.baseSalary +
    data.bonus +
    data.gratification -
    data.discount +
    additional;

  return liquid;
}

type HistoryEntry = {
  name: string;
  salary: number;
};

const PERSISTED_DATA_KEY = "__calculate-salary-data";
const CURRENT_PERSISTED_DATA_VERSION = 1;

type PersistedData = {
  version: number;
  history: HistoryEntry[];
};

const persistedData = JSON.parse(
  localStorage.getItem(PERSISTED_DATA_KEY) ?? "null",
) as PersistedData | null;

const history = $.reactiveList<HistoryEntry>(
  $(".history").el!,
  "name",
  createHistoryEntryElement,
  persistedData?.version === CURRENT_PERSISTED_DATA_VERSION
    ? persistedData.history
    : [],
);

export function onFormSubmit(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = Array.from(formData.entries()).reduce<SalaryData>(
    (obj, entry) => {
      const [key, value] = [entry[0], entry[1].toString()];
      switch (key) {
        case "baseSalary":
        case "bonus":
        case "gratification":
        case "discount":
          obj[key] = parseFloat(value);
          break;
        case "yob":
          obj[key] = new Date(value);
          break;
        case "name":
          obj[key] = value;
          break;
      }
      return obj;
    },
    {} as SalaryData,
  );

  const salary = calculateSalary(data);

  history.push({ name: data.name, salary });

  return false;
}

/**
 * Create a history entry element. The element is a list item with the name and
 * salary of the employee.
 *
 * @param entry The history entry
 * @returns The list item element. The element is **not** appended to the DOM.
 */
function createHistoryEntryElement(
  entry: HistoryEntry,
  index: number,
): HTMLLIElement {
  const formattedSalary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(entry.salary);

  const li = document.createElement("li");
  li.classList.add("history-entry");
  li.textContent = `${index + 1}. ${entry.name} - ${formattedSalary}`;

  const button = document.createElement("button");
  button.textContent = "Remove";

  li.appendChild(button);

  button.addEventListener("click", () => {
    history.splice(index, 1);
  });

  return li;
}

function main() {
  $<HTMLFormElement>("form").on("submit", (e) => {
    onFormSubmit(e);
  });

  window.onbeforeunload = () => {
    // Persist data before unloading the page. It would probably be better to
    // persist the data on every change or every few seconds.
    localStorage.setItem(
      PERSISTED_DATA_KEY,
      JSON.stringify({
        version: CURRENT_PERSISTED_DATA_VERSION,
        history: [...history],
      }),
    );
  };
}

// Run on load
main();
