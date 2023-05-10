// add clicked digit button's number to current operand string
function setOperand (event) {
  const digit = event.target.textContent;
  const index = getCurrentOperand();
  if (operands[index] === "0") operands[index] = digit;
  else operands[index] += digit;
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

// return the index of the current operand
function getCurrentOperand () {
  return operator ? 1 : 0;
}

// store operation based on clicked operation button
function setOperator (event) {
  if(operands[1]) determineOperation(); // perform any pending operation first
  operator = event.target.textContent;
}

// determine operation based on stored operands and operator
function determineOperation () {
  // if user deletes initial operand, reset to zero
  if (!operands[0]) operands[0] = "0";
  
  // if no operator is provided, continue to perform previous operation
  if (!operator) {
    if (!previousOperator) return; // not enough data to perform operation
    else {
      operator = previousOperator;
      operands[1] = previousOperands[1];
    }
  }
  
  // if only one operand provided, use it for both operands
  if (!operands[1]) operands[1] = operands[0];

  enumerateResult();
}

// perform operation and ready result to be displayed
function enumerateResult() {
  // keep track of previous operation data
  for (let i = 0; i < 2; i++) previousOperands[i] = operands[i];
  previousOperator = operator;

  // store result as first operand and clear second operand and operator
  operands[0] = operate(operands[0], operands[1], operator);
  operands[1] = "";
  operator = "";
}

// call mathematical function based on operator
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
  // truncate result if it won't fit in the display
  result = format(result);
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

// format output to fit in display
function format (number) {
  if (number.toString().length < 8) return number; // no need to format

  let formattedNumber;
  // big integers
  if (Number.isInteger(number)) {
    formattedNumber = number.toExponential();
    if (formattedNumber.length > 10) {
      formattedNumber = number.toPrecision(3);
    }
  }
  // big non-integers
  else if (number > 100000000) {
    formattedNumber = number.toPrecision(3);
  }
  // everything else
  else {
    formattedNumber = number.toFixed(6);
  }
  return formattedNumber;
}

//create output string from previous operation and populate to upper display
function populateUpperDisplay () {
  const upperDisplay = document.querySelector(".upper");
  const outputText = 
    `${previousOperands[0]} ${previousOperator} ${previousOperands[1]}`
  ;
  upperDisplay.textContent = outputText;
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

// reset calculator state to default
function clearAll () {
  operands[0] = "0";
  operands[1] = "";
  operator = "";
  previousOperands[0] = "";
  previousOperands[1] = "";
  previousOperator = "";
}

let operands = ["0", ""]
let previousOperands = ["", ""];
let operator = "";
let previousOperator = "";

const html = document.documentElement;
const buttons = document.querySelectorAll(".button");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const negateButton = document.querySelector(".negate");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

// update upper and lower displays any time anything is clicked
html.addEventListener("click", populateLowerDisplay);
html.addEventListener("click", populateUpperDisplay);

// for button up animation
html.addEventListener ("mouseup", () => {
  buttons.forEach(button => {
    button.classList.remove("pressed");
  });
});

// for button down animation
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
deleteButton.addEventListener("click", deleteDigit);
equalsButton.addEventListener("click", determineOperation);
clearButton.addEventListener("click", clearAll);

populateLowerDisplay(); // initial display state