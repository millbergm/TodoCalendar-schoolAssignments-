window.addEventListener("DOMContentLoaded", main);

// Saves states. cutentSelektedDay is set in the calendar but used with reloadContent().
// nextId and allTodos are used in the todo container.
const state = {
  currentDate: new Date(),
  cutentSelektedDay: null,
  nextId: 1,
  allTodos: new Array()
};

function main() {
  getCurrentDateTime();
  window.setInterval(getCurrentDateTime, 1000);
  initCalender(state.currentDate);
  initMonthButtons(state.currentDate);
  initTodo();
  addFormEventListener();
}

// Reloads the calendar and the todo container.
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
