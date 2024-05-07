const thisYear = new Date().getFullYear();

window.onload = () => {
  document.querySelector("#yob-input")?.setAttribute("max", thisYear);
};

export function onAgeFormSubmitted(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const yob = data.get("yob");
  const yobNum = yob ? parseInt(yob) : null;
  const name = data.get("name");

  if (!yobNum || isNaN(yobNum) || typeof name !== "string") return;

  const age = thisYear - yobNum;

  alert(`${name}, sua idade é ${age}`);

  const message = document.querySelector("#message");

  if (message) {
    message.innerHTML = "Você é " + (age < 100 ? "novo." : "velho.");
  }
}
