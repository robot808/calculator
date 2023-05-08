function add (numberA, numberB) {
  return numberA + numberB;
}

function subtract (numberA, numberB) {
  return numberA - numberB;
}

function multiply (numberA, numberB) {
  return numberA * numberB;
}

function divide (numberA, numberB) {
  return numberA / numberB;
}

let operandA = "0";
let operandB = "0";
let operator = "";

const html = document.documentElement;
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("mousedown", () => {
    button.classList.add("pressed");
  });
});

html.addEventListener ("mouseup", () => {
  buttons.forEach(button => {
    button.classList.remove("pressed");
  });
});