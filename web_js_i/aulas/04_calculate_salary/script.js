/** @type {typeof document.querySelector} */
const $ = document.querySelector.bind(document);

/**
 * @param {Date} yob
 */
function calculateAge(yob) {
  return new Date().getFullYear() - yob.getFullYear();
}

/**
 * Calculate additional salary based on age.
 * @param {number} age
 * @returns {number} the additional salary
 */
function calculateAdditional(age) {
  return age <= 20 ? 1000 : 2000;
}

/**
 * @typedef {{
 *    baseSalary: number;
 *    bonus: number;
 *    gratification: number;
 *    discount: number;
 *    yob: Date;
 *  }} SalaryData
 */

/**
 * Calculate the liquid salary.
 *
 * @param {SalaryData} data
 * @returns {number} the liquid salary
 */
function calculateSalary(data) {
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

/**
 * @param {HTMLFormElement} form
 */
function onFormSubmit(form) {
  const formData = new FormData(form);
  /**
   * @type {SalaryData}
   */
  const data = Array.from(formData.entries()).reduce((obj, entry) => {
    const [key, value] = entry;
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
  }, {});

  const salary = calculateSalary(data);
  const formattedSalary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(salary);

  const item = document.createElement("li");
  item.textContent = `${data.name} - ${formattedSalary}`;
  $(".history")?.appendChild(item);

  return false;
}
