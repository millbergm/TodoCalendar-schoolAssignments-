const monthSpan = document.getElementById("current-month");

function initMonthButtons(date) {
  document
    .querySelectorAll("button[data-month-move]")
    .forEach((button) => button.addEventListener("click", monthMove));

  state.currentDate = date;
  monthSpan.innerText = state.currentDate.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
  });
}

function monthMove(event) {
  changeMonths(parseInt(event.currentTarget.dataset.monthMove));
}

function changeMonths(change) {
  state.currentDate.setMonth(state.currentDate.getMonth() + change);
  monthSpan.innerText = state.currentDate.toLocaleString("sv-SE", {
    month: "long",
    year: "numeric",
  });

  reloadContent();
}
