// @ts-check

import { log, _prompt } from "./io.js";

/**
 * @param {string} sex
 * @param {number} age
 * @param {number} trips
 */
export function getIsEligible(sex, age, trips) {
  return (
    // Ter pelo menos 40 anos para homens ou 35 anos para mulheres
    age >= (sex === "M" ? 40 : 35) ||
    // Ou ter viajado no máximo 2 vezes para homens ou 3 vezes para mulheres
    trips <= (sex === "M" ? 2 : 3) ||
    // Ou ter pelo menos 35 anos e viajado no máximo 1 vez para homens,
    // 30 anos e viajado no máximo 2 vezes para mulheres
    (age >= (sex === "M" ? 35 : 30) && trips <= (sex === "M" ? 1 : 2))
  );
}

if (process.env.NODE_ENV !== "test") {
  const sex = (await _prompt("Qual é o seu sexo? (M/F) ")) ?? "M";
  const age = parseInt((await _prompt("Qual é a sua idade? ")) ?? "0");
  const trips = parseInt((await _prompt("Quantas viagens você fez? ")) ?? "0");

  const eligible = getIsEligible(sex, age, trips);

  log(`Você ${eligible ? "" : "não "}é elegível para a promoção.`);
}
