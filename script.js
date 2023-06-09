// determine action based on button pressed
function processInput (string) {
  switch (string) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      setOperand(string);
      break;
    case ".":
      setDecimal();
      break;
    case "+/-":
      negateOperand();
      break;
    case "AC":
      clearAll();
      break;
    case "DEL":
    case "Backspace":
      deleteDigit();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      setOperator(string);
      break;
    case "%":
      setPercent();
      break;
    case "=":
    case "Enter":
      determineOperation();
    default:
      return;
  }
}

// add clicked digit button's number to current operand string
function setOperand (string) {
  const index = getCurrentOperand();
  if (operands[index] === "0") operands[index] = string;
  else operands[index] += string;
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

// reset calculator state to default
function clearAll () {
  operands[0] = "0";
  operands[1] = "";
  operator = "";
  previousOperands[0] = "";
  previousOperands[1] = "";
  previousOperator = "";
  
  populateUpperDisplay(); // clear upper display
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
function setOperator (string) {
  if(operands[1]) determineOperation(); // perform any pending operation first
  operator = string;
}

function setPercent () {
  if(operands[1]) determineOperation(); // perform any pending operation first
  operands[0] = format(operands[0]/100).toString();
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

  populateUpperDisplay(); // show previous operation in upper display area

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

  //display error message if operation failed
  if (result === undefined) return "ERROR!";

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
  if (numberB === 0) return; // catch division by zero
  return numberA / numberB;
}

// format output to fit in display
function format (number) {
  if (number.toString().length <= 12) return number; // no need to format
  for (i = 12; i > 0; i--) {
    const numberFormatted = number.toPrecision(i);
    if (numberFormatted.toString().length <= 12) return numberFormatted;
  }
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

const buttons = document.querySelectorAll("#calculator button");

// for mouse input
buttons.forEach(button => {
  button.addEventListener("mousedown", () => {
    processInput(button.innerText);
    populateLowerDisplay(); // update lower display any time a button is clicked
    button.classList.add("pressed"); // for button down animation
  });
});

// for button up animation
window.addEventListener ("mouseup", () => {
  buttons.forEach(button => {
    button.classList.remove("pressed");
  });
});

// for keyboard input
window.addEventListener("keydown", event => {
  processInput(event.key);
  populateLowerDisplay(); // update lower display any time a key is pressed
  if (event.key === "/") event.preventDefault(); // disable default find 
});

let operands = ["0", ""]
let previousOperands = ["", ""];
let operator = "";
let previousOperator = "";

populateLowerDisplay(); // initial display state