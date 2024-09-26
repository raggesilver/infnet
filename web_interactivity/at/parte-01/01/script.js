// @ts-check

const name = prompt("Qual é o seu nome?");
const age = parseInt(prompt("Qual é a sua idade?"));
const email = prompt("Qual é o seu email?");
const sex = prompt("Qual é o seu sexo?");

const pessoa = {
  name,
  age,
  email,
  sex,
};

console.log(pessoa);
