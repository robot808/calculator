function operate (stringA, stringB, stringOperator) {
  let result;
  switch (stringOperator) {
    case "+":
      result = add(Number(stringA), Number(stringB));
      break;
    case "-":
      result = subtract(Number(stringA), Number(stringB));
      break;
    case "*":
      result = multiply(Number(stringA), Number(stringB));
      break;
    case "/":
      result = divide(Number(stringA), Number(stringB));
      break;
  }
  return result.toString();
}

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

function populateDisplay () {
  const lowerDisplay = document.querySelector(".lower");
  let outputText = operandA;
  if (operator) {
    outputText += ` ${operator} `;
    if (operandB) outputText += operandB;
  }
  lowerDisplay.textContent = outputText;
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

populateDisplay();