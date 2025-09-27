// گرفتن المان‌ها
const unitForm = document.getElementById("unitForm");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const themeBtn = document.getElementById("themeBtn");

// ---------- نسبت واحدها ----------
const conversions = {
  meter: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621, yard: 1.094, foot: 3.281, inch: 39.37 },
  kilometer: { meter: 1000, kilometer: 1, centimeter: 100000, millimeter: 1e6, mile: 0.621, yard: 1094, foot: 3281, inch: 39370 },
  centimeter: { meter: 0.01, kilometer: 0.00001, centimeter: 1, millimeter: 10, mile: 0.00000621, yard: 0.01094, foot: 0.03281, inch: 0.3937 },
  millimeter: { meter: 0.001, kilometer: 0.000001, centimeter: 0.1, millimeter: 1, mile: 0.000000621, yard: 0.001094, foot: 0.003281, inch: 0.03937 },
  mile: { meter: 1609, kilometer: 1.609, centimeter: 160934, millimeter: 1.609e6, mile: 1, yard: 1760, foot: 5280, inch: 63360 },
  yard: { meter: 0.914, kilometer: 0.000914, centimeter: 91.44, millimeter: 914, mile: 0.000568, yard: 1, foot: 3, inch: 36 },
  foot: { meter: 0.3048, kilometer: 0.000305, centimeter: 30.48, millimeter: 305, mile: 0.000189, yard: 0.333, foot: 1, inch: 12 },
  inch: { meter: 0.0254, kilometer: 0.0000254, centimeter: 2.54, millimeter: 25.4, mile: 0.000016, yard: 0.0278, foot: 0.0833, inch: 1 },
};

// ---------- تابع تبدیل ----------
function convertUnits(value, from, to) {
  if (from === to) return value;
  if (conversions[from] && conversions[from][to]) {
    return value * conversions[from][to];
  }
  return null;
}

// ---------- هندل فرم ----------
unitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(value)) {
    result.textContent = "❌ لطفاً عدد وارد کنید";
    return;
  }

  const converted = convertUnits(value, from, to);
  if (converted === null) {
    result.textContent = "🚫 تبدیل پشتیبانی نمی‌شود";
  } else {
    result.textContent = `${value} ${from} = ${converted.toFixed(3)} ${to}`;
    saveHistory(`${value} ${from} = ${converted.toFixed(3)} ${to}`);
  }

  inputValue.value = "";
});

// ---------- تاریخچه ----------
function saveHistory(text) {
  let history = JSON.parse(localStorage.getItem("unitHistory")) || [];
  history.push(text);
  if (history.length > 5) history.shift(); // فقط ۵ مورد آخر
  localStorage.setItem("unitHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("unitHistory")) || [];
  history.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// پاک کردن تاریخچه
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("unitHistory");
  renderHistory();
});

// ---------- تغییر تم ----------
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙";
  }
});

// ---------- بارگذاری اولیه ----------
window.addEventListener("DOMContentLoaded", () => {
  renderHistory();
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeBtn.textContent = "☀️";
  } else {
    document.body.classList.add("light-theme");
    themeBtn.textContent = "🌙";
  }
});