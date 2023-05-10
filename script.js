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

function getCurrentOperand () {
  return operator ? 1 : 0;
}

function setOperand (event) {
  const digit = event.target.id;
  const index = getCurrentOperand();
  if (operands[index] === "0") operands[index] = digit;
  else operands[index] += digit;
}

function setOperator (event) {
  operator = event.target.id;
}

function populateLowerDisplay () {
  const lowerDisplay = document.querySelector(".lower");
  let outputText = operands[0];
  if (operator) {
    outputText += ` ${operator} `;
    if (operands[1]) outputText += operands[1];
  }
  lowerDisplay.textContent = outputText;
}

let operands = ["0", ""]
let operator = "";

const html = document.documentElement;
const buttons = document.querySelectorAll(".button");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

html.addEventListener("click", populateLowerDisplay);

html.addEventListener ("mouseup", () => {
  buttons.forEach(button => {
    button.classList.remove("pressed");
  });
});

buttons.forEach(button => {
  button.addEventListener("mousedown", () => {
    button.classList.add("pressed");
  });
});

digits.forEach(digit => {
  digit.addEventListener("click", setOperand);
});

operators.forEach(operator => {
  operator.addEventListener("click", setOperator);
});

populateLowerDisplay();