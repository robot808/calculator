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