window.addEventListener("DOMContentLoaded", main);

function main() {
  getCurrentDateTime();
  window.setInterval(getCurrentDateTime, 1000);
  initTodo();
  initCalender();
  addFormEventListener();
}
