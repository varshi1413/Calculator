const display = document.getElementById("display");
const expression = document.getElementById("expression");

// Toggle Theme Logic (Pink <-> Blue)
function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggleBtn");
  const logo = document.getElementById("logoText");
  const banner = document.getElementById("bannerText");
  const emoji1 = document.getElementById("sparkleEmoji1");
  const emoji2 = document.getElementById("sparkleEmoji2");

  if (body.classList.contains("barbie-theme")) {
    body.classList.remove("barbie-theme");
    body.classList.add("blue-theme");
    toggleBtn.textContent = "💖 Pink Mode";
    logo.textContent = "Calculator";
    banner.textContent = '"Reach For The Stars!" 🚀';
    emoji1.textContent = "💙";
    emoji2.textContent = "🌊";
  } else {
    body.classList.remove("blue-theme");
    body.classList.add("barbie-theme");
    toggleBtn.textContent = "💙 Blue Mode";
    logo.textContent = "Calculator";
    banner.textContent = '"You Can Be Anything!" 👑';
    emoji1.textContent = "💖";
    emoji2.textContent = "🎀";
  }
}

function appendNumber(number) {
  if (display.value === "0" || display.value === "Error") {
    display.value = number;
  } else {
    display.value += number;
  }
}

function appendOperator(operator) {
  const lastChar = display.value.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operator;
  } else if (display.value !== "") {
    display.value += operator;
  }
}

function clearDisplay() {
  display.value = "";
  expression.textContent = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    if (display.value.trim() !== "") {
      const rawExpression = display.value;
      const result = eval(rawExpression);
      expression.textContent = `${rawExpression} =`;
      display.value = result;
    }
  } catch (error) {
    display.value = "Oops! Error 💕";
    setTimeout(clearDisplay, 1500);
  }
}

// Keyboard input support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape" || key.toLowerCase() === "c") {
    clearDisplay();
  }
});