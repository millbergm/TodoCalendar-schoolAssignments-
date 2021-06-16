window.addEventListener("DOMContentLoaded", main);

const state = {
  currentDate: new Date(),
  cutentSelektedDay: null,
};

function main() {
  getCurrentDateTime();
  window.setInterval(getCurrentDateTime, 1000);
  initCalender(state.currentDate);
  initMonthButtons(state.currentDate);
  initTodo();
  addFormEventListener();
}

function reloadContent() {
  setupCalender(
    state.currentDate.getFullYear(),
    state.currentDate.getMonth() + 1
  );
  if (state.cutentSelektedDay) {
    populateTodoContainer(new Date(state.cutentSelektedDay));
  } else {
    populateTodoContainer(null);
  }
}
