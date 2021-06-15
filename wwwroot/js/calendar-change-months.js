const monthSpan = document.getElementById("current-month");
let currentDateChangeMonths;

function initMonthButtons(date) {
  document
    .querySelectorAll("button[data-month-move]")
    .forEach((button) => button.addEventListener("click", monthMove));

  currentDateChangeMonths = date;
  monthSpan.innerText = currentDateChangeMonths.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
  });
}

function monthMove(event) {
  changeMonths(parseInt(event.currentTarget.dataset.monthMove));
}

function changeMonths(change) {
  currentDateChangeMonths.setMonth(currentDateChangeMonths.getMonth() + change);
  monthSpan.innerText = currentDateChangeMonths.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
  });
  setupCalender(
    currentDateChangeMonths.getFullYear(),
    currentDateChangeMonths.getMonth() + 1
  );
}
