window.addEventListener("DOMContentLoaded", main);

function main() {
  const currentDate = new Date();

  getCurrentDateTime();
  window.setInterval(getCurrentDateTime, 1000);
  initCalender(currentDate);
  initMonthButtons(currentDate);
  initTodos();
  addFormEventListener();
}
