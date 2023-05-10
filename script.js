// call mathematical function based on chosen operator
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

// return the index of the current operand
function getCurrentOperand () {
  return operator ? 1 : 0;
}

// add digit button's number to current operand string
function setOperand (event) {
  const digit = event.target.textContent;
  const index = getCurrentOperand();
  if (operands[index] === "0") operands[index] = digit;
  else operands[index] += digit;
}

function setOperator (event) {
  operator = event.target.textContent;
}

// add a decimal point to the current operand
function setDecimal () {
  const index = getCurrentOperand();
  if (operands[index].includes(".")) return; // check for existing decimal
  else if (operands[index]) operands[index] += ".";
  else operands[index] += "0."; // add leading zero to blank operand strings
}

// switch the current operand's sign
function negateOperand () {
  const index = getCurrentOperand();
  operands[index] = (0 - Number(operands[index])).toString();  
}

// delete last digit from current operand string
function deleteDigit () {
  const index = getCurrentOperand();
  operands[index] = operands[index].slice(0, -1);
}

function clearAll () {
  operands[0] = "0";
  operands[1] = "";
  operator = "";
}

// create output string from operands and operator and populate to lower display
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
const decimalButton = document.querySelector(".decimal");
const negateButton = document.querySelector(".negate");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

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

decimalButton.addEventListener("click", setDecimal);
negateButton.addEventListener("click", negateOperand);
clearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteDigit);

populateLowerDisplay(); // initial display state