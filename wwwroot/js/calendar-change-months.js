const monthBackButton = document.getElementById("month-back");
monthBackButton.addEventListener("click", monthBack);

const monthForwardButton = document.getElementById("month-forward");
monthForwardButton.addEventListener("click", monthForward);

const monthSpan = document.getElementById("current-month");
let currentDateChangeMonths;

function initMonthButtons(date) {
  currentDateChangeMonths = date;
  monthSpan.innerText = currentDateChangeMonths.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
  });
}

function monthBack() {
  changeMonths(-1);
}

function monthForward() {
  changeMonths(1);
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
